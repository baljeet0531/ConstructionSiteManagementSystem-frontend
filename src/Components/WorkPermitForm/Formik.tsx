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
import {
    convertSignature,
    ISignature,
    SignatureStateItem,
} from '../../Interface/Signature';
import { IWorkPermit, SignatureName } from '../../Interface/WorkPermit';
import WorkPermitForm from './Form';
import { GQL_WORK_PERMIT_MUTATION } from './GQL';
import { defaultErrorToast } from '../../Utils/DefaultToast';

export default function WorkPermitFormik() {
    const siteId = localStorage.getItem('siteId') as string;

    const initialValues: IWorkPermit = {
        applicant: new Cookies().get('username'),
        applied: true,
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
            defaultErrorToast(toast);
            throw new Error();
        },
    });

    const handleSignatures = (submit: IWorkPermit) => {
        let key: keyof Record<SignatureName, SignatureStateItem>;
        for (key in signatures) {
            const [signature] = signatures[key];
            submit[key] = convertSignature(signature) as ISignature;
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
                onSubmit={(values, actions) => {
                    const submitValues = { ...values };
                    if (submitValues.zone instanceof Array) {
                        submitValues['zone'] = submitValues.zone.join(',');
                    }
                    handleSignatures(submitValues);
                    updateWorkPermit({ variables: submitValues }).catch(() =>
                        actions.setSubmitting(false)
                    );
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
                                依規定，工作許可單建議於工程前一天完成簽核程序。
                            </Box>
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
