import React from 'react';
import {
    Box,
    Button,
    Flex,
    Link,
    Select,
    Text,
    useToast,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker/types';
import { LaunchIcon } from '../../Icons/Icons';
import { IsPermit } from '../../Mockdata/Mockdata';
import { IGQLSignature } from '../../Interface/Signature';
import ReactWindowTable, {
    CheckboxElement,
    dataCellStyle,
    defaultElement,
    getElementProps,
    IColumnMap,
    ISizes,
    SignatureStatusElement,
} from '../Shared/ReactWindowTable';
import {
    LazyQueryResultTuple,
    useLazyQuery,
    useMutation,
    useQuery,
} from '@apollo/client';
import { EXPORT_OPCHECK, OpCheckGQL } from './GQL';
import dayjs from 'dayjs';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { exportFile } from '../../Utils/Resources';
import { Cookies } from 'react-cookie';
import { PageLoading } from '../Shared/Loading';
import {
    OpCheckName,
    OpCheckQueryType,
    OpCheckQueryTypeZh,
} from '../../Interface/OpCheck/Common';
import { opCheckMap } from '../../Utils/OpCheck/Mapper';

export interface IOperationOverview {
    day: string;
    number: string;
    area: string;
    department: string;
    supervisorBeforeRef: IGQLSignature | null;
    staffBeforeRef: IGQLSignature | null;
    supervisorAfterRef: IGQLSignature | null;
    staffAfterRef: IGQLSignature | null;
}

export interface IOperationOverviewChecked extends IOperationOverview {
    index: number;
    type: OpCheckQueryTypeZh;
    opCheckName: OpCheckName;
    isChecked: boolean;
}

const OpCheckQueryMap: Map<
    OpCheckQueryType,
    {
        query?: LazyQueryResultTuple<any, { siteId: string }>;
    }
> = new Map([
    ['all', {}],
    ['assemble', {}],
    ['cage', {}],
    ['chemical', {}],
    ['confineSpace', {}],
    ['electric', {}],
    ['fire', {}],
    ['hole', {}],
    ['lift', {}],
    ['pipeDistruct', {}],
    ['scafold', {}],
]);

const operationOptionsElements = ['all', ...Object.keys(opCheckMap)].map(
    (key, index) => (
        <option key={index} value={key}>
            {key === 'all' ? '全部' : opCheckMap[key as OpCheckName].name}
        </option>
    )
);

const sizes: ISizes = {
    tableFigmaWidth: 877,
    headerHeight: 44,
    cellHeight: 44,
};

export default function OpCheckOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('eng_op_check_form'))
        return <Navigate to="/" replace={true} />;
    const { siteId, siteName } = props;
    const toast = useToast();
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
    const [queryType, setQueryType] = React.useState<OpCheckQueryType>('all');

    const navSingleOpCheckForm = (number: string, opCheckName: OpCheckName) => {
        const url = `${window.location.origin}/form/opcheck`;
        localStorage.setItem(
            'singleOpCheckObject',
            JSON.stringify({ number: number, type: opCheckName })
        );
        window.open(url, '_blank');
    };

    const columnMap: IColumnMap[] = [
        {
            title: '日期',
            width: 120,
            variable: 'day',
            getElement: defaultElement,
        },
        {
            title: '單號',
            width: 120,
            variable: 'number',
            getElement: ({ style, info, variable }) => (
                <Box style={style} {...dataCellStyle}>
                    <Link
                        onClick={() => {
                            navSingleOpCheckForm(info.number, info.opCheckName);
                        }}
                    >
                        {info[variable]}
                    </Link>
                </Box>
            ),
        },
        {
            title: '作業名稱',
            width: 120,
            variable: 'type',
            getElement: defaultElement,
        },
        {
            title: '施工地點',
            width: 120,
            variable: 'area',
            getElement: defaultElement,
        },
        {
            title: '作業單位',
            width: 120,
            variable: 'department',
            getElement: defaultElement,
        },
        {
            title: '簽核狀態',
            width: 227,
            variable: 'signatureStatus',
            getElement: (props: getElementProps) => {
                const {
                    supervisorBeforeRef,
                    staffBeforeRef,
                    supervisorAfterRef,
                    staffAfterRef,
                } = props.info as IOperationOverviewChecked;
                const signatureFieldList = [
                    {
                        signature: supervisorBeforeRef,
                        fieldLabel: '監工(施工前)',
                    },
                    {
                        signature: staffBeforeRef,
                        fieldLabel: '作業人員(施工前)',
                    },
                    {
                        signature: supervisorAfterRef,
                        fieldLabel: '監工(收工前)',
                    },
                    {
                        signature: staffAfterRef,
                        fieldLabel: '作業人員(收工前)',
                    },
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
                const { number, opCheckName } =
                    props.info as IOperationOverviewChecked;
                return (
                    <CheckboxElement
                        getElementProps={props}
                        setTableData={setTableData}
                        primaryKey={`${number}|${opCheckName}`}
                    ></CheckboxElement>
                );
            },
        },
    ];

    const [tableData, setTableData] = React.useState<{
        [number: string]: IOperationOverviewChecked;
    }>({});
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();

    const handleFilter = (
        value: DateRange | null,
        queryType: OpCheckQueryType
    ) => {
        const queryTuple = OpCheckQueryMap.get(queryType)?.query;
        queryTuple &&
            queryTuple[0]({
                variables: {
                    siteId: siteId,
                    ...(value && {
                        startDate: dayjs(value[0]).format('YYYY-MM-DD'),
                        endDate: dayjs(value[1]).format('YYYY-MM-DD'),
                    }),
                },
                onCompleted: (data: {
                    [key: string]: IOperationOverview[];
                }) => {
                    const primaryKeys =
                        queryType === 'all'
                            ? Object.entries(data).flatMap(([key, value]) =>
                                  value.map(
                                      (info) =>
                                          `${info.number}|${key.slice(0, -7)}`
                                  )
                              )
                            : data[`${queryType}OpCheck`].map(
                                  (info) => `${info.number}|${queryType}`
                              );
                    setFilteredPrimaryKey(primaryKeys);
                },
            });
    };

    const formatOpcheck = (
        info: IOperationOverview,
        opCheckName: OpCheckName,
        index: number
    ) => ({
        [`${info.number}|${opCheckName}`]: {
            ...info,
            index: index + 1,
            type: opCheckMap[opCheckName].name,
            opCheckName: opCheckName,
            isChecked: false,
        },
    });

    const handleDataAll = (data: { [key: string]: IOperationOverview[] }) => {
        let i = 0;
        return Object.entries(data).flatMap((item) => {
            const [key, value] = item as [string, IOperationOverview[]];
            const opCheckName = key.slice(0, -7) as OpCheckName;
            return value.map((info) => formatOpcheck(info, opCheckName, ++i));
        });
    };

    OpCheckQueryMap.forEach((value, key) => {
        OpCheckQueryMap.set(key, {
            ...value,
            query: useLazyQuery(OpCheckGQL(key), {
                onError: (err) => {
                    console.log(err);
                    defaultErrorToast(toast);
                },
                fetchPolicy: 'network-only',
            }),
        });
    });

    const [exportOpCheck, { loading: exportLoading }] = useMutation(
        EXPORT_OPCHECK,
        {
            onCompleted: ({ exportOps }) => {
                const { ok, message, path } = exportOps;
                if (ok) {
                    exportFile(path, message, toast);
                }
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            fetchPolicy: 'network-only',
        }
    );

    const { loading, startPolling } = useQuery(OpCheckGQL('all'), {
        variables: { siteId: siteId },
        onCompleted: (data) => {
            handleDataAll(data);
            const dataObject = Object.assign({}, ...handleDataAll(data));
            setTableData(dataObject);
            startPolling(3000);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

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
                            handleFilter(value, queryType);
                            setDateRange(value);
                        }}
                    />
                    <Select
                        value={queryType}
                        variant={'formOutline'}
                        onChange={(e) => {
                            const val = e.target.value as OpCheckQueryType;
                            handleFilter(dateRange, val);
                            setQueryType(val);
                        }}
                    >
                        {operationOptionsElements}
                    </Select>
                </Flex>
                <Button
                    leftIcon={<LaunchIcon />}
                    variant={'buttonGrayOutline'}
                    onClick={() => {
                        const username = new Cookies().get('username');
                        const infos = Object.values(tableData).flatMap((info) =>
                            info.isChecked
                                ? {
                                      number: info.number,
                                      ftype: info.type,
                                  }
                                : []
                        );
                        exportOpCheck({
                            variables: {
                                infos: infos,
                                siteId: siteId,
                                username: username,
                            },
                        });
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
                sortBy="day"
                sortFormatter={(day: string) => dayjs(day).valueOf()}
                sortReversed
            />
            {(loading || exportLoading) && <PageLoading />}
        </Flex>
    );
}
