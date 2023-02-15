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
    Center,
    Spinner,
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
} from './ReactWindowTable';
import { gql, useMutation, useQuery } from '@apollo/client';
import { SITE_LABOR, modalName } from './Organization';
import MultiCreateModalContent from './MultiCreateModalContent';

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
    isOpen: boolean;
    onClose: () => void;
    modalName: modalName;
}) {
    const { siteId, isOpen, onClose, modalName } = props;
    const toast = useToast();
    const [tableData, setTableData] = React.useState<tableData>({});
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [textareaValue, setTextareaValue] = React.useState<string>();
    const [existedIdno, setExistedIdno] = React.useState<string[]>([]);
    const [unexistedIdno, setUnexistedIdno] = React.useState<string[]>([]);
    const [step, setStep] = React.useState<1 | 2>(1);

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
        fetchPolicy: 'network-only',
    });

    const [createSiteLabor, { loading }] = useMutation(CREATE_SITE_LABOR, {
        onCompleted: ({ createSiteLabor }) => {
            if (createSiteLabor.ok) {
                toast({
                    title: createSiteLabor.message,
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
        refetchQueries: [SITE_LABOR],
        fetchPolicy: 'network-only',
    });

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
                                    穩懋南科路竹廠機電一期新建工程
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
                                    width={'220px'}
                                    h={'36px'}
                                    align={'center'}
                                    justify={'space-between'}
                                    gap={'11px'}
                                >
                                    <Text>承攬公司</Text>
                                    <Select
                                        width={'120px'}
                                        h={'36px'}
                                        variant={'formOutline'}
                                    ></Select>
                                </Flex>
                                <Flex
                                    width={'220px'}
                                    align={'center'}
                                    justify={'space-between'}
                                    gap={'11px'}
                                >
                                    <Text>身分證字號</Text>
                                    <Input
                                        width={'120px'}
                                        placeholder={'請輸入'}
                                        variant={'formOutline'}
                                    ></Input>
                                </Flex>
                                <ReactWindowTable
                                    tableData={tableData}
                                    columnMap={columnMap}
                                    sizes={sizes}
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
                                    onClick={onClose}
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
                            tableData={tableData}
                            header={'批次輸入'}
                            contentElement={
                                <Flex
                                    width={'100%'}
                                    height={'100%'}
                                    direction={'column'}
                                    gap={'8px'}
                                >
                                    <Text variant={'w400s14'}>
                                        請輸入身分證字號
                                    </Text>
                                    <Textarea
                                        ref={textareaRef}
                                        defaultValue={textareaValue}
                                        bg={'#FFFFFF'}
                                        resize={'none'}
                                        h={'180px'}
                                        placeholder={`A012345678\nA012345678`}
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
                            tableData={tableData}
                            header={'批次輸入'}
                            contentElement={
                                <Flex
                                    width={'100%'}
                                    height={'100%'}
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
                                            {existedIdno.map((idno) => (
                                                <Text>{idno}</Text>
                                            ))}
                                        </GridItem>
                                        <GridItem>
                                            {unexistedIdno.map((idno) => (
                                                <Text>{idno}</Text>
                                            ))}
                                        </GridItem>
                                        {/* <Textarea
                                        ref={textareaRef}
                                        bg={'#FFFFFF'}
                                        resize={'none'}
                                        h={'180px'}
                                        placeholder={`A012345678\nA012345678`}
                                        border={'2px solid #919AA9'}
                                        borderRadius={'4px'}
                                    /> */}
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
                    {/* <ModalContent
                        maxWidth={'380px'}
                        maxHeight={'466px'}
                        minHeight={'394px'}
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
                                    批次輸入
                                </Text>
                                <Text
                                    textAlign={'end'}
                                    fontStyle={'normal'}
                                    fontWeight={500}
                                    fontSize={'12px'}
                                    lineHeight={'20px'}
                                >
                                    穩懋南科路竹廠機電一期新建工程
                                </Text>
                            </Flex>
                        </ModalHeader>
                        <ModalBody
                            bg={'#E3ECFF'}
                            padding={'40px 30px'}
                            borderRadius={'10px'}
                        >
                            <Flex
                                width={'100%'}
                                height={'100%'}
                                direction={'column'}
                                gap={'8px'}
                            >
                                <Text variant={'w400s14'}>
                                    請輸入身分證字號
                                </Text>
                                <Textarea
                                    ref={textareaRef}
                                    bg={'#FFFFFF'}
                                    resize={'none'}
                                    h={'180px'}
                                    placeholder={`A012345678\nA012345678`}
                                    border={'2px solid #919AA9'}
                                    borderRadius={'4px'}
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
                                    onClick={onClose}
                                >
                                    取消
                                </Button>
                                <Button
                                    variant={'buttonGrayOutline'}
                                    size={'sm'}
                                    onClick={() => {
                                        const idnos =
                                            textareaRef.current?.value.split(
                                                '\n'
                                            );
                                        let existedIdno: Set<string> =
                                            new Set();
                                        let unexistedIdno: Set<string> =
                                            new Set();
                                        idnos?.forEach((idno) => {
                                            tableData[idno]
                                                ? existedIdno.add(idno)
                                                : unexistedIdno.add(idno);
                                        });
                                        setExistedIdno(Array.from(existedIdno));
                                        setUnexistedIdno(
                                            Array.from(unexistedIdno)
                                        );
                                        setStep(2);
                                    }}
                                >
                                    下一步
                                </Button>
                            </Flex>
                        </ModalFooter>
                    </ModalContent> */}
                </Modal>
            )}
            {loading && (
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
        </>
    );
}
