import { Formik } from 'formik';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useToast,
} from '@chakra-ui/react';
import FaultForm from './Form';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { useMutation } from '@apollo/client';
import { FaultFormHandler } from '../../Utils/FaultFormHandler';

export default function FaultFormModal({
    siteId,
    day,
    responsibleTarget,
    code,
    onClose,
    isOpen,
}: {
    siteId: string;
    day: string;
    responsibleTarget: string;
    code: string;
    onClose: () => void;
    isOpen: boolean;
}) {
    const toast = useToast();
    const handler = new FaultFormHandler(siteId, day, responsibleTarget, code);

    const [updateFaultForm] = useMutation(handler.mutation, {
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

    return (
        <Modal onClose={onClose} isOpen={isOpen} size="full">
            <ModalOverlay />
            <ModalContent color="#667080">
                <ModalCloseButton position="fixed" top="12px" right="15px" />
                <ModalBody>
                    <Formik
                        initialValues={handler.getInitialValues()}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(true);
                            const submitValues = handler.marshal(values);
                            console.log(submitValues);
                            updateFaultForm({
                                variables: submitValues,
                            }).catch(() => actions.setSubmitting(false));
                        }}
                    >
                        {(props) => (
                            <FaultForm
                                formProps={props}
                                handler={handler}
                                onClose={onClose}
                            />
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
