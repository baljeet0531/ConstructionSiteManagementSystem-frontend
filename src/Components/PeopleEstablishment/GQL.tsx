import { gql } from '@apollo/client';

const HRMutationInputType = `(
    $AFImg: Upload
    $ARImg: Upload
    $AOHFImg: Upload
    $AOHRImg: Upload
    $AOSFImg: Upload
    $AOSRImg: Upload
    $BOSHFImg: Upload
    $BOSHRImg: Upload
    $DWFImg: Upload
    $DWRImg: Upload
    $FRFImg: Upload
    $FRRImg: Upload
    $FSFImg: Upload
    $FSRImg: Upload
    $G1Imgs: Upload
    $G2Imgs: Upload
    $G3Imgs: Upload
    $HImgs: [Upload]
    $IDFImg: Upload
    $IDRImg: Upload
    $LImg: Upload
    $MAFImg: Upload
    $MARImg: Upload
    $O2FImg: Upload
    $O2RImg: Upload
    $OSFImg: Upload
    $OSRImg: Upload
    $PEFImg: Upload
    $PERImg: Upload
    $PImg: Upload
    $RFImg: Upload
    $RRImg: Upload
    $RSFImg: Upload
    $RSRImg: Upload
    $SAFImg: Upload
    $SARImg: Upload
    $SFImg: Upload
    $SRImg: Upload
    $SSAFImg: Upload
    $SSARImg: Upload
    $aCertificationDate: Date
    $aWithdrawDate: Date
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
    $aohCertificationDate: Date
    $aohWithdrawDate: Date
    $aosCertificationDate: Date
    $aosWithdrawDate: Date
    $birthday: Date
    $bloodType: String
    $boshCertificationDate: Date
    $boshWithdrawDate: Date
    $certificationName: String
    $contractingCompanyName: String
    $dwCertificationDate: Date
    $dwWithdrawDate: Date
    $emergencyTel: String
    $frCertificationDate: Date
    $frWithdrawDate: Date
    $fsCertificationDate: Date
    $fsWithdrawDate: Date
    $gender: String
    $hazardNotifyDate: Date
    $idno: String!
    $laborAssociationDate: Date
    $laborInsuranceApplyDate: Date
    $liaison: String
    $maCertificationDate: Date
    $maWithdrawDate: Date
    $name: String!
    $o2CertificationDate: Date
    $o2WithdrawDate: Date
    $osCertificationDate: Date
    $osWithdrawDate: Date
    $peCertificationDate: Date
    $peWithdrawDate: Date
    $rCertificationDate: Date
    $rWithdrawDate: Date
    $rsCertificationDate: Date
    $rsWithdrawDate: Date
    $sCertificationDate: Date
    $sWithdrawDate: Date
    $saCertificationDate: Date
    $saWithdrawDate: Date
    $safetyHealthyEducationIssue: Date
    $safetyHealthyEducationWithdraw: Date
    $ssaCertificationDate: Date
    $ssaWithdrawDate: Date
    $supplierIndustrialSafetyNumber: String
    $tel: String
    $viceContractingCompanyName: String
)`;

const HRMutationInputVar = `(
    AFImg: $AFImg
    AOHFImg: $AOHFImg
    AOHRImg: $AOHRImg
    AOSFImg: $AOSFImg
    AOSRImg: $AOSRImg
    ARImg: $ARImg
    BOSHFImg: $BOSHFImg
    BOSHRImg: $BOSHRImg
    DWFImg: $DWFImg
    DWRImg: $DWRImg
    FRFImg: $FRFImg
    FRRImg: $FRRImg
    FSFImg: $FSFImg
    FSRImg: $FSRImg
    G1Imgs: $G1Imgs
    G2Imgs: $G2Imgs
    G3Imgs: $G3Imgs
    HImgs: $HImgs
    IDFImg: $IDFImg
    IDRImg: $IDRImg
    LImg: $LImg
    MAFImg: $MAFImg
    MARImg: $MARImg
    O2FImg: $O2FImg
    O2RImg: $O2RImg
    OSFImg: $OSFImg
    OSRImg: $OSRImg
    PEFImg: $PEFImg
    PERImg: $PERImg
    PImg: $PImg
    RFImg: $RFImg
    RRImg: $RRImg
    RSFImg: $RSFImg
    RSRImg: $RSRImg
    SAFImg: $SAFImg
    SARImg: $SARImg
    SFImg: $SFImg
    SRImg: $SRImg
    SSAFImg: $SSAFImg
    SSARImg: $SSARImg
    aCertificationDate: $aCertificationDate
    aWithdrawDate: $aWithdrawDate
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
    aohCertificationDate: $aohCertificationDate
    aohWithdrawDate: $aohWithdrawDate
    aosCertificationDate: $aosCertificationDate
    aosWithdrawDate: $aosWithdrawDate
    birthday: $birthday
    bloodType: $bloodType
    boshCertificationDate: $boshCertificationDate
    boshWithdrawDate: $boshWithdrawDate
    certificationName: $certificationName
    contractingCompanyName: $contractingCompanyName
    dwCertificationDate: $dwCertificationDate
    dwWithdrawDate: $dwWithdrawDate
    emergencyTel: $emergencyTel
    frCertificationDate: $frCertificationDate
    frWithdrawDate: $frWithdrawDate
    fsCertificationDate: $fsCertificationDate
    fsWithdrawDate: $fsWithdrawDate
    gender: $gender
    hazardNotifyDate: $hazardNotifyDate
    idno: $idno
    laborAssociationDate: $laborAssociationDate
    laborInsuranceApplyDate: $laborInsuranceApplyDate
    liaison: $liaison
    maCertificationDate: $maCertificationDate
    maWithdrawDate: $maWithdrawDate
    name: $name
    o2CertificationDate: $o2CertificationDate
    o2WithdrawDate: $o2WithdrawDate
    osCertificationDate: $osCertificationDate
    osWithdrawDate: $osWithdrawDate
    peCertificationDate: $peCertificationDate
    peWithdrawDate: $peWithdrawDate
    rCertificationDate: $rCertificationDate
    rWithdrawDate: $rWithdrawDate
    rsCertificationDate: $rsCertificationDate
    rsWithdrawDate: $rsWithdrawDate
    sCertificationDate: $sCertificationDate
    sWithdrawDate: $sWithdrawDate
    saCertificationDate: $saCertificationDate
    saWithdrawDate: $saWithdrawDate
    safetyHealthyEducationIssue: $safetyHealthyEducationIssue
    safetyHealthyEducationWithdraw: $safetyHealthyEducationWithdraw
    ssaCertificationDate: $ssaCertificationDate
    ssaWithdrawDate: $ssaWithdrawDate
    supplierIndustrialSafetyNumber: $supplierIndustrialSafetyNumber
    tel: $tel
    viceContractingCompanyName: $viceContractingCompanyName
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
