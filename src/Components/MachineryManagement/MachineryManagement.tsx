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
// import { FileType } from 'rsuite/esm/Uploader';
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
import { gql, useQuery } from '@apollo/client';
import {
    IGQLMachineryManagement,
    IMachineryChecked,
} from '../../Interface/Machinery';
import dayjs from 'dayjs';

export const QUERY_MACHINERY = gql`
    query Machinery($siteId: String!, $checkId: String, $keyWord: String) {
        machinery(siteId: $siteId, checkId: $checkId, keyWord: $keyWord) {
            siteId
            checkId
            corp
            machinery
            outerStatus
            innerStatus
            outerDate
            innerDate
            supplementary
            images {
                no
                mId
                mSite
                path
            }
        }
    }
`;

const sizes: ISizes = {
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

    const { siteId, siteName } = props;
    const createModalDisclosure = useDisclosure();
    const deleteModalDisclosure = useDisclosure();

    const [tableData, setTableData] = React.useState<{
        [primaryKey: number]: IMachineryChecked;
    }>({});

    const selectedData = Object.values(tableData).flatMap(
        ({ isChecked, mainEquipment, inspectionNo }) =>
            isChecked ? { equipment: mainEquipment, number: inspectionNo } : []
    );

    useQuery(QUERY_MACHINERY, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            machinery,
        }: {
            machinery: IGQLMachineryManagement[];
        }) => {
            setTableData(
                machinery.reduce((acc, val, index) => {
                    const {
                        siteId,
                        checkId,
                        corp,
                        machinery,
                        outerStatus,
                        innerStatus,
                        outerDate,
                        innerDate,
                        supplementary,
                        images,
                    } = val;
                    acc[index + 1] = {
                        siteId: siteId,
                        vendor: corp,
                        mainEquipment: machinery,
                        inspectionNo: checkId,
                        entryInspection: innerStatus,
                        entryInspectionDate: innerDate
                            ? dayjs(innerDate).format('YYYY-MM-DD')
                            : null,
                        onSiteInspection: outerStatus,
                        onSiteInspectionDate: outerDate
                            ? dayjs(outerDate).format('YYYY-MM-DD')
                            : null,
                        index: index + 1,
                        isChecked: false,
                        remarks: {
                            text: supplementary,
                            photos: images.map(({ no, path }) => ({
                                no: no,
                                path: path,
                            })),
                        },
                    };
                    return acc;
                }, {} as { [primaryKey: number]: IMachineryChecked })
            );
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

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
                            setTableData={setTableData}
                            columnMap={columnMap('入場')}
                            sizes={sizes}
                            columnBordered
                        />
                    </TabPanel>
                    <TabPanel padding={'16px 0 0 0'}>
                        <ReactWindowTable
                            tableData={tableData}
                            setTableData={setTableData}
                            columnMap={columnMap('場內')}
                            sizes={sizes}
                            columnBordered
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <CreateEquipmentModal
                siteId={siteId}
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
