import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import {
    Box,
    Button,
    Center,
    Checkbox,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import {
    AddIcon,
    DeleteIcon,
    LaunchIcon,
    ReplyIcon,
    SearchIcon,
} from '../../Icons/Icons';
import AddPeopleModal from './AddPeopleModal';
import ReactWindowTable, {
    dataCellStyle,
    defalutElement,
    getElementProps,
    IColumnMap,
    ISizes,
} from './ReactWindowTable';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import DeleteLaborModal from './DeleteLaborModal';
import { EXPORT_HUMAN_RESOURCE } from '../PeopleOverview/PeopleOverview';
import { Cookies } from 'react-cookie';
import BACKEND from '../../Constants/EnvConstants';

export const SITE_LABOR = gql`
    query SiteLabor($siteId: String!, $idno: String, $corp: String) {
        siteLabor(siteId: $siteId, idno: $idno, corp: $corp) {
            corp
            name
            idno
            birth
            gender
            blood
            tel
        }
    }
`;

export interface organizationData {
    contractingCompanyName: string;
    name: string;
    idno: string;
    birthday: string;
    gender: string;
    bloodType: string;
    tel: string;
}
export interface organizationDataChecked extends organizationData {
    index: number;
    isChecked: boolean;
}

const sizes: ISizes = {
    // tableViewHeight: 570,
    tableFigmaWidth: 877,
    // tableViewWidth: 860,
    headerHeight: 56,
    cellHeight: 30,
};

interface ISiteLabor {
    corp: string;
    name: string;
    idno: string;
    birth: string;
    gender: string;
    blood: string;
    tel: string;
}

interface ISiteLaborChecked extends ISiteLabor {
    isChecked: boolean;
}

type tableData = {
    [idno: string]: ISiteLaborChecked;
};

type modalName = 'createLabor' | 'deleteLabor';

export default function Organization(props: { siteId: string }) {
    if (!IsPermit('organization')) return <Navigate to="/" replace={true} />;
    const columnMap: IColumnMap[] = [
        {
            title: '編號',
            width: 70,
            variable: 'index',
            getElement: (props) =>
                defalutElement({
                    ...props,
                    style: {
                        ...props.style,
                        paddingTop: '5px',
                        borderRight: '1px solid #919AA9',
                        borderBottom: '1px solid #919AA9',
                    },
                }),
        },
        {
            title: '承攬公司',
            width: 125,
            variable: 'corp',
            getElement: (props) =>
                defalutElement({
                    ...props,
                    style: {
                        ...props.style,
                        paddingTop: '5px',
                        borderRight: '1px solid #919AA9',
                        borderBottom: '1px solid #919AA9',
                    },
                }),
        },
        {
            title: '姓名',
            width: 125,
            variable: 'name',
            getElement: (props) =>
                defalutElement({
                    ...props,
                    style: {
                        ...props.style,
                        paddingTop: '5px',
                        borderRight: '1px solid #919AA9',
                        borderBottom: '1px solid #919AA9',
                    },
                }),
        },
        {
            title: '身分證字號',
            width: 125,
            variable: 'idno',
            getElement: (props) =>
                defalutElement({
                    ...props,
                    style: {
                        ...props.style,
                        paddingTop: '5px',
                        borderRight: '1px solid #919AA9',
                        borderBottom: '1px solid #919AA9',
                    },
                }),
        },
        {
            title: '出生日期',
            width: 125,
            variable: 'birth',
            getElement: (props) =>
                defalutElement({
                    ...props,
                    style: {
                        ...props.style,
                        paddingTop: '5px',
                        borderRight: '1px solid #919AA9',
                        borderBottom: '1px solid #919AA9',
                    },
                }),
        },
        {
            title: '性別',
            width: 50,
            variable: 'gender',
            getElement: (props) =>
                defalutElement({
                    ...props,
                    style: {
                        ...props.style,
                        paddingTop: '5px',
                        borderRight: '1px solid #919AA9',
                        borderBottom: '1px solid #919AA9',
                    },
                }),
        },
        {
            title: '血型',
            width: 50,
            variable: 'blood',
            getElement: (props) =>
                defalutElement({
                    ...props,
                    style: {
                        ...props.style,
                        paddingTop: '5px',
                        borderRight: '1px solid #919AA9',
                        borderBottom: '1px solid #919AA9',
                    },
                }),
        },
        {
            title: '聯絡電話',
            width: 125,
            variable: 'tel',
            getElement: (props) =>
                defalutElement({
                    ...props,
                    style: {
                        ...props.style,
                        paddingTop: '5px',
                        borderRight: '1px solid #919AA9',
                        borderBottom: '1px solid #919AA9',
                    },
                }),
        },
        {
            title: '全選',
            width: 82,
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
                                    [info.idno]: {
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
    const { siteId } = props;
    const toast = useToast();
    const disclosure = useDisclosure();
    const { isOpen, onOpen, onClose } = disclosure;
    const [tableData, setTableData] = React.useState<tableData>({});
    const [modalName, setModalName] = React.useState<modalName>('createLabor');

    const { loading } = useQuery(SITE_LABOR, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ siteLabor }: { siteLabor: ISiteLabor[] }) => {
            const siteLaborChecked = siteLabor.map((element, index) => ({
                [element.idno]: {
                    ...element,
                    index: index + 1,
                    isChecked: false,
                },
            }));
            setTableData(Object.assign({}, ...siteLaborChecked));
        },
        onError: (err) => {
            console.log(err);
            toast({
                title: '錯誤',
                description: `${err}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        },
        fetchPolicy: 'network-only',
    });

    const [searchSiteLabor] = useLazyQuery(SITE_LABOR);
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const timeout = React.useRef<any>();
    const handleDebounceSearch = () => {
        clearTimeout(timeout.current);

        if (!searchInputRef.current?.value.trim()) {
            setFilteredPrimaryKey(undefined);
            return;
        }
        timeout.current = setTimeout(() => {
            searchSiteLabor({
                variables: {
                    siteId: siteId,
                    idno: searchInputRef.current?.value,
                    // corp: corp,
                },
                onCompleted: ({ siteLabor }) => {
                    const searchResult = siteLabor.map(
                        (info: ISiteLabor) => info.idno
                    );
                    setFilteredPrimaryKey(
                        searchResult.length != 0 ? searchResult : undefined
                    );
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        }, 300);
    };
    const [exportHumanResource, { loading: exportLaoding }] = useMutation(
        EXPORT_HUMAN_RESOURCE,
        {
            onCompleted: ({
                exportHumanResource,
            }: {
                exportHumanResource: {
                    ok: Boolean;
                    message: String;
                    path: String;
                };
            }) => {
                if (exportHumanResource.ok) {
                    const cookieValue = new Cookies().get('jwt');
                    const { path } = exportHumanResource;
                    fetch(BACKEND + `/${path}`, {
                        cache: 'no-cache',
                        headers: {
                            Authorization: `Bearer ${cookieValue}`,
                        },
                        method: 'GET',
                    })
                        .then((data) => {
                            toast({
                                title: exportHumanResource.message,
                                description: '成功匯出',
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                            });
                            return data.blob();
                        })
                        .then((blob) => {
                            const url = window.URL.createObjectURL(blob);
                            const filename = path.slice(
                                path.lastIndexOf('/') + 1
                            );
                            let fileLink = document.createElement('a');
                            fileLink.href = url;
                            fileLink.download = filename;
                            document.body.appendChild(fileLink);
                            fileLink.click();
                            fileLink.remove();
                        })
                        .catch((err) => console.log(err));
                }
            },
            onError: (err) => {
                console.log(err);
                toast({
                    title: '錯誤',
                    description: `${err}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            },
            fetchPolicy: 'network-only',
        }
    );

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
                穩懋南科路竹廠機電一期新建工程
            </Text>
            <Text variant={'pageTitle'}>專案人員組織</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <InputGroup w={'230px'}>
                        <InputLeftElement>
                            <IconButton
                                aria-label="Search"
                                icon={<SearchIcon />}
                                background="transparent"
                                _active={{ background: 'transparent' }}
                                _focus={{ background: 'transparent' }}
                                _hover={{ background: 'transparent' }}
                            ></IconButton>
                        </InputLeftElement>
                        <Input
                            ref={searchInputRef}
                            w={'fit-content'}
                            type="text"
                            border={'2px solid'}
                            borderColor={'#919AA9'}
                            bg={'#FFFFFF'}
                            height={'36px'}
                            placeholder="搜尋身分證字號或承攬公司"
                            _placeholder={{
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '0.875rem',
                                lineHeight: '2.25rem',
                                color: 'rgba(102, 112, 128, 0.5)',
                            }}
                            onChange={handleDebounceSearch}
                        />
                    </InputGroup>
                    <Button
                        leftIcon={<AddIcon />}
                        variant={'buttonBlueSolid'}
                        onClick={() => {
                            setModalName('createLabor');
                            onOpen();
                        }}
                    >
                        新增人員
                    </Button>
                </Flex>
                <Flex gap={'10px'}>
                    <Button
                        leftIcon={<ReplyIcon />}
                        variant={'buttonGrayOutline'}
                    >
                        批次輸入
                    </Button>
                    <Button
                        leftIcon={<LaunchIcon />}
                        variant={'buttonGrayOutline'}
                        onClick={() => {
                            const idnos = Object.values(tableData).flatMap(
                                (element) =>
                                    element.isChecked ? element.idno : []
                            );
                            if (idnos.length != 0) {
                                const username: string = new Cookies().get(
                                    'username'
                                );
                                exportHumanResource({
                                    variables: {
                                        idnos: idnos,
                                        username: username,
                                    },
                                });
                            }
                        }}
                    >
                        輸出
                    </Button>
                    <Button
                        leftIcon={<DeleteIcon />}
                        variant={'buttonGrayOutline'}
                        onClick={() => {
                            setModalName('deleteLabor');
                            onOpen();
                        }}
                    >
                        刪除
                    </Button>
                </Flex>
            </Flex>
            {/* <OrgTable
                overviewTableData={organizationTableData}
                setOverviewTableData={setOrganizationTableData}
            ></OrgTable> */}
            <ReactWindowTable
                tableData={tableData}
                columnMap={columnMap}
                sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
            />
            <AddPeopleModal
                siteId={siteId}
                onClose={onClose}
                isOpen={modalName == 'createLabor' ? isOpen : false}
            ></AddPeopleModal>
            <DeleteLaborModal
                siteId={siteId}
                onClose={onClose}
                isOpen={modalName == 'deleteLabor' ? isOpen : false}
                selected={Object.values(tableData).flatMap((element) =>
                    element.isChecked
                        ? { name: element.name, idno: element.idno }
                        : []
                )}
            ></DeleteLaborModal>
            {(loading || exportLaoding) && (
                <Center
                    position={'absolute'}
                    top={0}
                    left={'20vw'}
                    w={'80vw'}
                    h={'100vh'}
                    bg={'#D9D9D980'}
                    zIndex={2}
                >
                    <Spinner size={'xl'} />
                </Center>
            )}
        </Flex>
    );
}
