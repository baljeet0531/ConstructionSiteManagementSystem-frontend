import { useState } from 'react';
import { Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { Cookies } from 'react-cookie';
import { useToast } from '@chakra-ui/react';
import dayjs from 'dayjs';
import {
    ISignature,
    SignatureStateItem,
    MultiSignatureStateItem,
} from '../../Interface/Signature';
import {
    IToolbox,
    SignatureName,
    SignatureListName,
} from '../../Interface/Toolbox';
import ToolboxForm from './Form';

const GQL_UPDATE_TOOLBOX = gql`
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
        $oxygen: Boolean
        $oxygenGasDetection: Boolean
        $oxygenLifeDetection: Boolean
        $oxygenLifting: Boolean
        $oxygenRescue: Boolean
        $oxygenVentilation: Boolean
        $primeContractCorp: String
        $primeContractStaff: String
        $primeContractingCorpAppearance: [Upload]
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
        $viceFirstContractingCorpAppearance: [Upload]
        $viceSecondContractingCorpAppearance: [Upload]
        $viceThirdContractingCorpAppearance: [Upload]
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
            oxygen: $oxygen
            oxygenGasDetection: $oxygenGasDetection
            oxygenLifeDetection: $oxygenLifeDetection
            oxygenLifting: $oxygenLifting
            oxygenRescue: $oxygenRescue
            oxygenVentilation: $oxygenVentilation
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

export default function WorkPermitFormik() {
    const siteId = localStorage.getItem('siteId') as string;
    const number = localStorage.getItem('ToolboxNumber') as string;
    // const value = getToolbox(siteId, number)
    const value = undefined;
    const username: string = new Cookies().get('username');
    const initialValues: IToolbox = value || {
        abnormal: false,
        abnormalRecord: '',
        area: '',
        biologicalHazard: false,
        body: undefined,
        bodyBelt: undefined,
        bodyClothing: undefined,
        bodyMask: undefined,
        bodyVest: undefined,
        breathOxygen: undefined,
        breathe: undefined,
        breathePapr: undefined,
        breatheScba: undefined,
        breatheDust: undefined,
        breatheFiltration: undefined,
        chemicalBurn: undefined,
        chemicalInclude: undefined,
        chemicalInhalation: undefined,
        collapse: undefined,
        contentConformSupervisor: undefined,
        contentConformBeforeWork: undefined,
        contentConformDuringWork: undefined,
        contractingCorpStaffSignatureFirst: undefined,
        contractingCorpStaffSignatureSecond: undefined,
        contractingCorpStaffSignatureThird: undefined,
        ear: undefined,
        earEarmuffs: undefined,
        earEarplugs: undefined,
        electric: undefined,
        electricBreaker: undefined,
        electricElectroscope: undefined,
        electricShockPrevention: undefined,
        eletricDisaster: undefined,
        explode: undefined,
        eye: undefined,
        eyeMechanical: undefined,
        eyeRadia: undefined,
        fall: undefined,
        fallAerialVehicle: undefined,
        fallArrestor: undefined,
        fallCage: undefined,
        fallCover: undefined,
        fallFence: undefined,
        fallSafeLine: undefined,
        fallSafeNet: undefined,
        fallScaffold: undefined,
        fallTravelLadder: undefined,
        fallTrestleLadder: undefined,
        fallWarningFence: undefined,
        fire: undefined,
        fireBackfire: undefined,
        fireBlanket: undefined,
        fireDisaster: undefined,
        fireExtinguisher: undefined,
        foot: undefined,
        footChemical: undefined,
        footNormal: undefined,
        foreignEnterEye: undefined,
        gasInclude: undefined,
        hand: undefined,
        handCut: undefined,
        handElectirc: undefined,
        handGrand: undefined,
        handHeat: undefined,
        haneChemical: undefined,
        head: undefined,
        headElectric: undefined,
        headPlastic: undefined,
        headWorkspace: undefined,
        heatTouch: undefined,
        hypoxia: undefined,
        meetingDatetime: dayjs()
            .hour(8)
            .minute(30)
            .second(0)
            .format('YYYY-MM-DDTHH:mm:ss'),
        meetingPlace: undefined,
        microthermTouch: undefined,
        minorContractCorpOne: undefined,
        minorContractCorpThree: undefined,
        minorContractCorpTwo: undefined,
        minorContractOneStaff: undefined,
        minorContractThreeStaff: undefined,
        minorContractTwoStaff: undefined,
        noise: undefined,
        number: number,
        objectFall: undefined,
        ohterPrevention: undefined,
        otherDisaster: undefined,
        otherDisasterNone: undefined,
        oxygen: undefined,
        oxygenGasDetection: undefined,
        oxygenLifeDetection: undefined,
        oxygenLifting: undefined,
        oxygenRescue: undefined,
        oxygenVentilation: undefined,
        primeContractCorp: undefined,
        primeContractStaff: undefined,
        primeContractingCorpAppearance: undefined,
        principleOnSiteBeforeWork: undefined,
        principleOnSiteDuringWork: undefined,
        principleOnSiteKnockOff: undefined,
        principleOnSiteSupervisor: undefined,
        project: undefined,
        publicityMatters: undefined,
        radiation: undefined,
        restorationKnockOff: undefined,
        restorationSupervisor: undefined,
        safetyMeasureBeforeWork: undefined,
        safetyMeasureDuringWork: undefined,
        safetyMeasureKnockOff: undefined,
        safetyMeasureSupervisor: undefined,
        scrape: undefined,
        siteId: siteId,
        staffStateBeforeWork: undefined,
        staffStateDuringWork: undefined,
        staffStateKnockOff: undefined,
        staffStateSupervisor: undefined,
        system: undefined,
        systemBranch: undefined,
        systemEngineerSignature: undefined,
        username: username,
        viceFirstContractingCorpAppearance: undefined,
        viceSecondContractingCorpAppearance: undefined,
        viceThirdContractingCorpAppearance: undefined,
        workContent: undefined,
        workPlace: undefined,
    };

    const signatures: Record<SignatureName, SignatureStateItem> = {
        contractingCorpStaffSignatureFirst: useState<ISignature>(
            initialValues.contractingCorpStaffSignatureFirst as ISignature
        ),
        contractingCorpStaffSignatureSecond: useState<ISignature>(
            initialValues.contractingCorpStaffSignatureSecond as ISignature
        ),
        contractingCorpStaffSignatureThird: useState<ISignature>(
            initialValues.contractingCorpStaffSignatureThird as ISignature
        ),
        systemEngineerSignature: useState<ISignature>(
            initialValues.systemEngineerSignature as ISignature
        ),
    };

    const signatureLists: Record<SignatureListName, MultiSignatureStateItem> = {
        primeContractingCorpAppearance: useState<ISignature[]>(
            initialValues.primeContractingCorpAppearance as ISignature[]
        ),
        viceFirstContractingCorpAppearance: useState<ISignature[]>(
            initialValues.viceFirstContractingCorpAppearance as ISignature[]
        ),
        viceSecondContractingCorpAppearance: useState<ISignature[]>(
            initialValues.viceSecondContractingCorpAppearance as ISignature[]
        ),
        viceThirdContractingCorpAppearance: useState<ISignature[]>(
            initialValues.viceThirdContractingCorpAppearance as ISignature[]
        ),
    };

    const toast = useToast();
    const [updateToolboxMeeting] = useMutation(GQL_UPDATE_TOOLBOX, {
        onCompleted: ({ updateToolboxMeeting }) => {
            if (updateToolboxMeeting.ok) {
                toast({
                    title: updateToolboxMeeting.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        },
        onError: (err) => {
            console.log(err);
            toast({
                title: '錯誤',
                description: `${err}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        },
    });

    return (
        <Formik
            initialValues={initialValues}
            validateOnChange={false}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                const submitValues = { ...values };
                let key: keyof Record<SignatureName, SignatureStateItem>;
                for (key in signatures) {
                    const [signature] = signatures[key];
                    submitValues[key] = { ...signature };
                }
                let listKey: keyof Record<SignatureListName, MultiSignatureStateItem>;
                for (listKey in signatureLists) {
                    const [signatureList] = signatureLists[listKey];
                    submitValues[listKey] = [...signatureList]
                }

                updateToolboxMeeting({ variables: submitValues });
                actions.setSubmitting(false);
            }}
        >
            {(props) => (
                <ToolboxForm
                    formProps={props}
                    signatures={signatures}
                    signatureLists={signatureLists}
                />
            )}
        </Formik>
    );
}
