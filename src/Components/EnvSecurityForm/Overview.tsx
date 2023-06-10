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
} from '@chakra-ui/react';
import { DateRangePicker, MultiCascader } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { ArrowDropDownIcon, LaunchIcon } from '../../Icons/Icons';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import ReactWindowTable from '../Shared/ReactWindowTable';
import {
    IEnvSecurityDeptArea,
    IEnvSecurityDeptAreaMap,
    IEnvSecurityFormOverview,
    IEnvSecurityOverviewTable,
} from '../../Interface/EnvSecurityForm';
import { ValueType } from 'rsuite/esm/MultiCascader/MultiCascader';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { SIGNATURE_FIELDS } from '../../Utils/GQLFragments';
import { defaultErrorToast } from '../../Utils/DefaultToast';
// import { Cookies } from 'react-cookie';

const separator = '?';

const QUERY_ENV_FORM = gql`
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

export default function EnvSecurityOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('eng_fault_form')) return <Navigate to="/" replace={true} />;

    const { siteName, siteId } = props;
    const toast = useToast();
    // const username = new Cookies().get('username');
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

    useQuery(QUERY_ENV_FORM, {
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

    const [searchEnvSecurity] = useLazyQuery(QUERY_ENV_FORM, {
        onCompleted: ({
            envSecurityCheck,
        }: {
            envSecurityCheck: IEnvSecurityFormOverview[];
        }) => {
            setFilteredPrimaryKey(envSecurityCheck.map(({ number }) => number));
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    const [value, setValue] = React.useState<ValueType>([]);

    const handleCheckedDeptsAreas = React.useCallback(() => {
        const checkedDepts = new Set<string>();
        const checkedAreas = new Set<string>();
        value.forEach((val) => {
            const [dept, area] = val.toString().split(separator);

            area
                ? checkedAreas.add(area)
                : deptAreaMap[dept].areas.forEach((area) =>
                      checkedAreas.add(area)
                  );
            checkedDepts.add(dept);
        });
        return [Array.from(checkedDepts), Array.from(checkedAreas)];
    }, [value]);

    const handleSearch = (dateRange: DateRange | null) => {
        const [dept, area] = handleCheckedDeptsAreas();

        console.log({
            siteId: siteId,
            start: dateRange && dateRange[0],
            end: dateRange && dateRange[1],
            dept: dept,
            area: area,
        });
        searchEnvSecurity({
            variables: {
                siteId: siteId,
                start: dateRange && dateRange[0],
                end: dateRange && dateRange[1],
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
                                        value={value}
                                        onChange={setValue}
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
                        // const numbers = Object.values(tableData).flatMap(
                        //     (info) => (info.isChecked ? info.number : [])
                        // );
                        // exportToolbox({
                        //     variables: {
                        //         number: numbers,
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
                columnMap={[]}
                // columnMap={columnMap}
                // sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
                sortReversed={true}
            />
            {/* {(loading || searchLoading || exportLoading) && <PageLoading />} */}
        </Flex>
    );
}
