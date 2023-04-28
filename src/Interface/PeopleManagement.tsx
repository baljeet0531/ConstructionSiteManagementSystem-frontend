export interface humanInfoValues {
    aCertificationDate: Date | string | undefined;
    accidentInsuranceAmountOne: Number | string | undefined;
    accidentInsuranceCompanyNameOne: String | undefined;
    accidentInsuranceEndOne: Date | string | undefined;
    accidentInsuranceSignDateOne: Date | string | undefined;
    accidentInsuranceStartOne: Date | string | undefined;
    accidentInsuranceAmountTwo: Number | string | undefined;
    accidentInsuranceCompanyNameTwo: String | undefined;
    accidentInsuranceEndTwo: Date | string | undefined;
    accidentInsuranceSignDateTwo: Date | string | undefined;
    accidentInsuranceStartTwo: Date | string | undefined;
    accidentInsuranceAmountThree: Number | string | undefined;
    accidentInsuranceCompanyNameThree: String | undefined;
    accidentInsuranceEndThree: Date | string | undefined;
    accidentInsuranceSignDateThree: Date | string | undefined;
    accidentInsuranceStartThree: Date | string | undefined;
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
    F6Img?: File;
    G1Img?: File;
    G2Img?: File;
    G3Img?: File;
    HImgs: (File | undefined)[];
    IDFImg?: File;
    IDRImg?: File;
    LImg?: File;
    PImg?: File;
    R6Img?: File;
    MAFImg?: File;
    MARImg?: File;
    AFImg?: File;
    ARImg?: File;
    WAHFImg?: File;
    WAHRImg?: File;
    LFImg?: File;
    LRImg?: File;
    CFImg?: File;
    CRImg?: File;
    HFImg?: File;
    HRImg?: File;
    EXFImg?: File;
    EXRImg?: File;
    SFImg?: File;
    SRImg?: File;
    SAFImg?: File;
    SARImg?: File;
    OSFImg?: File;
    OSRImg?: File;
    O2FImg?: File;
    O2RImg?: File;
}
