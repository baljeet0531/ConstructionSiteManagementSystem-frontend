import React, { useEffect, useState } from 'react';
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
    useToast,
} from '@chakra-ui/react';
import { FormikProps, Form } from 'formik';
import { useQuery } from '@apollo/client';
import { EditIcon, ChevronDownIcon } from '../../Icons/Icons';
import { SignatureStateItem } from '../../Interface/Signature';
import { IsPermit } from '../../Mockdata/Mockdata';
import SignaturePad from '../Shared/SignaturePad';
import GridInputItem from '../Shared/GridInputItem';
import {
    titleStyle,
    contentStyle,
    lastStyle,
    numberStyle,
    workContentStyle,
    workContentInputStyle,
} from './Styles';
import FormFactory from './Factory';
import {
    IWorkPermit,
    IWorkPermitData,
    IWorkPermitOptions,
    SignatureName,
} from '../../Interface/WorkPermit';
import { GQL_WORK_PERMIT_QUERY, parseWorkPermit } from './GQL';
import { FormLoading } from '../Shared/Loading';
import dayjs from 'dayjs';
import { defaultWarningToast } from '../../Utils/DefaultToast';
import { SingleSignatureHandler } from '../../Utils/Signature/Single';

export default function WorkPermitForm({
    formProps,
    signatures,
}: {
    formProps: FormikProps<IWorkPermit>;
    signatures: Record<SignatureName, SignatureStateItem>;
}) {
    if (!IsPermit('eng_work_permit_form'))
        return <Navigate to="/" replace={true} />;

    let { number, modified } = JSON.parse(
        localStorage.getItem('singleWorkPermitObject') as string
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<IWorkPermitData>({
        siteAreas: [],
        workContents: [],
    });
    const [options, setOptions] = useState<IWorkPermitOptions>({
        zones: [],
        workContents: [],
        systemBranches: [],
        projects: [],
    });
    const f = new FormFactory(formProps, data, setData, options, setOptions);
    document.title = `工作許可單(${number})`;

    useQuery(GQL_WORK_PERMIT_QUERY, {
        variables: {
            siteId: localStorage.getItem('siteId'),
            number: number,
        },
        onCompleted: (d) => {
            setData({
                siteAreas: d.siteAreas,
                workContents: d.workContent.content,
            });

            const singleFormData = parseWorkPermit(
                d.workPermit,
                modified,
                signatures
            );
            if (singleFormData) {
                formProps.setValues(singleFormData, false);
            }
            setLoading(false);
        },
        onError: (err) => {
            console.error(err);
        },
        fetchPolicy: 'network-only',
    });
    const toast = useToast();

    useEffect(() => {
        if (formProps.isSubmitting && !formProps.isValid) {
            defaultWarningToast(
                toast,
                '填寫內容不符合規定',
                '請檢查並修改後再上傳。'
            );
        }
    }, [formProps.isSubmitting]);

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
            <Box margin="10px 37px 20px 27px" color="#667080">
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
                                    disabled={true}
                                >
                                    初次申請
                                </Checkbox>
                            }
                        />
                        <GridInputItem
                            fieldName="modified"
                            inputComponent={
                                <Checkbox
                                    isChecked={formProps.values.modified}
                                    disabled={true}
                                >
                                    申請異動
                                </Checkbox>
                            }
                        />
                    </HStack>
                </Flex>
                <Grid
                    width="92.5vw"
                    height="60vh"
                    maxH="500px"
                    templateColumns={'50fr 120fr 203fr 120fr 247fr'}
                    templateRows={
                        '36fr 50fr 50fr minmax(80px, 50fr) repeat(4, 50fr)'
                    }
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
                        style={{ ...contentStyle }}
                    />
                    <GridItem
                        colStart={4}
                        colEnd={6}
                        {...lastStyle}
                        borderLeft="0px"
                    />

                    <GridItem {...numberStyle}>2</GridItem>
                    <GridItem {...contentStyle}>工作內容：</GridItem>
                    <GridItem colStart={3} colEnd={6} {...lastStyle}>
                        <Grid
                            w="100%"
                            templateColumns={'70px 120fr 90px 120fr 90px 120fr'}
                        >
                            <GridItem {...workContentStyle} paddingLeft="15px">
                                <Text as="b">系統：</Text>
                            </GridItem>
                            <GridInputItem
                                gridRange={[1, 1, 2, 3]}
                                fieldName="system"
                                inputComponent={f.selectSystemInput()}
                                inputRightComponent={<ChevronDownIcon />}
                                style={{ ...workContentInputStyle }}
                            />
                            <GridItem {...workContentStyle}>
                                <Text as="b">系統分項：</Text>
                            </GridItem>
                            <GridInputItem
                                gridRange={[1, 1, 4, 5]}
                                fieldName="systemBranch"
                                inputComponent={f.selectSystemBranchInput()}
                                inputRightComponent={<ChevronDownIcon />}
                                style={{ ...workContentInputStyle }}
                            />
                            <GridItem {...workContentStyle}>
                                <Text as="b">施工項目：</Text>
                            </GridItem>
                            <GridInputItem
                                gridRange={[1, 1, 6, 7]}
                                fieldName="project"
                                inputComponent={f.selectProjectInput()}
                                inputRightComponent={<ChevronDownIcon />}
                                style={{ ...workContentInputStyle }}
                            />
                        </Grid>
                    </GridItem>

                    <GridItem {...numberStyle}>3</GridItem>
                    <GridItem {...contentStyle}>施工廠區：</GridItem>
                    <GridInputItem
                        fieldName="area"
                        inputComponent={f.selectAreaInput()}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...contentStyle }}
                    />
                    <GridItem {...contentStyle}>施工區域：</GridItem>
                    <GridInputItem
                        fieldName="zone"
                        inputComponent={f.selectZoneInput()}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...lastStyle }}
                    />

                    <GridItem {...numberStyle}>4</GridItem>
                    <GridItem {...contentStyle}>預計施工時間：</GridItem>
                    <GridInputItem
                        gridRange={[5, 6, 3, 4]}
                        fieldName="workStart"
                        inputComponent={
                            <Input type="datetime-local" border="0px" />
                        }
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...contentStyle }}
                    />
                    <GridItem {...contentStyle}>至</GridItem>
                    <GridInputItem
                        gridRange={[5, 6, 5, 6]}
                        fieldName="workEnd"
                        inputComponent={
                            <Input type="datetime-local" border="0px" />
                        }
                        handleValidate={(value: string) => {
                            return (
                                dayjs(formProps.values.workStart) > dayjs(value)
                            );
                        }}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...lastStyle }}
                        invalidStyle={{
                            color: 'red.default',
                            fontWeight: 'bold',
                        }}
                        invalidMsg="結束日期不得早於開始日期"
                    />

                    <GridItem {...numberStyle}>5</GridItem>
                    <GridItem {...contentStyle}>監工單位：</GridItem>
                    <GridInputItem
                        gridRange={[6, 7, 3, 6]}
                        fieldName="supervisorCorp"
                        inputComponent={f.textInput()}
                        style={{ ...lastStyle }}
                    />

                    <GridItem {...numberStyle}>6</GridItem>
                    <GridItem {...contentStyle}>監工：</GridItem>
                    <GridInputItem
                        gridRange={[7, 8, 3, 4]}
                        fieldName="supervisor"
                        inputComponent={f.textInput()}
                        style={{ ...contentStyle }}
                    />
                    <GridItem {...contentStyle}>聯絡電話：</GridItem>
                    <GridInputItem
                        gridRange={[7, 8, 5, 6]}
                        fieldName="tel"
                        inputComponent={f.textInput()}
                        style={{ ...lastStyle }}
                    />

                    <GridItem {...numberStyle}>7</GridItem>
                    <GridItem {...contentStyle}>專案編號：</GridItem>
                    <GridInputItem
                        gridRange={[8, 9, 3, 4]}
                        fieldName="siteId"
                        inputComponent={f.textInput()}
                        style={{ ...contentStyle }}
                    />
                    <GridItem {...contentStyle}>工程名稱：</GridItem>
                    <GridInputItem
                        gridRange={[8, 9, 5, 6]}
                        fieldName="projectName"
                        inputComponent={f.textInput()}
                        style={{ ...lastStyle }}
                    />
                </Grid>
                <Grid
                    width="92.5vw"
                    height="40vh"
                    maxH="300px"
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
                        inputComponent={f.opCheckBox('opFire', '動火作業')}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>2</GridItem>
                    <GridInputItem
                        gridRange={[2, 3, 4, 5]}
                        fieldName="opAloft"
                        inputComponent={f.opCheckBox('opAloft', '高架作業')}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>3</GridItem>
                    <GridInputItem
                        gridRange={[2, 3, 6, 7]}
                        fieldName="opConfined"
                        inputComponent={f.opCheckBox(
                            'opConfined',
                            '局限空間作業'
                        )}
                        style={lastStyle}
                    />

                    <GridItem {...numberStyle}>4</GridItem>
                    <GridInputItem
                        gridRange={[3, 4, 2, 3]}
                        fieldName="opElectric"
                        inputComponent={f.opCheckBox('opElectric', '電力作業')}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>5</GridItem>
                    <GridInputItem
                        gridRange={[3, 4, 4, 5]}
                        fieldName="opCage"
                        inputComponent={f.opCheckBox('opCage', '吊籠作業')}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>6</GridItem>
                    <GridInputItem
                        gridRange={[3, 4, 6, 7]}
                        fieldName="opLift"
                        inputComponent={f.opCheckBox('opLift', '起架吊掛作業')}
                        style={lastStyle}
                    />

                    <GridItem {...numberStyle}>7</GridItem>
                    <GridInputItem
                        gridRange={[4, 5, 2, 3]}
                        fieldName="opAssemble"
                        inputComponent={f.opCheckBox(
                            'opAssemble',
                            '施工架組裝作業'
                        )}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>8</GridItem>
                    <GridInputItem
                        gridRange={[4, 5, 4, 5]}
                        fieldName="opDetach"
                        inputComponent={f.opCheckBox('opDetach', '管線拆離')}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}>9</GridItem>
                    <GridInputItem
                        gridRange={[4, 5, 6, 7]}
                        fieldName="opHole"
                        inputComponent={f.opCheckBox('opHole', '開口作業')}
                        style={lastStyle}
                    />

                    <GridItem {...numberStyle}>10</GridItem>
                    <GridInputItem
                        gridRange={[5, 6, 2, 3]}
                        fieldName="opChemical"
                        inputComponent={f.opCheckBox('opChemical', '化學作業')}
                        style={contentStyle}
                    />
                    <GridItem {...numberStyle}></GridItem>
                    <GridItem {...contentStyle}></GridItem>
                    <GridItem {...numberStyle}></GridItem>
                    <GridItem {...lastStyle}></GridItem>
                </Grid>
                <Grid
                    width="92.5vw"
                    height="50vh"
                    maxH="400px"
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
                    height="30vh"
                    maxH="200px"
                    templateColumns="repeat(4, 1fr)"
                    templateRows="36fr 120fr"
                >
                    <GridItem {...numberStyle}>核准</GridItem>
                    <GridItem {...numberStyle}>審核</GridItem>
                    <GridItem {...numberStyle}>申請單位主管</GridItem>
                    <GridItem {...numberStyle} borderRight="1px">
                        申請人
                    </GridItem>
                    <GridItem {...numberStyle} minH="80px">
                        <SignaturePad
                            title="核准 - 簽名"
                            signatureName="approved-signature.png"
                            handler={
                                new SingleSignatureHandler(signatures.approved)
                            }
                            disable={!!signatures.approved[0]?.no}
                        />
                    </GridItem>
                    <GridItem {...numberStyle} minH="80px">
                        <SignaturePad
                            title="審核 - 簽名"
                            signatureName="review-signature.png"
                            handler={
                                new SingleSignatureHandler(signatures.review)
                            }
                            disable={!!signatures.review[0]?.no}
                        />
                    </GridItem>
                    <GridItem {...numberStyle} minH="80px">
                        <SignaturePad
                            title="申請單位主管 - 簽名"
                            signatureName="supplierManager-signature.png"
                            handler={
                                new SingleSignatureHandler(
                                    signatures.supplierManager
                                )
                            }
                            disable={!!signatures.supplierManager[0]?.no}
                        />
                    </GridItem>
                    <GridItem {...numberStyle} minH="80px" borderRight="1px">
                        <SignaturePad
                            title="申請人 - 簽名"
                            signatureName="supplier-signature.png"
                            handler={
                                new SingleSignatureHandler(signatures.supplier)
                            }
                            disable={!!signatures.supplier[0]?.no}
                        />
                    </GridItem>
                </Grid>
            </Box>
            {(loading || formProps.isSubmitting) && <FormLoading />}
        </Form>
    );
}
