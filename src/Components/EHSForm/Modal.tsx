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
import {
    EHSFormName,
    IEHSSignature,
} from '../../Interface/EHSForm/Common';
import EHSForm from './Form';
import { useEffect, useState } from 'react';
import { EHSFormMap } from '../../Utils/EHSForm/Mapper';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { useMutation } from '@apollo/client';
import { ISignature } from '../../Interface/Signature';

export default function EHSFormModal({
    siteId,
    day,
    type,
    onClose,
    isOpen,
}: {
    siteId: string;
    day: string;
    type: EHSFormName;
    onClose: () => void;
    isOpen: boolean;
}) {
    const reminderDisClosure = useDisclosure();
    const toast = useToast();
    const supervisorSignature = useState<ISignature>();
    const responsibleSignatures = useState<IEHSSignature[]>([]);
    const handler = new EHSFormMap[type].handler(
        siteId,
        day,
        supervisorSignature,
        responsibleSignatures
    );
    const [updateEHSForm] = useMutation(handler.mutation, {
        onCompleted: ({ d }) => {
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
                            <EHSForm
                                formProps={props}
                                type={type}
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
                                        依規定，工安巡迴檢查表建議於08:30~17:30間完成簽核程序。
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
