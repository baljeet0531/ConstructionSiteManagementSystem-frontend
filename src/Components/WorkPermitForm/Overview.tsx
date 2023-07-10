import React from 'react';
import { Navigate } from 'react-router-dom';
import {
    Button,
    Checkbox,
    Flex,
    Grid,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { IsPermit } from '../../Mockdata/Mockdata';
import WPOverViewTable from './WPOverviewTable';
import { AddIcon, ArrowDropDownIcon, LaunchIcon } from '../../Icons/Icons';
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { Cookies } from 'react-cookie';
import { exportFile } from '../../Utils/Resources';
import { PageLoading } from '../Shared/Loading';
import DateRangePicker, { DateRange } from 'rsuite/esm/DateRangePicker';
import dayjs from 'dayjs';
import { ActionsContext } from '../../Context/Context';

export const QUERY_WORK_PERMIT = gql`
    query WorkPermit(
        $siteId: String!
        $number: String
        $area: [String]
        $system: [String]
        $startDate: DateTime
        $endDate: DateTime
    ) {
        workPermit(
            siteId: $siteId
            number: $number
            area: $area
            system: $system
            startDate: $startDate
            endDate: $endDate
        ) {
            siteId
            number
            applicant
            applied
            modified
            supplyDate
            system
            systemBranch
            project
            area
            zone
            workStart
            workEnd
            supervisorCorp
            supervisor
            tel
            projectName
            opFire
            opAloft
            opConfined
            opElectric
            opCage
            opLift
            opAssemble
            opDetach
            opHole
            opChemical
            opElse
            approved
            review
            supplierManager
            supplier
            approvedRef {
                path
                time
                owner
            }
            reviewRef {
                path
                time
                owner
            }
            supplierManagerRef {
                path
                time
                owner
            }
            supplierRef {
                path
                time
                owner
            }
        }
    }
`;

const AREAS_AND_SYSTEMS = gql`
    query AreaAndSystem($siteId: String!) {
        areaAndSystem(siteId: $siteId) {
            areas
        }
    }
`;

const EXPORT_WORK_PERMIT = gql`
    mutation ExportWorkPermit(
        $number: [String]!
        $siteId: String!
        $username: String!
    ) {
        exportWorkPermit(
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
export interface workPermit {
    siteId: string;
    number: string;
    applicant: string;
    applied: boolean;
    modified: boolean;
    supplyDate: string;
    system: string;
    systemBranch: string;
    project: string;
    area: string;
    zone: string;
    workStart: string;
    workEnd: string;
    supervisorCorp: string;
    supervisor: string;
    tel: string;
    projectName: string;
    opFire: boolean;
    opAloft: boolean;
    opConfined: boolean;
    opElectric: boolean;
    opCage: boolean;
    opLift: boolean;
    opAssemble: boolean;
    opDetach: boolean;
    opHole: boolean;
    opChemical: boolean;
    opElse: string;
    approved: number;
    review: number;
    supplierManager: number;
    supplier: number;
}

export interface workPermitRef extends workPermit {
    approvedRef: {
        path: string;
        time: string;
        owner: string;
    };
    reviewRef: {
        path: string;
        time: string;
        owner: string;
    };
    supplierManagerRef: {
        path: string;
        time: string;
        owner: string;
    };
    supplierRef: {
        path: string;
        time: string;
        owner: string;
    };
}

export interface workPermitChecked extends workPermitRef {
    isChecked: boolean;
}
export default function WorkPermitFormOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('eng_work_permit_form'))
        return <Navigate to="/" replace={true} />;
    const { siteId, siteName } = props;
    const toast = useToast();
    const { onToggle } = useDisclosure();
    const navSingleWorkPermit = (number: string, modified: boolean) => {
        const url = `${window.location.origin}/form/work-permit`;
        localStorage.setItem(
            'singleWorkPermitObject',
            JSON.stringify({ number: number, modified: modified })
        );
        window.open(url, '_blank');
    };

    const [overviewTableData, setOverviewTableData] = React.useState<{
        [primaryKey: string]: workPermitChecked;
    }>({});
    const [searchResultNumber, setSearchResultNumber] =
        React.useState<string[]>();

    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);

    const [areas, setAreas] = React.useState<
        { name: string; isChecked: boolean }[]
    >([]);
    const [systems, setSystems] = React.useState<
        { name: string; isChecked: boolean }[]
    >([
        { name: '空調系統', isChecked: false },
        { name: '電力系統', isChecked: false },
        { name: '消防系統', isChecked: false },
        { name: '給排水系統', isChecked: false },
        { name: '儀控系統', isChecked: false },
    ]);

    const { loading, startPolling } = useQuery(QUERY_WORK_PERMIT, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ workPermit }: { workPermit: workPermit[] }) => {
            const workPermitHashed = workPermit.map((info) => ({
                [info['number']]: { ...info, isCheck: false },
            }));
            setOverviewTableData(Object.assign({}, ...workPermitHashed));
            startPolling(3000);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const handleSearchCheckboxClick = (
        setState: React.Dispatch<
            React.SetStateAction<
                {
                    name: string;
                    isChecked: boolean;
                }[]
            >
        >,
        index: number,
        checked: boolean
    ) => {
        setState((prevState) => {
            return [
                ...prevState.slice(0, index),
                { ...prevState[index], isChecked: checked },
                ...prevState.slice(index + 1),
            ];
        });
    };
    const areaCheckbox = areas.map((areaInfo, index) => (
        <Checkbox
            key={index}
            isChecked={areaInfo.isChecked}
            onChange={(e) =>
                handleSearchCheckboxClick(setAreas, index, e.target.checked)
            }
        >
            {areaInfo.name}
        </Checkbox>
    ));
    const systemCheckbox = systems.map((systemInfo, index) => (
        <Checkbox
            key={index}
            isChecked={systemInfo.isChecked}
            onChange={(e) =>
                handleSearchCheckboxClick(setSystems, index, e.target.checked)
            }
        >
            {systemInfo.name}
        </Checkbox>
    ));
    const [getAreas] = useLazyQuery(AREAS_AND_SYSTEMS, {
        onCompleted: ({
            areaAndSystem,
        }: {
            areaAndSystem: { areas: string[]; systems: string[] };
        }) => {
            const { areas } = areaAndSystem;
            setAreas(
                areas.flatMap((area) =>
                    area != '' ? { name: area, isChecked: false } : []
                )
            );
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const [searchWorkPermit, { loading: searchLoading }] = useLazyQuery(
        QUERY_WORK_PERMIT,
        {
            onCompleted: ({ workPermit }: { workPermit: workPermitRef[] }) => {
                setSearchResultNumber(workPermit.map((info) => info['number']));
            },
            onError: (err) => {
                console.log(err);
            },
            fetchPolicy: 'network-only',
        }
    );

    const [exportWorkPermit, { loading: exportLoading }] = useMutation(
        EXPORT_WORK_PERMIT,
        {
            onCompleted: async ({
                exportWorkPermit,
            }: {
                exportWorkPermit: {
                    ok: boolean;
                    message: string;
                    path: string;
                };
            }) => {
                console.log(exportWorkPermit);
                if (exportWorkPermit.ok) {
                    const { path, message } = exportWorkPermit;
                    await exportFile(path, message, toast);
                }
            },
            onError: (err) => {
                console.log(err);
            },
            fetchPolicy: 'network-only',
        }
    );

    const actions = React.useContext(ActionsContext);

    const handleSearch = (value: DateRange | null) => {
        searchWorkPermit({
            variables: {
                siteId: siteId,
                area: areas.flatMap((area) =>
                    area.isChecked ? area.name : []
                ),
                system: systems.flatMap((system) =>
                    system.isChecked ? system.name : []
                ),
                ...(value && {
                    startDate: `${dayjs(value[0]).format(
                        'YYYY-MM-DD'
                    )}T00:00:00`,
                    endDate: `${dayjs(value[1]).format('YYYY-MM-DD')}T23:59:59`,
                }),
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
            <Text
                fontWeight={500}
                fontSize={'14px'}
                lineHeight={'20px'}
                position={'absolute'}
                top={'20px'}
                right={'42px'}
            >
                {siteName}
            </Text>
            <Text variant={'pageTitle'}>工作許可單</Text>
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
                                onClick={() => {
                                    getAreas({
                                        variables: {
                                            siteId: siteId,
                                        },
                                    });
                                    onToggle();
                                }}
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
                                        <Text>施工廠區</Text>
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
                                    <Flex
                                        direction={'column'}
                                        gap={'12px'}
                                        overflowX={'hidden'}
                                    >
                                        <Text>系統</Text>
                                        <Flex
                                            direction={'column'}
                                            gap={'12px'}
                                            overflowY={'auto'}
                                            wordBreak={'break-word'}
                                            maxH={'202px'}
                                        >
                                            {systemCheckbox}
                                        </Flex>
                                    </Flex>
                                </Grid>
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
                <Flex gap={'10px'}>
                    {actions.C && (
                        <Button
                            leftIcon={<AddIcon />}
                            variant={'buttonBlueSolid'}
                            onClick={() => {
                                navSingleWorkPermit('new', false);
                            }}
                        >
                            新增工單
                        </Button>
                    )}
                    <Button
                        leftIcon={<LaunchIcon />}
                        variant={'buttonGrayOutline'}
                        onClick={() => {
                            const selectedNumber = Object.values(
                                overviewTableData
                            ).flatMap((info: workPermitChecked) =>
                                info.isChecked ? info.number : []
                            );
                            exportWorkPermit({
                                variables: {
                                    username: new Cookies().get('username'),
                                    number: selectedNumber,
                                    siteId: siteId,
                                },
                            });
                        }}
                    >
                        輸出
                    </Button>
                </Flex>
            </Flex>
            <WPOverViewTable
                searchResultNumber={searchResultNumber}
                overviewTableData={overviewTableData}
                setOverviewTableData={setOverviewTableData}
                navSingleWorkPermit={navSingleWorkPermit}
            ></WPOverViewTable>
            {(loading || searchLoading || exportLoading) && <PageLoading />}
        </Flex>
    );
}
