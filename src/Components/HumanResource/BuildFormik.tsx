import { Formik } from 'formik';
import React from 'react';
import FormPage from './FormPage';

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
    HImgs: (string | ArrayBuffer | File | null)[];
    IDFImg: File | undefined;
    IDRImg: File | undefined;
    LImg: File | undefined;
    PImg: File | undefined;
    R6Img: File | undefined;
}

export default function () {
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
        safetyHealthyEducationStatus: '', //

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

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    actions.setSubmitting(true);
                    console.log(
                        JSON.stringify({ ...values, ...fileStates }, null, 2)
                    );
                    actions.setSubmitting(false);
                }, 1000);
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
