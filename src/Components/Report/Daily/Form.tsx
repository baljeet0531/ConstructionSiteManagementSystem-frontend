import { IDailyReport } from '../../../Interface/DailyReport';
import { FormikProps, Form } from 'formik';
import FormFactory from './Factory';
import { Box, Button, VStack, Image, Text } from '@chakra-ui/react';
import { EditIcon } from '../../../Icons/Icons';

export default function DailyReportForm({
    formProps,
    siteId,
    serialNumber,
}: {
    formProps: FormikProps<IDailyReport>;
    siteId: string;
    serialNumber: string;
}) {
    // const [loading, setLoading] = useState<boolean>(true);
    const f = new FormFactory(formProps);
    // useQuery(GQL_DAILY_REPORT_QUERY, {
    //     variables: {
    //         siteId: siteId,
    //         serialNumber: serialNumber,
    //     },
    //     onCompleted: (d) => {
    //         const singleFormData = parseDailyReport(d.dailyReport);
    //         if (singleFormData) {
    //             formProps.setValues(singleFormData, false);
    //         }
    //         setLoading(false);
    //     },
    //     onError: (err) => {
    //         console.error(err);
    //     },
    //     fetchPolicy: 'network-only',
    // });
    console.log(f);
    console.log(siteId);
    console.log(serialNumber);
    return (
        <Form>
            <Button
                type="submit"
                leftIcon={<EditIcon />}
                variant={'buttonBlueSolid'}
                position="fixed"
                top={'10px'}
                right={'55px'}
                isLoading={formProps.isSubmitting}
                zIndex={2}
            >
                完成編輯
            </Button>
            <Box margin="10px 37px 0px 27px" color="#667080">
                <Image w="150px" h="51px" src={'/mic-icon.png'} />
                <VStack
                    mt="-30px"
                    spacing="-4px"
                    fontSize="32px"
                    fontWeight="400"
                >
                    <Text>工程日報表</Text>
                </VStack>
            </Box>
            {/* {(loading || formProps.isSubmitting) && <FormLoading />} */}
        </Form>
    );
}
