import { Formik } from 'formik';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { IDailyReport } from '../../../Interface/DailyReport';
import DailyReportForm from './Form';

export default function DailyReportModal({
    siteId,
    serialNumber,
    onClose,
    isOpen,
}: {
    siteId: string;
    serialNumber: string;
    onClose: () => void;
    isOpen: boolean;
}) {
    const initialValues: IDailyReport = {
        siteId: siteId,
        serialNumber: serialNumber,
    };
    // const toast = useToast();
    // const [updateDailyReport] = useMutation(GQL_DAILY_REPORT_MUTATION, {
    //     onCompleted: ({ updateDailyReport }) => {
    //         if (updateDailyReport.ok) {
    //             toast({
    //                 title: updateDailyReport.message,
    //                 description: '視窗將於 3 秒後關閉',
    //                 status: 'success',
    //                 duration: 3000,
    //                 isClosable: true,
    //                 onCloseComplete: () => {
    //                     window.close();
    //                 },
    //             });
    //         }
    //     },
    //     onError: (err) => {
    //         console.error(err);
    //         defaultErrorToast(toast);
    //         throw new Error();
    //     },
    // });
    return (
        <Modal onClose={onClose} isOpen={isOpen} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{`工程日報表(${serialNumber})`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik
                        initialValues={initialValues}
                        validateOnChange={false}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(true);
                            const submitValues = { ...values } as IDailyReport;

                            console.log(submitValues);
                            // updateDailyReport({
                            //     variables: submitValues,
                            // }).catch(() => actions.setSubmitting(false));
                        }}
                    >
                        {(props) => (
                            <DailyReportForm
                                formProps={props}
                                siteId={siteId}
                                serialNumber={serialNumber}
                            />
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
