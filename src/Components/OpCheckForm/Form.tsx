import { useQuery } from '@apollo/client';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import { Form, FormikProps } from 'formik';
import { EditIcon } from '../../Icons/Icons';
import { IOpCheck } from '../../Interface/OpCheck/Common';
import { OpCheckHandler } from '../../Utils/OpCheck/Handler';
import { FormLoading } from '../Shared/Loading';
import FormFactory from './Factory';

export default function OpCheckForm({
    formProps,
    handler,
}: {
    formProps: FormikProps<IOpCheck>;
    handler: OpCheckHandler;
}) {
    document.title = `特殊作業工安自主檢點表(${handler.number})`;
    const f = new FormFactory(formProps, handler);
    const { loading } = useQuery(handler.query, {
        variables: {
            siteId: handler.siteId,
            number: handler.number,
        },
        onCompleted: (d) => {
            const singleFormData = handler.parse(d);
            if (singleFormData) {
                formProps.setValues(singleFormData, false);
            }
        },
        onError: (err) => {
            console.error(err);
        },
        fetchPolicy: 'network-only',
    });
    return (
        <Form>
            <Button
                type="submit"
                leftIcon={<EditIcon />}
                variant={'buttonBlueSolid'}
                position="fixed"
                top={'10px'}
                right={'37px'}
                isLoading={formProps.isSubmitting}
                zIndex={2}
            >
                完成編輯
            </Button>
            <Box margin="10px 37px 0px 27px" color="#667080">
                <VStack
                    mt="-30px"
                    spacing="-4px"
                    fontSize="32px"
                    fontWeight="400"
                >
                    <Text>帆宣系統科技股份有限公司</Text>
                    <Text>Marketech International Corp.</Text>
                    <Text>特殊作業工安自主檢點表</Text>
                </VStack>
            </Box>
            {f.textInput()}
            {(loading || formProps.isSubmitting) && <FormLoading />}
        </Form>
    );
}
