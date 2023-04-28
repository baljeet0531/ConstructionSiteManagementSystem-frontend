import { Formik } from 'formik';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useToast,
} from '@chakra-ui/react';
import {
    GQLDailyReport,
    GQLTodayItem,
    GQLTomorrowItem,
    IDailyReport,
} from '../../../Interface/DailyReport';
import DailyReportForm from './Form';
import { GQL_DAILY_REPORT_MUTATION } from './GQL';
import { defaultErrorToast } from '../../../Utils/DefaultToast';
import { useMutation } from '@apollo/client';

export default function DailyReportModal({
    siteId,
    dailyId,
    onClose,
    isOpen,
}: {
    siteId: string;
    dailyId: number;
    onClose: () => void;
    isOpen: boolean;
}) {
    const initialValues: IDailyReport = {
        siteId: siteId,
        dailyId: dailyId,
        todayProgress: '',
        totalProgress: '',
        projectName: '',
        owner: '',
        department: '',
        date: '',
        enterDate: '',
        cumulativeDays: 0,
        cumulativeLabor: 0,
        weatherMorning: '',
        weatherAfternoon: '',
        maxTemperature: 0,
        minTemperature: 0,
        workItem: [],
        supervisorIem: 0,
        supervisorConditioner: 0,
        supervisorFire: 0,
        supervisorDrain: 0,
        supervisorGas: 0,
        supervisorElectric: 0,
        supervisorControl: 0,
        supervisorWeakElectric: 0,
        supervisorOther: 0,
        laborIem: 0,
        laborConditioner: 0,
        laborFire: 0,
        laborDrain: 0,
        laborGas: 0,
        laborElectric: 0,
        laborControl: 0,
        laborWeakElectric: 0,
        laborOther: 0,
        nightIem: 0,
        nightConditioner: 0,
        nightFire: 0,
        nightDrain: 0,
        nightGas: 0,
        nightElectric: 0,
        nightControl: 0,
        nightWeakElectric: 0,
        nightOther: 0,
        totalIem: 0,
        totalConditioner: 0,
        totalFire: 0,
        totalDrain: 0,
        totalGas: 0,
        totalElectric: 0,
        totalControl: 0,
        totalWeakElectric: 0,
        totalOther: 0,
        total: 0,
    };
    const toast = useToast();
    const [updateDailyReport] = useMutation(GQL_DAILY_REPORT_MUTATION, {
        onCompleted: ({ updateDailyReport }) => {
            if (updateDailyReport.ok) {
                toast({
                    title: updateDailyReport.message,
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
    });
    const handleWorkItems = (values: GQLDailyReport) => {
        const todayList: GQLTodayItem[] = [];
        const tomorrowList: GQLTomorrowItem[] = [];
        values.workItem.forEach(({ area, today, tomorrow }) => {
            const common = {
                dailyId: dailyId,
                siteId: siteId,
                buildingName: area,
            };
            today.forEach((item) => {
                if (item.projectName === '') {
                    return;
                }
                todayList.push({
                    ...item,
                    ...common,
                });
            });
            tomorrow.forEach((item) => {
                if (item.projectName === '') {
                    return;
                }
                tomorrowList.push({
                    ...item,
                    ...common,
                });
            });
        });
        values.todayWorkItem = todayList;
        values.tomorrowWorkItem = tomorrowList;
    };
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
                            } as GQLDailyReport;
                            handleWorkItems(submitValues);
                            console.log(submitValues);
                            updateDailyReport({
                                variables: submitValues,
                            }).catch(() => actions.setSubmitting(false));
                        }}
                    >
                        {(props) => (
                            <DailyReportForm
                                formProps={props}
                                siteId={siteId}
                                dailyId={dailyId}
                            />
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
