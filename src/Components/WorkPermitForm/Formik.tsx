import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { Cookies } from 'react-cookie';
import {
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ISignature, SignatureStateItem } from '../../Interface/Signature';
import { IWorkPermit, SignatureName } from '../../Interface/WorkPermit';
import WorkPermitForm from './Form';
import { GQL_WORK_PERMIT_MUTATION } from './GQL';

export default function WorkPermitFormik() {
    const siteId = localStorage.getItem('siteId') as string;
    const { number } = JSON.parse(
        localStorage.getItem('singleWorkPermitObject') as string
    );
    document.title = `工作許可單(${number})`;

    const initialValues: IWorkPermit = {
        applicant: new Cookies().get('username'),
        applied: false,
        area: '',
        modified: false,
        number: '',
        opAloft: false,
        opAssemble: false,
        opCage: false,
        opChemical: false,
        opConfined: false,
        opDetach: false,
        opElectric: false,
        opElse: '',
        opFire: false,
        opHole: false,
        opLift: false,
        project: '',
        projectName: localStorage.getItem('siteName') as string,
        siteId: siteId,
        supervisor: '',
        supervisorCorp: '',
        supplyDate: dayjs().format('YYYY-MM-DD'),
        system: '',
        systemBranch: '',
        tel: '',
        workEnd: dayjs()
            .add(1, 'day')
            .hour(17)
            .minute(30)
            .second(0)
            .format('YYYY-MM-DDTHH:mm:ss'),
        workStart: dayjs()
            .add(1, 'day')
            .hour(8)
            .minute(30)
            .second(0)
            .format('YYYY-MM-DDTHH:mm:ss'),
        zone: [],
        approved: undefined,
        review: undefined,
        supplierManager: undefined,
        supplier: undefined,
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const signatures: Record<SignatureName, SignatureStateItem> = {
        approved: useState<ISignature>(initialValues.approved as ISignature),
        review: useState<ISignature>(initialValues.review as ISignature),
        supplier: useState<ISignature>(initialValues.supplier as ISignature),
        supplierManager: useState<ISignature>(
            initialValues.supplierManager as ISignature
        ),
    };

    const toast = useToast();
    const [updateWorkPermit] = useMutation(GQL_WORK_PERMIT_MUTATION, {
        onCompleted: ({ updateWorkPermit }) => {
            if (updateWorkPermit.ok) {
                toast({
                    title: updateWorkPermit.message,
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
            toast({
                title: '錯誤',
                description: `${err}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
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
                    if (submitValues.zone instanceof Array) {
                        submitValues['zone'] = submitValues.zone.join(',');
                    }
                    let key: keyof Record<SignatureName, SignatureStateItem>;
                    for (key in signatures) {
                        const [signature] = signatures[key];
                        submitValues[key] = { ...signature };
                    }
                    console.log(submitValues)
                    updateWorkPermit({ variables: submitValues });
                    actions.setSubmitting(false);
                }}
            >
                {(props) => (
                    <WorkPermitForm formProps={props} signatures={signatures} />
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
