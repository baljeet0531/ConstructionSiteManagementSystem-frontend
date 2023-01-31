import React from 'react';
import { Navigate } from 'react-router-dom';
import {
    Box,
    Button,
    Checkbox,
    Grid,
    GridItem,
    Image,
    Input,
    Flex,
    Text,
    HStack,
    VStack,
} from '@chakra-ui/react';
import { FormikProps, Form } from 'formik';
import { IWorkPermit, SignatureName } from './Formik';
import { EditIcon, ChevronDownIcon } from '../../Icons/Icons';
import { SignatureStateItem } from '../../Interface/Signature';
import { IsPermit } from '../../Mockdata/Mockdata';
import SignaturePad from '../Shared/SignaturePad';
import GridInputItem from './GridInputItem';

export default function WorkPermitForm({
    formProps,
    signatures,
}: {
    formProps: FormikProps<IWorkPermit>;
    signatures: Record<SignatureName, SignatureStateItem>;
}) {
    if (!IsPermit('eng_work_permit_form'))
        return <Navigate to="/" replace={true} />;

    const titleStyle = {
        border: '1px',
        borderColor: '#919AA9',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '4px',
    };

    const contentStyle = {
        ...titleStyle,
        borderTop: '0px',
        borderRight: '0px',
        paddingLeft: '12px',
    };

    const lastStyle = {
        ...contentStyle,
        borderRight: '1px',
    };

    const numberStyle = {
        ...titleStyle,
        paddingLeft: '0px',
        borderTop: '0px',
        borderRight: '0px',
        justifyContent: 'center',
    };

    const placeholderStyle = {
        color: '#667080',
        opacity: 0.5,
    };

    function OpCheckBox(props: React.ComponentProps<any>) {
        return (
            <Checkbox
                w="100%"
                spacing="2rem"
                isChecked={formProps.values.applied}
                onChange={formProps.handleChange}
            >
                {props.children}
            </Checkbox>
        );
    }

    function TextInput() {
        return (
            <Input
                type="text"
                border="0px"
                placeholder="填寫"
                _placeholder={placeholderStyle}
            />
        );
    }

    return (
        <Form>
            <Button
                type="submit"
                leftIcon={<EditIcon />}
                variant={'buttonBlueOutline'}
                position="fixed"
                top={'10px'}
                right={'37px'}
                isLoading={formProps.isSubmitting}
                onClick={formProps.submitForm}
            >
                完成編輯
            </Button>
            <Box margin="10px 37px 0px 27px" color="#667080">
                <Flex direction="column">
                    <Image w="150px" h="51px" src={'/mic-icon.png'} />
                    <VStack
                        mt="-30px"
                        spacing="-4px"
                        fontSize="32px"
                        fontWeight="400"
                    >
                        <Text>帆宣系統科技股份有限公司</Text>
                        <Text>Marketech International Corp.</Text>
                        <Text>工作許可單</Text>
                    </VStack>
                    <HStack>
                        <GridInputItem
                            fieldName="applied"
                            inputComponent={
                                <Checkbox
                                    isChecked={formProps.values.applied}
                                    onChange={formProps.handleChange}
                                >
                                    初次申請
                                </Checkbox>
                            }
                            handleValidate={(value: boolean) => {
                                if (value && formProps.values['modified']) {
                                    formProps.setFieldValue('modified', false);
                                }
                            }}
                        />
                        <GridInputItem
                            fieldName="modified"
                            inputComponent={
                                <Checkbox
                                    isChecked={formProps.values.modified}
                                    onChange={formProps.handleChange}
                                >
                                    申請異動
                                </Checkbox>
                            }
                            handleValidate={(value: boolean) => {
                                if (value && formProps.values['applied']) {
                                    formProps.setFieldValue('applied', false);
                                }
                            }}
                        />
                    </HStack>
                </Flex>
                <Grid
                    width="92.5vw"
                    height="45vh"
                    templateColumns={'50fr 120fr 183fr 120fr 287fr'}
                    templateRows={'36fr repeat(7, 50fr)'}
                >
                    <GridItem colStart={1} colEnd={6} {...titleStyle}>
                        一、申請資料：
                    </GridItem>

                    <GridItem {...numberStyle}>1</GridItem>
                    <GridItem {...contentStyle}>日期：</GridItem>
                    <GridInputItem
                        gridRange={[2, 2, 3, 4]}
                        fieldName={'supplyDate'}
                        inputComponent={<Input type="date" border="0px" />}
                        inputRightComponent={<ChevronDownIcon />}
                        style={contentStyle}
                    />
                    <GridItem
                        colStart={4}
                        colEnd={6}
                        {...lastStyle}
                        borderLeft="0px"
                    />

                    <GridItem {...numberStyle}>2</GridItem>
                    <GridItem {...contentStyle}>工作內容：</GridItem>
                    <GridItem colStart={3} colEnd={6} {...lastStyle} />

                    <GridItem {...numberStyle}>3</GridItem>
                    <GridItem {...contentStyle}>施工廠區：</GridItem>
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...contentStyle}>施工區域：</GridItem>
                    <GridItem {...lastStyle} />

                    <GridItem {...numberStyle}>4</GridItem>
                    <GridItem {...contentStyle}>預計施工時間：</GridItem>
                    <GridItem colStart={3} colEnd={6} {...lastStyle} />

                    <GridItem {...numberStyle}>5</GridItem>
                    <GridItem {...contentStyle}>監工單位：</GridItem>
                    <GridInputItem
                        gridRange={[6, 7, 3, 6]}
                        fieldName="supervisorCorp"
                        inputComponent={<TextInput />}
                        style={lastStyle}
                    />

                    <GridItem {...numberStyle}>6</GridItem>
                    <GridItem {...contentStyle}>監工：</GridItem>
                    <GridInputItem
                        gridRange={[7, 8, 3, 4]}
                        fieldName="supervisor"
                        inputComponent={<TextInput />}
                        style={contentStyle}
                    />
                    <GridItem {...contentStyle}>聯絡電話：</GridItem>
                    <GridInputItem
                        gridRange={[7, 8, 5, 6]}
                        fieldName="tel"
                        inputComponent={<TextInput />}
                        style={lastStyle}
                    />

                    <GridItem {...numberStyle}>7</GridItem>
                    <GridItem {...contentStyle}>專案編號：</GridItem>
                    <GridInputItem
                        gridRange={[8, 9, 3, 4]}
                        fieldName="siteId"
                        inputComponent={<TextInput />}
                        style={contentStyle}
                    />
                    <GridItem {...contentStyle}>工程名稱：</GridItem>
                    <GridInputItem
                        gridRange={[8, 9, 5, 6]}
                        fieldName="projectName"
                        inputComponent={<TextInput />}
                        style={lastStyle}
                    />
                </Grid>
                <Grid
                    width="92.5vw"
                    height="30vh"
                    templateColumns={'repeat(3, 50fr 203fr)'}
                    templateRows={'36fr repeat(4, 50fr)'}
                >
                    <GridItem
                        colStart={1}
                        colEnd={7}
                        {...titleStyle}
                        borderTop="0px"
                    >
                        二、申請許可作業類別：（請在□內打勾）
                    </GridItem>
                    <GridItem {...numberStyle}>1</GridItem>
                    <GridInputItem
                        gridRange={[2, 3, 2, 3]}
                        fieldName="opFire"
                        inputComponent={<OpCheckBox>動火作業</OpCheckBox>}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>2</GridItem>
                    <GridInputItem
                        gridRange={[2, 3, 4, 5]}
                        fieldName="opAloft"
                        inputComponent={<OpCheckBox>高架作業</OpCheckBox>}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>3</GridItem>
                    <GridInputItem
                        gridRange={[2, 3, 6, 7]}
                        fieldName="opConfined"
                        inputComponent={<OpCheckBox>局限空間作業</OpCheckBox>}
                        style={lastStyle}
                    />

                    <GridItem {...numberStyle}>4</GridItem>
                    <GridInputItem
                        gridRange={[3, 4, 2, 3]}
                        fieldName="opElectric"
                        inputComponent={<OpCheckBox>電力作業</OpCheckBox>}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>5</GridItem>
                    <GridInputItem
                        gridRange={[3, 4, 4, 5]}
                        fieldName="opCage"
                        inputComponent={<OpCheckBox>吊籠作業</OpCheckBox>}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>6</GridItem>
                    <GridInputItem
                        gridRange={[3, 4, 6, 7]}
                        fieldName="opLift"
                        inputComponent={<OpCheckBox>起架吊掛作業</OpCheckBox>}
                        style={lastStyle}
                    />

                    <GridItem {...numberStyle}>7</GridItem>
                    <GridInputItem
                        gridRange={[4, 5, 2, 3]}
                        fieldName="opAssemble"
                        inputComponent={<OpCheckBox>施工架組裝作業</OpCheckBox>}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>8</GridItem>
                    <GridInputItem
                        gridRange={[4, 5, 4, 5]}
                        fieldName="opDetach"
                        inputComponent={<OpCheckBox>管線拆離</OpCheckBox>}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>9</GridItem>
                    <GridInputItem
                        gridRange={[4, 5, 6, 7]}
                        fieldName="opHole"
                        inputComponent={<OpCheckBox>開口作業</OpCheckBox>}
                        style={lastStyle}
                    />

                    <GridItem {...numberStyle}>10</GridItem>
                    <GridInputItem
                        gridRange={[5, 6, 2, 3]}
                        fieldName="opChemical"
                        inputComponent={<OpCheckBox>化學作業</OpCheckBox>}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}></GridItem>
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...numberStyle}></GridItem>
                    <GridItem {...lastStyle}></GridItem>
                </Grid>
                <Grid
                    width="92.5vw"
                    height="40vh"
                    templateColumns="50fr 710fr"
                    templateRows="36fr 72fr 90fr repeat(3, 36fr)"
                >
                    <GridItem
                        colStart={1}
                        colEnd={3}
                        {...titleStyle}
                        borderTop="0px"
                    >
                        三、備註：
                    </GridItem>
                    <GridItem {...numberStyle}>1.</GridItem>
                    <GridItem {...lastStyle}>
                        平常上班日申請流程：
                        <br />
                        承商工安施工前填寫→承商領班簽核→系統工程師審核→工地經理核准。
                    </GridItem>
                    <GridItem {...numberStyle}>2.</GridItem>
                    <GridItem {...lastStyle}>
                        夜間及例假日申請流程：
                        <br />
                        夜間加班最晚於當日3點前提出;假日於最後一個工作日下午3點前提出。
                        <br />
                        承商工安施工前填寫→承商領班簽核→系統工程師審核→工地經理核准。
                        <br />
                    </GridItem>
                    <GridItem {...numberStyle}>3.</GridItem>
                    <GridItem {...lastStyle}>申請人：為承商之監工。</GridItem>
                    <GridItem {...numberStyle}>4.</GridItem>
                    <GridItem {...lastStyle}>
                        夜間定義：當日17:30 ~
                        隔日08:30；假日定義：為國定例假日。
                    </GridItem>
                    <GridItem {...numberStyle}>5.</GridItem>
                    <GridItem {...lastStyle}>
                        若有特殊作業請一併提供施工計畫及相關特殊作業主管資格（含回訓資料）。
                    </GridItem>
                </Grid>
                <Grid
                    width="92.5vw"
                    height="20vh"
                    templateColumns="repeat(4, 1fr)"
                    templateRows="36fr 87fr"
                >
                    <GridItem {...numberStyle}>核准</GridItem>
                    <GridItem {...numberStyle}>審核</GridItem>
                    <GridItem {...numberStyle}>申請單位主管</GridItem>
                    <GridItem {...numberStyle} borderRight="1px">
                        申請人
                    </GridItem>
                    <GridItem {...numberStyle}>
                        <SignaturePad
                            title="核准 - 簽名"
                            signatureName="approved-signature.png"
                            state={signatures.approved}
                        />
                    </GridItem>
                    <GridItem {...numberStyle}>
                        <SignaturePad
                            title="審核 - 簽名"
                            signatureName="review-signature.png"
                            state={signatures.review}
                        />
                    </GridItem>
                    <GridItem {...numberStyle}>
                        <SignaturePad
                            title="申請單位主管 - 簽名"
                            signatureName="supplierManager-signature.png"
                            state={signatures.supplierManager}
                        />
                    </GridItem>
                    <GridItem {...numberStyle} borderRight="1px">
                        <SignaturePad
                            title="申請人 - 簽名"
                            signatureName="supplier-signature.png"
                            state={signatures.supplier}
                        />
                    </GridItem>
                </Grid>
            </Box>
        </Form>
    );
}
