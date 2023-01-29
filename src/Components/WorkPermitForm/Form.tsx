import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
    Box,
    Button,
    Grid,
    GridItem,
    Image,
    Input,
    Flex,
    Text,
    HStack,
    VStack,
} from '@chakra-ui/react';
import { FormikProps, Form, Field } from 'formik';
import { IWorkPermit } from './Formik';
import { EditIcon, ChevronDownIcon } from '../../Icons/Icons';
import { IsPermit } from '../../Mockdata/Mockdata';
import SignaturePad, { Signature } from '../Shared/SignaturePad';
import GridInputItem from './GridInputItem';

export default function WorkPermitForm({
    formProps,
}: {
    formProps: FormikProps<IWorkPermit>;
}) {
    if (!IsPermit('eng_work_permit_form'))
        return <Navigate to="/" replace={true} />;

    const [approved, setApproved] = useState<Signature>({
        image: undefined,
        createdTime: undefined,
    });
    const [review, setReview] = useState<Signature>({
        image: undefined,
        createdTime: undefined,
    });
    const [supplierManager, setSupplierManager] = useState<Signature>({
        image: undefined,
        createdTime: undefined,
    });
    const [supplier, setSupplier] = useState<Signature>({
        image: undefined,
        createdTime: undefined,
    });

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
        paddingLeft: '8px',
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
                        <Field
                            type="checkbox"
                            name="applied"
                            validate={(value: boolean) => {
                                if (value && formProps.values['modified']) {
                                    formProps.setFieldValue('modified', false);
                                }
                            }}
                        />
                        <Text>初次申請</Text>
                        <Field
                            type="checkbox"
                            name="modified"
                            validate={(value: boolean) => {
                                if (value && formProps.values['applied']) {
                                    formProps.setFieldValue('applied', false);
                                }
                            }}
                        />
                        <Text>異動申請</Text>
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
                    <GridItem colStart={3} colEnd={6} {...lastStyle} />

                    <GridItem {...numberStyle}>6</GridItem>
                    <GridItem {...contentStyle}>監工：</GridItem>
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...contentStyle}>聯絡電話：</GridItem>
                    <GridItem {...lastStyle} />

                    <GridItem {...numberStyle}>7</GridItem>
                    <GridItem {...contentStyle}>專案編號：</GridItem>
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...contentStyle}>工程名稱：</GridItem>
                    <GridItem {...lastStyle} />
                </Grid>
                <Grid
                    width="92.5vw"
                    height="25vh"
                    templateColumns={'repeat(3, 50fr 203fr)'}
                    templateRows={'36fr repeat(3, 50fr)'}
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
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...numberStyle}>2</GridItem>
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...numberStyle}>3</GridItem>
                    <GridItem {...lastStyle}></GridItem>

                    <GridItem {...numberStyle}>4</GridItem>
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...numberStyle}>5</GridItem>
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...numberStyle}>6</GridItem>
                    <GridItem {...lastStyle}></GridItem>

                    <GridItem {...numberStyle}>7</GridItem>
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...numberStyle}>8</GridItem>
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...numberStyle}>9</GridItem>
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
                    <GridInputItem
                        gridRange={[2, 2, 1, 2]}
                        fieldName="approvedRef"
                        inputComponent={
                            <SignaturePad
                                title="核准 - 簽名"
                                signatureName="approved-signature.png"
                                signature={approved}
                                setSignature={setApproved}
                            />
                        }
                        style={numberStyle}
                    />
                    <GridInputItem
                        gridRange={[2, 2, 2, 3]}
                        fieldName="reviewRef"
                        inputComponent={
                            <SignaturePad
                                title="審核 - 簽名"
                                signatureName="review-signature.png"
                                signature={review}
                                setSignature={setReview}
                            />
                        }
                        style={numberStyle}
                    />
                    <GridInputItem
                        gridRange={[2, 2, 3, 4]}
                        fieldName="supplierManagerRef"
                        inputComponent={
                            <SignaturePad
                                title="申請單位主管 - 簽名"
                                signatureName="supplierManager-signature.png"
                                signature={supplierManager}
                                setSignature={setSupplierManager}
                            />
                        }
                        style={numberStyle}
                    />
                    <GridInputItem
                        gridRange={[2, 2, 4, 5]}
                        fieldName="supplierRef"
                        inputComponent={
                            <SignaturePad
                                title="申請人 - 簽名"
                                signatureName="supplier-signature.png"
                                signature={supplier}
                                setSignature={setSupplier}
                            />
                        }
                        style={{...numberStyle, borderRight: '1px'}}
                    />
                </Grid>
            </Box>
        </Form>
    );
}
