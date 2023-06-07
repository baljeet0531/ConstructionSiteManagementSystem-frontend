import { Formik } from 'formik';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    // useToast,
} from '@chakra-ui/react';
import { IEHSForm } from '../../Interface/EHSForm/Common';
import EHSForm from './Form';
// import { GQL_FAULT_FORM_MUTATION } from './GQL';
// import { defaultErrorToast } from '../../Utils/DefaultToast';
// import { useMutation } from '@apollo/client';
// import { QUERY_FAULT_FORM } from './Overview';

export default function EHSFormModal({
    siteId,
    day,
    normal,
    onClose,
    isOpen,
}: {
    siteId: string;
    day: string;
    normal: boolean;
    onClose: () => void;
    isOpen: boolean;
}) {
    const initialValues: IEHSForm = {
        siteId: siteId,
        day: day,
    };
    // const toast = useToast();
    // const [updateFaultForm] = useMutation(GQL_FAULT_FORM_MUTATION, {
    //     onCompleted: ({ updateFaultForm }) => {
    //         if (updateFaultForm.ok) {
    //             toast({
    //                 title: updateFaultForm.message,
    //                 description: '視窗將於 3 秒後關閉',
    //                 status: 'success',
    //                 duration: 3000,
    //                 isClosable: true,
    //                 onCloseComplete: () => {
    //                     onClose();
    //                 },
    //             });
    //         }
    //     },
    //     onError: (err) => {
    //         console.error(err);
    //         defaultErrorToast(toast);
    //         throw new Error();
    //     },
        // refetchQueries:[{
        //     query:QUERY_FAULT_FORM,
        //     variables:{
        //         siteId:siteId,
        //     },
        // }
        // ],
    // });

    return (
        <Modal onClose={onClose} isOpen={isOpen} size="full">
            <ModalOverlay />
            <ModalContent color="#667080">
                <ModalCloseButton position="fixed" top="12px" right="15px" />
                <ModalBody>
                    <Formik
                        initialValues={initialValues}
                        validateOnChange={false}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(true);
                            const submitValues = {
                                ...values,
                            } as IEHSForm;
                            console.log(submitValues);
                            // updateFaultForm({
                            //     variables: submitValues,
                            // }).catch(() => actions.setSubmitting(false));
                        }}
                    >
                        {(props) => (
                            <EHSForm
                                formProps={props}
                                siteId={siteId}
                                day={day}
                                normal={normal}
                            />
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
