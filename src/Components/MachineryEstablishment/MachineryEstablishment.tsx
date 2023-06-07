import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import ReactWindowTable, {
    ISizes,
    defaultElement,
    getElementProps,
    CheckboxElement,
    dataCellStyle,
} from '../Shared/ReactWindowTable';
import { tableViewContainerStyle } from '../../Layouts/MainScreen/MainScreen';
import { AddIcon, DeleteIcon, ReplyIcon, SearchIcon } from '../../Icons/Icons';
import CreateEquipmentModal from '../MachineryManagement/CreateEquipmentModal';
import DeleteEquipmentModal from '../MachineryManagement/DeleteEquipmentModal';
import Remarks from '../MachineryManagement/Remarks';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
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
import {
    QUERY_MACHINERY,
    UPLOAD_MACHINERY,
} from '../MachineryManagement/MachineryManagement';

const sizes: ISizes = {
    headerHeight: 56,
    cellHeight: 30,
};

export default function MachineryEstablishment(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('outsource_machinery_establishment'))
        return <Navigate to="/" replace={true} />;

    const columnMap = [
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
            width: 130,
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
            getElement: ({ style, info, variable }: getElementProps) => {
                const status =
                    info[variable] === true
                        ? '合格'
                        : info[variable] === false
                        ? '不合格'
                        : '未選';
                return (
                    <Box
                        {...dataCellStyle}
                        style={style}
                        {...(status === '未選' && { color: '#66708080' })}
                        {...(status === '不合格' && { bg: '#FDFFE3' })}
                    >
                        {status}
                    </Box>
                );
            },
        },
        {
            title: '入場檢點日期',
            width: 170,
            variable: 'entryInspectionDate',
            getElement: defaultElement,
        },
        {
            title: '備註',
            width: 125,
            variable: 'remarks',
            getElement: (props: getElementProps) => (
                <Remarks {...props} readOnly={true} />
            ),
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
                    primaryKey={props.info['inspectionNo']}
                />
            ),
        },
    ];

    const { siteId, siteName } = props;

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
            <Text variant={'pageTitle'}>機具清單建置</Text>
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
            <ReactWindowTable
                tableData={tableData}
                setTableData={setTableData}
                columnMap={columnMap}
                sizes={sizes}
                columnBordered
                sortBy="inspectionNo"
                sortFormatter={(inspectionNo: string) =>
                    Number(inspectionNo.slice(3))
                }
                filteredPrimaryKey={filteredPrimaryKey}
            />

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
