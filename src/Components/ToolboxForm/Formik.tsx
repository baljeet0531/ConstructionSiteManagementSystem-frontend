import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import {
    ISignature,
    SignatureStateItem,
    MultiSignatureStateItem,
    convertSignature,
    convertSignList,
} from '../../Interface/Signature';
import {
    IToolbox,
    SignatureName,
    SignatureListName,
    IGQLToolbox,
} from '../../Interface/Toolbox';
import { GQL_TOOLBOX_UPDATE } from './GQL';
import ToolboxForm from './Form';
import { defaultErrorToast } from '../../Utils/DefaultToast';

export default function WorkPermitFormik() {
    const siteId = localStorage.getItem('siteId') as string;
    const initialValues: IToolbox = {
        abnormal: false,
        abnormalRecord: '',
        area: '',
        biologicalHazard: null,
        body: null,
        bodyBelt: null,
        bodyClothing: null,
        bodyMask: null,
        bodyVest: null,
        breathOxygen: null,
        breathe: null,
        breathePapr: null,
        breatheScba: null,
        breatheDust: null,
        breatheFiltration: null,
        chemicalBurn: null,
        chemicalInclude: '',
        chemicalInhalation: null,
        chemicalNone: null,
        collapse: null,
        contentConformSupervisor: false,
        contentConformBeforeWork: false,
        contentConformDuringWork: false,
        contractingCorpStaffSignatureFirst: null,
        contractingCorpStaffSignatureSecond: null,
        contractingCorpStaffSignatureThird: null,
        ear: null,
        earEarmuffs: null,
        earEarplugs: null,
        electric: null,
        electricBreaker: null,
        electricElectroscope: null,
        electricShockPrevention: null,
        eletricDisaster: null,
        explode: null,
        eye: null,
        eyeMechanical: null,
        eyeRadia: null,
        fall: null,
        fallAerialVehicle: null,
        fallArrestor: null,
        fallCage: null,
        fallCover: null,
        fallFence: null,
        fallSafeLine: null,
        fallSafeNet: null,
        fallScaffold: null,
        fallTravelLadder: null,
        fallTrestleLadder: null,
        fallWarningFence: null,
        fire: null,
        fireBackfire: null,
        fireBlanket: null,
        fireDisaster: null,
        fireExtinguisher: null,
        foot: null,
        footChemical: null,
        footNormal: null,
        foreignEnterEye: null,
        gasInclude: '',
        gasNone: null,
        hand: null,
        handCut: null,
        handElectirc: null,
        handGrand: null,
        handHeat: null,
        haneChemical: null,
        head: null,
        headElectric: null,
        headPlastic: null,
        headWorkspace: null,
        heatTouch: null,
        hypoxia: null,
        laborAmount: null,
        meetingDate: dayjs().format('YYYY-MM-DD'),
        meetingTime: dayjs().format('HH:mm'),
        meetingPlace: null,
        microthermTouch: null,
        minorContractCorpOne: null,
        minorContractCorpThree: null,
        minorContractCorpTwo: null,
        minorContractOneStaff: null,
        minorContractThreeStaff: null,
        minorContractTwoStaff: null,
        noise: null,
        number: '',
        objectFall: null,
        ohterPrevention: '',
        otherDisaster: '',
        otherDisasterNone: null,
        outdoorHeat: null,
        oxygen: null,
        oxygenGasDetection: null,
        oxygenLifeDetection: null,
        oxygenLifting: null,
        oxygenRescue: null,
        oxygenVentilation: null,
        physicalFall: null,
        primeContractCorp: '',
        primeContractStaff: '',
        primeContractingCorpAppearance: [],
        principleOnSiteBeforeWork: false,
        principleOnSiteDuringWork: false,
        principleOnSiteKnockOff: false,
        principleOnSiteSupervisor: false,
        project: null,
        publicityMatters: null,
        radiation: null,
        restorationKnockOff: false,
        restorationSupervisor: false,
        safetyMeasureBeforeWork: false,
        safetyMeasureDuringWork: false,
        safetyMeasureKnockOff: false,
        safetyMeasureSupervisor: false,
        scrape: null,
        siteId: siteId,
        staffStateBeforeWork: false,
        staffStateDuringWork: false,
        staffStateKnockOff: false,
        staffStateSupervisor: false,
        system: '',
        systemBranch: '',
        systemEngineerSignature: null,
        username: '',
        viceFirstContractingCorpAppearance: [],
        viceSecondContractingCorpAppearance: [],
        viceThirdContractingCorpAppearance: [],
        workContent: '',
        workPlace: '',
        zone: '',
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const signatures: Record<SignatureName, SignatureStateItem> = {
        contractingCorpStaffSignatureFirst: useState<ISignature>(),
        contractingCorpStaffSignatureSecond: useState<ISignature>(),
        contractingCorpStaffSignatureThird: useState<ISignature>(),
        systemEngineerSignature: useState<ISignature>(),
    };

    const signatureLists: Record<SignatureListName, MultiSignatureStateItem> = {
        primeContractingCorpAppearance: useState<ISignature[]>([]),
        viceFirstContractingCorpAppearance: useState<ISignature[]>([]),
        viceSecondContractingCorpAppearance: useState<ISignature[]>([]),
        viceThirdContractingCorpAppearance: useState<ISignature[]>([]),
    };

    const toast = useToast();
    const [updateToolboxMeeting] = useMutation(GQL_TOOLBOX_UPDATE, {
        onCompleted: ({ updateToolboxMeeting }) => {
            if (updateToolboxMeeting.ok) {
                toast({
                    title: updateToolboxMeeting.message,
                    description: '視窗將於 3 秒後關閉',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    onCloseComplete: () => {
                        window.close();
                    },
                });
            }
        },
        onError: (err) => {
            console.error(err);
            defaultErrorToast(toast);
            throw new Error();
        },
    });

    const handleSignatures = (submit: IToolbox) => {
        let key: keyof Record<SignatureName, SignatureStateItem>;
        for (key in signatures) {
            const [signature] = signatures[key];
            submit[key] = convertSignature(signature) as ISignature;
        }
    };

    const handleSignaturesList = (submit: IToolbox) => {
        let listKey: keyof Record<SignatureListName, MultiSignatureStateItem>;
        for (listKey in signatureLists) {
            const [signatureList] = signatureLists[listKey];
            submit[listKey] = convertSignList(signatureList) as ISignature[];
        }
    };

    useEffect(() => {
        onOpen();
    }, []);

    return (
        <>
            <Formik
                initialValues={initialValues}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    const submitValues = { ...values } as IGQLToolbox;
                    handleSignatures(submitValues);
                    handleSignaturesList(submitValues);
                    submitValues['meetingDatetime'] = [
                        submitValues.meetingDate,
                        submitValues.meetingTime,
                    ].join('T');
                    console.log(submitValues);
                    updateToolboxMeeting({ variables: submitValues }).catch(
                        () => actions.setSubmitting(false)
                    );
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
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent color="#667080">
                    <ModalHeader>簽核時間注意事項</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Box w="100%">
                                依規定，工具箱會議及巡檢紀錄建議簽核時間如下：
                            </Box>
                            <Box w="100%">施工前 08:30~09:30 </Box>
                            <Box w="100%">施工中 13:00~14:00</Box>
                            <Box w="100%">收工前 16:30~17:30</Box>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="buttonBlueSolid" onClick={onClose}>
                            了解
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
