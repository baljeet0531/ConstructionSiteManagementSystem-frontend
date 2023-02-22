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
    useToast,
    Checkbox,
} from '@chakra-ui/react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker/types';
import { ArrowDropDownIcon, LaunchIcon } from '../../Icons/Icons';
import PageLoading from '../Shared/PageLoading';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { SIGNATURE_FIELDS } from '../../Utils/GQLFragments';
import { IGQLSignature } from '../../Interface/Signature';
import ReactWindowTable, {
    IColumnMap,
    ISizes,
    getElementProps,
    defaultElement,
    CheckboxElement,
    SignatureStatusElement,
} from '../Shared/ReactWindowTable';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import dayjs from 'dayjs';

const QUERY_TOOLBOX = gql`
    ${SIGNATURE_FIELDS}
    query ToolboxMeeting(
        $siteId: String!
        $number: String
        $startDate: DateTime
        $endDate: DateTime
        $area: [String]
        $system: [String]
    ) {
        toolboxMeeting(
            siteId: $siteId
            number: $number
            startDate: $startDate
            endDate: $endDate
            area: $area
            system: $system
        ) {
            number
            system
            systemBranch
            project
            area
            laborAmount
            meetingDatetime
            contractingCorpStaffSignatureFirst {
                ...gqlSignatureFields
            }
            contractingCorpStaffSignatureSecond {
                ...gqlSignatureFields
            }
            contractingCorpStaffSignatureThird {
                ...gqlSignatureFields
            }
            systemEngineerSignature {
                ...gqlSignatureFields
            }
        }
    }
`;

const TOOLBOX_AREAS = gql`
    query ToolboxArea($siteId: String!) {
        toolboxArea(siteId: $siteId)
    }
`;

interface IToolboxOverview {
    number: string;
    system: string;
    systemBranch: string;
    project: string;
    area: string;
    laborAmount: number;
    meetingDatetime: string;
    contractingCorpStaffSignatureFirst: IGQLSignature;
    contractingCorpStaffSignatureSecond: IGQLSignature;
    contractingCorpStaffSignatureThird: IGQLSignature;
    systemEngineerSignature: IGQLSignature;
}

interface IToolboxOverviewChecked extends IToolboxOverview {
    index: number;
    isChecked: boolean;
}

const sizes: ISizes = {
    tableFigmaWidth: 877,
    headerHeight: 44,
    cellHeight: 44,
};

export default function ToolboxFormOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('eng_toolbox_form'))
        return <Navigate to="/" replace={true} />;
    const columnMap: IColumnMap[] = [
        {
            title: '日期',
            width: 99,
            variable: 'meetingDatetime',
            getElement: defaultElement,
        },
        {
            title: '單號',
            width: 83,
            variable: 'number',
            getElement: defaultElement,
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
            variable: 'signatureStatus',
            getElement: (props: getElementProps) => {
                const {
                    contractingCorpStaffSignatureFirst,
                    contractingCorpStaffSignatureSecond,
                    contractingCorpStaffSignatureThird,
                    systemEngineerSignature,
                } = props.info as IToolboxOverviewChecked;
                const signatureFieldList = [
                    {
                        signature: contractingCorpStaffSignatureFirst,
                        fieldLabel: '承商人員',
                    },
                    {
                        signature: contractingCorpStaffSignatureSecond,
                        fieldLabel: '承商人員',
                    },
                    {
                        signature: contractingCorpStaffSignatureThird,
                        fieldLabel: '承商人員',
                    },
                    {
                        signature: systemEngineerSignature,
                        fieldLabel: '系統工程師',
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
            title: '出工人數',
            width: 70,
            variable: 'laborAmount',
            getElement: defaultElement,
        },
        {
            title: '全選',
            width: 50,
            variable: 'isChecked',
            getElement: (props: getElementProps) => (
                <CheckboxElement
                    getElementProps={props}
                    setTableData={setTableData}
                    primaryKey={'number'}
                ></CheckboxElement>
            ),
        },
    ];
    const toast = useToast();
    const { siteId, siteName } = props;
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
    const [tableData, setTableData] = React.useState<{
        [number: string]: IToolboxOverviewChecked;
    }>({});
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();

    const { loading } = useQuery(QUERY_TOOLBOX, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            toolboxMeeting,
        }: {
            toolboxMeeting: IToolboxOverview[];
        }) => {
            const data = toolboxMeeting.map((info, index) => ({
                [info.number]: {
                    ...info,
                    meetingDatetime: info.meetingDatetime.split('T')[0],
                    index: index + 1,
                    isChecked: false,
                },
            }));
            const dataObject = Object.assign({}, ...data);
            setTableData(dataObject);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [searchToolbox] = useLazyQuery(QUERY_TOOLBOX, {
        onCompleted: ({
            toolboxMeeting,
        }: {
            toolboxMeeting: IToolboxOverview[];
        }) => {
            const primaryKeys = toolboxMeeting.map((info) => info.number);
            setFilteredPrimaryKey(primaryKeys);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
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
            let newState = [...prevState];
            newState[index] = { ...prevState[index], isChecked: checked };
            return newState;
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
    useQuery(TOOLBOX_AREAS, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ toolboxArea }: { toolboxArea: string[] }) => {
            setAreas(
                toolboxArea.flatMap((area) =>
                    area != '' ? { name: area, isChecked: false } : []
                )
            );
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const handleSearch = (value: DateRange | null) => {
        searchToolbox({
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
                    )}T08:30:00`,
                    endDate: `${dayjs(value[1]).format('YYYY-MM-DD')}T17:30:00`,
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
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Text variant={'pageTitle'}>工具箱會議</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <DateRangePicker
                        value={dateRange}
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
                <Button leftIcon={<LaunchIcon />} variant={'buttonGrayOutline'}>
                    輸出
                </Button>
            </Flex>
            <ReactWindowTable
                tableData={tableData}
                columnMap={columnMap}
                sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
                sortReversed={true}
            />
            {loading && <PageLoading />}
        </Flex>
    );
}
