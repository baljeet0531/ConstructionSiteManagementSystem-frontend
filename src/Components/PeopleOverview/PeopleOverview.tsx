import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Tab,
    TabList,
    TabPanels,
    Tabs,
    Text,
    useToast,
    useDisclosure,
    Select,
    TabPanel,
    Box,
} from '@chakra-ui/react';
import React from 'react';
import { Cookies } from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    DeleteIcon,
    EditIcon,
    LaunchIcon,
    SearchIcon,
} from '../../Icons/Icons';
import { IsPermit } from '../../Mockdata/Mockdata';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { PageLoading } from '../Shared/Loading';
import { exportFile } from '../../Utils/Resources';
import DeleteModal from './DeleteModal';
import ReactWindowTable, {
    CheckboxElement,
    IColumnMap,
    ISizes,
    dataCellStyle,
    defaultElement,
    getElementProps,
} from '../Shared/ReactWindowTable';
import { ActionsContext } from '../../Context/Context';
import { TOverviewChecked, TOverviewTable } from '../../Types/TableOverview';

export const ALL_HUMAN_RESOURCE = gql`
    query AllHumanresource($errlist: Boolean, $mode: String) {
        allHumanresource(errlist: $errlist, mode: $mode) {
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
            accidentInsuranceStartOne
            accidentInsuranceStartTwo
            accidentInsuranceStartThree
            accidentInsuranceEndOne
            accidentInsuranceEndTwo
            accidentInsuranceEndThree
            accidentInsuranceAmountOne
            accidentInsuranceAmountTwo
            accidentInsuranceAmountThree
            accidentInsuranceSignDateOne
            accidentInsuranceSignDateTwo
            accidentInsuranceSignDateThree
            accidentInsuranceCompanyNameOne
            accidentInsuranceCompanyNameTwo
            accidentInsuranceCompanyNameThree
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

export const EXPORT_HUMAN_RESOURCE = gql`
    mutation ExportHumanResource($idnos: [String]!, $username: String!) {
        exportHumanResource(idnos: $idnos, username: $username) {
            ok
            message
            path
        }
    }
`;

export const SEARCH_HUMAN = gql`
    query SearchHuman($context: String!, $mode: String, $errlist: Boolean) {
        searchHuman(context: $context, mode: $mode, errlist: $errlist) {
            name
            idno
            no
        }
    }
`;

const sizes: ISizes = {
    tableFigmaWidth: 877,
    headerHeight: 65,
    cellHeight: 30,
    padding: {
        topPadding: 215,
    },
};

export interface humanTableValues {
    name: string;
    gender: string | null;
    birthday: string | null;
    bloodType: string | null;
    tel: string | null;
    liaison: string | null;
    emergencyTel: string | null;
    address: string | null;
    hazardNotifyDate: string | null;
    supplierIndustrialSafetyNumber: string | null;
    safetyHealthyEducationIssue: string | null;
    safetyHealthyEducationWithdraw: string | null;

    laborInsuranceApplyDate: string | null;
    laborAssociationDate: string | null;
    certificationName: string | null;
    certificationIssue: string | null;
    certificationWithdraw: string | null;

    accidentInsuranceStart: string | null;
    accidentInsuranceEnd: string | null;
    accidentInsuranceAmount: string | null;
    accidentInsuranceSignDate: string | null;
    accidentInsuranceCompanyName: string | null;
    contractingCompanyName: string | null;
    viceContractingCompanyName: string | null;
    aCertificationDate: string | null;
    wahCertificationDate: string | null;
    lCertificationDate: string | null;
    cCertificationDate: string | null;
    hCertificationDate: string | null;
    exCertificationDate: string | null;
    sCertificationDate: string | null;
    saCertificationDate: string | null;
    osCertificationDate: string | null;
    o2CertificationDate: string | null;
    idno: string;
    sixStatus: string | null;
    certificationStatus: string | null;
    aStatus: string | null;
    wahStatus: string | null;
    lStatus: string | null;
    cStatus: string | null;
    hStatus: string | null;
    exStatus: string | null;
    sStatus: string | null;
    saStatus: string | null;
    osStatus: string | null;
    o2Status: string | null;
    PImg: string | null;
    LImg: string | null;
    IDFImg: string | null;
    IDRImg: string | null;
    GImg: string | null;
    F6Img: string | null;
    R6Img: string | null;
    HImgs: string | null;

    no: string | null;
}

interface IQueryPeopleOverview {
    allHumanresource: humanTableValues[];
}

type TPeopleOverviewTable = TOverviewTable<TOverviewChecked<humanTableValues>>;

export interface ISelectedHuman {
    no: string | null;
    idno: string;
    name: string;
}

export default function PeopleOverview(props: { errorOnly?: boolean }) {
    if (!IsPermit('people_overview')) return <Navigate to="/" replace={true} />;

    const CertStatusElement = ({ style, info, variable }: getElementProps) => {
        let value = info[variable] as string,
            bg = '#FFFFFF';
        if (value.startsWith('無法判斷')) value = '無法判斷';
        else if (value.startsWith('已過期')) bg = '#DB504A1A';
        else if (value.endsWith('過期')) bg = '#FDFFE3';

        return (
            <Box {...dataCellStyle} style={style} bg={bg}>
                {value}
            </Box>
        );
    };

    const customCheckboxElement = (props: getElementProps) => (
        <CheckboxElement
            getElementProps={{
                ...props,
                style: {
                    ...props.style,
                    paddingTop: '6px',
                },
            }}
            setTableData={setTableValue}
            primaryKey={`${props.info.idno}|${props.info.no ?? ''}`}
        ></CheckboxElement>
    );

    const tabColumnMap: { [tab: string]: IColumnMap[] } = {
        個資: [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '出生日期',
                width: 100,
                variable: 'birthday',
                getElement: defaultElement,
            },
            {
                title: '性別',
                width: 40,
                variable: 'gender',
                getElement: defaultElement,
            },
            {
                title: '血型',
                width: 40,
                variable: 'bloodType',
                getElement: defaultElement,
            },
            {
                title: '聯絡電話',
                width: 100,
                variable: 'tel',
                getElement: defaultElement,
            },
            {
                title: '家屬\n聯絡人',
                width: 70,
                variable: 'liaison',
                getElement: defaultElement,
            },
            {
                title: '緊急\n聯絡電話',
                width: 100,
                variable: 'emergencyTel',
                getElement: defaultElement,
            },
            {
                title: '聯絡地址',
                width: 164,
                variable: 'address',
                getElement: defaultElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        相關資料1: [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '危害告知日期\n(須有存查資料)',
                width: 110,
                variable: 'hazardNotifyDate',
                getElement: defaultElement,
            },
            {
                title: '供應商\n工安認證編號\n(須有存查資料)',
                width: 120,
                variable: 'supplierIndustrialSafetyNumber',
                getElement: defaultElement,
            },
            {
                title: '一般安全衛生教育訓練(6小時)\n發證/回訓日期',
                width: 120,
                variable: 'safetyHealthyEducationIssue',
                getElement: defaultElement,
            },
            {
                title: '一般安全衛生教育訓練(6小時)應回訓期限\n(三年減一天)',
                width: 160,
                variable: 'safetyHealthyEducationWithdraw',
                getElement: defaultElement,
            },
            {
                title: '6小時期效狀況\n(期效3年)',
                width: 104,
                variable: 'sixStatus',
                getElement: CertStatusElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        相關資料2: [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '勞保申請日期\n(提供一個月內)',
                width: 152,
                variable: 'laborInsuranceApplyDate',
                getElement: defaultElement,
            },
            {
                title: '工會申請日期\n(提供一個月內)',
                width: 152,
                variable: 'laborAssociationDate',
                getElement: defaultElement,
            },
            {
                title: '承攬公司',
                width: 155,
                variable: 'contractingCompanyName',
                getElement: defaultElement,
            },
            {
                title: '次承攬公司',
                width: 155,
                variable: 'viceContractingCompanyName',
                getElement: defaultElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        主管證照名稱: [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '主管證照名稱',
                width: 155,
                variable: 'certificationName',
                getElement: defaultElement,
            },
            {
                title: '主管證照\n發證/回訓日期',
                width: 152,
                variable: 'certificationIssue',
                getElement: defaultElement,
            },
            {
                title: '主管證照\n應回訓日期\n(兩年減一天)',
                width: 152,
                variable: 'certificationWithdraw',
                getElement: defaultElement,
            },
            {
                title: '主管證照期效狀況(期效2年)',
                width: 155,
                variable: 'certificationStatus',
                getElement: CertStatusElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        保險1: [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '意外險有效期\n(起始日)',
                width: 120,
                variable: 'accidentInsuranceStartOne',
                getElement: defaultElement,
            },
            {
                title: '意外險有效期\n(截止日)',
                width: 120,
                variable: 'accidentInsuranceEndOne',
                getElement: defaultElement,
            },
            {
                title: '保險金\n(萬元)',
                width: 120,
                variable: 'accidentInsuranceAmountOne',
                getElement: defaultElement,
            },
            {
                title: '加保日期',
                width: 120,
                variable: 'accidentInsuranceSignDateOne',
                getElement: defaultElement,
            },
            {
                title: '保險公司',
                width: 134,
                variable: 'accidentInsuranceCompanyNameOne',
                getElement: defaultElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        保險2: [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '意外險有效期\n(起始日)',
                width: 120,
                variable: 'accidentInsuranceStartTwo',
                getElement: defaultElement,
            },
            {
                title: '意外險有效期\n(截止日)',
                width: 120,
                variable: 'accidentInsuranceEndTwo',
                getElement: defaultElement,
            },
            {
                title: '保險金\n(萬元)',
                width: 120,
                variable: 'accidentInsuranceAmountTwo',
                getElement: defaultElement,
            },
            {
                title: '加保日期',
                width: 120,
                variable: 'accidentInsuranceSignDateTwo',
                getElement: defaultElement,
            },
            {
                title: '保險公司',
                width: 134,
                variable: 'accidentInsuranceCompanyNameTwo',
                getElement: defaultElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        保險3: [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '意外險有效期\n(起始日)',
                width: 120,
                variable: 'accidentInsuranceStartThree',
                getElement: defaultElement,
            },
            {
                title: '意外險有效期\n(截止日)',
                width: 120,
                variable: 'accidentInsuranceEndThree',
                getElement: defaultElement,
            },
            {
                title: '保險金\n(萬元)',
                width: 120,
                variable: 'accidentInsuranceAmountThree',
                getElement: defaultElement,
            },
            {
                title: '加保日期',
                width: 120,
                variable: 'accidentInsuranceSignDateThree',
                getElement: defaultElement,
            },
            {
                title: '保險公司',
                width: 134,
                variable: 'accidentInsuranceCompanyNameThree',
                getElement: defaultElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        '施工作業證照\n高空車/施工架': [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '高空工作車\n發證/回訓日期 (A)',
                width: 154,
                variable: 'aCertificationDate',
                getElement: defaultElement,
            },
            {
                title: '高空工作車\n期效狀況 (期效3年)',
                width: 153,
                variable: 'aStatus',
                getElement: CertStatusElement,
            },
            {
                title: '高處(施工架)\n發證/回訓日期 (WAH)',
                width: 154,
                variable: 'wahCertificationDate',
                getElement: defaultElement,
            },
            {
                title: '高處(施工架)\n期效狀況 (期效3年)',
                width: 153,
                variable: 'wahStatus',
                getElement: CertStatusElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        '施工作業證照\n吊掛/局限空間': [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '吊掛作業\n發證/回訓日期 (L)',
                width: 154,
                variable: 'lCertificationDate',
                getElement: defaultElement,
            },
            {
                title: '吊掛作業\n期效狀況 (期效3年)',
                width: 153,
                variable: 'lStatus',
                getElement: CertStatusElement,
            },
            {
                title: '侷限空間\n發證/回訓日期 (C)',
                width: 154,
                variable: 'cCertificationDate',
                getElement: defaultElement,
            },
            {
                title: '侷限空間\n期效狀況 (期效3年)',
                width: 153,
                variable: 'cStatus',
                getElement: CertStatusElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        '施工作業證照\n有機溶劑/防爆區': [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '有機溶劑\n發證/回訓日期 (H)',
                width: 154,
                variable: 'hCertificationDate',
                getElement: defaultElement,
            },
            {
                title: '有機溶劑\n期效狀況 (期效3年)',
                width: 153,
                variable: 'hStatus',
                getElement: CertStatusElement,
            },
            {
                title: '防爆區\n(Ex)',
                width: 154,
                variable: 'exCertificationDate',
                getElement: defaultElement,
            },
            {
                title: '防爆區\n期效狀況 (期效3年)',
                width: 153,
                variable: 'exStatus',
                getElement: CertStatusElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        '作業主管證照\n營造/施工架': [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '營造業業主管\n(S)',
                width: 154,
                variable: 'sCertificationDate',
                getElement: defaultElement,
            },
            {
                title: '營造業業主管\n期效狀況 (期效3年)',
                width: 153,
                variable: 'sStatus',
                getElement: CertStatusElement,
            },
            {
                title: '施工架作業主管\n(SA)',
                width: 154,
                variable: 'saCertificationDate',
                getElement: defaultElement,
            },
            {
                title: '施工架作業主管\n期效狀況 (期效3年)',
                width: 153,
                variable: 'saStatus',
                getElement: CertStatusElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
        '作業主管證照\n有機/缺氧': [
            {
                title: '編號',
                width: 40,
                variable: 'index',
                getElement: defaultElement,
            },
            {
                title: '姓名',
                width: 70,
                variable: 'name',
                getElement: defaultElement,
            },
            {
                title: '身分證字號',
                width: 103,
                variable: 'idno',
                getElement: defaultElement,
            },
            {
                title: '有機溶劑作業主管\n(OS)',
                width: 154,
                variable: 'osCertificationDate',
                getElement: defaultElement,
            },
            {
                title: '有機溶劑作業主管\n期效狀況 (期效3年)',
                width: 153,
                variable: 'osStatus',
                getElement: CertStatusElement,
            },
            {
                title: '缺氧作業主管\n(O2)',
                width: 154,
                variable: 'o2CertificationDate',
                getElement: defaultElement,
            },
            {
                title: '缺氧作業主管\n期效狀況 (期效3年)',
                width: 153,
                variable: 'o2Status',
                getElement: CertStatusElement,
            },
            {
                title: '全選',
                width: 50,
                variable: 'isChecked',
                getElement: customCheckboxElement,
            },
        ],
    };

    const { errorOnly = false } = props;
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const username: string = new Cookies().get('username');

    const [fileLoading, setFileLoading] = React.useState<boolean>(false);

    const [tableValue, setTableValue] = React.useState<TPeopleOverviewTable>(
        {}
    );

    const [searchPrimaryKey, setSearchPrimaryKey] = React.useState<string[]>();
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const selectModeRef = React.useRef<HTMLSelectElement>(null);

    const { loading } = useQuery<IQueryPeopleOverview>(ALL_HUMAN_RESOURCE, {
        variables: {
            errlist: errorOnly,
        },
        onCompleted: ({ allHumanresource }) => {
            setTableValue(
                allHumanresource.reduce((acc, info, index) => {
                    Object.keys(info).forEach((key) => {
                        if (info[key as keyof humanTableValues] == '0001-01-01')
                            info[key as keyof humanTableValues] = '日期錯誤';
                    });
                    const primaryKey = `${info.idno}|${info.no ?? ''}`;
                    acc[primaryKey] = {
                        ...info,
                        index: index + 1,
                        isChecked: false,
                    };
                    return acc;
                }, {} as TPeopleOverviewTable)
            );
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [searchHuman] = useLazyQuery(SEARCH_HUMAN, {
        onCompleted: ({ searchHuman }) => {
            const searchResult = searchHuman.map((info: humanTableValues) => {
                return `${info.idno}|${info.no ?? ''}`;
            });
            setSearchPrimaryKey(searchResult);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const getSearchHumanVar = () => ({
        variables: {
            context: searchInputRef.current?.value,
            mode:
                selectModeRef.current?.value === '全部'
                    ? undefined
                    : selectModeRef.current?.value,
            errlist: errorOnly,
        },
    });
    const timeout = React.useRef<any>();
    const handleDebounceSearch = () => {
        clearTimeout(timeout.current);

        if (!searchInputRef.current?.value.trim()) {
            setSearchPrimaryKey(undefined);
            return;
        }
        timeout.current = setTimeout(() => {
            searchHuman(getSearchHumanVar());
        }, 300);
    };

    const [selectedHuman, setSelectedHuman] = React.useState<ISelectedHuman[]>(
        []
    );

    const [exportHumanResource, { loading: exportLoading }] = useMutation(
        EXPORT_HUMAN_RESOURCE,
        {
            onCompleted: ({
                exportHumanResource,
            }: {
                exportHumanResource: {
                    ok: boolean;
                    message: string;
                    path: string;
                };
            }) => {
                if (exportHumanResource.ok) {
                    setFileLoading(true);
                    const { path, message } = exportHumanResource;
                    exportFile(path, message, toast).then(() => {
                        setFileLoading(false);
                    });
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

    React.useEffect(() => {
        if (tableValue) {
            setSelectedHuman(
                Object.values(tableValue).flatMap(
                    ({ isChecked, no, idno, name }) =>
                        isChecked ? { no, idno, name } : []
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
            gap={'11px'}
        >
            <Text variant={'pageTitle'} mr={'0.625rem'}>
                {errorOnly ? '人員資料審查' : '人員資料總覽'}
            </Text>
            <Flex align={'center'} justify={'space-between'} gap={'10px'}>
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
                    {!errorOnly && (
                        <Select
                            variant={'formOutline'}
                            ref={selectModeRef}
                            onChange={() => {
                                searchHuman(getSearchHumanVar());
                            }}
                        >
                            <option value={undefined}>全部</option>
                            <option value="即將到期">即將到期</option>
                            <option value="已過期">已過期</option>
                        </Select>
                    )}
                </Flex>

                <Flex gap={'10px'} align={'center'}>
                    {actions.U && selectedHuman.length == 1 && (
                        <Button
                            leftIcon={<EditIcon />}
                            variant={'buttonGrayOutline'}
                            h={'36px'}
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
                            h={'36px'}
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
                    {actions.D && (
                        <Button
                            leftIcon={<DeleteIcon />}
                            variant={'buttonGrayOutline'}
                            h={'36px'}
                            onClick={onOpen}
                        >
                            刪除
                        </Button>
                    )}
                </Flex>
            </Flex>
            <Tabs variant={'blueLineTabs'} isFitted isLazy>
                <TabList overflowX={'auto'}>
                    {Object.keys(tabColumnMap).map((tab, index) => (
                        <Tab key={index} whiteSpace={'pre'} margin={0}>
                            {tab}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {Object.values(tabColumnMap).map((columnMap, index) => (
                        <TabPanel key={index} padding={0}>
                            <ReactWindowTable
                                tableData={tableValue}
                                setTableData={setTableValue}
                                columnMap={columnMap}
                                sizes={sizes}
                                filteredPrimaryKey={searchPrimaryKey}
                                columnBordered
                            />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
            <DeleteModal
                isOpen={isOpen}
                onClose={onClose}
                selected={tableValue && selectedHuman}
                errorOnly={errorOnly}
            ></DeleteModal>
            {(loading || exportLoading || fileLoading) && <PageLoading />}
        </Flex>
    );
}
