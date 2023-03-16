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
    useDisclosure,
} from '@chakra-ui/react';
import ReactWindowTable, {
    IColumnMap,
    ISizes,
    defaultElement,
    getElementProps,
    dataCellStyle,
} from '../Shared/ReactWindowTable';
import { tableViewContainerStyle } from '../../Interface/MainScreenLayout';
import { AddIcon, DeleteIcon, ReplyIcon, SearchIcon } from '../../Icons/Icons';
import CreateEquipmentModal from './CreateEquipmentModal';
import DeleteEquipmentModal from './DeleteEquipmentModal';
import InspectionSelect from './InspectionSelect';
import InspectionDatePicker from './InspectionDatePicker';

const mockData: IMachinery[] = [
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: false,
        entryInspectionDate: '2023-01-11',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: null,
        entryInspectionDate: '2023-11-01',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        remarks: 'CCC',
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        remarks: 'CCC',
    },
];

interface IMachinery {
    vendor: string;
    mainEquipment: string;
    inspectionNo: string;
    entryInspection: boolean | null;
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
            getElement: (props: getElementProps) => (
                <InspectionSelect {...props} />
            ),
        },
        {
            title: '入場檢點日期',
            width: 125,
            variable: 'entryInspectionDate',
            getElement: (props: getElementProps) => (
                <InspectionDatePicker {...props} />
            ),
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

    const { siteName } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalName, setModalName] = React.useState<'新增機具' | '刪除機具'>(
        '新增機具'
    );
    const [tableData, setTableData] = React.useState<{
        [primaryKey: number]: IMachineryChecked;
    }>({});

    const selectedData = Object.values(tableData).flatMap(
        ({ isChecked, mainEquipment, inspectionNo }) =>
            isChecked ? { equipment: mainEquipment, number: inspectionNo } : []
    );

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
            <Tabs variant={'blueLineTabs'} isLazy>
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
                            onClick={() => {
                                setModalName('新增機具');
                                onOpen();
                            }}
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
                            leftIcon={<ReplyIcon />}
                        >
                            匯入
                        </Button>
                        <Button
                            variant={'buttonGrayOutline'}
                            h={'36px'}
                            leftIcon={<DeleteIcon />}
                            onClick={() => {
                                setModalName('刪除機具');
                                onOpen();
                            }}
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
            <CreateEquipmentModal
                isOpen={modalName == '新增機具' && isOpen}
                onClose={onClose}
            />
            <DeleteEquipmentModal
                selectedData={selectedData}
                isOpen={modalName == '刪除機具' && isOpen}
                onClose={onClose}
            />
        </Flex>
    );
}
