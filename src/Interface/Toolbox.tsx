import { ISignature } from './Signature';

export interface IToolboxData {
    contractingCorpName: string[] | undefined;
}

export type SignatureName = 
"contractingCorpStaffSignatureFirst" |
"contractingCorpStaffSignatureSecond" |
"contractingCorpStaffSignatureThird" |
"systemEngineerSignature"

export type SignatureListName = 
"primeContractingCorpAppearance" |
"viceFirstContractingCorpAppearance" |
"viceSecondContractingCorpAppearance" |
"viceThirdContractingCorpAppearance" 

export interface IToolbox {
    abnormal: boolean | undefined;
    abnormalRecord: string | undefined;
    area: string | undefined;
    biologicalHazard: boolean | undefined;
    body: boolean | undefined;
    bodyBelt: boolean | undefined;
    bodyClothing: boolean | undefined;
    bodyMask: boolean | undefined;
    bodyVest: boolean | undefined;
    breathOxygen: boolean | undefined;
    breathe: boolean | undefined;
    breathePapr: boolean | undefined;
    breatheScba: boolean | undefined;
    breatheDust: boolean | undefined;
    breatheFiltration: boolean | undefined;
    chemicalBurn: boolean | undefined;
    chemicalInclude: string | undefined;
    chemicalInhalation: boolean | undefined;
    collapse: boolean | undefined;
    contentConformSupervisor: boolean | undefined;
    contentConformBeforeWork: boolean | undefined;
    contentConformDuringWork: boolean | undefined;
    contractingCorpStaffSignatureFirst: ISignature | undefined;
    contractingCorpStaffSignatureSecond: ISignature | undefined;
    contractingCorpStaffSignatureThird: ISignature | undefined;
    ear: boolean | undefined;
    earEarmuffs: boolean | undefined;
    earEarplugs: boolean | undefined;
    electric: boolean | undefined;
    electricBreaker: boolean | undefined;
    electricElectroscope: boolean | undefined;
    electricShockPrevention: boolean | undefined;
    eletricDisaster: boolean | undefined;
    explode: boolean | undefined;
    eye: boolean | undefined;
    eyeMechanical: boolean | undefined;
    eyeRadia: boolean | undefined;
    fall: boolean | undefined;
    fallAerialVehicle: boolean | undefined;
    fallArrestor: boolean | undefined;
    fallCage: boolean | undefined;
    fallCover: boolean | undefined;
    fallFence: boolean | undefined;
    fallSafeLine: boolean | undefined;
    fallSafeNet: boolean | undefined;
    fallScaffold: boolean | undefined;
    fallTravelLadder: boolean | undefined;
    fallTrestleLadder: boolean | undefined;
    fallWarningFence: boolean | undefined;
    fire: boolean | undefined;
    fireBackfire: boolean | undefined;
    fireBlanket: boolean | undefined;
    fireDisaster: boolean | undefined;
    fireExtinguisher: boolean | undefined;
    foot: boolean | undefined;
    footChemical: boolean | undefined;
    footNormal: boolean | undefined;
    foreignEnterEye: boolean | undefined;
    gasInclude: string | undefined;
    hand: boolean | undefined;
    handCut: boolean | undefined;
    handElectirc: boolean | undefined;
    handGrand: boolean | undefined;
    handHeat: boolean | undefined;
    haneChemical: boolean | undefined;
    head: boolean | undefined;
    headElectric: boolean | undefined;
    headPlastic: boolean | undefined;
    headWorkspace: boolean | undefined;
    heatTouch: boolean | undefined;
    hypoxia: boolean | undefined;
    meetingDatetime: string | Date | undefined;
    meetingPlace: string | undefined;
    microthermTouch: boolean | undefined;
    minorContractCorpOne: string | undefined;
    minorContractCorpThree: string | undefined;
    minorContractCorpTwo: string | undefined;
    minorContractOneStaff: string | undefined;
    minorContractThreeStaff: string | undefined;
    minorContractTwoStaff: string | undefined;
    noise: boolean | undefined;
    number: string | undefined;
    objectFall: boolean | undefined;
    ohterPrevention: string | undefined;
    otherDisaster: string | undefined;
    otherDisasterNone: boolean | undefined;
    oxygen: boolean | undefined;
    oxygenGasDetection: boolean | undefined;
    oxygenLifeDetection: boolean | undefined;
    oxygenLifting: boolean | undefined;
    oxygenRescue: boolean | undefined;
    oxygenVentilation: boolean | undefined;
    primeContractCorp: string | undefined;
    primeContractStaff: string | undefined;
    primeContractingCorpAppearance: ISignature[] | undefined;
    principleOnSiteBeforeWork: boolean | undefined;
    principleOnSiteDuringWork: boolean | undefined;
    principleOnSiteKnockOff: boolean | undefined;
    principleOnSiteSupervisor: boolean | undefined;
    project: string | undefined;
    publicityMatters: string | undefined;
    radiation: boolean | undefined;
    restorationKnockOff: boolean | undefined;
    restorationSupervisor: boolean | undefined;
    safetyMeasureBeforeWork: boolean | undefined;
    safetyMeasureDuringWork: boolean | undefined;
    safetyMeasureKnockOff: boolean | undefined;
    safetyMeasureSupervisor: boolean | undefined;
    scrape: boolean | undefined;
    siteId: string | undefined;
    staffStateBeforeWork: boolean | undefined;
    staffStateDuringWork: boolean | undefined;
    staffStateKnockOff: boolean | undefined;
    staffStateSupervisor: boolean | undefined;
    system: string | undefined;
    systemBranch: string | undefined;
    systemEngineerSignature: ISignature | undefined;
    username: string | undefined;
    viceFirstContractingCorpAppearance: ISignature[] | undefined;
    viceSecondContractingCorpAppearance: ISignature[] | undefined;
    viceThirdContractingCorpAppearance: ISignature[] | undefined;
    workContent: string | undefined;
    workPlace: string | undefined;
}
