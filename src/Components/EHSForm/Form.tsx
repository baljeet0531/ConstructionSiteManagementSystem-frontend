import { IEHSForm } from '../../Interface/EHSForm';
import { FormikProps, Form } from 'formik';
import FormFactory from './Factory';
import {
    Box,
    Button,
    // Flex,
    // Grid,
    // GridItem,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import { EditIcon } from '../../Icons/Icons';
// import { useQuery } from '@apollo/client';
// import { GQL_FAULT_FORM_QUERY } from './GQL';
import { useState } from 'react';
import { FormLoading } from '../Shared/Loading';
// import GridInputItem from '../Shared/GridInputItem';
// import { contentStyle, tableContentStyle, tableTitleStyle } from './Styles';
// import { getImage } from '../../Utils/Resources';

// import { defaultErrorToast } from '../../Utils/DefaultToast';

export default function EHSForm({
    formProps,
    siteId,
    day,
    normal,
}: // onClose,
{
    formProps: FormikProps<IEHSForm>;
    siteId: string;
    day: string;
    normal: boolean;
    // onClose: () => void;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    // const toast = useToast();
    const f = new FormFactory(formProps);
    // useQuery(GQL_FAULT_FORM_QUERY, {
    //     variables: {
    //         siteId: siteId,
    //         dailyId: dailyId,
    //     },
    //     onCompleted: (d) => {
    //         const singleFormData = parseDailyReport(d.dailyReport);
    //         if (singleFormData) {
    //             formProps.setValues(singleFormData, false);
    //         }
    //         type Node = { node: { siteId: string; avatar: string } };
    //         const targetSites: Node = d.allSites.edges.find(
    //             (i: Node) => i.node.siteId === siteId
    //         );
    //         if (targetSites && targetSites.node.avatar) {
    //             getImage(targetSites.node.avatar).then((b) =>
    //                 setOwnerIconURL(URL.createObjectURL(b as Blob))
    //             );
    //         }
    //         setLoading(false);
    //     },
    //     onError: (err) => {
    //         console.error(err);
    //         setLoading(false);
    //         defaultErrorToast(toast)
    //         onClose();
    //     },
    //     fetchPolicy: 'network-only',
    // });

    console.log(`siteId: ${siteId} day: ${day} normal: ${normal}`);
    console.log(`${f}`);
    console.log(`${setLoading}`);
    console.log(formProps.values);

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
            <Box margin="40px 37px 0px 27px">
                <Image w="150px" h="51px" src={'/mic-icon.png'} />
                <VStack
                    mt="-30px"
                    spacing="-4px"
                    fontSize="32px"
                    fontWeight="400"
                >
                    <Text>帆宣系統科技股份有限公司</Text>
                    <Text>Marketech International Corp.</Text>
                    <Text>工安巡迴檢查表</Text>
                </VStack>
            </Box>
            {(loading || formProps.isSubmitting) && <FormLoading />}
        </Form>
    );
}
