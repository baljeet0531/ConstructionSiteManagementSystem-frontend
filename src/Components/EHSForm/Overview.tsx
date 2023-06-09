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
import { PageLoading } from '../Shared/Loading';
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
    ApolloCache,
    DefaultContext,
    MutationHookOptions,
    OperationVariables,
    QueryHookOptions,
    useLazyQuery,
    useMutation,
    useQuery,
} from '@apollo/client';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import dayjs from 'dayjs';
import {
    EXPORT_EHS_FORM_NORMAL,
    EXPORT_EHS_FORM_SPECIAL,
    QUERY_EHS_FORM,
} from './GQL';
import EHSForm from './EHSForm';
import { Cookies } from 'react-cookie';
import { IGQLSignature } from '../../Interface/Signature';
import { useFileExport } from '../../Hooks/UseFileExport';

const sizes: ISizes = {
    headerHeight: 44,
    cellHeight: 44,
};

export default function EHSOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('ehs_form')) return <Navigate to="/" replace={true} />;

    const username = new Cookies().get('username');
    const { siteId, siteName } = props;
    const toast = useToast();
    const { fileLoading, exportFile } = useFileExport();

    const [queryType, setQueryType] = React.useState<EHSFormName>('normal');
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
    const [tableDataNormal, setTableDataNormal] =
        React.useState<IEHSFormOverviewTable>({});
    const [tableDataSpecial, setTableDataSpecial] =
        React.useState<IEHSFormOverviewTable>({});
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();

    const columnMap: IColumnMap[] = [
        {
            title: '日期',
            width: 120,
            variable: 'day',
            getElement: (props: getElementProps) => (
                <EHSForm {...props} type={queryType} />
            ),
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
                const signatureFieldList: {
                    signature: IGQLSignature | null;
                    fieldLabel: string;
                }[] = [
                    ...responsibleUnitSignature.map((sign) => ({
                        signature: sign,
                        fieldLabel: '缺失責任單位',
                    })),
                    ...(supervisorUnitSignature.length
                        ? supervisorUnitSignature.map((sign) => ({
                              signature: sign,
                              fieldLabel: 'MIC監工單位',
                          }))
                        : [{ signature: null, fieldLabel: 'MIC監工單位' }]),
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
            getElement: (props: getElementProps) => (
                <CheckboxElement
                    getElementProps={props}
                    setTableData={EHSFormNameMap[queryType].setTableData}
                    primaryKey={props.info.day}
                />
            ),
        },
    ];

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
        EHSFormNameMap[queryType].updateFunction(variables);
    };

    const handleExport = () => {
        const days = Object.values(EHSFormNameMap[queryType].tableData).flatMap(
            ({ isChecked, day }) => (isChecked ? day : [])
        );

        const variables = {
            variables: {
                day: days,
                siteId: siteId,
                username: username,
            },
        };

        EHSFormNameMap[queryType].exportFunction(variables);
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
                queryType === 'normal'
                    ? setTableDataNormal(formattedData)
                    : setTableDataSpecial(formattedData);
            }
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });
    const exportOptions = (
        queryType: EHSFormName
    ): MutationHookOptions<
        any,
        OperationVariables,
        DefaultContext,
        ApolloCache<any>
    > => ({
        onCompleted: (data) => {
            exportFile(data[EHSFormNameMap[queryType].exportName]);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    const { loading: querNormalLoading } = useQuery(QUERY_EHS_FORM('normal'), {
        variables: {
            siteId: siteId,
        },
        ...queryOptions('normal'),
    });

    const { loading: querSpecialLoading } = useQuery(
        QUERY_EHS_FORM('special'),
        {
            variables: {
                siteId: siteId,
            },
            ...queryOptions('special'),
        }
    );

    const [updateNormal, { loading: updateNormalLoading }] = useLazyQuery(
        QUERY_EHS_FORM('normal'),
        queryOptions('normal', true)
    );

    const [updateSpecial, { loading: updateSpecialLoading }] = useLazyQuery(
        QUERY_EHS_FORM('special'),
        queryOptions('special', true)
    );

    const [exportNormal, { loading: exportNormalLoading }] = useMutation(
        EXPORT_EHS_FORM_NORMAL,
        exportOptions('normal')
    );
    const [exportSpecial, { loading: exportSpecialLoading }] = useMutation(
        EXPORT_EHS_FORM_SPECIAL,
        exportOptions('special')
    );

    const EHSFormNameMap: TEHSFormNameMap = {
        normal: {
            label: '一般作業巡迴檢查表',
            queryName: 'EHSFormNormal',
            exportName: 'exportEHSFormNormal',
            tableData: tableDataNormal,
            setTableData: setTableDataNormal,
            updateFunction: updateNormal,
            exportFunction: exportNormal,
        },
        special: {
            label: '特殊作業巡迴檢查表',
            queryName: 'EHSFormSpecial',
            exportName: 'exportEHSFormSpecial',
            tableData: tableDataSpecial,
            setTableData: setTableDataSpecial,
            updateFunction: updateSpecial,
            exportFunction: exportSpecial,
        },
    };

    const EHSOptions = Object.entries(EHSFormNameMap).map(
        ([key, value], index) => (
            <option key={index} value={key}>
                {value.label}
            </option>
        )
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
            <Text variant={'pageTitle'}>工安自主檢查</Text>
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
                    onClick={handleExport}
                >
                    輸出
                </Button>
            </Flex>
            <ReactWindowTable
                key={queryType}
                tableData={EHSFormNameMap[queryType].tableData}
                setTableData={EHSFormNameMap[queryType].setTableData}
                columnMap={columnMap}
                sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
            />
            {(querNormalLoading ||
                querSpecialLoading ||
                updateNormalLoading ||
                updateSpecialLoading ||
                exportNormalLoading ||
                exportSpecialLoading ||
                fileLoading) && <PageLoading />}
        </Flex>
    );
}
