import { IGQLSignature, ISignature } from './Signature';

export interface IToolboxHint {
    [key: string]: boolean | null;
}

export interface IToolboxData {
    contractingCorpName: string[] | null;
    dashboardPublicMatters: string;
    toolboxHint: IToolboxHint;
    signaturePermit: { workBefore: boolean; knockOff: boolean };
}

export interface IToolboxOptions {
    toolboxHint: IToolboxHint;
}

export type SignatureName =
    | 'contractingCorpStaffSignatureFirst'
    | 'contractingCorpStaffSignatureSecond'
    | 'contractingCorpStaffSignatureThird'
    | 'systemEngineerSignature'
    | 'host'
    | 'primeContractStaff'
    | 'minorContractOneStaff'
    | 'minorContractTwoStaff'
    | 'minorContractThreeStaff';

export type SignatureListName =
    | 'primeContractingCorpAppearance'
    | 'viceFirstContractingCorpAppearance'
    | 'viceSecondContractingCorpAppearance'
    | 'viceThirdContractingCorpAppearance';

export type SignatureListGQLName =
    | 'primeAppearSignature'
    | 'viceFirstAppearSignature'
    | 'viceSecondAppearSignature'
    | 'viceThirdAppearSignature';

export interface IToolbox {
    abnormal: boolean;
    abnormalRecord: string;
    area: string;
    biologicalHazard: boolean | null;
    body: boolean | null;
    bodyBelt: boolean | null;
    bodyClothing: boolean | null;
    bodyMask: boolean | null;
    bodyVest: boolean | null;
    breathOxygen: boolean | null;
    breathe: boolean | null;
    breathePapr: boolean | null;
    breatheScba: boolean | null;
    breatheDust: boolean | null;
    breatheFiltration: boolean | null;
    chemicalBurn: boolean | null;
    chemicalInclude: string;
    chemicalInhalation: boolean | null;
    chemicalNone: boolean | null;
    collapse: boolean | null;
    contentConformSupervisor: boolean | null;
    contentConformBeforeWork: boolean | null;
    contentConformDuringWork: boolean | null;
    contractingCorpStaffSignatureFirst: ISignature | null;
    contractingCorpStaffSignatureSecond: ISignature | null;
    contractingCorpStaffSignatureThird: ISignature | null;
    ear: boolean | null;
    earEarmuffs: boolean | null;
    earEarplugs: boolean | null;
    electric: boolean | null;
    electricBreaker: boolean | null;
    electricElectroscope: boolean | null;
    electricShockPrevention: boolean | null;
    eletricDisaster: boolean | null;
    explode: boolean | null;
    eye: boolean | null;
    eyeMechanical: boolean | null;
    eyeRadia: boolean | null;
    fall: boolean | null;
    fallAerialVehicle: boolean | null;
    fallArrestor: boolean | null;
    fallCage: boolean | null;
    fallCover: boolean | null;
    fallFence: boolean | null;
    fallSafeLine: boolean | null;
    fallSafeNet: boolean | null;
    fallScaffold: boolean | null;
    fallTravelLadder: boolean | null;
    fallTrestleLadder: boolean | null;
    fallWarningFence: boolean | null;
    fire: boolean | null;
    fireBackfire: boolean | null;
    fireBlanket: boolean | null;
    fireDisaster: boolean | null;
    fireExtinguisher: boolean | null;
    foot: boolean | null;
    footChemical: boolean | null;
    footNormal: boolean | null;
    foreignEnterEye: boolean | null;
    gasInclude: string;
    gasNone: boolean | null;
    hand: boolean | null;
    handCut: boolean | null;
    handElectirc: boolean | null;
    handGrand: boolean | null;
    handHeat: boolean | null;
    haneChemical: boolean | null;
    head: boolean | null;
    headElectric: boolean | null;
    headPlastic: boolean | null;
    headWorkspace: boolean | null;
    heatTouch: boolean | null;
    host: ISignature | null;
    hypoxia: boolean | null;
    laborAmount: number | null;
    meetingDate: string | null;
    meetingTime: string | null;
    meetingPlace: string | null;
    microthermTouch: boolean | null;
    minorContractCorpOne: string | null;
    minorContractCorpThree: string | null;
    minorContractCorpTwo: string | null;
    minorContractOneStaff: ISignature | null;
    minorContractThreeStaff: ISignature | null;
    minorContractTwoStaff: ISignature | null;
    noise: boolean | null;
    number: string | null;
    objectFall: boolean | null;
    ohterPrevention: string;
    otherDisaster: string;
    otherDisasterNone: boolean | null;
    outdoorHeat: boolean | null;
    oxygen: boolean | null;
    oxygenGasDetection: boolean | null;
    oxygenLifeDetection: boolean | null;
    oxygenLifting: boolean | null;
    oxygenRescue: boolean | null;
    oxygenVentilation: boolean | null;
    physicalFall: boolean | null;
    primeContractCorp: string | null;
    primeContractStaff: ISignature | null;
    primeContractingCorpAppearance: ISignature[];
    principleOnSiteBeforeWork: boolean | null;
    principleOnSiteDuringWork: boolean | null;
    principleOnSiteKnockOff: boolean | null;
    principleOnSiteSupervisor: boolean | null;
    project: string | null;
    publicityMatters: string | null;
    radiation: boolean | null;
    restorationKnockOff: boolean | null;
    restorationSupervisor: boolean | null;
    safetyMeasureBeforeWork: boolean | null;
    safetyMeasureDuringWork: boolean | null;
    safetyMeasureKnockOff: boolean | null;
    safetyMeasureSupervisor: boolean | null;
    scrape: boolean | null;
    siteId: string;
    staffStateBeforeWork: boolean | null;
    staffStateDuringWork: boolean | null;
    staffStateKnockOff: boolean | null;
    staffStateSupervisor: boolean | null;
    system: string | null;
    systemBranch: string | null;
    systemEngineerSignature: ISignature | null;
    username: string | null;
    viceFirstContractingCorpAppearance: ISignature[];
    viceSecondContractingCorpAppearance: ISignature[];
    viceThirdContractingCorpAppearance: ISignature[];
    workContent: string | null;
    workPlace: string | null;
    zone: string | null;
}

export interface IGQLToolbox extends IToolbox {
    meetingDatetime: string | null;
    primeAppearSignature: IGQLSignature[] | null;
    viceFirstAppearSignature: IGQLSignature[] | null;
    viceSecondAppearSignature: IGQLSignature[] | null;
    viceThirdAppearSignature: IGQLSignature[] | null;
}
