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
import ReactWindowTable, {
    dataCellStyle,
    defaultElement,
    getElementProps,
    IColumnMap,
    ISizes,
} from '../Shared/ReactWindowTable';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Cookies } from 'react-cookie';
import CreateLaborModal from './CreateLaborModal';
import DeleteLaborModal from './DeleteLaborModal';
import { EXPORT_HUMAN_RESOURCE } from '../PeopleOverview/PeopleOverview';
import { exportFile } from '../../Utils/Resources';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { PageLoading } from '../Shared/Loading';
import { ActionsContext } from '../../Context/Context';

export const SITE_LABOR = gql`
    query SiteLabor($siteId: String!, $context: String) {
        siteLabor(siteId: $siteId, context: $context) {
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
    tableFigmaWidth: 877,
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

export type modalName = 'createLabor' | 'deleteLabor' | 'multiCreate';

export default function Organization(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('organization')) return <Navigate to="/" replace={true} />;
    const columnMap: IColumnMap[] = [
        {
            title: '編號',
            width: 70,
            variable: 'index',
            getElement: (props) =>
                defaultElement({
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
                defaultElement({
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
                defaultElement({
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
                defaultElement({
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
                defaultElement({
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
                defaultElement({
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
                defaultElement({
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
                defaultElement({
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
    const { siteId, siteName } = props;
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
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
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    const [searchSiteLabor] = useLazyQuery(SITE_LABOR, {
        onCompleted: ({ siteLabor }) => {
            const searchResult = siteLabor.map((info: ISiteLabor) => info.idno);
            setFilteredPrimaryKey(searchResult);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });
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
                    ...(searchInputRef.current?.value && {
                        context: searchInputRef.current.value,
                    }),
                },
            });
        }, 300);
    };
    const [exportHumanResource, { loading: exportLoading }] = useMutation(
        EXPORT_HUMAN_RESOURCE,
        {
            onCompleted: async ({
                exportHumanResource,
            }: {
                exportHumanResource: {
                    ok: boolean;
                    message: string;
                    path: string;
                };
            }) => {
                if (exportHumanResource.ok) {
                    const { path, message } = exportHumanResource;
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
            <Text variant={'pageTitle'}>專案人員組織</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <InputGroup w={'230px'}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon />}
                        />
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
                    {actions.C && (
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
                    )}
                </Flex>
                <Flex gap={'10px'}>
                    {actions.C && (
                        <Button
                            leftIcon={<ReplyIcon />}
                            variant={'buttonGrayOutline'}
                            onClick={() => {
                                setModalName('multiCreate');
                                onOpen();
                            }}
                        >
                            批次輸入
                        </Button>
                    )}
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
                    {actions.D && (
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
                    )}
                </Flex>
            </Flex>
            <ReactWindowTable
                tableData={tableData}
                setTableData={setTableData}
                columnMap={columnMap}
                sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
            />
            <CreateLaborModal
                siteId={siteId}
                siteName={siteName}
                onClose={onClose}
                isOpen={
                    modalName == 'createLabor' || modalName == 'multiCreate'
                        ? isOpen
                        : false
                }
                modalName={modalName}
            ></CreateLaborModal>
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
            {(loading || exportLoading) && <PageLoading />}
        </Flex>
    );
}
