export interface IPeopleManagement {
    name: string;
    gender: string | null;
    birthday: string | null;
    bloodType: string | null;
    tel: string | null;
    liaison: string | null;
    emergencyTel: string | null;
    address: string | null;
    hazardNotifyDate: string | null;
    supplierIndustrialSafetyNumber: string | null;
    safetyHealthyEducationIssue: string | null;
    safetyHealthyEducationWithdraw: string | null;
    laborInsuranceApplyDate: string | null;
    laborAssociationDate: string | null;
    certificationName: string | null;
    accidentInsuranceStartOne: string | null;
    accidentInsuranceStartTwo: string | null;
    accidentInsuranceStartThree: string | null;
    accidentInsuranceEndOne: string | null;
    accidentInsuranceEndTwo: string | null;
    accidentInsuranceEndThree: string | null;
    accidentInsuranceAmountOne: string | null;
    accidentInsuranceAmountTwo: string | null;
    accidentInsuranceAmountThree: string | null;
    accidentInsuranceSignDateOne: string | null;
    accidentInsuranceSignDateTwo: string | null;
    accidentInsuranceSignDateThree: string | null;
    accidentInsuranceCompanyNameOne: string | null;
    accidentInsuranceCompanyNameTwo: string | null;
    accidentInsuranceCompanyNameThree: string | null;
    contractingCompanyName: string | null;
    viceContractingCompanyName: string | null;
    aCertificationDate: string | null;
    boshCertificationDate: string | null;
    aosCertificationDate: string | null;
    aohCertificationDate: string | null;
    frCertificationDate: string | null;
    o2CertificationDate: string | null;
    osCertificationDate: string | null;
    saCertificationDate: string | null;
    sCertificationDate: string | null;
    ssaCertificationDate: string | null;
    maCertificationDate: string | null;
    rCertificationDate: string | null;
    fsCertificationDate: string | null;
    peCertificationDate: string | null;
    rsCertificationDate: string | null;
    dwCertificationDate: string | null;
    aWithdrawDate: string | null;
    boshWithdrawDate: string | null;
    aosWithdrawDate: string | null;
    aohWithdrawDate: string | null;
    frWithdrawDate: string | null;
    o2WithdrawDate: string | null;
    osWithdrawDate: string | null;
    saWithdrawDate: string | null;
    sWithdrawDate: string | null;
    maWithdrawDate: string | null;
    rWithdrawDate: string | null;
    ssaWithdrawDate: string | null;
    fsWithdrawDate: string | null;
    peWithdrawDate: string | null;
    rsWithdrawDate: string | null;
    dwWithdrawDate: string | null;
    idno: string;
}

export interface formValues extends IPeopleManagement {
    sixStatus: string | null;
    aStatus: string | null;
    boshStatus: string | null;
    aosStatus: string | null;
    aohStatus: string | null;
    frStatus: string | null;
    o2Status: string | null;
    osStatus: string | null;
    saStatus: string | null;
    sStatus: string | null;
    maStatus: string | null;
    rStatus: string | null;
    ssaStatus: string | null;
    fsStatus: string | null;
    peStatus: string | null;
    rsStatus: string | null;
    dwStatus: string | null;
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
    AFImg?: File;
    ARImg?: File;
    BOSHFImg?: File;
    BOSHRImg?: File;
    AOSFImg?: File;
    AOSRImg?: File;
    AOHFImg?: File;
    AOHRImg?: File;
    FRFImg?: File;
    FRRImg?: File;
    O2FImg?: File;
    O2RImg?: File;
    OSFImg?: File;
    OSRImg?: File;
    SAFImg?: File;
    SARImg?: File;
    SFImg?: File;
    SRImg?: File;
    SSAFImg?: File;
    SSARImg?: File;
    MAFImg?: File;
    MARImg?: File;
    RFImg?: File;
    RRImg?: File;
    FSFImg?: File;
    FSRImg?: File;
    PEFImg?: File;
    PERImg?: File;
    RSFImg?: File;
    RSRImg?: File;
    DWFImg?: File;
    DWRImg?: File;
}

export interface humanTableValues extends formValues {
    reviewStaff: string | null;
    no: string | null;
}

export interface ISelectedHuman {
    no: string | null;
    idno: string;
    name: string;
}
