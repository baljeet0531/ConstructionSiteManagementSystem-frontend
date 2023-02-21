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
} from '@chakra-ui/react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker/types';
import { ArrowDropDownIcon, LaunchIcon } from '../../Icons/Icons';
import PageLoading from '../Shared/PageLoading';
import { gql, useQuery } from '@apollo/client';
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

const QUERY_TOOLBOX = gql`
    ${SIGNATURE_FIELDS}
    query ToolboxMeeting(
        $siteId: String!
        $number: String
        $startDate: DateTime
        $endDate: DateTime
    ) {
        toolboxMeeting(
            siteId: $siteId
            number: $number
            startDate: $startDate
            endDate: $endDate
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

    const { siteId, siteName } = props;
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);

    const [tableData, setTableData] = React.useState<{
        [number: string]: IToolboxOverviewChecked;
    }>({});

    console.log(tableData);

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
                        onChange={(value) => setDateRange(value)}
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
                                            {/* {areaCheckbox} */}
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
                                            {/* {systemCheckbox} */}
                                        </Flex>
                                    </Flex>
                                </Grid>
                                <Flex justifyContent="flex-end">
                                    <Button
                                        variant={'buttonBlueSolid'}
                                        // onClick={() => {
                                        //     searchWorkpermit({
                                        //         variables: {
                                        //             siteId: siteId,
                                        //             area: areas.flatMap(
                                        //                 (area) =>
                                        //                     area.isChecked
                                        //                         ? area.name
                                        //                         : []
                                        //             ),
                                        //             system: systems.flatMap(
                                        //                 (system) =>
                                        //                     system.isChecked
                                        //                         ? system.name
                                        //                         : []
                                        //             ),
                                        //             ...(startDate && {
                                        //                 startDate: `${startDate}T08:30:00`,
                                        //             }),
                                        //             ...(endDate && {
                                        //                 endDate: `${endDate}T08:30:00`,
                                        //             }),
                                        //         },
                                        //     });
                                        // }}
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
            />
            {loading && <PageLoading />}
        </Flex>
    );
}
