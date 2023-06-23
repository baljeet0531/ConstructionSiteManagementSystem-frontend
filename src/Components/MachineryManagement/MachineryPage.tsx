import React from 'react';
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
    useToast,
} from '@chakra-ui/react';
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
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
    IGQLMachineryManagement,
    IMachineryChecked,
} from '../../Interface/Machinery';
import { handleDebounceSearch } from '../../Utils/Web';
import UploadModal from '../Shared/UploadModal';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';

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

export const UPLOAD_MACHINERY = gql`
    mutation IntroduceMachineryExcel($file: Upload!, $siteId: String!) {
        introduceMachineryExcel(file: $file, siteId: $siteId) {
            ok
            message
            failList
        }
    }
`;

const sizes: ISizes = {
    headerHeight: 56,
    cellHeight: 30,
};

export default function MachineryPage(props: {
    siteId: string;
    siteName: string;
    title: string;
    tableEditable?: boolean;
    entryTableOnly?: boolean;
}) {
    const {
        siteId,
        siteName,
        title,
        tableEditable = true,
        entryTableOnly = false,
    } = props;

    const columnMap = (tabName: '入場' | '場內') => [
        {
            title: '項次',
            width: 50,
            variable: 'index',
            getElement: defaultElement,
        },
        {
            title: '廠商',
            width: !entryTableOnly ? 100 : 131,
            variable: 'vendor',
            getElement: defaultElement,
        },
        {
            title: '主要機具',
            width: !entryTableOnly ? 130 : 161,
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
            getElement: (props: getElementProps) => (
                <InspectionSelect {...props} editable={tableEditable} />
            ),
        },
        {
            title: tabName === '入場' ? '入場檢點日期' : '場內檢點日期',
            width: 170,
            variable:
                tabName === '入場'
                    ? 'entryInspectionDate'
                    : 'onSiteInspectionDate',
            getElement: (props: getElementProps) => (
                <InspectionDatePicker {...props} editable={tableEditable} />
            ),
        },
        {
            title: '備註',
            width: 125,
            variable: 'remarks',
            getElement: (props: getElementProps) => (
                <Remarks {...props} editable={tableEditable} />
            ),
        },
        ...(!entryTableOnly
            ? [
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
                              primaryKey={props.info['inspectionNo']}
                          />
                      ),
                  },
              ]
            : []),
    ];

    const createModalDisclosure = useDisclosure();
    const deleteModalDisclosure = useDisclosure();

    const [tableData, setTableData] = React.useState<{
        [primaryKey: string]: IMachineryChecked;
    }>({});

    const [selectedData, setSelectedData] = React.useState<
        {
            mainEquipment: string;
            inspectionNo: string;
        }[]
    >([]);

    const handleDeleteModalOpen = () => {
        setSelectedData(
            Object.values(tableData).flatMap(
                ({ isChecked, mainEquipment, inspectionNo }) =>
                    isChecked
                        ? {
                              mainEquipment: mainEquipment,
                              inspectionNo: inspectionNo,
                          }
                        : []
            )
        );
        deleteModalDisclosure.onOpen();
    };

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
                    acc[checkId] = {
                        siteId: siteId,
                        vendor: corp,
                        mainEquipment: machinery,
                        inspectionNo: checkId,
                        entryInspection: outerStatus,
                        entryInspectionDate: outerDate,
                        onSiteInspection: innerStatus,
                        onSiteInspectionDate: innerDate,
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
                }, {} as { [primaryKey: string]: IMachineryChecked })
            );
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [searchMachinery] = useLazyQuery(QUERY_MACHINERY, {
        onCompleted: ({
            machinery,
        }: {
            machinery: IGQLMachineryManagement[];
        }) => {
            setFilteredPrimaryKey(machinery.map(({ checkId }) => checkId));
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const timeout = React.useRef();
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();

    const handleInput = () => {
        handleDebounceSearch(
            timeout,
            () => {
                searchMachinery({
                    variables: {
                        siteId: siteId,
                        keyWord: searchInputRef.current?.value,
                    },
                });
            },
            300,
            {
                resetCondition: !searchInputRef.current?.value.trim(),
                resetFunction: () => setFilteredPrimaryKey(undefined),
            }
        );
    };
    const toast = useToast();
    const uploadModalDisclosure = useDisclosure();
    const [file, setFile] = React.useState<File>();
    const [uploadMachinery] = useMutation(UPLOAD_MACHINERY, {
        onCompleted: ({
            introduceMachineryExcel,
        }: {
            introduceMachineryExcel: {
                ok: Boolean;
                message: string;
                failList: string[];
            };
        }) => {
            const { ok, message, failList } = introduceMachineryExcel;
            ok
                ? defaultSuccessToast(toast, message)
                : toast({
                      status: 'warning',
                      title: `匯入成功，另有${message}`,
                      description: failList.map((fail) => (
                          <Text color={'#FFFFFF'}>{fail}</Text>
                      )),
                      duration: null,
                      isClosable: true,
                  });
            setFile(undefined);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
        refetchQueries: [
            QUERY_MACHINERY,
            { query: QUERY_MACHINERY, variables: { siteId: siteId } },
        ],
    });

    return (
        <Flex {...tableViewContainerStyle}>
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Text variant={'pageTitle'}>{title}</Text>
            {!entryTableOnly && (
                <Tabs variant={'blueLineTabs'} isLazy>
                    <Flex align={'center'} justify={'space-between'}>
                        <Flex
                            gap={'10px'}
                            align={'center'}
                            marginRight={'10px'}
                        >
                            <InputGroup w={'fit-content'}>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<SearchIcon />}
                                />
                                <Input
                                    ref={searchInputRef}
                                    variant={'search'}
                                    placeholder={'搜尋廠商或主要機具'}
                                    onChange={handleInput}
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
                                onClick={uploadModalDisclosure.onOpen}
                            >
                                匯入
                            </Button>
                            <Button
                                variant={'buttonGrayOutline'}
                                h={'36px'}
                                leftIcon={<DeleteIcon />}
                                onClick={handleDeleteModalOpen}
                            >
                                刪除
                            </Button>
                        </Flex>
                    </Flex>
                    <TabPanels>
                        {['入場', '場內'].map((tab, index) => (
                            <TabPanel key={index} padding={'16px 0 0 0'}>
                                <ReactWindowTable
                                    tableData={tableData}
                                    setTableData={setTableData}
                                    columnMap={columnMap(
                                        tab as '入場' | '場內'
                                    )}
                                    sizes={sizes}
                                    columnBordered
                                    sortBy="inspectionNo"
                                    sortFormatter={(inspectionNo: string) =>
                                        Number(inspectionNo.slice(3))
                                    }
                                    sortReversed
                                    filteredPrimaryKey={filteredPrimaryKey}
                                />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            )}
            {entryTableOnly && (
                <Flex align={'center'} justify={'space-between'}>
                    <Flex gap={'10px'} align={'center'} marginRight={'10px'}>
                        <InputGroup w={'fit-content'}>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon />}
                            />
                            <Input
                                ref={searchInputRef}
                                variant={'search'}
                                placeholder={'搜尋廠商或主要機具'}
                                onChange={handleInput}
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
                    </Flex>
                    <Flex gap={'10px'} align={'center'}>
                        <Button
                            variant={'buttonGrayOutline'}
                            h={'36px'}
                            leftIcon={<ReplyIcon />}
                            onClick={uploadModalDisclosure.onOpen}
                        >
                            匯入
                        </Button>
                    </Flex>
                </Flex>
            )}
            {entryTableOnly && (
                <ReactWindowTable
                    tableData={tableData}
                    setTableData={setTableData}
                    columnMap={columnMap('入場')}
                    sizes={sizes}
                    columnBordered
                    sortBy="inspectionNo"
                    sortFormatter={(inspectionNo: string) =>
                        Number(inspectionNo.slice(3))
                    }
                    sortReversed
                    filteredPrimaryKey={filteredPrimaryKey}
                />
            )}
            <UploadModal
                isOpen={uploadModalDisclosure.isOpen}
                onClose={uploadModalDisclosure.onClose}
                file={file}
                setFile={setFile}
                handleUpload={() => {
                    uploadMachinery({
                        variables: {
                            file: file,
                            siteId: siteId,
                        },
                    });
                    uploadModalDisclosure.onClose();
                }}
                accept={'.xlsx'}
            />
            <CreateEquipmentModal
                siteId={siteId}
                isOpen={createModalDisclosure.isOpen}
                onClose={createModalDisclosure.onClose}
            />
            <DeleteEquipmentModal
                siteId={siteId}
                selectedData={selectedData}
                isOpen={deleteModalDisclosure.isOpen}
                onClose={deleteModalDisclosure.onClose}
            />
        </Flex>
    );
}
