import { Formik } from 'formik';
import React from 'react';
import FormPage from './FormPage';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { ALL_HUMAN_RESOURCE } from '../PeopleOverview/PeopleOverview';

interface humanInfoValues {
    aCertificationDate: Date | string | undefined;
    accidentInsuranceAmount: Number | string | undefined;
    accidentInsuranceCompanyName: String | undefined;
    accidentInsuranceEnd: Date | string | undefined;
    accidentInsuranceSignDate: Date | string | undefined;
    accidentInsuranceStart: Date | string | undefined;
    address: String | undefined;
    birthday: Date | string | undefined;
    bloodType: String | undefined;
    cCertificationDate: Date | string | undefined;
    certificationIssue: Date | string | undefined;
    certificationName: String | undefined;
    certificationWithdraw: Date | string | undefined;
    contractingCompanyName: String | undefined;
    emergencyTel: String | undefined;
    exCertificationDate: Date | string | undefined;
    gender: String | undefined;
    hCertificationDate: Date | string | undefined;
    hazardNotifyDate: Date | string | undefined;
    idno: String | undefined;
    lCertificationDate: Date | string | undefined;
    laborAssociationDate: Date | string | undefined;
    laborInsuranceApplyDate: Date | string | undefined;
    liaison: String | undefined;
    name: String | undefined;
    o2CertificationDate: Date | string | undefined;
    osCertificationDate: Date | string | undefined;
    sCertificationDate: Date | string | undefined;
    saCertificationDate: Date | string | undefined;
    safetyHealthyEducationIssue: Date | string | undefined;
    safetyHealthyEducationWithdraw: Date | string | undefined;
    supplierIndustrialSafetyNumber: String | undefined;
    tel: String | undefined;
    viceContractingCompanyName: String | undefined;
    wahCertificationDate: Date | string | undefined;
}

export interface formValues extends humanInfoValues {
    sixStatus: string | undefined;
    certificationStatus: string | undefined;
    aStatus: string | undefined;
    wahStatus: string | undefined;
    lStatus: string | undefined;
    cStatus: string | undefined;
    hStatus: string | undefined;
    exStatus: string | undefined;
    sStatus: string | undefined;
    saStatus: string | undefined;
    osStatus: string | undefined;
    o2Status: string | undefined;
}

export interface formFiles {
    F6Img: File | undefined;
    GImg: File | undefined;
    HImgs: (File | undefined)[];
    IDFImg: File | undefined;
    IDRImg: File | undefined;
    LImg: File | undefined;
    PImg: File | undefined;
    R6Img: File | undefined;
}
const CREATE_HUMAN_RESOURCE = gql`
    mutation createHumanResource(
        $F6Img: Upload
        $GImg: Upload
        $HImgs: [Upload]
        $IDFImg: Upload
        $IDRImg: Upload
        $LImg: Upload
        $PImg: Upload
        $R6Img: Upload
        $aCertificationDate: Date
        $accidentInsuranceAmount: String
        $accidentInsuranceCompanyName: String
        $accidentInsuranceEnd: Date
        $accidentInsuranceSignDate: Date
        $accidentInsuranceStart: Date
        $address: String
        $birthday: Date
        $bloodType: String
        $cCertificationDate: Date
        $certificationIssue: Date
        $certificationName: String
        $certificationWithdraw: Date
        $contractingCompanyName: String
        $emergencyTel: String
        $exCertificationDate: Date
        $gender: String
        $hCertificationDate: Date
        $hazardNotifyDate: Date
        $idno: String!
        $lCertificationDate: Date
        $laborAssociationDate: Date
        $laborInsuranceApplyDate: Date
        $liaison: String
        $name: String!
        $o2CertificationDate: Date
        $osCertificationDate: Date
        $sCertificationDate: Date
        $saCertificationDate: Date
        $safetyHealthyEducationIssue: Date
        $safetyHealthyEducationWithdraw: Date
        $supplierIndustrialSafetyNumber: String
        $tel: String
        $viceContractingCompanyName: String
        $wahCertificationDate: Date
    ) {
        createHumanResource(
            F6Img: $F6Img
            GImg: $GImg
            HImgs: $HImgs
            IDFImg: $IDFImg
            IDRImg: $IDRImg
            LImg: $LImg
            PImg: $PImg
            R6Img: $R6Img
            aCertificationDate: $aCertificationDate
            accidentInsuranceAmount: $accidentInsuranceAmount
            accidentInsuranceCompanyName: $accidentInsuranceCompanyName
            accidentInsuranceEnd: $accidentInsuranceEnd
            accidentInsuranceSignDate: $accidentInsuranceSignDate
            accidentInsuranceStart: $accidentInsuranceStart
            address: $address
            birthday: $birthday
            bloodType: $bloodType
            cCertificationDate: $cCertificationDate
            certificationIssue: $certificationIssue
            certificationName: $certificationName
            certificationWithdraw: $certificationWithdraw
            contractingCompanyName: $contractingCompanyName
            emergencyTel: $emergencyTel
            exCertificationDate: $exCertificationDate
            gender: $gender
            hCertificationDate: $hCertificationDate
            hazardNotifyDate: $hazardNotifyDate
            idno: $idno
            lCertificationDate: $lCertificationDate
            laborAssociationDate: $laborAssociationDate
            laborInsuranceApplyDate: $laborInsuranceApplyDate
            liaison: $liaison
            name: $name
            o2CertificationDate: $o2CertificationDate
            osCertificationDate: $osCertificationDate
            sCertificationDate: $sCertificationDate
            saCertificationDate: $saCertificationDate
            safetyHealthyEducationIssue: $safetyHealthyEducationIssue
            safetyHealthyEducationWithdraw: $safetyHealthyEducationWithdraw
            supplierIndustrialSafetyNumber: $supplierIndustrialSafetyNumber
            tel: $tel
            viceContractingCompanyName: $viceContractingCompanyName
            wahCertificationDate: $wahCertificationDate
        ) {
            ok
            message
        }
    }
`;
const UPDATE_HUMAN_RESOURCE = gql`
    mutation UpdateHumanResource(
        $F6Img: Upload
        $GImg: Upload
        $HImgs: [Upload]
        $IDFImg: Upload
        $IDRImg: Upload
        $LImg: Upload
        $PImg: Upload
        $R6Img: Upload
        $aCertificationDate: Date
        $accidentInsuranceAmount: String
        $accidentInsuranceCompanyName: String
        $accidentInsuranceEnd: Date
        $accidentInsuranceSignDate: Date
        $accidentInsuranceStart: Date
        $address: String
        $birthday: Date
        $bloodType: String
        $cCertificationDate: Date
        $certificationIssue: Date
        $certificationName: String
        $certificationWithdraw: Date
        $contractingCompanyName: String
        $emergencyTel: String
        $exCertificationDate: Date
        $gender: String
        $hCertificationDate: Date
        $hazardNotifyDate: Date
        $idno: String!
        $lCertificationDate: Date
        $laborAssociationDate: Date
        $laborInsuranceApplyDate: Date
        $liaison: String
        $name: String!
        $o2CertificationDate: Date
        $osCertificationDate: Date
        $sCertificationDate: Date
        $saCertificationDate: Date
        $safetyHealthyEducationIssue: Date
        $safetyHealthyEducationWithdraw: Date
        $supplierIndustrialSafetyNumber: String
        $tel: String
        $viceContractingCompanyName: String
        $wahCertificationDate: Date
    ) {
        updateHumanResource(
            F6Img: $F6Img
            GImg: $GImg
            HImgs: $HImgs
            IDFImg: $IDFImg
            IDRImg: $IDRImg
            LImg: $LImg
            PImg: $PImg
            R6Img: $R6Img
            aCertificationDate: $aCertificationDate
            accidentInsuranceAmount: $accidentInsuranceAmount
            accidentInsuranceCompanyName: $accidentInsuranceCompanyName
            accidentInsuranceEnd: $accidentInsuranceEnd
            accidentInsuranceSignDate: $accidentInsuranceSignDate
            accidentInsuranceStart: $accidentInsuranceStart
            address: $address
            birthday: $birthday
            bloodType: $bloodType
            cCertificationDate: $cCertificationDate
            certificationIssue: $certificationIssue
            certificationName: $certificationName
            certificationWithdraw: $certificationWithdraw
            contractingCompanyName: $contractingCompanyName
            emergencyTel: $emergencyTel
            exCertificationDate: $exCertificationDate
            gender: $gender
            hCertificationDate: $hCertificationDate
            hazardNotifyDate: $hazardNotifyDate
            idno: $idno
            lCertificationDate: $lCertificationDate
            laborAssociationDate: $laborAssociationDate
            laborInsuranceApplyDate: $laborInsuranceApplyDate
            liaison: $liaison
            name: $name
            o2CertificationDate: $o2CertificationDate
            osCertificationDate: $osCertificationDate
            sCertificationDate: $sCertificationDate
            saCertificationDate: $saCertificationDate
            safetyHealthyEducationIssue: $safetyHealthyEducationIssue
            safetyHealthyEducationWithdraw: $safetyHealthyEducationWithdraw
            supplierIndustrialSafetyNumber: $supplierIndustrialSafetyNumber
            tel: $tel
            viceContractingCompanyName: $viceContractingCompanyName
            wahCertificationDate: $wahCertificationDate
        ) {
            ok
            message
        }
    }
`;

export default function BuildFormik(props: {
    initialHuman?: { no: string; idno: string };
}) {
    const { initialHuman } = props;

    const [humanToBeUpdated, setHumanToBeUpdated] = React.useState<
        { no: string; idno: string } | undefined
    >(initialHuman);

    const initialValues: formValues = {
        idno: '',
        name: '',
        gender: '男',
        birthday: '',
        bloodType: 'A',
        tel: '',
        liaison: '',
        emergencyTel: '',
        address: '',
        hazardNotifyDate: '',
        supplierIndustrialSafetyNumber: '',

        safetyHealthyEducationIssue: '',
        safetyHealthyEducationWithdraw: '',
        sixStatus: '',

        laborInsuranceApplyDate: '',
        laborAssociationDate: '',

        certificationName: '',
        certificationIssue: '',
        certificationWithdraw: '',
        certificationStatus: '',

        accidentInsuranceStart: '',
        accidentInsuranceEnd: '',
        accidentInsuranceAmount: '',
        accidentInsuranceSignDate: '',
        accidentInsuranceCompanyName: '',

        contractingCompanyName: '',
        viceContractingCompanyName: '',

        aCertificationDate: '',
        aStatus: '',
        wahCertificationDate: '',
        wahStatus: '',
        lCertificationDate: '',
        lStatus: '',
        cCertificationDate: '',
        cStatus: '',
        hCertificationDate: '',
        hStatus: '',
        exCertificationDate: '',
        exStatus: '',
        sCertificationDate: '',
        sStatus: '',
        saCertificationDate: '',
        saStatus: '',
        osCertificationDate: '',
        osStatus: '',
        o2CertificationDate: '',
        o2Status: '',
    };

    const [fileStates, setFileStates] = React.useState<formFiles>({
        F6Img: undefined,
        GImg: undefined,
        HImgs: [undefined],
        IDFImg: undefined,
        IDRImg: undefined,
        LImg: undefined,
        PImg: undefined,
        R6Img: undefined,
    });

    const toast = useToast();
    const [createHumanResource, { loading: createLoading }] = useMutation(
        CREATE_HUMAN_RESOURCE
    );

    const [updateHumanResource, { loading: updateLoading }] = useMutation(
        UPDATE_HUMAN_RESOURCE
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);

                let filteredValues: any = {};
                for (let props in values) {
                    if (
                        values[props as keyof formValues] != '' &&
                        props.slice(-6, 0) != 'Status'
                    ) {
                        filteredValues[props] =
                            values[props as keyof formValues];
                    }
                }
                const { HImgs, ...rest } = fileStates;

                const handleCompeleted = (message: string) => {
                    toast({
                        title: message,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    setFileStates({
                        F6Img: undefined,
                        GImg: undefined,
                        HImgs: [undefined],
                        IDFImg: undefined,
                        IDRImg: undefined,
                        LImg: undefined,
                        PImg: undefined,
                        R6Img: undefined,
                    });
                    setHumanToBeUpdated(undefined);
                    actions.resetForm();
                };
                const handleErr = (err: ApolloError) => {
                    console.log(err);
                    toast({
                        title: '錯誤',
                        description: `${err}`,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                };
                if (humanToBeUpdated && humanToBeUpdated.no == '') {
                    updateHumanResource({
                        variables: {
                            ...filteredValues,
                            ...rest,
                            HImgs: HImgs.slice(0, -1),
                        },
                        onCompleted: ({ updateHumanResource }) => {
                            if (updateHumanResource.ok) {
                                handleCompeleted(updateHumanResource.message);
                            }
                        },
                        onError: handleErr,
                        refetchQueries: [ALL_HUMAN_RESOURCE],
                    });
                } else {
                    createHumanResource({
                        variables: {
                            ...filteredValues,
                            ...rest,
                            HImgs: HImgs.slice(0, -1),
                        },
                        onCompleted: ({ createHumanResource }) => {
                            if (createHumanResource.ok) {
                                handleCompeleted(createHumanResource.message);
                            }
                        },
                        onError: handleErr,
                        refetchQueries: [ALL_HUMAN_RESOURCE],
                    });
                }
                actions.setSubmitting(false);
            }}
        >
            {(props) => {
                return (
                    <FormPage
                        formProps={props}
                        fileStates={fileStates}
                        setFileStates={setFileStates}
                        humanToBeUpdated={humanToBeUpdated}
                        setHumanToBeUpdated={setHumanToBeUpdated}
                        submitLoading={createLoading || updateLoading}
                    ></FormPage>
                );
            }}
        </Formik>
    );
}
