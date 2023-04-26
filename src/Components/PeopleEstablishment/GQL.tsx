import { gql } from '@apollo/client';

const HRMutationInputType = `(
    $AFImg: Upload
    $ARImg: Upload
    $CFImg: Upload
    $CRImg: Upload
    $EXFImg: Upload
    $EXRImg: Upload
    $F6Img: Upload
    $G1Img: Upload
    $G2Img: Upload
    $G3Img: Upload
    $HFImg: Upload
    $HRImg: Upload
    $HImgs: [Upload]
    $IDFImg: Upload
    $IDRImg: Upload
    $LFImg: Upload
    $LRImg: Upload
    $LImg: Upload
    $MAFImg: Upload
    $MARImg: Upload
    $O2FImg: Upload
    $O2RImg: Upload
    $OSFImg: Upload
    $OSRImg: Upload
    $PImg: Upload
    $R6Img: Upload
    $SAFImg: Upload
    $SARImg: Upload
    $SFImg: Upload
    $SRImg: Upload
    $WAHFImg: Upload
    $WAHRImg: Upload
    $aCertificationDate: Date
    $accidentInsuranceAmountOne: String
    $accidentInsuranceAmountThree: String
    $accidentInsuranceAmountTwo: String
    $accidentInsuranceCompanyNameOne: String
    $accidentInsuranceCompanyNameThree: String
    $accidentInsuranceCompanyNameTwo: String
    $accidentInsuranceEndOne: Date
    $accidentInsuranceEndThree: Date
    $accidentInsuranceEndTwo: Date
    $accidentInsuranceSignDateOne: Date
    $accidentInsuranceSignDateThree: Date
    $accidentInsuranceSignDateTwo: Date
    $accidentInsuranceStartOne: Date
    $accidentInsuranceStartThree: Date
    $accidentInsuranceStartTwo: Date
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
)`;

const HRMutationInputVar = `(
    AFImg: $AFImg
    ARImg: $ARImg
    CFImg: $CFImg
    CRImg: $CRImg
    EXFImg: $EXFImg
    EXRImg: $EXRImg
    F6Img: $F6Img
    G1Img: $G1Img
    G2Img: $G2Img
    G3Img: $G3Img
    HFImg: $HFImg
    HRImg: $HRImg
    HImgs: $HImgs
    IDFImg: $IDFImg
    IDRImg: $IDRImg
    LFImg: $LFImg
    LRImg: $LRImg
    LImg: $LImg
    MAFImg: $MAFImg
    MARImg: $MARImg
    O2FImg: $O2FImg
    O2RImg: $O2RImg
    OSFImg: $OSFImg
    OSRImg: $OSRImg
    PImg: $PImg
    R6Img: $R6Img
    SAFImg: $SAFImg
    SARImg: $SARImg
    SFImg: $SFImg
    SRImg: $SRImg
    WAHFImg: $WAHFImg
    WAHRImg: $WAHRImg
    aCertificationDate: $aCertificationDate
    accidentInsuranceAmountOne: $accidentInsuranceAmountOne
    accidentInsuranceAmountThree: $accidentInsuranceAmountThree
    accidentInsuranceAmountTwo: $accidentInsuranceAmountTwo
    accidentInsuranceCompanyNameOne: $accidentInsuranceCompanyNameOne
    accidentInsuranceCompanyNameThree: $accidentInsuranceCompanyNameThree
    accidentInsuranceCompanyNameTwo: $accidentInsuranceCompanyNameTwo
    accidentInsuranceEndOne: $accidentInsuranceEndOne
    accidentInsuranceEndThree: $accidentInsuranceEndThree
    accidentInsuranceEndTwo: $accidentInsuranceEndTwo
    accidentInsuranceSignDateOne: $accidentInsuranceSignDateOne
    accidentInsuranceSignDateThree: $accidentInsuranceSignDateThree
    accidentInsuranceSignDateTwo: $accidentInsuranceSignDateTwo
    accidentInsuranceStartOne: $accidentInsuranceStartOne
    accidentInsuranceStartThree: $accidentInsuranceStartThree
    accidentInsuranceStartTwo: $accidentInsuranceStartTwo
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
)`;

export const CREATE_HUMAN_RESOURCE = gql`
    mutation createHumanResource${HRMutationInputType} {
        createHumanResource${HRMutationInputVar} {
            ok
            message
        }
    }
`;
export const UPDATE_HUMAN_RESOURCE = gql`
mutation UpdateHumanResource${HRMutationInputType} {
    updateHumanResource${HRMutationInputVar} {
        ok
        message
    }
}
`;
