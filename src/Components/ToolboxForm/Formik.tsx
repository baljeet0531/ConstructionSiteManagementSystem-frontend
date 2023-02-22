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
} from '../../Interface/Signature';
import {
    IToolbox,
    SignatureName,
    SignatureListName,
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
        biologicalHazard: undefined,
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
        chemicalNone: undefined,
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
        gasNone: undefined,
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
        laborAmount: undefined,
        meetingDate: dayjs().format('YYYY-MM-DD'),
        meetingTime: dayjs().format('HH:mm'),
        meetingPlace: undefined,
        microthermTouch: undefined,
        minorContractCorpOne: undefined,
        minorContractCorpThree: undefined,
        minorContractCorpTwo: undefined,
        minorContractOneStaff: undefined,
        minorContractThreeStaff: undefined,
        minorContractTwoStaff: undefined,
        noise: undefined,
        number: '',
        objectFall: undefined,
        ohterPrevention: undefined,
        otherDisaster: undefined,
        otherDisasterNone: undefined,
        outdoorHeat: undefined,
        oxygen: undefined,
        oxygenGasDetection: undefined,
        oxygenLifeDetection: undefined,
        oxygenLifting: undefined,
        oxygenRescue: undefined,
        oxygenVentilation: undefined,
        physicalFall: undefined,
        primeContractCorp: undefined,
        primeContractStaff: undefined,
        primeAppearSignature: [],
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
        username: '',
        viceFirstAppearSignature: [],
        viceSecondAppearSignature: [],
        viceThirdAppearSignature: [],
        workContent: undefined,
        workPlace: undefined,
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
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
        primeAppearSignature: useState<ISignature[]>(
            initialValues.primeAppearSignature as ISignature[]
        ),
        viceFirstAppearSignature: useState<ISignature[]>(
            initialValues.viceFirstAppearSignature as ISignature[]
        ),
        viceSecondAppearSignature: useState<ISignature[]>(
            initialValues.viceSecondAppearSignature as ISignature[]
        ),
        viceThirdAppearSignature: useState<ISignature[]>(
            initialValues.viceThirdAppearSignature as ISignature[]
        ),
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
            console.log(err);
            defaultErrorToast(toast);
        },
    });

    useEffect(() => {
        onOpen();
    }, []);

    return (
        <>
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
                    let listKey: keyof Record<
                        SignatureListName,
                        MultiSignatureStateItem
                    >;
                    for (listKey in signatureLists) {
                        const [signatureList] = signatureLists[listKey];
                        submitValues[listKey] = [...signatureList];
                    }
                    updateToolboxMeeting({ variables: submitValues });
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
