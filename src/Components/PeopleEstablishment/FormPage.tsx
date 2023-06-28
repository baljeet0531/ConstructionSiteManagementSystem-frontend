import React from 'react';
import BACKEND from '../../Constants/EnvConstants';
import {
    Button,
    Flex,
    Text,
    Grid,
    GridItem,
    Input,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    useToast,
    Box,
} from '@chakra-ui/react';
import { Form, FormikProps } from 'formik';
import { formFiles, formValues } from '../../Interface/PeopleManagement';
import { EditIcon, ReplyIcon } from '../../Icons/Icons';
import GridInputItem from './GridInputItem';
import GridFileItem from './GridFileItem';
import GridTitle from './GridTitle';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import {
    ALL_HUMAN_RESOURCE,
    SEARCH_HUMAN,
} from '../PeopleOverview/PeopleOverview';
import { Cookies } from 'react-cookie';
import GridIdnoItem from './GridIdnoItem';
import dayjs from 'dayjs';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import { PageLoading } from '../Shared/Loading';

type imageType = keyof formFiles;
type formFileUrls = {
    [K in imageType]?: K extends 'HImgs' ? string[] : string;
};

const imageTypeArray: imageType[] = [
    'F6Img',
    'G1Img',
    'G2Img',
    'G3Img',
    'HImgs',
    'IDFImg',
    'IDRImg',
    'LImg',
    'PImg',
    'R6Img',
    'MAFImg',
    'MARImg',
    'AFImg',
    'ARImg',
    'WAHFImg',
    'WAHRImg',
    'LFImg',
    'LRImg',
    'CFImg',
    'CRImg',
    'HFImg',
    'HRImg',
    'EXFImg',
    'EXRImg',
    'SFImg',
    'SRImg',
    'SAFImg',
    'SARImg',
    'OSFImg',
    'OSRImg',
    'O2FImg',
    'O2RImg',
];

const UPLOAD_HR_ZIP = gql`
    mutation UploadHRZip($file: Upload!) {
        uploadHRZip(file: $file) {
            ok
            message
            failList
            correct
            failure
        }
    }
`;

export const GET_HUMAN_RESOURCE = gql`
    query Humanresource($idno: String, $no: Int) {
        humanresource(idno: $idno, no: $no) {
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
            PImg
            LImg
            IDFImg
            IDRImg
            G1Img
            G2Img
            G3Img
            F6Img
            R6Img
            MAFImg
            MARImg
            ARImg
            AFImg
            WAHFImg
            WAHRImg
            LFImg
            LRImg
            CFImg
            CRImg
            HFImg
            HRImg
            EXFImg
            EXRImg
            SFImg
            SRImg
            SAFImg
            SARImg
            OSFImg
            OSRImg
            O2FImg
            O2RImg
            HImgs
        }
    }
`;

export default function FormPage(props: {
    formProps: FormikProps<formValues>;
    fileStates: formFiles;
    setFileStates: React.Dispatch<React.SetStateAction<formFiles>>;
    humanToBeUpdated:
        | {
              no: string;
              idno: string;
          }
        | undefined;
    setHumanToBeUpdated: React.Dispatch<
        React.SetStateAction<
            | {
                  no: string;
                  idno: string;
              }
            | undefined
        >
    >;
    submitLoading?: boolean;
}) {
    const {
        formProps,
        fileStates,
        setFileStates,
        humanToBeUpdated,
        setHumanToBeUpdated,
        submitLoading = false,
    } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [zipFile, setZipFile] = React.useState<File>();
    const [imgLoading, setImgLoading] = React.useState<boolean>(true);
    const toast = useToast();

    const handleSubmit = () => {
        formProps.validateForm().then((errors) => {
            Object.keys(errors).length == 0
                ? formProps.submitForm()
                : defaultErrorToast(toast, '欄位錯誤');
        });
    };

    function checkStatus(
        e: React.ChangeEvent<HTMLInputElement>,
        target: string,
        status: string,
        year: number,
        withdraw?: string
    ) {
        const date = dayjs(e.target.value);
        const withDrawDate =
            target == 'certificationWithdraw' ||
            target == 'safetyHealthyEducationWithdraw'
                ? date
                : date.add(year, 'year').subtract(1, 'day');

        const now = dayjs();
        const diff = now.diff(withDrawDate, 'day');
        formProps.setValues({
            ...formProps.values,
            [target]: date.format('YYYY-MM-DD'),
            ...(withdraw && {
                [withdraw]: withDrawDate.format('YYYY-MM-DD'),
            }),
            [status]: diff <= 0 ? 'OK' : `已過期${diff}天`,
        });
    }

    const validateExpired = (value: string) =>
        value.slice(0, 3) == '已過期' && '已過期';
    const validateEmpty = (value: string) => !value && '欄位不能為空';

    const [uploadHRZip, { loading: uploadLoading }] = useMutation(
        UPLOAD_HR_ZIP,
        {
            onCompleted: ({ uploadHRZip }) => {
                if (uploadHRZip.ok) {
                    defaultSuccessToast(toast, uploadHRZip.message);
                    setZipFile(undefined);
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
        }
    );

    const [searchHuman] = useLazyQuery(SEARCH_HUMAN, {
        fetchPolicy: 'network-only',
    });
    const [searchResult, setSearchResult] =
        React.useState<{ idno: string; name: string }[]>();
    const timeout = React.useRef<any>();

    const handleDebounceSearch = (searchInput: string) => {
        clearTimeout(timeout.current);
        if (!searchInput.trim()) {
            setSearchResult(undefined);
            return;
        }
        timeout.current = setTimeout(() => {
            searchHuman({
                variables: {
                    context: searchInput,
                    errlist: false,
                },
                onCompleted: ({
                    searchHuman,
                }: {
                    searchHuman: typeof searchResult;
                }) => {
                    const searchMap = searchHuman?.map((info) => {
                        return { idno: info['idno'], name: info['name'] };
                    });
                    setSearchResult(searchMap);
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        }, 300);
    };

    const [filePath, setFilePath] = React.useState<formFileUrls>(
        imageTypeArray.reduce((acc, imageType) => {
            imageType == 'HImgs'
                ? (acc[imageType] = [''])
                : (acc[imageType] = '');
            return acc;
        }, {} as formFileUrls)
    );

    const [getHumanresource] = useLazyQuery(GET_HUMAN_RESOURCE, {
        onCompleted: ({
            humanresource,
        }: {
            humanresource: (formValues & formFileUrls)[];
        }) => {
            const { imgs, rest } = imageTypeArray.reduce(
                (acc, imageType) => {
                    if (imageType === 'HImgs') {
                        const { [imageType]: val, ...rest } = acc.rest;
                        acc.imgs[imageType] = val ? [...val, ''] : [''];
                        acc.rest = rest;
                    } else {
                        const { [imageType]: val, ...rest } = acc.rest;
                        acc.imgs[imageType] = val || '';
                        acc.rest = rest;
                    }

                    return acc;
                },
                {
                    imgs: {} as formFileUrls,
                    rest: humanresource[0],
                }
            );

            setFilePath(imgs);
            Object.keys(rest).forEach((key) => {
                if (
                    rest[key as keyof formValues] == null ||
                    rest[key as keyof formValues] == '0001-01-01' ||
                    rest[key as keyof formValues] ==
                        '無法判斷：發證/回訓 月/日 輸入不合理'
                )
                    rest[key as keyof formValues] = '';
            });
            formProps.setValues(rest);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    React.useEffect(() => {
        setImgLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        let setFiles = true;
        let newFileStates: formFiles = { HImgs: [] };
        const fetchImg = async (imageType: imageType, imgPath: string) => {
            if (imgPath !== '') {
                const cookieValue = new Cookies().get('jwt');
                const response = await fetch(BACKEND + `/${imgPath}`, {
                    signal,
                    cache: 'no-cache',
                    headers: {
                        Authorization: `Bearer ${cookieValue}`,
                    },
                    method: 'GET',
                });
                if (response.status >= 400) {
                    if (imageType == 'HImgs') {
                        newFileStates[imageType] = [
                            ...newFileStates['HImgs'],
                            undefined,
                        ];
                    } else {
                        newFileStates[imageType] = undefined;
                    }
                } else {
                    const imageBlob = await response.blob();
                    const filename = imgPath.slice(
                        imgPath.lastIndexOf('/') + 1
                    );
                    const imageFile = new File([imageBlob], filename);
                    if (imageType == 'HImgs') {
                        newFileStates[imageType] = [
                            ...newFileStates['HImgs'],
                            imageFile,
                        ];
                    } else {
                        newFileStates[imageType] = imageFile;
                    }
                }
            } else {
                if (imageType == 'HImgs') {
                    newFileStates[imageType] = [
                        ...newFileStates['HImgs'],
                        undefined,
                    ];
                } else {
                    newFileStates[imageType] = undefined;
                }
            }
        };

        const fetchAllImgs = async () => {
            for await (const items of Object.entries(filePath)) {
                const [type, path] = items as [imageType, any];
                if (type == 'HImgs') {
                    for await (const path of filePath.HImgs || '') {
                        await fetchImg(type, path);
                    }
                } else {
                    await fetchImg(type, path);
                }
            }
        };

        fetchAllImgs()
            .then(() => {
                if (setFiles) {
                    setFileStates({ ...newFileStates });
                    setImgLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        return () => {
            controller.abort();
            setFiles = false;
        };
    }, [filePath]);

    React.useEffect(() => {
        if (humanToBeUpdated) {
            humanToBeUpdated.no
                ? getHumanresource({
                      variables: { no: humanToBeUpdated.no },
                  })
                : getHumanresource({
                      variables: { idno: humanToBeUpdated.idno },
                  });
        }
    }, [humanToBeUpdated]);

    return (
        <Flex direction={'column'} h={'100%'}>
            <Flex
                h={'117px'}
                align={'center'}
                justify={'space-between'}
                p={'2.938rem 2.625rem 1.563rem 2.125rem'}
                position={'sticky'}
            >
                <Text fontSize={'2.25rem'}>人員資料建置</Text>
                <Flex gap={'10px'} align={'center'}>
                    <Button
                        leftIcon={<ReplyIcon />}
                        variant={'buttonGrayOutline'}
                        onClick={onOpen}
                    >
                        匯入
                    </Button>
                    <Button
                        leftIcon={<EditIcon />}
                        variant={'buttonBlueSolid'}
                        isLoading={formProps.isSubmitting}
                        onClick={handleSubmit}
                    >
                        確定編輯
                    </Button>
                </Flex>
            </Flex>
            <Box
                w={'100%'}
                overflowY={'auto'}
                borderTop={'1px solid #667080'}
                bg={'#FFFFFF'}
                p={'25px 93px'}
            >
                <Form>
                    <Flex
                        direction={'column'}
                        align={'center'}
                        justify={'flex-start'}
                    >
                        <Text
                            pb={'25px'}
                            fontSize={'2.25rem'}
                            color={'#667080'}
                        >
                            個人資料
                        </Text>
                        <Grid
                            w={'100%'}
                            templateRows="repeat(5, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(3, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px 388px 224px 388px 388px"
                            templateColumns="repeat(6, 1fr)"
                            gap={'4px 45px'}
                        >
                            <GridIdnoItem
                                fieldName="idno"
                                colSpan={2}
                                handleValidate={validateEmpty}
                                formlabel={'身分證字號'}
                                searchResult={searchResult}
                                setHumanToBeUpdated={setHumanToBeUpdated}
                                handleDebounceSearch={handleDebounceSearch}
                                formProps={formProps}
                            ></GridIdnoItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateEmpty}
                                fieldName="name"
                                formlabel="姓名"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="gender"
                                formlabel="性別"
                                inputComponent={
                                    <Select>
                                        <option value={'男'}>男</option>
                                        <option value={'女'}>女</option>
                                    </Select>
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="birthday"
                                formlabel="出生日期"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="bloodType"
                                formlabel="血型"
                                inputComponent={
                                    <Select>
                                        <option value={'A'}>A型</option>
                                        <option value={'B'}>B型</option>
                                        <option value={'AB'}>AB型</option>
                                        <option value={'O'}>O型</option>
                                    </Select>
                                }
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="tel"
                                formlabel="連絡電話"
                                inputComponent={<Input type={'tel'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="liaison"
                                formlabel="家屬聯絡人"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="emergencyTel"
                                formlabel={`緊急聯絡\n電話`}
                                inputComponent={<Input type={'tel'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={4}
                                fieldName="address"
                                formlabel="聯絡地址"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="hazardNotifyDate"
                                formlabel="危害告知日期"
                                inputComponent={<Input type={'date'} />}
                                helpText="*須有存查資料"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="supplierIndustrialSafetyNumber"
                                formlabel="供應商工安認證編號"
                                inputComponent={<Input type={'text'} />}
                                helpText="*須有存查資料"
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>

                            <GridTitle
                                colSpan={5}
                                title="一般安全衛生教育訓練（6小時）"
                            ></GridTitle>
                            <GridInputItem
                                colSpan={2}
                                fieldName="safetyHealthyEducationIssue"
                                formlabel={'發證/回訓'}
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'safetyHealthyEducationIssue',
                                                'sixStatus',
                                                3,
                                                'safetyHealthyEducationWithdraw'
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="safetyHealthyEducationWithdraw"
                                formlabel={'應回訓日期'}
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'safetyHealthyEducationWithdraw',
                                                'sixStatus',
                                                0
                                            );
                                        }}
                                    />
                                }
                                helpText="*三年減一天"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="sixStatus"
                                formlabel="6小時效期狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="laborInsuranceApplyDate"
                                formlabel={`勞保申請\n日期`}
                                inputComponent={<Input type={'date'} />}
                                helpText="*提供一個月內"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="laborAssociationDate"
                                formlabel={`工會申請\n日期`}
                                inputComponent={<Input type={'date'} />}
                                helpText="*提供一個月內"
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridTitle colSpan={6} title="主管證照"></GridTitle>
                            <GridInputItem
                                colSpan={2}
                                fieldName="certificationName"
                                formlabel="證照名稱"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="certificationIssue"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'certificationIssue',
                                                'certificationStatus',
                                                2,
                                                'certificationWithdraw'
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="certificationWithdraw"
                                formlabel="應回訓日期"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'certificationWithdraw',
                                                'certificationStatus',
                                                0
                                            );
                                        }}
                                    />
                                }
                                helpText="*兩年減一天"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="certificationStatus"
                                formlabel={`主管證照\n效期狀況`}
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效2年"
                            ></GridInputItem>
                            <GridItem colSpan={4}></GridItem>
                            <GridTitle
                                colSpan={6}
                                title="意外險有效期(1)"
                            ></GridTitle>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceStartOne"
                                formlabel="起始日"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceEndOne"
                                formlabel="截止日"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceAmountOne"
                                formlabel={`保險金額\n（萬元）`}
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceSignDateOne"
                                formlabel="加保日期"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceCompanyNameOne"
                                formlabel="保險公司"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridTitle
                                colSpan={6}
                                title="意外險有效期(2)"
                            ></GridTitle>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceStartTwo"
                                formlabel="起始日"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceEndTwo"
                                formlabel="截止日"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceAmountTwo"
                                formlabel={`保險金額\n（萬元）`}
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceSignDateTwo"
                                formlabel="加保日期"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceCompanyNameTwo"
                                formlabel="保險公司"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridTitle
                                colSpan={6}
                                title="意外險有效期(3)"
                            ></GridTitle>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceStartThree"
                                formlabel="起始日"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceEndThree"
                                formlabel="截止日"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceAmountThree"
                                formlabel={`保險金額\n（萬元）`}
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceSignDateThree"
                                formlabel="加保日期"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="accidentInsuranceCompanyNameThree"
                                formlabel="保險公司"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="contractingCompanyName"
                                formlabel="承攬公司"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="viceContractingCompanyName"
                                formlabel="次承攬公司"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridTitle
                                colSpan={2}
                                title="高空工作車(A)"
                            ></GridTitle>
                            <GridTitle
                                colSpan={2}
                                title="高處（施工架）(WAH)"
                            ></GridTitle>
                            <GridTitle
                                colSpan={2}
                                title="吊掛作業(L)"
                            ></GridTitle>
                            <GridInputItem
                                colSpan={2}
                                fieldName="aCertificationDate"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'aCertificationDate',
                                                'aStatus',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="wahCertificationDate"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'wahCertificationDate',
                                                'wahStatus',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="lCertificationDate"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'lCertificationDate',
                                                'lStatus',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="aStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="wahStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="lStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridTitle
                                colSpan={2}
                                title="侷限空間(C)"
                            ></GridTitle>
                            <GridTitle
                                colSpan={2}
                                title="有機溶劑(H)"
                            ></GridTitle>
                            <GridTitle
                                colSpan={2}
                                title="防爆區(Ex)"
                            ></GridTitle>
                            <GridInputItem
                                colSpan={2}
                                fieldName="cCertificationDate"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'cCertificationDate',
                                                'cStatus',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="hCertificationDate"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'hCertificationDate',
                                                'hStatus',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="exCertificationDate"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'exCertificationDate',
                                                'exStatus',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="cStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="hStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="exStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridTitle
                                colSpan={2}
                                title="營造業主管(S)"
                            ></GridTitle>
                            <GridTitle
                                colSpan={2}
                                title="施工架作業主管(SA)"
                            ></GridTitle>
                            <GridTitle
                                colSpan={2}
                                title="有機溶劑作業主管(OS)"
                            ></GridTitle>
                            <GridInputItem
                                colSpan={2}
                                fieldName="sCertificationDate"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'sCertificationDate',
                                                'sStatus',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="saCertificationDate"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'saCertificationDate',
                                                'saStatus',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="osCertificationDate"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'osCertificationDate',
                                                'osStatus',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="sStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="saStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="osStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridTitle
                                colSpan={2}
                                title="缺氧作業主管(O2)"
                            ></GridTitle>
                            <GridItem colSpan={4}></GridItem>
                            <GridInputItem
                                colSpan={2}
                                fieldName="o2CertificationDate"
                                formlabel="發證/回訓"
                                independent={false}
                                inputComponent={
                                    <Input
                                        type={'date'}
                                        onChange={(e) => {
                                            checkStatus(
                                                e,
                                                'o2CertificationDate',
                                                'o2Status',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridItem colSpan={4}></GridItem>
                            <GridInputItem
                                colSpan={2}
                                handleValidate={validateExpired}
                                fieldName="o2Status"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridItem colSpan={4}></GridItem>

                            <GridTitle
                                colSpan={6}
                                title="照片佐證資料"
                            ></GridTitle>

                            <GridFileItem
                                colSpan={3}
                                fieldName="PImg"
                                formlabel="個人照"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="LImg"
                                formlabel="勞保"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="IDFImg"
                                formlabel="身分證影本（正面）"
                                height={'210px'}
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="IDRImg"
                                formlabel="身分證影本（反面）"
                                height={'210px'}
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="F6Img"
                                formlabel="一般安全衛生教育訓練證明（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="R6Img"
                                formlabel="一般安全衛生教育訓練證明（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="G1Img"
                                formlabel="團保(1)"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="G2Img"
                                formlabel="團保(2)"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="G3Img"
                                formlabel="團保(3)"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            {fileStates.HImgs.map((_, index) => {
                                return (
                                    <GridFileItem
                                        key={index}
                                        colSpan={3}
                                        height={'388px'}
                                        fieldName={'HImgs'}
                                        formlabel={'個人健康檢查資料'}
                                        fileStates={fileStates}
                                        setFileStates={setFileStates}
                                        imgLoading={imgLoading}
                                        index={index}
                                    ></GridFileItem>
                                );
                            })}
                        </Grid>
                        <Grid
                            w={'100%'}
                            templateRows="388px"
                            templateColumns="repeat(6, 1fr)"
                            gap={'4px 45px'}
                        >
                            <GridFileItem
                                colSpan={3}
                                fieldName="MAFImg"
                                formlabel="主管證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="MARImg"
                                formlabel="主管證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="AFImg"
                                formlabel="高空工作車證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="ARImg"
                                formlabel="高空工作車證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="WAHFImg"
                                formlabel="高處施工架證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="WAHRImg"
                                formlabel="高處施工架證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="LFImg"
                                formlabel="吊掛作業證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="LRImg"
                                formlabel="吊掛作業證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="CFImg"
                                formlabel="侷限空間證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="CRImg"
                                formlabel="侷限空間證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="HFImg"
                                formlabel="有機溶劑證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="HRImg"
                                formlabel="有機溶劑證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="EXFImg"
                                formlabel="防爆區證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="EXRImg"
                                formlabel="防爆區證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="SFImg"
                                formlabel="營造業主管證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="SRImg"
                                formlabel="營造業主管證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="SAFImg"
                                formlabel="施工架作業主管證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="SARImg"
                                formlabel="施工架作業主管證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="OSFImg"
                                formlabel="有機溶劑作業主管證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="OSRImg"
                                formlabel="有機溶劑作業主管證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="O2FImg"
                                formlabel="缺氧作業主管證照（正面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="O2RImg"
                                formlabel="缺氧作業主管證照（反面）"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                        </Grid>
                    </Flex>
                </Form>
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent
                    border={'1px solid #667080'}
                    w={'47%'}
                    borderRadius={'10px'}
                    bg={'#FFFFFF'}
                    p={'30px 45px'}
                >
                    <ModalHeader p={0}>匯入人員資料</ModalHeader>
                    <ModalBody p={0}>
                        <Flex
                            direction={'column'}
                            justify={'center'}
                            align={'center'}
                            border={'1px dashed #667080'}
                            borderRadius={'10px'}
                            gap={'10px'}
                            mt={'17px'}
                            p={'41px 20px'}
                        >
                            <Text
                                fontWeight={400}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                textAlign={'center'}
                            >
                                請將資料拖拉到這裡上傳
                            </Text>
                            <Text
                                fontWeight={400}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                textAlign={'center'}
                            >
                                或
                            </Text>
                            <Button
                                width={'fit-content'}
                                fontWeight={400}
                                fontSize={'12px'}
                                lineHeight={'20px'}
                                variant={'outline'}
                                color={'#4C7DE7'}
                                border={'2px solid #4C7DE7'}
                            >
                                {zipFile ? zipFile.name : '選取檔案'}
                            </Button>
                            <Text
                                fontWeight={400}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                textAlign={'center'}
                            >
                                上傳檔案格式:.zip
                            </Text>
                            <Input
                                type={'file'}
                                accept={'.zip'}
                                pos={'absolute'}
                                h={'100%'}
                                w={'100%'}
                                opacity={0}
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setZipFile(e.target.files[0]);
                                    } else {
                                        setZipFile(undefined);
                                    }
                                }}
                            ></Input>
                        </Flex>
                    </ModalBody>

                    <ModalFooter
                        h="36px"
                        mt={'17px'}
                        p={0}
                        justifyContent={'space-between'}
                    >
                        <Button
                            onClick={() => {
                                onClose();
                                setZipFile(undefined);
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            bg={'#4C7DE7'}
                            color={'#FFFFFF'}
                            onClick={() => {
                                if (zipFile) {
                                    onClose();
                                    uploadHRZip({
                                        variables: {
                                            file: zipFile,
                                        },
                                    });
                                }
                            }}
                        >
                            確認
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {(submitLoading || uploadLoading) && <PageLoading />}
        </Flex>
    );
}
