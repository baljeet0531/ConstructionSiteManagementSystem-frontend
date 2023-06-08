import React from 'react';
import { Box, Button, Flex, Select, Text, useToast } from '@chakra-ui/react';
import { LaunchIcon } from '../../Icons/Icons';
import ReactWindowTable, {
    CheckboxElement,
    IColumnMap,
    ISizes,
    SignatureStatusElement,
    dataCellStyle,
    defaultElement,
    getElementProps,
} from '../Shared/ReactWindowTable';
// import { PageLoading } from '../Shared/Loading';
import { DateRangePicker } from 'rsuite';
import { IsPermit } from '../../Mockdata/Mockdata';
import { Navigate } from 'react-router';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import {
    EHSFormName,
    IEHSFormOverview,
    IEHSFormOverviewChecked,
    IEHSFormOverviewTable,
    TEHSFormNameMap,
} from '../../Interface/EHSForm/Common';
import {
    OperationVariables,
    QueryHookOptions,
    useLazyQuery,
    useQuery,
} from '@apollo/client';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import dayjs from 'dayjs';
import { QUERY_EHS_FORM } from './GQL';

const EHSFormNameMap: TEHSFormNameMap = {
    normal: {
        label: '一般作業巡迴檢查表',
        queryName: 'EHSFormNormal',
    },
    special: {
        label: '特殊作業巡迴檢查表',
        queryName: 'EHSFormSpecial',
    },
};

const sizes: ISizes = {
    headerHeight: 44,
    cellHeight: 44,
};

export default function EHSOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('eng_op_check_form'))
        return <Navigate to="/" replace={true} />;
    const columnMap: IColumnMap[] = [
        {
            title: '日期',
            width: 120,
            variable: 'day',
            getElement: defaultElement,
        },
        {
            title: '巡檢單位',
            width: 120,
            variable: 'checkDept',
            getElement: defaultElement,
        },
        {
            title: '巡檢人員',
            width: 120,
            variable: 'checkStaff',
            getElement: defaultElement,
        },
        {
            title: '巡檢對象',
            width: 200,
            variable: 'checkTarget',
            getElement: ({ style, info, variable }: getElementProps) => {
                const checkTarget = info[
                    variable
                ] as IEHSFormOverviewChecked['checkTarget'];

                return (
                    <Box {...dataCellStyle} style={style}>
                        {checkTarget.reduce(
                            (acc, val) =>
                                acc + (acc.length ? ', ' : '') + val.corpName,
                            ''
                        )}
                    </Box>
                );
            },
        },
        {
            title: '簽核狀態',
            width: 267,
            variable: 'signatureStatus',
            getElement: (props: getElementProps) => {
                const { responsibleUnitSignature, supervisorUnitSignature } =
                    props.info as IEHSFormOverviewChecked;
                const signatureFieldList = [
                    ...responsibleUnitSignature.map((sign) => ({
                        signature: sign,
                        fieldLabel: '缺失責任單位',
                    })),
                    ...supervisorUnitSignature.map((sign) => ({
                        signature: sign,
                        fieldLabel: 'MIC監工單位',
                    })),
                ];
                return (
                    <SignatureStatusElement
                        getElementProps={props}
                        signatureFieldList={signatureFieldList}
                    ></SignatureStatusElement>
                );
            },
        },
        {
            title: '全選',
            width: 50,
            variable: 'isChecked',
            getElement: (props: getElementProps) => {
                return (
                    <CheckboxElement
                        getElementProps={props}
                        setTableData={setTableData}
                        primaryKey={props.info.day}
                    ></CheckboxElement>
                );
            },
        },
    ];

    const EHSOptions = Object.entries(EHSFormNameMap).map(
        ([key, value], index) => (
            <option key={index} value={key}>
                {value.label}
            </option>
        )
    );

    const { siteId, siteName } = props;
    const toast = useToast();

    const [queryType, setQueryType] = React.useState<EHSFormName>('normal');
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
    const [tableData, setTableData] = React.useState<IEHSFormOverviewTable>({});
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();

    const handleData = (data: IEHSFormOverview[]) =>
        data.reduce((acc, value, index) => {
            acc[value.day] = { ...value, index: index, isChecked: false };
            return acc;
        }, {} as IEHSFormOverviewTable);

    const handleFilter = (
        queryType: EHSFormName,
        dateRange: DateRange | null
    ) => {
        const variables = {
            variables: {
                siteId: siteId,
                start: dateRange && dayjs(dateRange[0]).format('YYYY-MM-DD'),
                end: dateRange && dayjs(dateRange[1]).format('YYYY-MM-DD'),
            },
        };
        queryType === 'normal'
            ? updateNormal(variables)
            : updateSpecial(variables);
    };

    const queryOptions = (
        queryType: EHSFormName,
        filter: boolean = false
    ): QueryHookOptions<any, OperationVariables> => ({
        onCompleted: (data) => {
            const queryData = data[
                EHSFormNameMap[queryType].queryName
            ] as IEHSFormOverview[];
            if (filter) {
                setFilteredPrimaryKey(queryData.map(({ day }) => day));
            } else {
                const formattedData = handleData(queryData);
                setTableData(formattedData);
            }
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    useQuery(QUERY_EHS_FORM('normal'), {
        variables: {
            siteId: siteId,
        },
        ...queryOptions('normal'),
    });

    const [updateNormal] = useLazyQuery(
        QUERY_EHS_FORM('normal'),
        queryOptions('normal', true)
    );

    const [updateSpecial] = useLazyQuery(
        QUERY_EHS_FORM('special'),
        queryOptions('special', true)
    );

    return (
        <Flex
            direction={'column'}
            h={'100vh'}
            w={'100%'}
            pl={'42px'}
            pr={'42px'}
            pt={'47px'}
            pb={'24px'}
            gap={'11px'}
        >
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Text variant={'pageTitle'}>特殊作業自主檢點表</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <DateRangePicker
                        value={dateRange}
                        style={{
                            border: '2px solid #919AA9',
                            borderRadius: '6px',
                        }}
                        onChange={(value) => {
                            handleFilter(queryType, value);
                            setDateRange(value);
                        }}
                    />
                    <Select
                        variant={'formOutline'}
                        value={queryType}
                        onChange={(e) => {
                            const val = e.target.value as EHSFormName;
                            handleFilter(val, dateRange);
                            setQueryType(val);
                        }}
                    >
                        {EHSOptions}
                    </Select>
                </Flex>
                <Button
                    leftIcon={<LaunchIcon />}
                    variant={'buttonGrayOutline'}
                    onClick={() => {
                        // const username = new Cookies().get('username');
                        // const infos = Object.values(tableData).flatMap((info) =>
                        //     info.isChecked
                        //         ? {
                        //               number: info.number,
                        //               ftype: info.type,
                        //           }
                        //         : []
                        // );
                        // exportOpCheck({
                        //     variables: {
                        //         infos: infos,
                        //         siteId: siteId,
                        //         username: username,
                        //     },
                        // });
                    }}
                >
                    輸出
                </Button>
            </Flex>
            <ReactWindowTable
                tableData={tableData}
                setTableData={setTableData}
                columnMap={columnMap}
                sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
            />
            {/*{(loading || exportLoading) && <PageLoading />} */}
        </Flex>
    );
}
