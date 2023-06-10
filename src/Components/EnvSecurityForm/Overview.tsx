import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import {
    Flex,
    Text,
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    useToast,
    useDisclosure,
} from '@chakra-ui/react';
import { DateRangePicker, MultiCascader } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { ArrowDropDownIcon, LaunchIcon } from '../../Icons/Icons';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import ReactWindowTable, {
    CheckboxElement,
    IColumnMap,
    ISizes,
    ModalOpenButtonElement,
    SignatureStatusElement,
    defaultElement,
} from '../Shared/ReactWindowTable';
import {
    IEnvSecurityDeptArea,
    IEnvSecurityDeptAreaMap,
    IEnvSecurityFormOverview,
    IEnvSecurityOverviewChecked,
    IEnvSecurityOverviewTable,
} from '../../Interface/EnvSecurityForm';
import { ValueType } from 'rsuite/esm/MultiCascader/MultiCascader';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { SIGNATURE_FIELDS } from '../../Utils/GQLFragments';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { Cookies } from 'react-cookie';
import { useFileExport } from '../../Hooks/UseFileExport';
import { PageLoading } from '../Shared/Loading';
import EnvSecurityFormModal from './Modal';
import { getElementProps } from '../Shared/ReactWindowTable';
import dayjs from 'dayjs';

const separator = '?';

const sizes: ISizes = {
    headerHeight: 44,
    cellHeight: 44,
};

const QUERY_ENV_SECURITY = gql`
    ${SIGNATURE_FIELDS}
    query EnvSecurityOverview(
        $siteId: String!
        $number: String
        $start: Date
        $end: Date
        $dept: [String]
        $area: [String]
    ) {
        envSecurityCheck(
            siteId: $siteId
            number: $number
            start: $start
            end: $end
            dept: $dept
            area: $area
        ) {
            siteId
            day
            number
            department
            area
            supervisorBeforeRef {
                ...gqlSignatureFields
            }
            staffBeforeRef {
                ...gqlSignatureFields
            }
            supervisorAfterRef {
                ...gqlSignatureFields
            }
            staffAfterRef {
                ...gqlSignatureFields
            }
        }

        envSecurityCheckCondition(siteId: $siteId) {
            dept
            area
        }
    }
`;

const EXPORT_ENV_SECURITY = gql`
    mutation ExportEnvSecurityCheck(
        $number: [String]!
        $siteId: String!
        $username: String!
    ) {
        exportEnvSecurityCheck(
            number: $number
            siteId: $siteId
            username: $username
        ) {
            ok
            message
            path
        }
    }
`;

export default function EnvSecurityOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('eng_fault_form')) return <Navigate to="/" replace={true} />;

    const { siteName, siteId } = props;
    const toast = useToast();
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { fileLoading, exportFile } = useFileExport();
    const username = new Cookies().get('username');

    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
    const [tableData, setTableData] = React.useState<IEnvSecurityOverviewTable>(
        {}
    );
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();
    const [deptAreaMap, setDeptAreaMap] =
        React.useState<IEnvSecurityDeptAreaMap>({});
    const [multiCascaderData, setMultiCascaderData] = React.useState<
        ItemDataType<string | number>[]
    >([]);
    const [multiCascaderValue, setMultiCascaderValue] =
        React.useState<ValueType>([]);
    const [openingNumber, setOpeningNumber] = React.useState<string>('');

    const columnMap: IColumnMap<IEnvSecurityOverviewChecked>[] = [
        {
            title: '日期',
            width: 130,
            variable: 'day',
            getElement: defaultElement,
        },
        {
            title: '單號',
            width: 130,
            variable: 'number',
            getElement: ({
                style,
                info,
                variable,
            }: getElementProps<IEnvSecurityOverviewChecked, 'number'>) => (
                <ModalOpenButtonElement
                    style={style}
                    info={info}
                    variable={variable}
                    onClick={() => {
                        setOpeningNumber(info[variable]);
                        onOpen();
                    }}
                />
            ),
        },
        {
            title: '作業單位',
            width: 130,
            variable: 'department',
            getElement: defaultElement,
        },
        {
            title: '施工地點',
            width: 130,
            variable: 'area',
            getElement: defaultElement,
        },
        {
            title: '簽核狀態',
            width: 307,
            variable: 'signatureStatus',
            getElement: (props) => {
                const {
                    supervisorBeforeRef,
                    staffBeforeRef,
                    supervisorAfterRef,
                    staffAfterRef,
                } = props.info;
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
            getElement: (props) => (
                <CheckboxElement
                    getElementProps={props}
                    setTableData={setTableData}
                    primaryKey={props.info.number}
                />
            ),
        },
    ];

    const { loading } = useQuery(QUERY_ENV_SECURITY, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            envSecurityCheck,
            envSecurityCheckCondition,
        }: {
            envSecurityCheck: IEnvSecurityFormOverview[];
            envSecurityCheckCondition: IEnvSecurityDeptArea[];
        }) => {
            const formattedData = envSecurityCheck.reduce((acc, val, index) => {
                const { number } = val;
                acc[number] = {
                    ...val,
                    index: index,
                    isChecked: false,
                };
                return acc;
            }, {} as IEnvSecurityOverviewTable);
            setTableData(formattedData);

            const { mapper, cascader } = envSecurityCheckCondition.reduce(
                (acc, { dept, area }) => {
                    acc.mapper[dept] = {
                        areas: area,
                    };
                    acc.cascader.push({
                        label: dept,
                        value: dept,
                        children: area.map((area) => ({
                            label: area,
                            value: dept + separator + area,
                        })),
                    });
                    return acc;
                },
                {
                    mapper: {},
                    cascader: [],
                } as {
                    mapper: IEnvSecurityDeptAreaMap;
                    cascader: ItemDataType<string | number>[];
                }
            );
            setDeptAreaMap(mapper);
            setMultiCascaderData(cascader);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [searchEnvSecurity, { loading: searchLoading }] = useLazyQuery(
        QUERY_ENV_SECURITY,
        {
            onCompleted: ({
                envSecurityCheck,
            }: {
                envSecurityCheck: IEnvSecurityFormOverview[];
            }) => {
                setFilteredPrimaryKey(
                    envSecurityCheck.map(({ number }) => number)
                );
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            fetchPolicy: 'network-only',
        }
    );

    const [exportEnvSecurity, { loading: exportLoading }] = useMutation(
        EXPORT_ENV_SECURITY,
        {
            onCompleted: (exportEnvSecurityCheck) => {
                exportFile(exportEnvSecurityCheck);
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            fetchPolicy: 'network-only',
        }
    );

    const handleCheckedDeptsAreas = React.useCallback(() => {
        const checkedDepts = new Set<string>();
        const checkedAreas = new Set<string>();
        multiCascaderValue.forEach((val) => {
            const [dept, area] = val.toString().split(separator);

            area
                ? checkedAreas.add(area)
                : deptAreaMap[dept].areas.forEach((area) =>
                      checkedAreas.add(area)
                  );
            checkedDepts.add(dept);
        });
        return [Array.from(checkedDepts), Array.from(checkedAreas)];
    }, [multiCascaderValue]);

    const handleSearch = (dateRange: DateRange | null) => {
        const [dept, area] = handleCheckedDeptsAreas();
        searchEnvSecurity({
            variables: {
                siteId: siteId,
                start: dateRange && dayjs(dateRange[0]).format('YYYY/MM/DD'),
                end: dateRange && dayjs(dateRange[1]).format('YYYY/MM/DD'),
                dept: dept,
                area: area,
            },
        });
    };

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
            <Text variant={'pageTitle'}>環安衛自主檢點表</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <DateRangePicker
                        value={dateRange}
                        style={{
                            border: '2px solid #919AA9',
                            borderRadius: '6px',
                        }}
                        onChange={(value) => {
                            handleSearch(value);
                            setDateRange(value);
                        }}
                    />
                    <Popover placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Button
                                rightIcon={<ArrowDropDownIcon />}
                                variant={'buttonGraySolid'}
                            >
                                搜尋條件
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody
                                display={'flex'}
                                padding={'24px'}
                                height={'328px'}
                                width={'328px'}
                                flexDirection={'column'}
                                justifyContent={'space-between'}
                            >
                                <Flex direction={'column'}>
                                    <Flex
                                        width={'100%'}
                                        align={'center'}
                                        justify={'center'}
                                    >
                                        <Text
                                            pl={'10px'}
                                            flexBasis={'50%'}
                                            fontWeight={700}
                                            fontSize={'1rem'}
                                            lineHeight={'1.5rem'}
                                        >
                                            作業單位
                                        </Text>
                                        <Text
                                            pl={'10px'}
                                            flexBasis={'50%'}
                                            fontWeight={700}
                                            fontSize={'1rem'}
                                            lineHeight={'1.5rem'}
                                        >
                                            施工地點
                                        </Text>
                                    </Flex>
                                    <MultiCascader
                                        inline
                                        menuWidth={140}
                                        menuHeight="auto"
                                        data={multiCascaderData}
                                        value={multiCascaderValue}
                                        onChange={setMultiCascaderValue}
                                        countable={false}
                                        preventOverflow
                                        searchable={false}
                                    />
                                </Flex>

                                <Flex justifyContent="flex-end">
                                    <Button
                                        variant={'buttonBlueSolid'}
                                        onClick={() => {
                                            handleSearch(dateRange);
                                        }}
                                    >
                                        確定搜尋
                                    </Button>
                                </Flex>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
                <Button
                    leftIcon={<LaunchIcon />}
                    variant={'buttonGrayOutline'}
                    onClick={() => {
                        const numbers = Object.values(tableData).flatMap(
                            (info) => (info.isChecked ? info.number : [])
                        );
                        numbers.length &&
                            exportEnvSecurity({
                                variables: {
                                    number: numbers,
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
                sortReversed={true}
            />
            <EnvSecurityFormModal
                siteId={siteId}
                number={openingNumber}
                onClose={onClose}
                isOpen={isOpen}
            />
            {(loading || searchLoading || exportLoading || fileLoading) && (
                <PageLoading />
            )}
        </Flex>
    );
}
