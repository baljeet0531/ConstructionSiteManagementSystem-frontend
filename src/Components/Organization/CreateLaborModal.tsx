import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Flex,
    Text,
    Select,
    Input,
    Box,
    Checkbox,
    useToast,
    Textarea,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import ReactWindowTable, {
    defalutElement,
    getElementProps,
    dataCellStyle,
    IColumnMap,
    ISizes,
} from '../../Utils/ReactWindowTable';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { SITE_LABOR, modalName } from './Organization';
import MultiCreateModalContent from './MultiCreateModalContent';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import PageLoading from '../../Utils/PageLoading';

const ORGANIZATION_POOL = gql`
    query OrganizationPool($errlist: Boolean!) {
        allHumanresource(errlist: $errlist) {
            name
            contractingCompanyName
            idno
            birthday
        }
    }
`;

const CREATE_SITE_LABOR = gql`
    mutation CreateSiteLabor($idno: [String]!, $siteId: String!) {
        createSiteLabor(idno: $idno, siteId: $siteId) {
            ok
            message
        }
    }
`;

const CONTRACTING_COMPANY = gql`
    query ContractingConpany($context: String!) {
        contractingConpany(context: $context)
    }
`;

const SEARCH_HUMAN_BY_CERTAIN_CORP = gql`
    query SearchHumanByCertainCorp($idno: String, $corp: String) {
        humanInSiteLabor(idno: $idno, corp: $corp) {
            idno
        }
    }
`;

interface OrgPool {
    name: string;
    contractingCompanyName: string;
    idno: string;
    birthday: string;
}

interface OrgPoolChecked extends OrgPool {
    isChecked: boolean;
}

export type tableData = {
    [idno: string]: OrgPoolChecked;
};

const sizes: ISizes = {
    tableViewHeight: 220,
    tableFigmaWidth: 450,
    tableViewWidth: 450,
    headerHeight: 36,
    cellHeight: 44,
};

export default function AddPeopleModal(props: {
    siteId: string;
    siteName: string;
    isOpen: boolean;
    onClose: () => void;
    modalName: modalName;
}) {
    const { siteId, siteName, isOpen, onClose, modalName } = props;
    const toast = useToast();
    const [companyList, setCompanyList] = React.useState<string[]>([]);
    const companySelected = React.useRef<HTMLSelectElement>(null);
    const [tableData, setTableData] = React.useState<tableData>({});
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [textareaValue, setTextareaValue] = React.useState<string>();
    const [existedIdno, setExistedIdno] = React.useState<string[]>([]);
    const [unexistedIdno, setUnexistedIdno] = React.useState<string[]>([]);
    const [step, setStep] = React.useState<1 | 2>(1);
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const timeout = React.useRef<any>();

    useQuery(ORGANIZATION_POOL, {
        variables: {
            errlist: false,
        },
        onCompleted: ({
            allHumanresource,
        }: {
            allHumanresource: OrgPool[];
        }) => {
            const reprocessingData = allHumanresource.map((humanElement) => ({
                [humanElement.idno]: {
                    ...humanElement,
                    isChecked: false,
                },
            }));

            setTableData(Object.assign({}, ...reprocessingData));
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [createSiteLabor, { loading }] = useMutation(CREATE_SITE_LABOR, {
        onCompleted: ({ createSiteLabor }) => {
            if (createSiteLabor.ok) {
                defaultSuccessToast(toast, createSiteLabor.message);
                const keys = Object.keys(tableData);
                keys.forEach((key) => {
                    const info = tableData[key];
                    tableData[key] = {
                        ...info,
                        isChecked: false,
                    };
                });
                setFilteredPrimaryKey(undefined);
                setTextareaValue(undefined);
                setStep(1);
            }
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        refetchQueries: [
            {
                query: SITE_LABOR,
                variables: {
                    siteId: siteId,
                },
            },
        ],
        fetchPolicy: 'network-only',
    });

    useQuery(CONTRACTING_COMPANY, {
        variables: {
            context: '',
        },
        onCompleted: ({
            contractingConpany,
        }: {
            contractingConpany: string[];
        }) => {
            setCompanyList(contractingConpany);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [searchHumanByCertainCorp] = useLazyQuery(
        SEARCH_HUMAN_BY_CERTAIN_CORP,
        {
            onCompleted: ({ humanInSiteLabor }) => {
                console.log(humanInSiteLabor);
                const searchResult = humanInSiteLabor.map(
                    (info: { idno: string }) => info.idno
                );
                setFilteredPrimaryKey(searchResult);
            },
            onError: (err) => {
                console.log(err);
            },
            fetchPolicy: 'network-only',
        }
    );

    const handleDebounceSearch = () => {
        clearTimeout(timeout.current);

        if (
            !searchInputRef.current?.value.trim() &&
            !companySelected.current?.value.trim()
        ) {
            setFilteredPrimaryKey(undefined);
            return;
        }
        timeout.current = setTimeout(() => {
            searchHumanByCertainCorp({
                variables: {
                    ...(searchInputRef.current?.value && {
                        idno: searchInputRef.current?.value,
                    }),
                    ...(companySelected.current?.value && {
                        corp: companySelected.current.value,
                    }),
                },
            });
        }, 300);
    };

    const columnMap: IColumnMap[] = [
        {
            title: '承攬公司',
            width: 100,
            variable: 'contractingCompanyName',
            getElement: defalutElement,
        },
        {
            title: '姓名',
            width: 100,
            variable: 'name',
            getElement: defalutElement,
        },
        {
            title: '身分證字號',
            width: 100,
            variable: 'idno',
            getElement: defalutElement,
        },
        {
            title: '出生日期',
            width: 100,
            variable: 'birthday',
            getElement: defalutElement,
        },
        {
            title: '全選',
            width: 50,
            variable: 'isChecked',
            getElement: ({ style, info, variable }: getElementProps) => {
                return (
                    <Box style={style} {...dataCellStyle}>
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

    const companyOptions = ['', ...companyList].map((company, index) => {
        return (
            <option key={index} value={company}>
                {company}
            </option>
        );
    });

    return (
        <>
            {modalName == 'createLabor' && (
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent
                        maxWidth={'614px'}
                        maxHeight={'590px'}
                        minHeight={'590px'}
                        padding={'30px 45px 22px 45px'}
                    >
                        <ModalHeader padding={0}>
                            <Flex direction={'column'} width={'100%'}>
                                <Text
                                    fontStyle={'normal'}
                                    fontWeight={700}
                                    fontSize={'20px'}
                                    lineHeight={'20px'}
                                >
                                    新增人員
                                </Text>
                                <Text
                                    textAlign={'end'}
                                    fontStyle={'normal'}
                                    fontWeight={500}
                                    fontSize={'12px'}
                                    lineHeight={'20px'}
                                >
                                    {siteName}
                                </Text>
                            </Flex>
                        </ModalHeader>
                        <ModalBody
                            bg={'#E3ECFF'}
                            padding={'41px 37px'}
                            borderRadius={'10px'}
                        >
                            <Flex
                                width={'100%'}
                                height={'100%'}
                                bg={'#E3ECFF'}
                                direction={'column'}
                                gap={'20px'}
                            >
                                <Flex
                                    width={'100%'}
                                    h={'36px'}
                                    align={'center'}
                                    justify={'flex-start'}
                                    gap={'11px'}
                                >
                                    <Text minW={'80px'}>承攬公司</Text>
                                    <Select
                                        ref={companySelected}
                                        width={'120px'}
                                        h={'36px'}
                                        variant={'formOutline'}
                                        onChange={() => {
                                            searchHumanByCertainCorp({
                                                variables: {
                                                    ...(searchInputRef.current
                                                        ?.value && {
                                                        idno: searchInputRef
                                                            .current?.value,
                                                    }),
                                                    ...(companySelected.current
                                                        ?.value && {
                                                        corp: companySelected
                                                            .current.value,
                                                    }),
                                                },
                                            });
                                        }}
                                    >
                                        {companyOptions}
                                    </Select>
                                </Flex>
                                <Flex
                                    width={'100%'}
                                    align={'center'}
                                    justify={'flex-start'}
                                    gap={'11px'}
                                >
                                    <Text minW={'80px'}>身分證字號</Text>
                                    <Input
                                        ref={searchInputRef}
                                        width={'120px'}
                                        placeholder={'請輸入'}
                                        variant={'formOutline'}
                                        onChange={handleDebounceSearch}
                                    ></Input>
                                    <Text variant={'w400s12'} color={'#DB504A'}>
                                        {filteredPrimaryKey?.length == 0
                                            ? '*查無此身分證字號'
                                            : ''}
                                    </Text>
                                </Flex>
                                <ReactWindowTable
                                    tableData={tableData}
                                    columnMap={columnMap}
                                    sizes={sizes}
                                    filteredPrimaryKey={filteredPrimaryKey}
                                />
                            </Flex>
                        </ModalBody>

                        <ModalFooter padding={0}>
                            <Flex
                                mt={'20px'}
                                justify={'space-between'}
                                width={'100%'}
                            >
                                <Button
                                    variant={'buttonGrayOutline'}
                                    size={'sm'}
                                    mr={3}
                                    onClick={() => {
                                        setFilteredPrimaryKey(undefined);
                                        onClose();
                                    }}
                                >
                                    取消新增
                                </Button>
                                <Button
                                    variant={'buttonGrayOutline'}
                                    size={'sm'}
                                    onClick={() => {
                                        const selected = Object.values(
                                            tableData
                                        ).flatMap((element) =>
                                            element.isChecked
                                                ? element.idno
                                                : []
                                        );
                                        createSiteLabor({
                                            variables: {
                                                idno: selected,
                                                siteId: siteId,
                                            },
                                        });
                                        onClose();
                                    }}
                                >
                                    確定新增
                                </Button>
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
            {modalName == 'multiCreate' && (
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    {step == 1 ? (
                        <MultiCreateModalContent
                            siteName={siteName}
                            header={'批次輸入'}
                            contentElement={
                                <Flex
                                    width={'100%'}
                                    height={'242px'}
                                    direction={'column'}
                                    gap={'8px'}
                                >
                                    <Text variant={'w400s14'}>
                                        請輸入身分證字號
                                    </Text>
                                    <Textarea
                                        flexGrow={1}
                                        ref={textareaRef}
                                        defaultValue={textareaValue}
                                        variant={'w400s14'}
                                        bg={'#FFFFFF'}
                                        resize={'none'}
                                        placeholder={`A012345678\nZ987654321`}
                                        border={'2px solid #919AA9'}
                                        borderRadius={'4px'}
                                    />
                                </Flex>
                            }
                            leftButtonText={'取消'}
                            handleLeftButtonClick={onClose}
                            rightButtonText={'下一步'}
                            handleRightButtonClick={() => {
                                if (!textareaRef.current?.value) {
                                    return;
                                }
                                const idnos =
                                    textareaRef.current?.value.split('\n');
                                let existedIdno: Set<string> = new Set();
                                let unexistedIdno: Set<string> = new Set();
                                idnos?.forEach((idno) => {
                                    tableData[idno]
                                        ? existedIdno.add(idno)
                                        : unexistedIdno.add(idno);
                                });
                                setTextareaValue(textareaRef.current?.value);
                                setExistedIdno(Array.from(existedIdno));
                                setUnexistedIdno(Array.from(unexistedIdno));
                                setStep(2);
                            }}
                        ></MultiCreateModalContent>
                    ) : (
                        <MultiCreateModalContent
                            siteName={siteName}
                            header={'批次輸入'}
                            contentElement={
                                <Flex
                                    width={'100%'}
                                    height={'242px'}
                                    direction={'column'}
                                    gap={'12px'}
                                >
                                    <Text variant={'w400s14'}>
                                        總共：
                                        {existedIdno.length +
                                            unexistedIdno.length}
                                        筆
                                    </Text>
                                    <Grid
                                        w={'100%'}
                                        h={'100%'}
                                        columnGap={'10px'}
                                        rowGap={'12px'}
                                        templateColumns={'repeat(2,1fr)'}
                                        templateRows={'20px 1fr'}
                                    >
                                        <GridItem>
                                            <Text variant={'w400s14'}>
                                                成功搜尋：{existedIdno.length}人
                                            </Text>
                                        </GridItem>
                                        <GridItem>
                                            <Text variant={'w400s14'}>
                                                不存在：{unexistedIdno.length}人
                                            </Text>
                                        </GridItem>
                                        <GridItem>
                                            <Textarea
                                                variant={'w400s14'}
                                                h={'100%'}
                                                resize={'none'}
                                                borderRadius={'2px'}
                                                disabled
                                                _disabled={{
                                                    bg: '#FFFFFF',
                                                    border: '2px solid #919AA9',
                                                }}
                                                value={existedIdno.join('\n')}
                                            ></Textarea>
                                        </GridItem>
                                        <GridItem>
                                            <Textarea
                                                variant={'w400s14'}
                                                h={'100%'}
                                                resize={'none'}
                                                borderRadius={'2px'}
                                                disabled
                                                _disabled={{
                                                    bg: '#FFFFFF',
                                                    border: '2px solid #919AA9',
                                                }}
                                                value={unexistedIdno.join('\n')}
                                            ></Textarea>
                                        </GridItem>
                                    </Grid>
                                </Flex>
                            }
                            leftButtonText={'上一步'}
                            handleLeftButtonClick={() => {
                                setStep(1);
                            }}
                            rightButtonText={'確認'}
                            handleRightButtonClick={() => {
                                createSiteLabor({
                                    variables: {
                                        idno: existedIdno,
                                        siteId: siteId,
                                    },
                                });
                                onClose();
                            }}
                        ></MultiCreateModalContent>
                    )}
                </Modal>
            )}
            {loading && <PageLoading />}
        </>
    );
}
