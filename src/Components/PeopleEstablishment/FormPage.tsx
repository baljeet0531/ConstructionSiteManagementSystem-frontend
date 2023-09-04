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
import { CertTitleToCodeMap } from '../../Constants/PeopleManagement';

type imageType = keyof formFiles;
type formFileUrls = {
    [K in imageType]?: K extends 'HImgs' ? string[] : string;
};

const imageTypeArray: imageType[] = [
    'F6Img',
    'G1Imgs',
    'G2Imgs',
    'G3Imgs',
    'HImgs',
    'IDFImg',
    'IDRImg',
    'LImg',
    'PImg',
    'R6Img',
    'AFImg',
    'ARImg',
    'BOSHFImg',
    'BOSHRImg',
    'AOSFImg',
    'AOSRImg',
    'AOHFImg',
    'AOHRImg',
    'FRFImg',
    'FRRImg',
    'O2FImg',
    'O2RImg',
    'OSFImg',
    'OSRImg',
    'SAFImg',
    'SARImg',
    'SFImg',
    'SRImg',
    'SSAFImg',
    'SSARImg',
    'MAFImg',
    'MARImg',
    'RFImg',
    'RRImg',
    'FSFImg',
    'FSRImg',
    'PEFImg',
    'PERImg',
    'RSFImg',
    'RSRImg',
    'DWFImg',
    'DWRImg',
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
    query HumanResource($idno: String, $no: Int) {
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
            PImg
            LImg
            IDFImg
            IDRImg
            F6Img
            R6Img
            HImgs
            G1Imgs
            G2Imgs
            G3Imgs
            AFImg
            ARImg
            BOSHRImg
            BOSHFImg
            AOSFImg
            AOSRImg
            AOHFImg
            AOHRImg
            FRFImg
            FRRImg
            O2FImg
            O2RImg
            OSFImg
            OSRImg
            SAFImg
            SARImg
            SFImg
            SRImg
            MAFImg
            MARImg
            RFImg
            RRImg
            SSAFImg
            SSARImg
            FSFImg
            FSRImg
            PEFImg
            PERImg
            RSFImg
            RSRImg
            DWFImg
            DWRImg
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
        const withDrawDate = withdraw
            ? date.add(year, 'year').subtract(1, 'day')
            : date;

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
                p={'25px'}
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
                p={'25px'}
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
                            templateRows="repeat(5, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(3, 50px)"
                            templateColumns="repeat(6, 1fr)"
                            gap={'4px'}
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
                                formlabel={'發證'}
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
                                formlabel={'回訓'}
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
                                helpText="*3年減一天"
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
                        </Grid>
                        {Object.entries(CertTitleToCodeMap).map(
                            ([title, { code, expiredYear }]) => {
                                return (
                                    <Grid
                                        key={title}
                                        w={'100%'}
                                        templateRows={
                                            title === '作業主管證照'
                                                ? '20px 50px 50px'
                                                : '20px 50px'
                                        }
                                        templateColumns="repeat(6, 1fr)"
                                        gap={'4px'}
                                    >
                                        <GridTitle
                                            colSpan={5}
                                            title={`${title}(${code})`}
                                        ></GridTitle>
                                        {title === '作業主管證照' && (
                                            <GridInputItem
                                                colSpan={2}
                                                fieldName={'certificationName'}
                                                formlabel={'證照名稱'}
                                                inputComponent={
                                                    <Input type={'text'} />
                                                }
                                            ></GridInputItem>
                                        )}
                                        <GridInputItem
                                            colSpan={2}
                                            fieldName={`${code}CertificationDate`}
                                            formlabel={'發證'}
                                            independent={false}
                                            inputComponent={
                                                <Input
                                                    type={'date'}
                                                    onChange={(e) => {
                                                        checkStatus(
                                                            e,
                                                            `${code}CertificationDate`,
                                                            `${code}Status`,
                                                            expiredYear,
                                                            `${code}WithdrawDate`
                                                        );
                                                    }}
                                                />
                                            }
                                        ></GridInputItem>
                                        <GridInputItem
                                            colSpan={2}
                                            fieldName={`${code}WithdrawDate`}
                                            formlabel={'回訓'}
                                            independent={false}
                                            inputComponent={
                                                <Input
                                                    type={'date'}
                                                    onChange={(e) => {
                                                        checkStatus(
                                                            e,
                                                            `${code}WithdrawDate`,
                                                            `${code}Status`,
                                                            0
                                                        );
                                                    }}
                                                />
                                            }
                                            helpText={`*${expiredYear}年減一天`}
                                        ></GridInputItem>
                                        <GridInputItem
                                            colSpan={2}
                                            handleValidate={validateExpired}
                                            fieldName={`${code}Status`}
                                            formlabel="效期狀況"
                                            inputComponent={
                                                <Input type={'text'} disabled />
                                            }
                                            helpText={`*期效${expiredYear}年`}
                                        ></GridInputItem>
                                        {title === '作業主管證照' && (
                                            <GridItem colSpan={4}></GridItem>
                                        )}
                                    </Grid>
                                );
                            }
                        )}

                        <Grid
                            w={'100%'}
                            templateRows="20px 388px 224px 388px 388px"
                            templateColumns="repeat(6, 1fr)"
                            gap={'4px'}
                        >
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
                                fieldName="G1Imgs"
                                formlabel="團保(1)"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="G2Imgs"
                                formlabel="團保(2)"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                colSpan={3}
                                fieldName="G3Imgs"
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
                        {Object.entries(CertTitleToCodeMap).map(
                            ([title, { code }]) => (
                                <Grid
                                    key={title}
                                    w={'100%'}
                                    templateRows="388px"
                                    templateColumns="repeat(6, 1fr)"
                                    gap={'4px'}
                                >
                                    <GridFileItem
                                        colSpan={3}
                                        fieldName={
                                            `${code.toUpperCase()}FImg` as keyof formFiles
                                        }
                                        formlabel={`${title}（正面）`}
                                        fileStates={fileStates}
                                        setFileStates={setFileStates}
                                        imgLoading={imgLoading}
                                    ></GridFileItem>
                                    <GridFileItem
                                        colSpan={3}
                                        fieldName={
                                            `${code.toUpperCase()}RImg` as keyof formFiles
                                        }
                                        formlabel={`${title}（反面）`}
                                        fileStates={fileStates}
                                        setFileStates={setFileStates}
                                        imgLoading={imgLoading}
                                    ></GridFileItem>
                                </Grid>
                            )
                        )}
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
