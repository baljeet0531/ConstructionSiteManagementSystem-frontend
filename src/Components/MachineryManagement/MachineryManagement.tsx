import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
// eslint-disable-next-line no-unused-vars
import ReactWindowTable, {
    IColumnMap,
    ISizes,
    defaultElement,
    getElementProps,
    dataCellStyle,
} from '../Shared/ReactWindowTable';
import { tableViewContainerStyle } from '../../Interface/MainScreenLayout';
import { AddIcon, DeleteIcon, LaunchIcon, SearchIcon } from '../../Icons/Icons';

const mockData: IMachinery[] = [
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: 'CCC',
        entryInspectionDate: 'CCC',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: 'CCC',
        entryInspectionDate: 'CCC',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: 'CCC',
        entryInspectionDate: 'CCC',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: 'CCC',
        entryInspectionDate: 'CCC',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: 'CCC',
        entryInspectionDate: 'CCC',
        remarks: 'CCC',
    },
];

interface IMachinery {
    vendor: string;
    mainEquipment: string;
    inspectionNo: string;
    entryInspection: string;
    entryInspectionDate: string;
    remarks: string;
}

interface IMachineryChecked extends IMachinery {
    index: number;
    isChecked: boolean;
}

const sizes: ISizes = {
    tableFigmaWidth: 877,
    headerHeight: 56,
    cellHeight: 30,
};

export default function MachineryManagement(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('ehs_machinery_management'))
        return <Navigate to="/" replace={true} />;

    const { siteName } = props;
    const columnMap: IColumnMap[] = [
        {
            title: '項次',
            width: 50,
            variable: 'index',
            getElement: defaultElement,
        },
        {
            title: '廠商',
            width: 100,
            variable: 'vendor',
            getElement: defaultElement,
        },
        {
            title: '主要機具',
            width: 175,
            variable: 'mainEquipment',
            getElement: defaultElement,
        },
        {
            title: '檢點編號',
            width: 120,
            variable: 'inspectionNo',
            getElement: defaultElement,
        },
        {
            title: '入場檢點',
            width: 120,
            variable: 'entryInspection',
            getElement: defaultElement,
        },
        {
            title: '入場檢點日期',
            width: 125,
            variable: 'entryInspectionDate',
            getElement: defaultElement,
        },
        {
            title: '備註',
            width: 125,
            variable: 'remarks',
            getElement: defaultElement,
        },
        {
            title: '全選',
            width: 62,
            variable: 'isChecked',
            getElement: ({ style, info, variable }: getElementProps) => {
                return (
                    <Box
                        {...dataCellStyle}
                        style={{
                            ...style,
                            paddingTop: '5px',
                            borderBottom: '1px solid #919AA9',
                        }}
                    >
                        <Checkbox
                            isChecked={info[variable]}
                            onChange={(e) => {
                                setTableData((prevState) => ({
                                    ...prevState,
                                    [info.index]: {
                                        ...info,
                                        isChecked: e.target.checked,
                                    },
                                }));
                            }}
                        ></Checkbox>
                    </Box>
                );
            },
        },
    ];

    const [tableData, setTableData] = React.useState<{
        [primaryKey: number]: IMachineryChecked;
    }>({});
    React.useEffect(() => {
        const mockDataChecked: { [primaryKey: number]: IMachineryChecked }[] =
            mockData.map((info, index) => {
                return {
                    [index + 1]: {
                        ...info,
                        index: index + 1,
                        isChecked: false,
                    },
                };
            });
        setTableData(Object.assign({}, ...mockDataChecked));
    }, []);

    return (
        <Flex {...tableViewContainerStyle}>
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Text variant={'pageTitle'}>機具檢點管理</Text>
            <Tabs variant={'blueLineTabs'}>
                <Flex align={'center'} justify={'space-between'}>
                    <Flex gap={'10px'} align={'center'}>
                        <InputGroup w={'fit-content'}>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon />}
                            />
                            <Input
                                variant={'search'}
                                placeholder={'搜尋廠商或主要機具'}
                            />
                        </InputGroup>
                        <Button
                            variant={'buttonBlueSolid'}
                            h={'36px'}
                            leftIcon={<AddIcon />}
                        >
                            新增機具
                        </Button>
                        <TabList>
                            <Tab>入場檢點</Tab>
                            <Tab>場內檢點</Tab>
                        </TabList>
                    </Flex>
                    <Flex gap={'10px'} align={'center'}>
                        <Button
                            variant={'buttonGrayOutline'}
                            h={'36px'}
                            leftIcon={<LaunchIcon />}
                        >
                            匯入
                        </Button>
                        <Button
                            variant={'buttonGrayOutline'}
                            h={'36px'}
                            leftIcon={<DeleteIcon />}
                        >
                            刪除
                        </Button>
                    </Flex>
                </Flex>
                <TabPanels>
                    <TabPanel padding={'16px 0 0 0'}>
                        <ReactWindowTable
                            tableData={tableData}
                            columnMap={columnMap}
                            sizes={sizes}
                            columnBordered
                        />
                    </TabPanel>
                    <TabPanel padding={'16px 0 0 0'}>
                        <ReactWindowTable
                            tableData={tableData}
                            columnMap={columnMap}
                            sizes={sizes}
                            columnBordered
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
}
