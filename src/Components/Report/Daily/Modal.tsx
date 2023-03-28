import { Formik } from 'formik';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
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
        workItem: [
            {
                area: 'CUB棟',
                today: [
                    {
                        projectName: '主管路安裝',
                        location: '1F',
                        completeness: 40,
                        description: '',
                    },
                    {
                        projectName: '線路檢查',
                        location: '2F',
                        completeness: 60,
                        description: '',
                    },
                ],
                tomorrow: [
                    {
                        projectName: '主管路安裝',
                        location: '2F',
                        description: '',
                    },
                ],
            },
            {
                area: 'OB棟',
                today: [
                    {
                        projectName: '主管路安裝',
                        location: '1F',
                        completeness: 40,
                        description: '',
                    },
                    {
                        projectName: '線路檢查',
                        location: '2F',
                        completeness: 60,
                        description: '',
                    },
                ],
                tomorrow: [
                    {
                        projectName: '主管路安裝',
                        location: '2F',
                        description: '',
                    },
                ],
            },
            {
                area: 'AB棟',
                today: [
                    {
                        projectName: '主管路安裝',
                        location: '1F',
                        completeness: 40,
                        description: '',
                    },
                ],
                tomorrow: [
                    {
                        projectName: '主管路安裝',
                        location: '2F',
                        description: '',
                    },
                    {
                        projectName: '主管路安裝',
                        location: '2F',
                        description: '',
                    },
                    {
                        projectName: '主管路安裝',
                        location: '2F',
                        description: '',
                    },
                ],
            },
            {
                area: 'AC棟',
                today: [
                    {
                        projectName: '主管路安裝',
                        location: '1F',
                        completeness: 40,
                        description: '',
                    },
                ],
                tomorrow: [],
            },
            {
                area: 'AD棟',
                today: [],
                tomorrow: [
                    {
                        projectName: '主管路安裝',
                        location: '2F',
                        description: '',
                    },
                    {
                        projectName: '主管路安裝',
                        location: '2F',
                        description: '',
                    },
                    {
                        projectName: '主管路安裝',
                        location: '2F',
                        description: '',
                    },
                ],
            },
        ],
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
            <ModalContent color="#667080">
                <ModalCloseButton position="fixed" top="12px" right="15px" />
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
