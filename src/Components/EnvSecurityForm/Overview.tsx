/* eslint-disable no-unused-vars */
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
    Grid,
    Checkbox,
    // useToast,
    // Checkbox,
    // Box,
    // Link,
} from '@chakra-ui/react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { ArrowDropDownIcon, LaunchIcon } from '../../Icons/Icons';
import { gql } from '@apollo/client';
import { IGQLSignature } from '../../Interface/Signature';
import { ChevronRightIcon } from '@chakra-ui/icons';
import ReactWindowTable from '../Shared/ReactWindowTable';
// import { Cookies } from 'react-cookie';

export interface IEnvSecurityFormOverview {
    siteId: string;
    day: string;
    number: string;
    department: string;
    area: string;
    supervisorBeforeRef: IGQLSignature | null;
    staffBeforeRef: IGQLSignature | null;
    supervisorAfterRef: IGQLSignature | null;
    staffAfterRef: IGQLSignature | null;
}

export interface IEnvSecurityOverviewChecked extends IEnvSecurityFormOverview {
    index: number;
    isChecked: boolean;
}

export interface IEnvSecurityOverviewTable {
    [day: string]: IEnvSecurityOverviewChecked;
}

interface IEnvSecurityDeptArea {
    dept: string;
    area: string[];
}

interface IEnvSecurityDeptAreaMap {
    [dept: string]: {
        areas: {
            [area: string]: {
                isChecked: boolean;
            };
        };
        isChecked: boolean;
    };
}
// eslint-disable-next-line no-unused-vars
const QUERY_ENV_FORM = gql`
    query envSecurityCheck(
        $siteId: String!
        $start: Date
        $end: Date
        $dept: String
        $area: String
    ) {
        envSecurityCheck(
            siteId: $siteId
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

    const { siteName } = props;
    // const username = new Cookies().get('username');
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
    const [tableData, setTableData] = React.useState<IEnvSecurityOverviewTable>(
        {}
    );
    // eslint-disable-next-line no-unused-vars
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();
    // eslint-disable-next-line no-unused-vars
    const [deptAreaMap, setDeptAreaMap] =
        React.useState<IEnvSecurityDeptAreaMap>({
            dept1: {
                areas: {
                    area1: {
                        isChecked: false,
                    },
                    area2: {
                        isChecked: false,
                    },
                    area3: {
                        isChecked: false,
                    },
                    area4: {
                        isChecked: false,
                    },
                },
                isChecked: false,
            },
            dept3: {
                areas: {
                    area1: {
                        isChecked: false,
                    },
                    area2: {
                        isChecked: false,
                    },
                    area5: {
                        isChecked: false,
                    },
                },
                isChecked: false,
            },
        });
    const [currentDept, setCurrentDept] = React.useState<string>('');

    const deptCheckbox = Object.entries(deptAreaMap)
        .sort()
        .map(([dept, { isChecked }], index) => (
            <Flex key={index} align={'center'} gap={'10px'}>
                <Checkbox
                    isChecked={isChecked}
                    onChange={(e) => {
                        setCurrentDept(dept);
                        const { [dept]: deptAreas, ...rest } = deptAreaMap;
                        setDeptAreaMap({
                            [dept]: {
                                ...deptAreas,
                                isChecked: e.target.checked,
                            },
                            ...rest,
                        });
                    }}
                >
                    {dept}
                </Checkbox>
                {dept === currentDept && <ChevronRightIcon />}
            </Flex>
        ));

    const areaCheckbox =
        deptAreaMap[currentDept] &&
        Object.entries(deptAreaMap[currentDept].areas).map(
            ([area, { isChecked }], index) => (
                <Checkbox
                    key={index}
                    isChecked={isChecked}
                    onChange={() => {
                        // setDeptAreaMap({
                        //     [dept]: {
                        //         ...deptAreas,
                        //         isChecked: e.target.checked,
                        //     },
                        //     ...rest,
                        // });
                    }}
                >
                    {area}
                </Checkbox>
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
                            // handleSearch(value);
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
                                flexDirection={'column'}
                                justifyContent={'space-between'}
                            >
                                <Grid
                                    padding={'10px'}
                                    gap={'10px'}
                                    templateColumns={'repeat(2,1fr)'}
                                >
                                    <Flex
                                        direction={'column'}
                                        gap={'12px'}
                                        overflowX={'hidden'}
                                    >
                                        <Text>作業單位</Text>
                                        <Flex
                                            direction={'column'}
                                            gap={'12px'}
                                            overflowY={'auto'}
                                            wordBreak={'break-word'}
                                            maxH={'202px'}
                                        >
                                            {deptCheckbox}
                                        </Flex>
                                    </Flex>
                                    <Flex
                                        direction={'column'}
                                        gap={'12px'}
                                        overflowX={'hidden'}
                                    >
                                        <Text>施工地點</Text>
                                        <Flex
                                            direction={'column'}
                                            gap={'12px'}
                                            overflowY={'auto'}
                                            wordBreak={'break-word'}
                                            maxH={'202px'}
                                        >
                                            {areaCheckbox}
                                        </Flex>
                                    </Flex>
                                </Grid>
                                <Flex justifyContent="flex-end">
                                    <Button
                                        variant={'buttonBlueSolid'}
                                        onClick={() => {
                                            // handleSearch(dateRange);
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
