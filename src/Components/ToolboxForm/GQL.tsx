import { gql } from '@apollo/client';
import {
    getSignature,
    IGQLSignature,
    ISignature,
    MultiSignatureStateItem,
    SignatureStateItem,
} from '../../Interface/Signature';
import {
    IGQLToolbox,
    IToolbox,
    SignatureListGQLName,
    SignatureListName,
    SignatureName,
} from '../../Interface/Toolbox';
import {
    SIGNATURE_FIELDS,
    APPEARANCE_SIGN_FIELD,
} from '../../Utils/GQLFragments';

export const GQL_TOOLBOX_QUERY = gql`
    ${SIGNATURE_FIELDS}
    ${APPEARANCE_SIGN_FIELD}
    query queryToolboxMeeting($siteId: String!, $number: String) {
        contractingCorpName(siteId: $siteId)
        toolboxMeeting(siteId: $siteId, number: $number) {
            siteId
            number
            system
            systemBranch
            project
            area
            laborAmount
            meetingDatetime
            meetingPlace
            primeContractCorp
            primeContractStaff
            minorContractCorpOne
            minorContractOneStaff
            minorContractCorpTwo
            minorContractTwoStaff
            minorContractCorpThree
            minorContractThreeStaff
            workContent
            workPlace
            physicalFall
            scrape
            objectFall
            foreignEnterEye
            heatTouch
            microthermTouch
            noise
            eletricDisaster
            collapse
            radiation
            chemicalBurn
            chemicalInhalation
            fireDisaster
            explode
            otherDisasterNone
            hypoxia
            biologicalHazard
            outdoorHeat
            otherDisaster
            chemicalNone
            chemicalInclude
            gasNone
            gasInclude
            head
            headWorkspace
            headElectric
            headPlastic
            eye
            eyeMechanical
            eyeRadia
            ear
            earEarplugs
            earEarmuffs
            breathe
            breatheDust
            breatheFiltration
            breatheScba
            breathePapr
            breathOxygen
            hand
            handCut
            handGrand
            handHeat
            handElectirc
            haneChemical
            foot
            footNormal
            footChemical
            body
            bodyBelt
            bodyMask
            bodyClothing
            bodyVest
            fall
            fallTrestleLadder
            fallTravelLadder
            fallScaffold
            fallAerialVehicle
            fallSafeLine
            fallCage
            fallFence
            fallCover
            fallSafeNet
            fallWarningFence
            fallArrestor
            electric
            electricBreaker
            electricShockPrevention
            electricElectroscope
            fire
            fireExtinguisher
            fireBlanket
            fireBackfire
            oxygen
            oxygenVentilation
            oxygenLifeDetection
            oxygenGasDetection
            oxygenLifting
            oxygenRescue
            ohterPrevention
            publicityMatters
            contentConformBeforeWork
            contentConformDuringWork
            contentConformSupervisor
            safetyMeasureBeforeWork
            safetyMeasureDuringWork
            safetyMeasureKnockOff
            safetyMeasureSupervisor
            staffStateBeforeWork
            staffStateDuringWork
            staffStateKnockOff
            staffStateSupervisor
            principleOnSiteBeforeWork
            principleOnSiteDuringWork
            principleOnSiteKnockOff
            principleOnSiteSupervisor
            restorationKnockOff
            restorationSupervisor
            abnormal
            abnormalRecord
            contractingCorpStaffSignatureFirst {
                ...gqlSignatureFields
            }
            contractingCorpStaffSignatureSecond {
                ...gqlSignatureFields
            }
            contractingCorpStaffSignatureThird {
                ...gqlSignatureFields
            }
            systemEngineerSignature {
                ...gqlSignatureFields
            }
            primeAppearSignature {
                ...gqlAppearFields
            }
            viceFirstAppearSignature {
                ...gqlAppearFields
            }
            viceSecondAppearSignature {
                ...gqlAppearFields
            }
            viceThirdAppearSignature {
                ...gqlAppearFields
            }
        }
    }
`;

export const GQL_TOOLBOX_UPDATE = gql`
    mutation utm(
        $abnormal: Boolean
        $abnormalRecord: String
        $area: String
        $biologicalHazard: Boolean
        $body: Boolean
        $bodyBelt: Boolean
        $bodyClothing: Boolean
        $bodyMask: Boolean
        $bodyVest: Boolean
        $breathOxygen: Boolean
        $breathe: Boolean
        $breathePapr: Boolean
        $breatheScba: Boolean
        $breatheDust: Boolean
        $breatheFiltration: Boolean
        $chemicalBurn: Boolean
        $chemicalInclude: String
        $chemicalInhalation: Boolean
        $chemicalNone: Boolean
        $collapse: Boolean
        $contentConformSupervisor: Boolean
        $contentConformBeforeWork: Boolean
        $contentConformDuringWork: Boolean
        $contractingCorpStaffSignatureFirst: signatureInput
        $contractingCorpStaffSignatureSecond: signatureInput
        $contractingCorpStaffSignatureThird: signatureInput
        $ear: Boolean
        $earEarmuffs: Boolean
        $earEarplugs: Boolean
        $electric: Boolean
        $electricBreaker: Boolean
        $electricElectroscope: Boolean
        $electricShockPrevention: Boolean
        $eletricDisaster: Boolean
        $explode: Boolean
        $eye: Boolean
        $eyeMechanical: Boolean
        $eyeRadia: Boolean
        $fall: Boolean
        $fallAerialVehicle: Boolean
        $fallArrestor: Boolean
        $fallCage: Boolean
        $fallCover: Boolean
        $fallFence: Boolean
        $fallSafeLine: Boolean
        $fallSafeNet: Boolean
        $fallScaffold: Boolean
        $fallTravelLadder: Boolean
        $fallTrestleLadder: Boolean
        $fallWarningFence: Boolean
        $fire: Boolean
        $fireBackfire: Boolean
        $fireBlanket: Boolean
        $fireDisaster: Boolean
        $fireExtinguisher: Boolean
        $foot: Boolean
        $footChemical: Boolean
        $footNormal: Boolean
        $foreignEnterEye: Boolean
        $gasInclude: String
        $gasNone: Boolean
        $hand: Boolean
        $handCut: Boolean
        $handElectirc: Boolean
        $handGrand: Boolean
        $handHeat: Boolean
        $haneChemical: Boolean
        $head: Boolean
        $headElectric: Boolean
        $headPlastic: Boolean
        $headWorkspace: Boolean
        $heatTouch: Boolean
        $hypoxia: Boolean
        $meetingDatetime: DateTime
        $meetingPlace: String
        $microthermTouch: Boolean
        $minorContractCorpOne: String
        $minorContractCorpThree: String
        $minorContractCorpTwo: String
        $minorContractOneStaff: String
        $minorContractThreeStaff: String
        $minorContractTwoStaff: String
        $noise: Boolean
        $number: String!
        $objectFall: Boolean
        $ohterPrevention: String
        $otherDisaster: String
        $otherDisasterNone: Boolean
        $outdoorHeat: Boolean
        $oxygen: Boolean
        $oxygenGasDetection: Boolean
        $oxygenLifeDetection: Boolean
        $oxygenLifting: Boolean
        $oxygenRescue: Boolean
        $oxygenVentilation: Boolean
        $physicalFall: Boolean
        $primeContractCorp: String
        $primeContractStaff: String
        $primeContractingCorpAppearance: [signatureInput]
        $principleOnSiteBeforeWork: Boolean
        $principleOnSiteDuringWork: Boolean
        $principleOnSiteKnockOff: Boolean
        $principleOnSiteSupervisor: Boolean
        $project: String
        $publicityMatters: String
        $radiation: Boolean
        $restorationKnockOff: Boolean
        $restorationSupervisor: Boolean
        $safetyMeasureBeforeWork: Boolean
        $safetyMeasureDuringWork: Boolean
        $safetyMeasureKnockOff: Boolean
        $safetyMeasureSupervisor: Boolean
        $scrape: Boolean
        $siteId: String!
        $staffStateBeforeWork: Boolean
        $staffStateDuringWork: Boolean
        $staffStateKnockOff: Boolean
        $staffStateSupervisor: Boolean
        $system: String
        $systemBranch: String
        $systemEngineerSignature: signatureInput
        $username: String!
        $viceFirstContractingCorpAppearance: [signatureInput]
        $viceSecondContractingCorpAppearance: [signatureInput]
        $viceThirdContractingCorpAppearance: [signatureInput]
        $workContent: String
        $workPlace: String
    ) {
        updateToolboxMeeting(
            abnormal: $abnormal
            abnormalRecord: $abnormalRecord
            area: $area
            biologicalHazard: $biologicalHazard
            body: $body
            bodyBelt: $bodyBelt
            bodyClothing: $bodyClothing
            bodyMask: $bodyMask
            bodyVest: $bodyVest
            breathOxygen: $breathOxygen
            breathe: $breathe
            breathePapr: $breathePapr
            breatheScba: $breatheScba
            breatheDust: $breatheDust
            breatheFiltration: $breatheFiltration
            chemicalBurn: $chemicalBurn
            chemicalInclude: $chemicalInclude
            chemicalInhalation: $chemicalInhalation
            chemicalNone: $chemicalNone
            collapse: $collapse
            contentConformSupervisor: $contentConformSupervisor
            contentConformBeforeWork: $contentConformBeforeWork
            contentConformDuringWork: $contentConformDuringWork
            contractingCorpStaffSignatureFirst: $contractingCorpStaffSignatureFirst
            contractingCorpStaffSignatureSecond: $contractingCorpStaffSignatureSecond
            contractingCorpStaffSignatureThird: $contractingCorpStaffSignatureThird
            ear: $ear
            earEarmuffs: $earEarmuffs
            earEarplugs: $earEarplugs
            electric: $electric
            electricBreaker: $electricBreaker
            electricElectroscope: $electricElectroscope
            electricShockPrevention: $electricShockPrevention
            eletricDisaster: $eletricDisaster
            explode: $explode
            eye: $eye
            eyeMechanical: $eyeMechanical
            eyeRadia: $eyeRadia
            fall: $fall
            fallAerialVehicle: $fallAerialVehicle
            fallArrestor: $fallArrestor
            fallCage: $fallCage
            fallCover: $fallCover
            fallFence: $fallFence
            fallSafeLine: $fallSafeLine
            fallSafeNet: $fallSafeNet
            fallScaffold: $fallScaffold
            fallTravelLadder: $fallTravelLadder
            fallTrestleLadder: $fallTrestleLadder
            fallWarningFence: $fallWarningFence
            fire: $fire
            fireBackfire: $fireBackfire
            fireBlanket: $fireBlanket
            fireDisaster: $fireDisaster
            fireExtinguisher: $fireExtinguisher
            foot: $foot
            footChemical: $footChemical
            footNormal: $footNormal
            foreignEnterEye: $foreignEnterEye
            gasInclude: $gasInclude
            gasNone: $gasNone
            hand: $hand
            handCut: $handCut
            handElectirc: $handElectirc
            handGrand: $handGrand
            handHeat: $handHeat
            haneChemical: $haneChemical
            head: $head
            headElectric: $headElectric
            headPlastic: $headPlastic
            headWorkspace: $headWorkspace
            heatTouch: $heatTouch
            hypoxia: $hypoxia
            meetingDatetime: $meetingDatetime
            meetingPlace: $meetingPlace
            microthermTouch: $microthermTouch
            minorContractCorpOne: $minorContractCorpOne
            minorContractCorpThree: $minorContractCorpThree
            minorContractCorpTwo: $minorContractCorpTwo
            minorContractOneStaff: $minorContractOneStaff
            minorContractThreeStaff: $minorContractThreeStaff
            minorContractTwoStaff: $minorContractTwoStaff
            noise: $noise
            number: $number
            objectFall: $objectFall
            ohterPrevention: $ohterPrevention
            otherDisaster: $otherDisaster
            otherDisasterNone: $otherDisasterNone
            outdoorHeat: $outdoorHeat
            oxygen: $oxygen
            oxygenGasDetection: $oxygenGasDetection
            oxygenLifeDetection: $oxygenLifeDetection
            oxygenLifting: $oxygenLifting
            oxygenRescue: $oxygenRescue
            oxygenVentilation: $oxygenVentilation
            physicalFall: $physicalFall
            primeContractCorp: $primeContractCorp
            primeContractStaff: $primeContractStaff
            primeContractingCorpAppearance: $primeContractingCorpAppearance
            principleOnSiteBeforeWork: $principleOnSiteBeforeWork
            principleOnSiteDuringWork: $principleOnSiteDuringWork
            principleOnSiteKnockOff: $principleOnSiteKnockOff
            principleOnSiteSupervisor: $principleOnSiteSupervisor
            project: $project
            publicityMatters: $publicityMatters
            radiation: $radiation
            restorationKnockOff: $restorationKnockOff
            restorationSupervisor: $restorationSupervisor
            safetyMeasureBeforeWork: $safetyMeasureBeforeWork
            safetyMeasureDuringWork: $safetyMeasureDuringWork
            safetyMeasureKnockOff: $safetyMeasureKnockOff
            safetyMeasureSupervisor: $safetyMeasureSupervisor
            scrape: $scrape
            siteId: $siteId
            staffStateBeforeWork: $staffStateBeforeWork
            staffStateDuringWork: $staffStateDuringWork
            staffStateKnockOff: $staffStateKnockOff
            staffStateSupervisor: $staffStateSupervisor
            system: $system
            systemBranch: $systemBranch
            systemEngineerSignature: $systemEngineerSignature
            username: $username
            viceFirstContractingCorpAppearance: $viceFirstContractingCorpAppearance
            viceSecondContractingCorpAppearance: $viceSecondContractingCorpAppearance
            viceThirdContractingCorpAppearance: $viceThirdContractingCorpAppearance
            workContent: $workContent
            workPlace: $workPlace
        ) {
            ok
            message
        }
    }
`;

export function parseToolbox(
    list: IGQLToolbox[],
    signatures: Record<SignatureName, SignatureStateItem>,
    signatureLists: Record<SignatureListName, MultiSignatureStateItem>
): IToolbox | undefined {
    if (!list[0]) return;
    const signatureColName: SignatureName[] = [
        'contractingCorpStaffSignatureFirst',
        'contractingCorpStaffSignatureSecond',
        'contractingCorpStaffSignatureThird',
        'systemEngineerSignature',
    ];
    const signatureListColName: SignatureListName[] = [
        'primeContractingCorpAppearance',
        'viceFirstContractingCorpAppearance',
        'viceSecondContractingCorpAppearance',
        'viceThirdContractingCorpAppearance',
    ];
    const signatureListGQLColName: SignatureListGQLName[] = [
        'primeAppearSignature',
        'viceFirstAppearSignature',
        'viceSecondAppearSignature',
        'viceThirdAppearSignature',
    ];

    const t = { ...list[0] } as IGQLToolbox;

    if (t.meetingDatetime && t.meetingDatetime !== '') {
        // t.meetingDatetime like ""2023-02-06T08:10:00""
        const dt = t.meetingDatetime.split('T');
        t.meetingDate = dt[0];
        t.meetingTime = dt[1];
    }

    if (!t.workContent) {
        const cols = [t.system, t.systemBranch, t.project];
        const values = cols.flatMap((c) => c || []);
        t.workContent = values.join('/');
    }

    // Handle single singnatures
    for (let i = 0; i < signatureColName.length; i++) {
        const key = signatureColName[i];
        const [, setSignature] = signatures[key];
        const GQLsign = t[key] as IGQLSignature | undefined;
        if (GQLsign) {
            getSignature(GQLsign).then((item) => {
                setSignature(item);
            });
        }
    }

    // Handle signature list
    for (let i = 0; i < signatureListColName.length; i++) {
        const key = signatureListColName[i];
        const [, setSignatureList] = signatureLists[key];
        const GQLkey = signatureListGQLColName[i] as keyof IGQLToolbox;
        const GQLsignList = t[GQLkey] as IGQLSignature[] | undefined;
        const signList = [] as ISignature[];
        if (GQLsignList) {
            for (let GQLsign of GQLsignList) {
                getSignature(GQLsign).then((item) => {
                    signList.push(item);
                });
            }
        }
        setSignatureList(signList);
    }
    return t;
}
