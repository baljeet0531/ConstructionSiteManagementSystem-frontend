import { useQuery } from '@apollo/client';
import {
    Box,
    Button,
    VStack,
    Text,
    Image,
    Grid,
    GridItem,
    Input,
} from '@chakra-ui/react';
import { Form, FormikProps } from 'formik';
import { EditIcon } from '../../Icons/Icons';
import { IOpCheck, OpCheckName } from '../../Interface/OpCheck/Common';
import { OpCheckHandler } from '../../Utils/OpCheck/Handler';
import { FormLoading } from '../Shared/Loading';
import FormFactory from './Factory';
import GridInputItem from '../Shared/GridInputItem';
import { unboxStyle } from './Style';

export default function OpCheckForm({
    formProps,
    type,
    handler,
}: {
    formProps: FormikProps<IOpCheck>;
    type: OpCheckName;
    handler: OpCheckHandler;
}) {
    document.title = `特殊作業工安自主檢點表(${handler.number})`;
    const f = new FormFactory(formProps, type, handler);
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
                <Image w="150px" h="51px" src={'/mic-icon.png'} />
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
                <Grid
                    height="80px"
                    w="90%"
                    mt="30px"
                    templateColumns="6em repeat(4, 1fr)"
                    templateRows="repeat(3, 1fr)"
                >
                    <GridItem {...unboxStyle}>作業名稱：</GridItem>
                    <GridItem rowStart={2} rowEnd={4} />
                    {f.allTypeCheckBoxes()}
                </Grid>
                <Grid
                    w="100%"
                    mt="15px"
                    templateColumns="repeat(2, 80px 2fr 50px 2fr) "
                >
                    <GridItem {...unboxStyle}>施工地點：</GridItem>
                    <GridInputItem
                        fieldName="area"
                        inputComponent={f.textInput()}
                        style={{ ...unboxStyle }}
                    />
                    <GridItem {...unboxStyle} justifyContent="flex-end">
                        廠區：
                    </GridItem>
                    <GridInputItem
                        fieldName="zone"
                        inputComponent={f.textInput()}
                        style={{ ...unboxStyle }}
                    />
                    <GridItem {...unboxStyle} justifyContent="flex-end">
                        作業單位：
                    </GridItem>
                    <GridInputItem
                        fieldName="department"
                        inputComponent={f.textInput()}
                        style={{ ...unboxStyle }}
                    />
                    <GridItem {...unboxStyle} justifyContent="flex-end">
                        日期：
                    </GridItem>
                    <GridInputItem
                        fieldName="day"
                        inputComponent={<Input type="date" size="sm" />}
                        style={{ ...unboxStyle }}
                    />
                </Grid>
            </Box>
            {(loading || formProps.isSubmitting) && <FormLoading />}
        </Form>
    );
}
