import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
    Button,
    Center,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
    Tab,
    TabList,
    TabPanels,
    Tabs,
    Text,
    useToast,
    useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Cookies } from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import BACKEND from '../../Constants/EnvConstants';
import {
    DeleteIcon,
    EditIcon,
    LaunchIcon,
    SearchIcon,
} from '../../Icons/Icons';
import { IsPermit } from '../../Mockdata/Mockdata';
import DeleteModal from './DeleteModal';
import OverViewTable from './OverviewTable';

export const ALL_HUMAN_RESOURCE = gql`
    query AllHumanresource($errlist: Boolean!) {
        allHumanresource(errlist: $errlist) {
            name
            gender
            birthday
            bloodType
            tel
            liaison
            emergencyTel
            address
            hazardNotifyDate
            supplierIndustrialSafetyNumber
            safetyHealthyEducationIssue
            safetyHealthyEducationWithdraw
            laborInsuranceApplyDate
            laborAssociationDate
            certificationName
            certificationIssue
            certificationWithdraw
            accidentInsuranceStart
            accidentInsuranceEnd
            accidentInsuranceAmount
            accidentInsuranceSignDate
            accidentInsuranceCompanyName
            contractingCompanyName
            viceContractingCompanyName
            aCertificationDate
            wahCertificationDate
            lCertificationDate
            cCertificationDate
            hCertificationDate
            exCertificationDate
            sCertificationDate
            saCertificationDate
            osCertificationDate
            o2CertificationDate
            idno
            sixStatus
            certificationStatus
            aStatus
            wahStatus
            lStatus
            cStatus
            hStatus
            exStatus
            sStatus
            saStatus
            osStatus
            o2Status
            no
        }
    }
`;

const EXPORT_HUMAN_RESOURCE = gql`
    mutation ExportHumanResource($idnos: [String]!, $username: String!) {
        exportHumanResource(idnos: $idnos, username: $username) {
            ok
            message
            path
        }
    }
`;

export const SEARCH_HUMAN = gql`
    query SearchHuman($context: String!, $errlist: Boolean!) {
        searchHuman(context: $context, errlist: $errlist) {
            idno
            name
            no
        }
    }
`;

export const tabMap = {
    個資: {
        編號: {
            width: 40,
            variable: 'index',
        },
        姓名: {
            width: 70,
            variable: 'name',
        },
        身分證字號: {
            width: 103,
            variable: 'idno',
        },
        出生日期: {
            width: 100,
            variable: 'birthday',
        },
        性別: {
            width: 40,
            variable: 'gender',
        },
        血型: {
            width: 40,
            variable: 'bloodType',
        },
        聯絡電話: {
            width: 100,
            variable: 'tel',
        },
        '家屬\n聯絡人': {
            width: 70,
            variable: 'liaison',
        },
        '緊急\n聯絡電話': {
            width: 100,
            variable: 'emergencyTel',
        },
        聯絡地址: {
            width: 164,
            variable: 'address',
        },
        checkBox: {
            width: 50,
            variable: 'isCheck',
        },
    },
    相關資料1: {
        編號: {
            width: 40,
            variable: 'index',
        },
        姓名: {
            width: 70,
            variable: 'name',
        },
        身分證字號: {
            width: 103,
            variable: 'idno',
        },
        '危害告知日期\n(須有存查資料)': {
            width: 110,
            variable: 'hazardNotifyDate',
        },
        '供應商\n工安認證編號\n(須有存查資料)': {
            width: 120,
            variable: 'supplierIndustrialSafetyNumber',
        },
        '一般安全衛生教育訓練(6小時)\n發證/回訓日期': {
            width: 120,
            variable: 'safetyHealthyEducationIssue',
        },
        '一般安全衛生教育訓練(6小時)應回訓期限\n(三年減一天)': {
            width: 160,
            variable: 'safetyHealthyEducationWithdraw',
        },
        '6小時期效狀況\n(期效3年)': {
            width: 104,
            variable: 'sixStatus',
        },
        checkBox: {
            width: 50,
            variable: 'isCheck',
        },
    },
    相關資料2: {
        編號: {
            width: 40,
            variable: 'index',
        },
        姓名: {
            width: 70,
            variable: 'name',
        },
        身分證字號: {
            width: 103,
            variable: 'idno',
        },
        '勞保申請日期\n(提供一個月內)': {
            width: 152,
            variable: 'laborInsuranceApplyDate',
        },
        '工會申請日期\n(提供一個月內)': {
            width: 152,
            variable: 'laborAssociationDate',
        },
        承攬公司: {
            width: 155,
            variable: 'contractingCompanyName',
        },
        次承攬公司: {
            width: 155,
            variable: 'viceContractingCompanyName',
        },
        checkBox: {
            width: 50,
            variable: 'isCheck',
        },
    },
    主管證照: {
        編號: {
            width: 40,
            variable: 'index',
        },
        姓名: {
            width: 70,
            variable: 'name',
        },
        身分證字號: {
            width: 103,
            variable: 'idno',
        },
        主管證照名稱: {
            width: 155,
            variable: 'certificationName',
        },
        '主管證照\n發證/回訓日期': {
            width: 152,
            variable: 'certificationIssue',
        },
        '主管證照\n應回訓日期\n(兩年減一天)': {
            width: 152,
            variable: 'certificationWithdraw',
        },
        '主管證照期效狀況(期效2年)': {
            width: 155,
            variable: 'certificationStatus',
        },
        checkBox: {
            width: 50,
            variable: 'isCheck',
        },
    },
    保險: {
        編號: {
            width: 40,
            variable: 'index',
        },
        姓名: {
            width: 70,
            variable: 'name',
        },
        身分證字號: {
            width: 103,
            variable: 'idno',
        },
        '意外險有效期\n(起始日)': {
            width: 120,
            variable: 'accidentInsuranceStart',
        },
        '意外險有效期\n(截止日)': {
            width: 120,
            variable: 'accidentInsuranceEnd',
        },
        '保險金\n(萬元)': {
            width: 120,
            variable: 'accidentInsuranceAmount',
        },
        加保日期: {
            width: 120,
            variable: 'accidentInsuranceSignDate',
        },
        保險公司: {
            width: 134,
            variable: 'accidentInsuranceCompanyName',
        },
        checkBox: {
            width: 50,
            variable: 'isCheck',
        },
    },
    證照期限1: {
        編號: {
            width: 40,
            variable: 'index',
        },
        姓名: {
            width: 70,
            variable: 'name',
        },
        身分證字號: {
            width: 103,
            variable: 'idno',
        },
        '高空工作車\n發證/回訓日期 (A)': {
            width: 154,
            variable: 'aCertificationDate',
        },
        '高空工作車\n期效狀況 (期效3年)': {
            width: 153,
            variable: 'aStatus',
        },
        '高處(施工架)\n發證/回訓日期 (WAH)': {
            width: 154,
            variable: 'wahCertificationDate',
        },
        '高處(施工架)\n期效狀況 (期效3年)': {
            width: 153,
            variable: 'wahStatus',
        },
        checkBox: {
            width: 50,
            variable: 'isCheck',
        },
    },
    證照期限2: {
        編號: {
            width: 40,
            variable: 'index',
        },
        姓名: {
            width: 70,
            variable: 'name',
        },
        身分證字號: {
            width: 103,
            variable: 'idno',
        },
        '吊掛作業\n發證/回訓日期 (L)': {
            width: 154,
            variable: 'lCertificationDate',
        },
        '吊掛作業\n期效狀況 (期效3年)': {
            width: 153,
            variable: 'lStatus',
        },
        '侷限空間\n發證/回訓日期 (C)': {
            width: 154,
            variable: 'cCertificationDate',
        },
        '侷限空間\n期效狀況 (期效3年)': {
            width: 153,
            variable: 'cStatus',
        },
        checkBox: {
            width: 50,
            variable: 'isCheck',
        },
    },
    證照期限3: {
        編號: {
            width: 40,
            variable: 'index',
        },
        姓名: {
            width: 70,
            variable: 'name',
        },
        身分證字號: {
            width: 103,
            variable: 'idno',
        },
        '有機溶劑\n發證/回訓日期 (H)': {
            width: 154,
            variable: 'hCertificationDate',
        },
        '有機溶劑\n期效狀況 (期效3年)': {
            width: 153,
            variable: 'hStatus',
        },
        '防爆區\n(Ex)': {
            width: 154,
            variable: 'exCertificationDate',
        },
        '防爆區\n期效狀況 (期效3年)': {
            width: 153,
            variable: 'exStatus',
        },
        checkBox: {
            width: 50,
            variable: 'isCheck',
        },
    },
    證照期限4: {
        編號: {
            width: 40,
            variable: 'index',
        },
        姓名: {
            width: 70,
            variable: 'name',
        },
        身分證字號: {
            width: 103,
            variable: 'idno',
        },
        '營造業業主管\n(S)': {
            width: 154,
            variable: 'sCertificationDate',
        },
        '營造業業主管\n期效狀況 (期效3年)': {
            width: 153,
            variable: 'sStatus',
        },
        '施工架作業主管\n(SA)': {
            width: 154,
            variable: 'saCertificationDate',
        },
        '施工架作業主管\n期效狀況 (期效3年)': {
            width: 153,
            variable: 'saStatus',
        },
        checkBox: {
            width: 50,
            variable: 'isCheck',
        },
    },
    證照期限5: {
        編號: {
            width: 40,
            variable: 'index',
        },
        姓名: {
            width: 70,
            variable: 'name',
        },
        身分證字號: {
            width: 103,
            variable: 'idno',
        },
        '有機溶劑作業主管\n(OS)': {
            width: 154,
            variable: 'osCertificationDate',
        },
        '有機溶劑作業主管\n期效狀況 (期效3年)': {
            width: 153,
            variable: 'osStatus',
        },
        '缺氧作業主管\n(O2)': {
            width: 154,
            variable: 'o2CertificationDate',
        },
        '缺氧作業主管\n期效狀況 (期效3年)': {
            width: 153,
            variable: 'o2Status',
        },
        checkBox: {
            width: 50,
            variable: 'isCheck',
        },
    },
};

export interface humanTableValues {
    name: string;
    gender: string | null | undefined;
    birthday: string | null | undefined;
    bloodType: string | null | undefined;
    tel: string | null | undefined;
    liaison: string | null | undefined;
    emergencyTel: string | null | undefined;
    address: string | null | undefined;
    hazardNotifyDate: string | null | undefined;
    supplierIndustrialSafetyNumber: string | null | undefined;
    safetyHealthyEducationIssue: string | null | undefined;
    safetyHealthyEducationWithdraw: string | null | undefined;

    laborInsuranceApplyDate: string | null | undefined;
    laborAssociationDate: string | null | undefined;
    certificationName: string | null | undefined;
    certificationIssue: string | null | undefined;
    certificationWithdraw: string | null | undefined;

    accidentInsuranceStart: string | null | undefined;
    accidentInsuranceEnd: string | null | undefined;
    accidentInsuranceAmount: string | null | undefined;
    accidentInsuranceSignDate: string | null | undefined;
    accidentInsuranceCompanyName: string | null | undefined;
    contractingCompanyName: string | null | undefined;
    viceContractingCompanyName: string | null | undefined;
    aCertificationDate: string | null | undefined;
    wahCertificationDate: string | null | undefined;
    lCertificationDate: string | null | undefined;
    cCertificationDate: string | null | undefined;
    hCertificationDate: string | null | undefined;
    exCertificationDate: string | null | undefined;
    sCertificationDate: string | null | undefined;
    saCertificationDate: string | null | undefined;
    osCertificationDate: string | null | undefined;
    o2CertificationDate: string | null | undefined;
    idno: string;
    sixStatus: string | null | undefined;
    certificationStatus: string | null | undefined;
    aStatus: string | null | undefined;
    wahStatus: string | null | undefined;
    lStatus: string | null | undefined;
    cStatus: string | null | undefined;
    hStatus: string | null | undefined;
    exStatus: string | null | undefined;
    sStatus: string | null | undefined;
    saStatus: string | null | undefined;
    osStatus: string | null | undefined;
    o2Status: string | null | undefined;
    PImg: string | null | undefined;
    LImg: string | null | undefined;
    IDFImg: string | null | undefined;
    IDRImg: string | null | undefined;
    GImg: string | null | undefined;
    F6Img: string | null | undefined;
    R6Img: string | null | undefined;
    HImgs: string | null | undefined;

    no: number | null | undefined;
    index: number;
    isCheck: boolean | undefined;
}

export default function PeopleOverview(props: { errorOnly?: boolean }) {
    if (!IsPermit('people_overview')) return <Navigate to="/" replace={true} />;
    const { errorOnly = false } = props;
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const username: string = new Cookies().get('username');

    const [tableValue, setTableValue] = React.useState<{
        [primaryKey: string]: humanTableValues;
    }>();
    const [selectAll, setSelectAll] = React.useState<boolean>(false);

    const { loading } = useQuery(ALL_HUMAN_RESOURCE, {
        notifyOnNetworkStatusChange: true,
        variables: {
            errlist: errorOnly,
        },
        onCompleted: ({ allHumanresource }) => {
            const appendedHumanTable = allHumanresource.map(
                (info: any, index: number) => {
                    const primaryKey = errorOnly ? info.no : info.idno;
                    Object.keys(info).forEach((key) => {
                        if (info[key] == '0001-01-01') info[key] = '日期錯誤';
                        else if (info[key] === null) info[key] = '';
                    });
                    return {
                        [primaryKey as string]: {
                            ...info,
                            index: index + 1,
                            isCheck: false,
                        },
                    };
                }
            );
            setTableValue(Object.assign({}, ...appendedHumanTable));
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [searchHuman] = useLazyQuery(SEARCH_HUMAN, {
        fetchPolicy: 'network-only',
    });

    const [searchPrimaryKey, setSearchPrimaryKey] = React.useState<string[]>();
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const timeout = React.useRef<any>();
    const handleDebounceSearch = () => {
        clearTimeout(timeout.current);

        if (!searchInputRef.current?.value.trim()) {
            setSearchPrimaryKey(undefined);
            return;
        }
        timeout.current = setTimeout(() => {
            searchHuman({
                variables: {
                    context: searchInputRef.current?.value,
                    errlist: errorOnly,
                },
                onCompleted: ({ searchHuman }) => {
                    const searchResult = searchHuman.map(
                        (info: humanTableValues) => {
                            return errorOnly ? info['no'] : info['idno'];
                        }
                    );
                    setSearchPrimaryKey(searchResult);
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        }, 300);
    };

    const [selectedHuman, setSelectedHuman] = React.useState<
        { no: number | null | undefined; idno: string; name: string }[]
    >([]);

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

    React.useEffect(() => {
        if (tableValue) {
            setSelectedHuman(
                Object.values(tableValue).flatMap((info) =>
                    info['isCheck']
                        ? { no: info.no, idno: info.idno, name: info.name }
                        : []
                )
            );
        }
    }, [tableValue]);

    return (
        <Flex
            direction={'column'}
            h={'100vh'}
            w={'100%'}
            pl={'42px'}
            pr={'42px'}
            pt={'47px'}
            pb={'52px'}
        >
            <Flex direction={'row'} align={'center'} mb={'11px'}>
                <Text variant={'pageTitle'} mr={'0.625rem'}>
                    {errorOnly ? '人員資料審查' : '人員資料總覽'}
                </Text>
                <InputGroup>
                    <InputLeftElement>
                        <IconButton
                            aria-label="Search"
                            icon={<SearchIcon />}
                            onClick={() => {
                                console.log('click');
                            }}
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
                        height={'36px'}
                        pl={'36px'}
                        pr={'12px'}
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
                <Flex gap={'10px'}>
                    {selectedHuman.length == 1 && (
                        <Button
                            leftIcon={<EditIcon />}
                            variant={'buttonGrayOutline'}
                            onClick={() => {
                                navigate('/people/establishment', {
                                    state: { human: selectedHuman[0] },
                                });
                            }}
                        >
                            編輯
                        </Button>
                    )}
                    {!errorOnly && (
                        <Button
                            leftIcon={<LaunchIcon />}
                            variant={'buttonGrayOutline'}
                            onClick={() => {
                                if (selectedHuman.length !== 0) {
                                    const idnos = selectedHuman.map(
                                        (selectedHuman) => selectedHuman.idno
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
                    )}
                    <Button
                        leftIcon={<DeleteIcon />}
                        variant={'buttonGrayOutline'}
                        onClick={onOpen}
                    >
                        刪除
                    </Button>
                </Flex>
            </Flex>
            <Tabs variant={'blueLineTabs'} isFitted isLazy>
                <TabList>
                    {Object.keys(tabMap).map((tab, index) => {
                        return <Tab key={index}>{tab}</Tab>;
                    })}
                </TabList>
                <TabPanels>
                    {Object.values(tabMap).map((tabItem, index) => {
                        return (
                            <OverViewTable
                                key={index}
                                tabItem={tabItem}
                                tableValue={tableValue}
                                setTableValue={setTableValue}
                                searchPrimaryKey={searchPrimaryKey}
                                selectAll={selectAll}
                                setSelectAll={setSelectAll}
                                errorOnly={errorOnly}
                            />
                        );
                    })}
                </TabPanels>
            </Tabs>
            <DeleteModal
                isOpen={isOpen}
                onClose={onClose}
                selected={
                    tableValue &&
                    selectedHuman &&
                    selectedHuman.map((info) => ({
                        name: info.name,
                        idno: info.idno,
                    }))
                }
            ></DeleteModal>
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
