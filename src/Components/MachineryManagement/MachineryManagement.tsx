import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import {
    Button,
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
import { FileType } from 'rsuite/esm/Uploader';
import ReactWindowTable, {
    ISizes,
    defaultElement,
    getElementProps,
    CheckboxElement,
} from '../Shared/ReactWindowTable';
import { tableViewContainerStyle } from '../../Layouts/MainScreen/MainScreen';
import { AddIcon, DeleteIcon, ReplyIcon, SearchIcon } from '../../Icons/Icons';
import CreateEquipmentModal from './CreateEquipmentModal';
import DeleteEquipmentModal from './DeleteEquipmentModal';
import InspectionSelect from './InspectionSelect';
import InspectionDatePicker from './InspectionDatePicker';
import Remarks from './Remarks';

const mockData: IMachinery[] = [
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        onSiteInspection: true,
        onSiteInspectionDate: '2023-01-01',
        remarks: {
            text: 'DDD',
            photos: [
                {
                    name: 'a.png',
                    fileKey: 1,
                    url: 'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png',
                },
                {
                    name: 'b.png',
                    fileKey: 2,
                    url: 'https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png',
                },
            ],
        },
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: false,
        entryInspectionDate: '2023-01-11',
        onSiteInspection: true,
        onSiteInspectionDate: '2023-01-01',
        remarks: {
            text: 'DDD',
            photos: [
                {
                    name: 'a.png',
                    fileKey: 1,
                    url: 'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png',
                },
            ],
        },
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: null,
        entryInspectionDate: '2023-11-01',
        onSiteInspection: true,
        onSiteInspectionDate: '2023-01-01',
        remarks: {
            text: 'DDD',
            photos: [
                {
                    name: 'b.png',
                    fileKey: 2,
                    url: 'https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png',
                },
            ],
        },
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        onSiteInspection: true,
        onSiteInspectionDate: '2023-01-01',
        remarks: {
            text: 'DDD',
            photos: [
                {
                    name: 'a.png',
                    fileKey: 1,
                    url: 'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png',
                },
                {
                    name: 'b.png',
                    fileKey: 2,
                    url: 'https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png',
                },
            ],
        },
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        onSiteInspection: true,
        onSiteInspectionDate: '2023-01-01',
        remarks: {
            text: '',
            photos: [
                {
                    name: 'a.png',
                    fileKey: 1,
                    url: 'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png',
                },
                {
                    name: 'b.png',
                    fileKey: 2,
                    url: 'https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png',
                },
            ],
        },
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        onSiteInspection: true,
        onSiteInspectionDate: '2023-01-01',
        remarks: {
            text: 'DDD',
            photos: [],
        },
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        onSiteInspection: true,
        onSiteInspectionDate: '2023-01-01',
        remarks: {
            text: 'EEE',
            photos: [
                {
                    name: 'a.png',
                    fileKey: 1,
                    url: 'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png',
                },
                {
                    name: 'b.png',
                    fileKey: 2,
                    url: 'https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png',
                },
            ],
        },
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        onSiteInspection: true,
        onSiteInspectionDate: '2023-01-01',
        remarks: {
            text: 'FFF',
            photos: [
                {
                    name: 'a.png',
                    fileKey: 1,
                    url: 'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png',
                },
                {
                    name: 'b.png',
                    fileKey: 2,
                    url: 'https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png',
                },
            ],
        },
    },
    {
        vendor: 'AAA',
        mainEquipment: 'BBB',
        inspectionNo: 'CCC',
        entryInspection: true,
        entryInspectionDate: '2023-01-01',
        onSiteInspection: true,
        onSiteInspectionDate: '2023-01-01',
        remarks: {
            text: 'GGG',
            photos: [
                {
                    name: 'a.png',
                    fileKey: 1,
                    url: 'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png',
                },
            ],
        },
    },
];

export interface IMachinery {
    vendor: string;
    mainEquipment: string;
    inspectionNo: string;
    entryInspection: boolean | null;
    entryInspectionDate: string;
    onSiteInspection: boolean | null;
    onSiteInspectionDate: string;
    remarks: { text: string; photos: FileType[] };
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

    const columnMap = (tabName: '入場' | '場內') => [
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
            title: tabName === '入場' ? '入場檢點' : '場內檢點',
            width: 120,
            variable:
                tabName === '入場' ? 'entryInspection' : 'onSiteInspection',
            getElement: InspectionSelect,
        },
        {
            title: tabName === '入場' ? '入場檢點日期' : '場內檢點日期',
            width: 125,
            variable:
                tabName === '入場'
                    ? 'entryInspectionDate'
                    : 'onSiteInspectionDate',
            getElement: InspectionDatePicker,
        },
        {
            title: '備註',
            width: 125,
            variable: 'remarks',
            getElement: Remarks,
        },
        {
            title: '全選',
            width: 62,
            variable: 'isChecked',
            getElement: (props: getElementProps) => (
                <CheckboxElement
                    getElementProps={{
                        ...props,
                        style: {
                            ...props.style,
                            paddingTop: '6px',
                        },
                    }}
                    setTableData={setTableData}
                    primaryKey={props.info['index']}
                />
            ),
        },
    ];

    const { siteName } = props;
    const createModalDisclosure = useDisclosure();
    const deleteModalDisclosure = useDisclosure();

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
                    <Flex gap={'10px'} align={'center'} marginRight={'10px'}>
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
                            onClick={createModalDisclosure.onOpen}
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
                            onClick={deleteModalDisclosure.onOpen}
                        >
                            刪除
                        </Button>
                    </Flex>
                </Flex>
                <TabPanels>
                    <TabPanel padding={'16px 0 0 0'}>
                        <ReactWindowTable
                            tableData={tableData}
                            columnMap={columnMap('入場')}
                            sizes={sizes}
                            columnBordered
                        />
                    </TabPanel>
                    <TabPanel padding={'16px 0 0 0'}>
                        <ReactWindowTable
                            tableData={tableData}
                            columnMap={columnMap('場內')}
                            sizes={sizes}
                            columnBordered
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <CreateEquipmentModal
                isOpen={createModalDisclosure.isOpen}
                onClose={createModalDisclosure.onClose}
            />
            <DeleteEquipmentModal
                selectedData={selectedData}
                isOpen={deleteModalDisclosure.isOpen}
                onClose={deleteModalDisclosure.onClose}
            />
        </Flex>
    );
}
