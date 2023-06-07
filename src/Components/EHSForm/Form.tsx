import { EHSFormName, IEHSForm } from '../../Interface/EHSForm/Common';
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
    useToast,
} from '@chakra-ui/react';
import { EditIcon } from '../../Icons/Icons';
// import { useQuery } from '@apollo/client';
// import { GQL_FAULT_FORM_QUERY } from './GQL';
import { useState } from 'react';
import { FormLoading } from '../Shared/Loading';
import { EHSFormHandler } from '../../Utils/EHSForm/Handler';
import { useQuery } from '@apollo/client';
import { defaultErrorToast } from '../../Utils/DefaultToast';
// import GridInputItem from '../Shared/GridInputItem';
// import { contentStyle, tableContentStyle, tableTitleStyle } from './Styles';
// import { getImage } from '../../Utils/Resources';

// import { defaultErrorToast } from '../../Utils/DefaultToast';

export default function EHSForm({
    formProps,
    type,
    handler,
    onClose,
}: {
    formProps: FormikProps<IEHSForm>;
    type: EHSFormName;
    handler: EHSFormHandler;
    onClose: () => void;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const groupsCount = Object.keys(handler.itemGroups).length;
    const toast = useToast();
    const f = new FormFactory(formProps, type, handler);
    useQuery(handler.query, {
        variables: {
            siteId: handler.siteId,
            day: handler.day,
        },
        onCompleted: (d) => {
            const singleFormData = handler.parse(d[handler.queryName]);
            if (singleFormData) {
                formProps.setValues(singleFormData, false);
            }
            setLoading(false);
        },
        onError: (err) => {
            console.error(err);
            setLoading(false);
            defaultErrorToast(toast);
            onClose();
        },
        fetchPolicy: 'network-only',
    });

    console.log(`siteId: ${handler.siteId} day: ${handler.day} type: ${type}`);
    console.log(`${f}`);
    console.log(`${setLoading}`);
    console.log(`${groupsCount}`);
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
