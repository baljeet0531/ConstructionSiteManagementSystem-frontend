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
import { TCertCode, TCertTitle } from '../../Types/PeopleManagement';
import {
    ISelectedHuman,
    humanTableValues,
} from '../../Interface/PeopleManagement';

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
            boshCertificationDate
            aosCertificationDate
            aohCertificationDate
            frCertificationDate
            o2CertificationDate
            osCertificationDate
            saCertificationDate
            sCertificationDate
            ssaCertificationDate
            maCertificationDate
            rCertificationDate
            fsCertificationDate
            peCertificationDate
            rsCertificationDate
            dwCertificationDate
            aWithdrawDate
            boshWithdrawDate
            aosWithdrawDate
            aohWithdrawDate
            frWithdrawDate
            o2WithdrawDate
            osWithdrawDate
            saWithdrawDate
            sWithdrawDate
            maWithdrawDate
            rWithdrawDate
            ssaWithdrawDate
            fsWithdrawDate
            peWithdrawDate
            rsWithdrawDate
            dwWithdrawDate
            reviewStaff
            idno
            sixStatus
            certificationStatus
            aStatus
            boshStatus
            aosStatus
            aohStatus
            frStatus
            o2Status
            osStatus
            saStatus
            sStatus
            maStatus
            rStatus
            ssaStatus
            fsStatus
            peStatus
            rsStatus
            dwStatus
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

interface gqlData {
    allHumanresource: humanTableValues[];
}

type TPeopleOverviewTable = TOverviewTable<TOverviewChecked<humanTableValues>>;

const CertTitleToCodeMap: Record<
    TCertTitle,
    { code: TCertCode; expiredYear: number }
> = {
    高空作業車操作人員: { code: 'a', expiredYear: 3 },
    乙級職業安全管理員: { code: 'bosh', expiredYear: 3 },
    甲級職業安全管理師: { code: 'aos', expiredYear: 3 },
    甲級職業衛生管理師: { code: 'aoh', expiredYear: 3 },
    急救人員: { code: 'fr', expiredYear: 3 },
    '缺氧(侷限)作業主管證照': { code: 'o2', expiredYear: 3 },
    有機溶劑作業主管證照: { code: 'os', expiredYear: 3 },
    施工架組配作業主管證照: { code: 'sa', expiredYear: 3 },
    營造作業主管證照: { code: 's', expiredYear: 3 },
    作業主管證照: { code: 'ma', expiredYear: 3 },
    屋頂作業主管: { code: 'r', expiredYear: 3 },
    鋼構組配作業主管: { code: 'ssa', expiredYear: 3 },
    模板支撐作業主管: { code: 'fs', expiredYear: 3 },
    露天開挖作業主管: { code: 'pe', expiredYear: 3 },
    擋土支撐作業主管: { code: 'rs', expiredYear: 3 },
    粉塵作業主管: { code: 'dw', expiredYear: 3 },
};

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

    const CertColumnMap = (certTitle: TCertTitle) => {
        const { code, expiredYear } = CertTitleToCodeMap[certTitle];
        const upperCode = code.toUpperCase();
        const certWidth = certTitle === '作業主管證照' ? 153 : 204;
        const column = [
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
        ];

        if (certTitle === '作業主管證照')
            column.push({
                title: `${certTitle}名稱`,
                width: certWidth,
                variable: 'certificationName',
                getElement: defaultElement,
            });

        column.push(
            ...[
                {
                    title: `${certTitle}\n發證日期 (${upperCode})`,
                    width: certWidth + 1,
                    variable: `${code}CertificationDate`,
                    getElement: defaultElement,
                },
                {
                    title: `${certTitle}\n回訓日期 (${upperCode})`,
                    width: certWidth + 1,
                    variable: `${code}WithdrawDate`,
                    getElement: defaultElement,
                },
                {
                    title: `${certTitle}\n期效狀況 (期效${expiredYear}年)`,
                    width: certWidth,
                    variable: `${code}Status`,
                    getElement: CertStatusElement,
                },
                {
                    title: '全選',
                    width: 50,
                    variable: 'isChecked',
                    getElement: customCheckboxElement,
                },
            ]
        );

        return {
            [certTitle]: column,
        };
    };

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
                title: '審查人員',
                width: 70,
                variable: 'reviewStaff',
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
                width: 94,
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
        ...Object.keys(CertTitleToCodeMap).reduce(
            (acc, title) => ({ ...acc, ...CertColumnMap(title as TCertTitle) }),
            {}
        ),
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

    const { loading } = useQuery<gqlData>(ALL_HUMAN_RESOURCE, {
        variables: {
            errlist: errorOnly,
        },
        onCompleted: ({ allHumanresource }) => {
            setTableValue(
                allHumanresource.reduce((acc, oldInfo, index) => {
                    const info = { ...oldInfo };
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
        fetchPolicy: 'cache-first',
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
