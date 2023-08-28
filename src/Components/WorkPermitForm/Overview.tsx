import React from 'react';
import { Navigate } from 'react-router-dom';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Grid,
    Link,
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
import { AddIcon, ArrowDropDownIcon, LaunchIcon } from '../../Icons/Icons';
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { Cookies } from 'react-cookie';
import { exportFile } from '../../Utils/Resources';
import { PageLoading } from '../Shared/Loading';
import DateRangePicker, { DateRange } from 'rsuite/esm/DateRangePicker';
import dayjs from 'dayjs';
import { ActionsContext } from '../../Context/Context';
import ReactWindowTable, {
    CheckboxElement,
    IColumnMap,
    ISizes,
    SignatureStatusElement,
    dataCellStyle,
    defaultElement,
} from '../Shared/ReactWindowTable';
import { TOverviewTable } from '../../Types/TableOverview';
import { IGQLSignature } from '../../Interface/Signature';
import { defaultErrorToast } from '../../Utils/DefaultToast';

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
    approvedRef: IGQLSignature;
    reviewRef: IGQLSignature;
    supplierManagerRef: IGQLSignature;
    supplierRef: IGQLSignature;
}

export interface workPermitChecked extends workPermitRef {
    isChecked: boolean;
}

type gqlData = { workPermit: workPermitRef[] };

const sizes: ISizes = {
    headerHeight: 44,
    cellHeight: 44,
};

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

    const [tableData, setTableData] = React.useState<
        TOverviewTable<workPermitChecked>
    >({});
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
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

    const columnMap: IColumnMap<workPermitChecked>[] = [
        {
            title: '日期',
            width: 99,
            variable: 'supplyDate',
            getElement: defaultElement,
        },
        {
            title: '單號',
            width: 83,
            variable: 'number',
            getElement: ({ style, info: { number, modified } }) => (
                <Box style={style} {...dataCellStyle}>
                    <Link
                        onClick={() => {
                            navSingleWorkPermit(number, modified);
                        }}
                    >
                        {number}
                    </Link>
                </Box>
            ),
        },
        {
            title: '系統',
            width: 100,
            variable: 'system',
            getElement: defaultElement,
        },
        {
            title: '系統分類',
            width: 100,
            variable: 'systemBranch',
            getElement: defaultElement,
        },
        {
            title: '施工項目',
            width: 100,
            variable: 'project',
            getElement: defaultElement,
        },
        {
            title: '施工廠區',
            width: 95,
            variable: 'area',
            getElement: defaultElement,
        },
        {
            title: '簽核狀態',
            width: 180,
            variable: 'signStatus',
            getElement: (props) => {
                const {
                    approvedRef,
                    reviewRef,
                    supplierManagerRef,
                    supplierRef,
                } = props.info;
                const signatureFieldList = [
                    {
                        signature: approvedRef,
                        fieldLabel: '核准',
                    },
                    {
                        signature: reviewRef,
                        fieldLabel: '審核',
                    },
                    {
                        signature: supplierManagerRef,
                        fieldLabel: '申請單位主管',
                    },
                    {
                        signature: supplierRef,
                        fieldLabel: '申請人',
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
            title: '申請/異動',
            width: 70,
            variable: 'appliedOrModified',
            getElement: ({ style, info }) => {
                const now = dayjs();
                const workEnd = dayjs(info['workEnd'].split('T')[0]);
                const diff = now.diff(workEnd, 'day');
                return (
                    <Box style={style} {...dataCellStyle}>
                        {tableData[`${info['number']}異`] ? (
                            ''
                        ) : info['modified'] ? (
                            '異動單'
                        ) : diff > 0 ? (
                            ''
                        ) : info['applied'] ? (
                            <Button
                                variant={'buttonBlueSolid'}
                                height={'20px'}
                                width={'36px'}
                                fontSize={'10px'}
                                bg={'#DB504A'}
                                _hover={{ bg: '#DB504A77' }}
                                onClick={() => {
                                    navSingleWorkPermit(info['number'], true);
                                }}
                            >
                                異動
                            </Button>
                        ) : (
                            <Button
                                variant={'buttonBlueSolid'}
                                height={'20px'}
                                width={'36px'}
                                fontSize={'10px'}
                                onClick={() => {
                                    navSingleWorkPermit(info['number'], false);
                                }}
                            >
                                申請
                            </Button>
                        )}
                    </Box>
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

    const { loading, startPolling } = useQuery<gqlData>(QUERY_WORK_PERMIT, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ workPermit }) => {
            setTableData(
                workPermit.reduce((acc, info) => {
                    acc[info.number] = {
                        ...info,
                        isChecked: false,
                    };
                    return acc;
                }, {} as TOverviewTable<workPermitChecked>)
            );
            startPolling(3000);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
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
        fetchPolicy: 'network-only',
    });

    const [searchWorkPermit, { loading: searchLoading }] =
        useLazyQuery<gqlData>(QUERY_WORK_PERMIT, {
            onCompleted: ({ workPermit }) => {
                setFilteredPrimaryKey(workPermit.map((info) => info['number']));
            },
            onError: (err) => {
                console.log(err);
            },
            fetchPolicy: 'network-only',
        });

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
                if (exportWorkPermit.ok) {
                    const { path, message } = exportWorkPermit;
                    await exportFile(path, message, toast);
                }
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
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
                                tableData
                            ).flatMap((info) =>
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
            <ReactWindowTable
                tableData={tableData}
                setTableData={setTableData}
                columnMap={columnMap}
                sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
            />
            {(loading || searchLoading || exportLoading) && <PageLoading />}
        </Flex>
    );
}
