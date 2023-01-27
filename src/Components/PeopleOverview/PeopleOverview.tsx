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
} from '@chakra-ui/react';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    DeleteIcon,
    EditIcon,
    LaunchIcon,
    SearchIcon,
} from '../../Icons/Icons';
import { IsPermit } from '../../Mockdata/Mockdata';
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
        }
    }
`;

const DELETE_HUMAN_RESOURCE = gql`
    mutation DeleteHumanResource($idno: [String!]) {
        deleteHumanResource(idno: $idno) {
            ok
            message
        }
    }
`;

const SEARCH_HUMAN = gql`
    query SearchHuman($context: String!) {
        searchHuman(context: $context) {
            idno
        }
    }
`;

// const tablist = [
//     '個資',
//     '相關資料1',
//     '相關資料2',
//     '主管證照',
//     '保險',
//     '證照期限1',
//     '證照期限2',
//     '證照期限3',
//     '證照期限4',
//     '證照期限5',
// ];

// interface ItabMap {
//     tabName: | '個資'
//     | '相關資料1'
//     | '相關資料2'
//     | '主管證照'
//     | '保險'
//     | '證照期限1'
//     | '證照期限2'
//     | '證照期限3'
//     | '證照期限4'
//     | '證照期限5';
//     headerName:| '編號'
//     | '姓名'
//     | '身分證字號'
//     | '出生日期'
//     | '性別'
//     | '血型'
//     | '聯絡電話'
//     | '家屬\n聯絡人'
//     | '緊急\n聯絡電話'
//     | '聯絡地址'
//     | '"checkBox"'
//     | '危害告知日期\n(須有存查資料)'
//     | '供應商\n工安認證編號\n(須有存查資料)'
//     | '一般安全衛生教育訓練(6小時)\n發證/回訓日期'
//     | '一般安全衛生教育訓練(6小時)應回訓期限\n(三年減一天)'
//     | '6小時期效狀況\n(期效3年)';
// }

// type tabName =
//     | '個資'
//     | '相關資料1'
//     | '相關資料2'
//     | '主管證照'
//     | '保險'
//     | '證照期限1'
//     | '證照期限2'
//     | '證照期限3'
//     | '證照期限4'
//     | '證照期限5';

// type headerName =
//     | '編號'
//     | '姓名'
//     | '身分證字號'
//     | '出生日期'
//     | '性別'
//     | '血型'
//     | '聯絡電話'
//     | '家屬\n聯絡人'
//     | '緊急\n聯絡電話'
//     | '聯絡地址'
//     | '"checkBox"'
//     | '危害告知日期\n(須有存查資料)'
//     | '供應商\n工安認證編號\n(須有存查資料)'
//     | '一般安全衛生教育訓練(6小時)\n發證/回訓日期'
//     | '一般安全衛生教育訓練(6小時)應回訓期限\n(三年減一天)'
//     | '6小時期效狀況\n(期效3年)'

// type tabItem = {[x: headerName]: headerProps}

export const tabMap = {
    個資: {
        編號: {
            w: 40,
            variable: 'index',
        },
        姓名: {
            w: 70,
            variable: 'name',
        },
        身分證字號: {
            w: 103,
            variable: 'idno',
        },
        出生日期: {
            w: 100,
            variable: 'birthday',
        },
        性別: {
            w: 40,
            variable: 'gender',
        },
        血型: {
            w: 40,
            variable: 'bloodType',
        },
        聯絡電話: {
            w: 100,
            variable: 'tel',
        },
        '家屬\n聯絡人': {
            w: 70,
            variable: 'liaison',
        },
        '緊急\n聯絡電話': {
            w: 100,
            variable: 'emergencyTel',
        },
        聯絡地址: {
            w: 164,
            variable: 'address',
        },
        checkBox: {
            w: 50,
            variable: 'isCheck',
        },
    },
    相關資料1: {
        編號: {
            w: 40,
            variable: 'index',
        },
        姓名: {
            w: 70,
            variable: 'name',
        },
        身分證字號: {
            w: 103,
            variable: 'idno',
        },
        '危害告知日期\n(須有存查資料)': {
            w: 110,
            variable: 'hazardNotifyDate',
        },
        '供應商\n工安認證編號\n(須有存查資料)': {
            w: 120,
            variable: 'supplierIndustrialSafetyNumber',
        },
        '一般安全衛生教育訓練(6小時)\n發證/回訓日期': {
            w: 120,
            variable: 'safetyHealthyEducationIssue',
        },
        '一般安全衛生教育訓練(6小時)應回訓期限\n(三年減一天)': {
            w: 160,
            variable: 'safetyHealthyEducationWithdraw',
        },
        '6小時期效狀況\n(期效3年)': {
            w: 104,
            variable: 'sixStatus',
        },
        checkBox: {
            w: 50,
            variable: 'isCheck',
        },
    },
    相關資料2: {
        編號: {
            w: 40,
            variable: 'index',
        },
        姓名: {
            w: 70,
            variable: 'name',
        },
        身分證字號: {
            w: 103,
            variable: 'idno',
        },
        '勞保申請日期\n(提供一個月內)': {
            w: 152,
            variable: 'laborInsuranceApplyDate',
        },
        '工會申請日期\n(提供一個月內)': {
            w: 152,
            variable: 'laborAssociationDate',
        },
        承攬公司: {
            w: 155,
            variable: 'contractingCompanyName',
        },
        次承攬公司: {
            w: 155,
            variable: 'viceContractingCompanyName',
        },
        checkBox: {
            w: 50,
            variable: 'isCheck',
        },
    },
    主管證照: {
        編號: {
            w: 40,
            variable: 'index',
        },
        姓名: {
            w: 70,
            variable: 'name',
        },
        身分證字號: {
            w: 103,
            variable: 'idno',
        },
        主管證照名稱: {
            w: 155,
            variable: 'certificationName',
        },
        '主管證照\n發證/回訓日期': {
            w: 152,
            variable: 'certificationIssue',
        },
        '主管證照\n應回訓日期\n(兩年減一天)': {
            w: 152,
            variable: 'certificationWithdraw',
        },
        '主管證照期效狀況(期效2年)': {
            w: 155,
            variable: 'certificationStatus',
        },
        checkBox: {
            w: 50,
            variable: 'isCheck',
        },
    },
    保險: {
        編號: {
            w: 40,
            variable: 'index',
        },
        姓名: {
            w: 70,
            variable: 'name',
        },
        身分證字號: {
            w: 103,
            variable: 'idno',
        },
        '意外險有效期\n(起始日)': {
            w: 120,
            variable: 'accidentInsuranceStart',
        },
        '意外險有效期\n(截止日)': {
            w: 120,
            variable: 'accidentInsuranceEnd',
        },
        '保險金\n(萬元)': {
            w: 120,
            variable: 'accidentInsuranceAmount',
        },
        加保日期: {
            w: 120,
            variable: 'accidentInsuranceSignDate',
        },
        保險公司: {
            w: 134,
            variable: 'accidentInsuranceCompanyName',
        },
        checkBox: {
            w: 50,
            variable: 'isCheck',
        },
    },
    證照期限1: {
        編號: {
            w: 40,
            variable: 'index',
        },
        姓名: {
            w: 70,
            variable: 'name',
        },
        身分證字號: {
            w: 103,
            variable: 'idno',
        },
        '高空工作車\n發證/回訓日期 (A)': {
            w: 154,
            variable: 'aCertificationDate',
        },
        '高空工作車\n期效狀況 (期效3年)': {
            w: 153,
            variable: 'aStatus',
        },
        '高處(施工架)\n發證/回訓日期 (WAH)': {
            w: 154,
            variable: 'wahCertificationDate',
        },
        '高處(施工架)\n期效狀況 (期效3年)': {
            w: 153,
            variable: 'wahStatus',
        },
        checkBox: {
            w: 50,
            variable: 'isCheck',
        },
    },
    證照期限2: {
        編號: {
            w: 40,
            variable: 'index',
        },
        姓名: {
            w: 70,
            variable: 'name',
        },
        身分證字號: {
            w: 103,
            variable: 'idno',
        },
        '吊掛作業\n發證/回訓日期 (L)': {
            w: 154,
            variable: 'lCertificationDate',
        },
        '吊掛作業\n期效狀況 (期效3年)': {
            w: 153,
            variable: 'lStatus',
        },
        '侷限空間\n發證/回訓日期 (C)': {
            w: 154,
            variable: 'cCertificationDate',
        },
        '侷限空間\n期效狀況 (期效3年)': {
            w: 153,
            variable: 'cStatus',
        },
        checkBox: {
            w: 50,
            variable: 'isCheck',
        },
    },
    證照期限3: {
        編號: {
            w: 40,
            variable: 'index',
        },
        姓名: {
            w: 70,
            variable: 'name',
        },
        身分證字號: {
            w: 103,
            variable: 'idno',
        },
        '有機溶劑\n發證/回訓日期 (H)': {
            w: 154,
            variable: 'hCertificationDate',
        },
        '有機溶劑\n期效狀況 (期效3年)': {
            w: 153,
            variable: 'hStatus',
        },
        '防爆區\n(Ex)': {
            w: 154,
            variable: 'exCertificationDate',
        },
        '防爆區\n期效狀況 (期效3年)': {
            w: 153,
            variable: 'exStatus',
        },
        checkBox: {
            w: 50,
            variable: 'isCheck',
        },
    },
    證照期限4: {
        編號: {
            w: 40,
            variable: 'index',
        },
        姓名: {
            w: 70,
            variable: 'name',
        },
        身分證字號: {
            w: 103,
            variable: 'idno',
        },
        '營造業業主管\n(S)': {
            w: 154,
            variable: 'sCertificationDate',
        },
        '營造業業主管\n期效狀況 (期效3年)': {
            w: 153,
            variable: 'sStatus',
        },
        '施工架作業主管\n(SA)': {
            w: 154,
            variable: 'saCertificationDate',
        },
        '施工架作業主管\n期效狀況 (期效3年)': {
            w: 153,
            variable: 'saStatus',
        },
        checkBox: {
            w: 50,
            variable: 'isCheck',
        },
    },
    證照期限5: {
        編號: {
            w: 40,
            variable: 'index',
        },
        姓名: {
            w: 70,
            variable: 'name',
        },
        身分證字號: {
            w: 103,
            variable: 'idno',
        },
        '有機溶劑作業主管\n(OS)': {
            w: 154,
            variable: 'osCertificationDate',
        },
        '有機溶劑作業主管\n期效狀況 (期效3年)': {
            w: 153,
            variable: 'osStatus',
        },
        '缺氧作業主管\n(O2)': {
            w: 154,
            variable: 'o2CertificationDate',
        },
        '缺氧作業主管\n期效狀況 (期效3年)': {
            w: 153,
            variable: 'o2Status',
        },
        checkBox: {
            w: 50,
            variable: 'isCheck',
        },
    },
};

export interface humanTableValues {
    name: string | null | undefined;
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
    idno: string | undefined;
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

    index: number | undefined;
    isCheck: boolean | undefined;
}

export default function PeopleOverview(props: { errorOnly?: boolean }) {
    const { errorOnly = false } = props;

    if (!IsPermit('people_overview')) return <Navigate to="/" replace={true} />;
    const toast = useToast();
    const navigate = useNavigate();

    const [tableValue, setTableValue] = React.useState<{
        [idno: string]: humanTableValues;
    }>();
    const [selectAll, setSelectAll] = React.useState<boolean>(false);
    const [searchIdno, setSearchIdno] = React.useState<string[]>();

    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const timeout = React.useRef<any>();

    const { loading } = useQuery(ALL_HUMAN_RESOURCE, {
        notifyOnNetworkStatusChange: true,
        variables: {
            errlist: errorOnly,
        },
        onCompleted: ({ allHumanresource }) => {
            const appendedHumanTable = allHumanresource.map(
                (info: humanTableValues, index: number) => {
                    return {
                        [info.idno as string]: {
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
        fetchPolicy: 'cache-and-network',
    });
    const [deleteHumanResource, { loading: deleteLoading }] = useMutation(
        DELETE_HUMAN_RESOURCE,
        {
            onCompleted: ({ deleteHumanResource }) => {
                if (deleteHumanResource.ok) {
                    toast({
                        title: deleteHumanResource.message,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
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
            refetchQueries: [ALL_HUMAN_RESOURCE],
            fetchPolicy: 'network-only',
        }
    );

    const [searchHuman] = useLazyQuery(SEARCH_HUMAN);

    const handleDebounceSearch = () => {
        clearTimeout(timeout.current);

        if (!searchInputRef.current?.value.trim()) {
            setSearchIdno(undefined);
            return;
        }
        timeout.current = setTimeout(() => {
            searchHuman({
                variables: { context: searchInputRef.current?.value },
                onCompleted: ({ searchHuman }) => {
                    const searchResult = searchHuman.map(
                        (info: humanTableValues) => {
                            return info['idno'];
                        }
                    );
                    setSearchIdno(searchResult);
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        }, 300);
    };

    const [selectedIdno, setSelectedIdno] = React.useState<
        (string | undefined)[]
    >([]);

    React.useEffect(() => {
        if (tableValue) {
            setSelectedIdno(
                Object.values(tableValue).flatMap((info) =>
                    info['isCheck'] ? info['idno'] : []
                ) || []
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
                    {selectedIdno.length == 1 && (
                        <Button
                            leftIcon={<EditIcon />}
                            variant={'buttonGrayOutline'}
                            onClick={() => {
                                navigate('/people/establishment', {
                                    state: { idno: selectedIdno[0] },
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
                        >
                            輸出
                        </Button>
                    )}
                    <Button
                        leftIcon={<DeleteIcon />}
                        variant={'buttonGrayOutline'}
                        onClick={() => {
                            const selectedIdno =
                                tableValue &&
                                Object.values(tableValue).flatMap((info) =>
                                    info['isCheck'] ? info['idno'] : []
                                );
                            if (selectedIdno) {
                                deleteHumanResource({
                                    variables: {
                                        idno: selectedIdno,
                                    },
                                });
                            }
                        }}
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
                                searchIdno={searchIdno}
                                selectAll={selectAll}
                                setSelectAll={setSelectAll}
                            />
                        );
                    })}
                </TabPanels>
            </Tabs>
            {(loading || deleteLoading) && (
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
