import { Formik } from 'formik';
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
    VStack,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import EnvSecurityForm from './Form';
import { useEffect, useState } from 'react';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { useMutation } from '@apollo/client';
import { ISignature, SignatureStateItem } from '../../Interface/Signature';
import { SignatureName } from '../../Interface/OpCheck/Common';
import { EnvSecurityFormHandler } from '../../Utils/EnvSecurityFormHandler';

export default function EnvSecurityFormModal({
    siteId,
    number,
    onClose,
    isOpen,
}: {
    siteId: string;
    number: string;
    onClose: () => void;
    isOpen: boolean;
}) {
    const reminderDisClosure = useDisclosure();
    const toast = useToast();
    const signatures: Record<SignatureName, SignatureStateItem> = {
        staffAfter: useState<ISignature>(),
        supervisorAfter: useState<ISignature>(),
        staffBefore: useState<ISignature>(),
        supervisorBefore: useState<ISignature>(),
    };
    const handler = new EnvSecurityFormHandler(siteId, number, signatures);
    const [updateEHSForm] = useMutation(handler.mutation, {
        onCompleted: (d) => {
            const response = d[handler.mutationName];
            if (response.ok) {
                toast({
                    title: response.message,
                    description: '視窗將於 3 秒後關閉',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    onCloseComplete: () => {
                        onClose();
                    },
                });
            }
        },
        onError: (err) => {
            console.error(err);
            defaultErrorToast(toast);
            throw new Error();
        },
        refetchQueries: [
            {
                query: handler.query,
                variables: {
                    siteId: siteId,
                },
            },
        ],
    });

    useEffect(() => {
        reminderDisClosure.onOpen();
    }, []);

    return (
        <Modal onClose={onClose} isOpen={isOpen} size="full">
            <ModalOverlay />
            <ModalContent color="#667080">
                <ModalCloseButton position="fixed" top="12px" right="15px" />
                <ModalBody>
                    <Formik
                        initialValues={handler.getInitialValues()}
                        validateOnChange={false}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(true);
                            const submitValues = {
                                ...values,
                            };
                            handler.marshal(submitValues);
                            console.log(submitValues);
                            updateEHSForm({
                                variables: submitValues,
                            }).catch(() => actions.setSubmitting(false));
                        }}
                    >
                        {(props) => (
                            <EnvSecurityForm
                                formProps={props}
                                handler={handler}
                                onClose={onClose}
                            />
                        )}
                    </Formik>
                    <Modal
                        onClose={reminderDisClosure.onClose}
                        isOpen={reminderDisClosure.isOpen}
                        isCentered
                    >
                        <ModalOverlay />
                        <ModalContent color="#667080">
                            <ModalHeader>簽核時間注意事項</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <VStack>
                                    <Box w="100%">
                                        依規定，環安衛自主檢點表建議於08:30~10:30間完成簽核程序。
                                    </Box>
                                </VStack>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="buttonBlueSolid"
                                    onClick={reminderDisClosure.onClose}
                                >
                                    了解
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
