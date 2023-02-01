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
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    useToast,
    Spinner,
    Box,
} from '@chakra-ui/react';
import { Form, FormikProps } from 'formik';
import { formFiles, formValues } from './PeopleEstablishment';
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

type imageType =
    | 'F6Img'
    | 'GImg'
    | 'HImgs'
    | 'IDFImg'
    | 'IDRImg'
    | 'LImg'
    | 'PImg'
    | 'R6Img';

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
            F6Img
            GImg
            HImgs
            IDFImg
            IDRImg
            LImg
            PImg
            R6Img
        }
    }
`;

export default function FromPage(props: {
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
    function checkStatus(
        e: React.ChangeEvent<HTMLInputElement>,
        target: string,
        status: string,
        year: number,
        withdraw?: string
    ) {
        const date = new Date(e.target.value);
        const withDrawDate = new Date(
            date.getFullYear() + year,
            date.getMonth(),
            date.getDate() +
                (target == 'certificationWithdraw' ||
                target == 'safetyHealthyEducationWithdraw'
                    ? 1
                    : 0),
            0,
            0,
            0,
            -1
        );

        const now = new Date();
        const diff = now.valueOf() - withDrawDate.valueOf();
        formProps.setValues({
            ...formProps.values,
            [target]: date.toISOString().split('T')[0],
            ...(withdraw && {
                [withdraw]: withDrawDate.toISOString().split('T')[0],
            }),
            [status]:
                diff <= 0 ? 'OK' : `已過期${Math.ceil(diff / 86400000)}天`,
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
                    toast({
                        title: uploadHRZip.message,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
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

    const [filePath, setFilePath] = React.useState<{
        F6Img: string;
        GImg: string;
        HImgs: string[];
        IDFImg: string;
        IDRImg: string;
        LImg: string;
        PImg: string;
        R6Img: string;
    }>({
        F6Img: '',
        GImg: '',
        HImgs: [''],
        IDFImg: '',
        IDRImg: '',
        LImg: '',
        PImg: '',
        R6Img: '',
    });

    const [getHumanresource] = useLazyQuery(GET_HUMAN_RESOURCE, {
        onCompleted: ({ humanresource }) => {
            const {
                F6Img,
                GImg,
                HImgs,
                IDFImg,
                IDRImg,
                LImg,
                PImg,
                R6Img,
                ...rest
            } = humanresource[0];

            setFilePath({
                F6Img: F6Img || '',
                GImg: GImg || '',
                HImgs: HImgs ? [...HImgs, ''] : [''],
                IDFImg: IDFImg || '',
                IDRImg: IDRImg || '',
                LImg: LImg || '',
                PImg: PImg || '',
                R6Img: R6Img || '',
            });
            Object.keys(rest).forEach((key) => {
                if (
                    rest[key] == null ||
                    rest[key] == '0001-01-01' ||
                    rest[key] == '無法判斷：發證/回訓 月/日 輸入不合理'
                )
                    rest[key] = '';
            });
            formProps.setValues({ ...rest });
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

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        let setFiles = true;
        let newFileStates: formFiles = {
            F6Img: undefined,
            GImg: undefined,
            HImgs: [],
            IDFImg: undefined,
            IDRImg: undefined,
            LImg: undefined,
            PImg: undefined,
            R6Img: undefined,
        };
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
                    for await (const path of filePath.HImgs) {
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
                <Flex gap={'10px'}>
                    <Button
                        leftIcon={<ReplyIcon />}
                        bg={'rgba(102, 112, 128, 0.1)'}
                        color={'#667080'}
                        border={'2px solid #919AA9'}
                        onClick={onOpen}
                    >
                        匯入
                    </Button>
                    <Button
                        leftIcon={<EditIcon />}
                        variant={'buttonBlueSolid'}
                        isLoading={formProps.isSubmitting}
                        onClick={formProps.submitForm}
                        type="submit"
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
                        <Text pb={'25px'} fontSize={'2.25rem'}>
                            個人資料
                        </Text>
                        <Grid
                            w={'100%'}
                            templateRows="repeat(5, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(3, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px 388px 224px 388px 388px"
                            templateColumns="repeat(6, 1fr)"
                            gap={'4px 45px'}
                        >
                            <GridIdnoItem
                                fieldName="idno"
                                handleValidate={validateEmpty}
                                formlabel={'身分證字號'}
                                searchResult={searchResult}
                                setHumanToBeUpdated={setHumanToBeUpdated}
                                handleDebounceSearch={handleDebounceSearch}
                                setSearchResult={setSearchResult}
                                formProps={formProps}
                                gridRange={[1, 2, 1, 3]}
                            ></GridIdnoItem>
                            <GridInputItem
                                gridRange={[1, 2, 3, 5]}
                                handleValidate={(value: any) =>
                                    !value && '欄位不能為空'
                                }
                                fieldName="name"
                                formlabel="姓名"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[1, 2, 5, 7]}
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
                                gridRange={[2, 3, 1, 3]}
                                fieldName="birthday"
                                formlabel="出生日期"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[2, 3, 3, 5]}
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
                                gridRange={[3, 4, 1, 3]}
                                fieldName="tel"
                                formlabel="連絡電話"
                                inputComponent={<Input type={'tel'} />}
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[3, 4, 3, 5]}
                                fieldName="liaison"
                                formlabel="家屬聯絡人"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[3, 4, 5, 7]}
                                fieldName="emergencyTel"
                                formlabel={`緊急聯絡\n電話`}
                                inputComponent={<Input type={'tel'} />}
                            ></GridInputItem>

                            <GridInputItem
                                gridRange={[4, 5, 1, 5]}
                                fieldName="address"
                                formlabel="聯絡地址"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridInputItem
                                gridRange={[5, 6, 1, 3]}
                                fieldName="hazardNotifyDate"
                                formlabel="危害告知日期"
                                inputComponent={<Input type={'date'} />}
                                helpText="*須有存查資料"
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[5, 6, 3, 5]}
                                fieldName="supplierIndustrialSafetyNumber"
                                formlabel="供應商工安認證編號"
                                inputComponent={<Input type={'text'} />}
                                helpText="*須有存查資料"
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridTitle
                                gridRange={[6, 7, 1, 6]}
                                title="一般安全衛生教育訓練（6小時）"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[7, 8, 1, 3]}
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
                                gridRange={[7, 8, 3, 5]}
                                fieldName="safetyHealthyEducationWithdraw"
                                formlabel={'應回訓日期'}
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
                                gridRange={[7, 8, 5, 7]}
                                handleValidate={validateExpired}
                                fieldName="sixStatus"
                                formlabel="6小時效期狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[8, 9, 1, 3]}
                                fieldName="laborInsuranceApplyDate"
                                formlabel={`勞保申請\n日期`}
                                inputComponent={<Input type={'date'} />}
                                helpText="*提供一個月內"
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[8, 9, 3, 5]}
                                fieldName="laborAssociationDate"
                                formlabel={`工會申請\n日期`}
                                inputComponent={<Input type={'date'} />}
                                helpText="*提供一個月內"
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridTitle
                                gridRange={[9, 10, 1, 5]}
                                title="主管證照"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[10, 11, 1, 3]}
                                fieldName="certificationName"
                                formlabel="證照名稱"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[10, 11, 3, 5]}
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
                                gridRange={[10, 11, 5, 7]}
                                fieldName="certificationWithdraw"
                                formlabel="應回訓日期"
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
                                gridRange={[11, 12, 1, 3]}
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
                                gridRange={[12, 13, 1, 5]}
                                title="意外險有效期"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[13, 14, 1, 3]}
                                fieldName="accidentInsuranceStart"
                                formlabel="起始日"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[13, 14, 3, 5]}
                                fieldName="accidentInsuranceEnd"
                                formlabel="截止日"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[13, 14, 5, 7]}
                                fieldName="accidentInsuranceAmount"
                                formlabel={`保險金額\n（萬元）`}
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[14, 15, 1, 3]}
                                fieldName="accidentInsuranceSignDate"
                                formlabel="加保日期"
                                inputComponent={<Input type={'date'} />}
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[14, 15, 3, 5]}
                                fieldName="accidentInsuranceCompanyName"
                                formlabel="保險公司"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridInputItem
                                gridRange={[15, 16, 1, 3]}
                                fieldName="contractingCompanyName"
                                formlabel="承攬公司"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[15, 16, 3, 5]}
                                fieldName="viceContractingCompanyName"
                                formlabel="次承攬公司"
                                inputComponent={<Input type={'text'} />}
                            ></GridInputItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridTitle
                                gridRange={[16, 17, 1, 3]}
                                title="高空工作車(A)"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[17, 18, 1, 3]}
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
                                gridRange={[18, 19, 1, 3]}
                                handleValidate={validateExpired}
                                fieldName="aStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>

                            <GridTitle
                                gridRange={[16, 17, 3, 5]}
                                title="高處（施工架）(WAH)"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[17, 18, 3, 5]}
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
                                gridRange={[18, 19, 3, 5]}
                                handleValidate={validateExpired}
                                fieldName="wahStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>

                            <GridTitle
                                gridRange={[16, 17, 5, 7]}
                                title="吊掛作業(L)"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[17, 18, 5, 7]}
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
                                gridRange={[18, 19, 5, 7]}
                                handleValidate={validateExpired}
                                fieldName="lStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>

                            <GridTitle
                                gridRange={[19, 20, 1, 3]}
                                title="侷限空間(C)"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[20, 21, 1, 3]}
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
                                gridRange={[21, 22, 1, 3]}
                                handleValidate={validateExpired}
                                fieldName="cStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>

                            <GridTitle
                                gridRange={[19, 20, 3, 5]}
                                title="有機溶劑(H)"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[20, 21, 3, 5]}
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
                                gridRange={[21, 22, 3, 5]}
                                handleValidate={validateExpired}
                                fieldName="hStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>

                            <GridTitle
                                gridRange={[19, 20, 5, 7]}
                                title="防爆區(Ex)"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[20, 21, 5, 7]}
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
                                gridRange={[21, 22, 5, 7]}
                                handleValidate={validateExpired}
                                fieldName="exStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>

                            <GridTitle
                                gridRange={[22, 23, 1, 3]}
                                title="營造業主管(S)"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[23, 24, 1, 3]}
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
                                gridRange={[24, 25, 1, 3]}
                                handleValidate={validateExpired}
                                fieldName="sStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>

                            <GridTitle
                                gridRange={[22, 23, 3, 5]}
                                title="施工架作業主管(SA)"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[23, 24, 3, 5]}
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
                                                'sStatus',
                                                3
                                            );
                                        }}
                                    />
                                }
                            ></GridInputItem>
                            <GridInputItem
                                gridRange={[24, 25, 3, 5]}
                                handleValidate={validateExpired}
                                fieldName="sStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>

                            <GridTitle
                                gridRange={[22, 23, 5, 7]}
                                title="有機溶劑作業主管(OS)"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[23, 24, 5, 7]}
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
                                gridRange={[24, 25, 5, 7]}
                                handleValidate={validateExpired}
                                fieldName="osStatus"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>

                            <GridTitle
                                gridRange={[25, 26, 1, 3]}
                                title="缺氧作業主管(O2)"
                            ></GridTitle>
                            <GridInputItem
                                gridRange={[26, 27, 1, 3]}
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
                            <GridInputItem
                                gridRange={[27, 28, 1, 3]}
                                handleValidate={validateExpired}
                                fieldName="o2Status"
                                formlabel="期效狀況"
                                inputComponent={
                                    <Input type={'text'} disabled />
                                }
                                helpText="*期效3年"
                            ></GridInputItem>

                            <GridTitle
                                gridRange={[28, 29, 1, 5]}
                                title="照片佐證資料"
                            ></GridTitle>

                            <GridFileItem
                                gridRange={[29, 30, 1, 4]}
                                fieldName="PImg"
                                formlabel="個人照"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                gridRange={[29, 30, 4, 7]}
                                fieldName="LImg"
                                formlabel="勞保"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>

                            <GridFileItem
                                gridRange={[30, 31, 1, 4]}
                                fieldName="IDFImg"
                                formlabel="身分證影本(正面)"
                                height={'210px'}
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>
                            <GridFileItem
                                gridRange={[30, 31, 4, 7]}
                                fieldName="IDRImg"
                                formlabel="身分證影本(反面)"
                                height={'210px'}
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>

                            <GridFileItem
                                gridRange={[31, 32, 1, 4]}
                                fieldName="F6Img"
                                formlabel="一般安全衛生教育訓練證明(正面)"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>

                            <GridFileItem
                                gridRange={[31, 32, 4, 7]}
                                fieldName="R6Img"
                                formlabel="一般安全衛生教育訓練證明(反面)"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>

                            <GridFileItem
                                gridRange={[32, 33, 1, 4]}
                                fieldName="GImg"
                                formlabel="團保"
                                fileStates={fileStates}
                                setFileStates={setFileStates}
                                imgLoading={imgLoading}
                            ></GridFileItem>

                            <GridItem colSpan={4} rowSpan={3}></GridItem>
                            {fileStates.HImgs.map((file, index) => {
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
            {(submitLoading || uploadLoading) && (
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
