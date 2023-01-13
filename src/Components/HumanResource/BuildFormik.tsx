import { Formik } from 'formik';
import React from 'react';
import FormPage from './FormPage';
import { gql, useMutation } from '@apollo/client';

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
    safetyHealthyEducationStatus: string | undefined;
    certificationStatus: string | undefined;
    aCertificationStatus: string | undefined;
    wahCertificationStatus: string | undefined;
    lCertificationStatus: string | undefined;
    cCertificationStatus: string | undefined;
    hCertificationStatus: string | undefined;
    exCertificationStatus: string | undefined;
    sCertificationStatus: string | undefined;
    saCertificationStatus: string | undefined;
    osCertificationStatus: string | undefined;
    o2CertificationStatus: string | undefined;
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

export default function BuildFormik() {
    const initialValues: formValues = {
        idno: '',
        name: '',
        gender: '男',
        birthday: '',
        bloodType: 'A型',
        tel: '',
        liaison: '',
        emergencyTel: '',
        address: '',
        hazardNotifyDate: '',
        supplierIndustrialSafetyNumber: '',

        safetyHealthyEducationIssue: '',
        safetyHealthyEducationWithdraw: '',
        safetyHealthyEducationStatus: '',

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
        aCertificationStatus: '',
        wahCertificationDate: '',
        wahCertificationStatus: '',
        lCertificationDate: '',
        lCertificationStatus: '',
        cCertificationDate: '',
        cCertificationStatus: '',
        hCertificationDate: '',
        hCertificationStatus: '',
        exCertificationDate: '',
        exCertificationStatus: '',
        sCertificationDate: '',
        sCertificationStatus: '',
        saCertificationDate: '',
        saCertificationStatus: '',
        osCertificationDate: '',
        osCertificationStatus: '',
        o2CertificationDate: '',
        o2CertificationStatus: '',
    };
    const [fileStates, setFileStates] = React.useState<formFiles>({
        F6Img: undefined,
        GImg: undefined,
        HImgs: [],
        IDFImg: undefined,
        IDRImg: undefined,
        LImg: undefined,
        PImg: undefined,
        R6Img: undefined,
    });

    const [createHumanResource] = useMutation(CREATE_HUMAN_RESOURCE, {
        // onCompleted: () => {
        //     console.log();
        // },
        onCompleted: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log(err);
        },
    });

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

                createHumanResource({
                    variables: { ...filteredValues, ...fileStates },
                });
                actions.setSubmitting(false);
            }}
        >
            {(props) => (
                <FormPage
                    formProps={props}
                    fileStates={fileStates}
                    setFileStates={setFileStates}
                ></FormPage>
            )}
        </Formik>
    );
}
