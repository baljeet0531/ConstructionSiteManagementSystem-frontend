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
    Flex,
    useToast,
} from '@chakra-ui/react';
import { Form, FormikProps } from 'formik';
import { EditIcon } from '../../Icons/Icons';
import { FormLoading } from '../Shared/Loading';
import FormFactory from './Factory';
import GridInputItem from '../Shared/GridInputItem';
import SignaturePad from '../Shared/SignaturePad';
import {
    baseStyle,
    filledStyle,
    tableStyle,
    unboxStyle,
} from '../OpCheckForm/Styles';
import { SingleSignatureHandler } from '../../Utils/Signature/Single';
import { IEnvSecurityForm } from '../../Interface/EnvSecurityForm';
import { EnvSecurityFormHandler } from '../../Utils/EnvSecurityFormHandler';
import { useState } from 'react';
import { defaultErrorToast } from '../../Utils/DefaultToast';

export default function EnvSecurityForm({
    formProps,
    handler,
    onClose,
}: {
    formProps: FormikProps<IEnvSecurityForm>;
    handler: EnvSecurityFormHandler;
    onClose: () => void;
}) {
    const [loading, setLoading] = useState<boolean>(true);
    const toast = useToast();
    // const onItemsCount = Object.keys(handler.onItems).length;
    // const offItemsCount = Object.keys(handler.offItems).length;
    const f = new FormFactory(formProps, handler);
    useQuery(handler.query, {
        variables: {
            siteId: handler.siteId,
            number: handler.number,
        },
        onCompleted: (d) => {
            console.log(d);
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
                    <Text>帆宣系統科技股份有限公司</Text>
                    <Text>Marketech International Corp.</Text>
                    <Text>環安衛自主檢點表</Text>
                </VStack>
                <Grid
                    w="100%"
                    mt="15px"
                    templateColumns="repeat(2, 80px 200px)"
                >
                    <GridItem {...unboxStyle}>作業單位</GridItem>
                    <GridInputItem
                        fieldName="department"
                        inputComponent={f.textInput()}
                        style={{ ...unboxStyle }}
                    />
                    <GridItem {...unboxStyle} justifyContent="flex-end">
                        廠區
                    </GridItem>
                    <GridInputItem
                        fieldName="zone"
                        inputComponent={f.textInput()}
                        style={{ ...unboxStyle }}
                    />
                    <GridItem {...unboxStyle} justifyContent="flex-end">
                        施工地點
                    </GridItem>
                    <GridInputItem
                        fieldName="area"
                        inputComponent={f.textInput()}
                        style={{ ...unboxStyle }}
                    />
                    <GridItem {...unboxStyle} justifyContent="flex-end">
                        日期
                    </GridItem>
                    <GridInputItem
                        fieldName="day"
                        inputComponent={<Input type="date" size="sm" />}
                        style={{ ...unboxStyle }}
                    />
                </Grid>
                <Grid
                    w="100%"
                    mt="15px"
                    templateColumns="45px 60fr 460fr 50fr 50fr 95fr"
                    templateRows={`20px 20px repeat(42, 35px)`}
                >
                    <GridItem rowStart={1} rowEnd={3} {...filledStyle}>
                        項目
                    </GridItem>
                    <GridItem rowStart={1} rowEnd={3} {...filledStyle}>
                        代碼
                    </GridItem>
                    <GridItem rowStart={1} rowEnd={3} {...filledStyle}>
                        檢點項目
                    </GridItem>
                    <GridItem
                        colStart={4}
                        colEnd={6}
                        {...filledStyle}
                        pl="1em"
                        letterSpacing="1em"
                        textAlign="center"
                    >
                        結果
                    </GridItem>
                    <GridItem
                        rowStart={1}
                        rowEnd={3}
                        colStart={6}
                        colEnd={7}
                        {...filledStyle}
                    >
                        異常改善措施
                    </GridItem>
                    <GridItem {...filledStyle}>正常</GridItem>
                    <GridItem {...filledStyle}>異常</GridItem>
                    <GridItem
                        colStart={1}
                        colEnd={2}
                        rowStart={3}
                        rowEnd={45}
                        {...baseStyle}
                        borderTop="0px"
                        justifyContent="center"
                        letterSpacing="0.5em"
                        sx={{ writingMode: 'vertical-lr' }}
                    >
                        一、施工前
                    </GridItem>
                    {f.getOnRows()}
                    <GridItem colStart={1} colEnd={3} {...filledStyle}>
                        監工
                    </GridItem>
                    <Grid
                        templateColumns="178fr 105fr 178fr"
                        templateRows="60px"
                    >
                        <GridItem {...tableStyle}>
                            <SignaturePad
                                title="施工前 - 監工 - 簽名"
                                signatureName="supervisor-before-work-signature.png"
                                handler={
                                    new SingleSignatureHandler(
                                        handler.signatures.supervisorBefore
                                    )
                                }
                                placeHolderText="簽名"
                                showTime={false}
                                disable={
                                    !!handler.signatures.supervisorBefore[0]?.no
                                }
                            />
                        </GridItem>
                        <GridItem {...filledStyle}>作業人員</GridItem>
                        <GridItem {...tableStyle}>
                            <SignaturePad
                                title="施工前 - 作業人員 - 簽名"
                                signatureName="staff-before-work-signature.png"
                                handler={
                                    new SingleSignatureHandler(
                                        handler.signatures.staffBefore
                                    )
                                }
                                placeHolderText="簽名"
                                showTime={false}
                                disable={
                                    !!handler.signatures.staffBefore[0]?.no
                                }
                            />
                        </GridItem>
                    </Grid>
                    <GridItem colStart={4} colEnd={6} {...filledStyle}>
                        檢點時間
                    </GridItem>
                    <GridItem {...tableStyle}>
                        {f.checkTimeInput(handler.signatures.staffBefore)}
                    </GridItem>
                </Grid>
                <Grid
                    w="100%"
                    mt="30px"
                    borderTop="1px"
                    borderColor="#919AA9"
                    templateColumns="45px 60fr 460fr 50fr 50fr 95fr"
                    templateRows="repeat(8, 35px)"
                >
                    <GridItem
                        colStart={1}
                        colEnd={2}
                        rowStart={1}
                        rowEnd={9}
                        {...baseStyle}
                        borderTop="0px"
                        justifyContent="center"
                        letterSpacing="0.5em"
                        sx={{ writingMode: 'vertical-lr' }}
                    >
                        二、收工前
                    </GridItem>
                    {f.getOffRows()}
                    <GridItem colStart={1} colEnd={3} {...filledStyle}>
                        監工
                    </GridItem>
                    <Grid
                        templateColumns="178fr 105fr 178fr"
                        templateRows="60px"
                    >
                        <GridItem {...tableStyle}>
                            <SignaturePad
                                title="收工前 - 監工 - 簽名"
                                signatureName="supervisor-after-work-signature.png"
                                handler={
                                    new SingleSignatureHandler(
                                        handler.signatures.supervisorAfter
                                    )
                                }
                                placeHolderText="簽名"
                                showTime={false}
                                disable={
                                    !!handler.signatures.supervisorAfter[0]?.no
                                }
                            />
                        </GridItem>
                        <GridItem {...filledStyle}>作業人員</GridItem>
                        <GridItem {...tableStyle}>
                            <SignaturePad
                                title="收工前 - 作業人員 - 簽名"
                                signatureName="staff-after-work-signature.png"
                                handler={
                                    new SingleSignatureHandler(
                                        handler.signatures.staffAfter
                                    )
                                }
                                placeHolderText="簽名"
                                showTime={false}
                                disable={!!handler.signatures.staffAfter[0]?.no}
                            />
                        </GridItem>
                    </Grid>
                    <GridItem colStart={4} colEnd={6} {...filledStyle}>
                        檢點時間
                    </GridItem>
                    <GridItem {...tableStyle}>
                        {f.checkTimeInput(handler.signatures.staffAfter)}
                    </GridItem>
                </Grid>
                <Flex flexDirection="column">
                    <Text alignSelf="end">EE-4404-02A</Text>
                    <Text alignSelf="start" fontWeight={700}>
                        備註
                    </Text>
                </Flex>
                <Grid
                    w="100%"
                    m="5px 0 25px"
                    p="8px"
                    border="2px solid #919AA9"
                    borderRadius="4px"
                    templateColumns="1fr"
                    templateRows="repeat(${offItemsCount}, minmax(min-content, auto))"
                >
                    <GridItem {...unboxStyle}>
                        1.使用時機：本表單應於每日作業前及收工前進行檢點；若分組作業時，各小組均應進行本表單之檢點並標示於明顯處。
                    </GridItem>
                    <GridItem {...unboxStyle}>
                        2.檢點方式：作業人員請將檢點結果於適合的欄位打”V”。
                    </GridItem>
                    <GridItem {...unboxStyle}>
                        3.歸檔：本表單應於每日作業檢點後，與工作許可單一併自存備查。
                    </GridItem>
                    <GridItem {...unboxStyle}>
                        4.檢點項目：檢點內容不足時可自行填寫於空白處。
                    </GridItem>
                </Grid>
            </Box>
            {(loading || formProps.isSubmitting) && <FormLoading />}
        </Form>
    );
}
