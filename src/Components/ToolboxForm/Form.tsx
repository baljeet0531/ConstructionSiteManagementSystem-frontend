import React, { useState } from 'react';
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
import { FormikProps, Form, Field } from 'formik';
import { useQuery, gql } from '@apollo/client';
import { EditIcon, ChevronDownIcon } from '../../Icons/Icons';
import {
    MultiSignatureStateItem,
    SignatureStateItem,
} from '../../Interface/Signature';
import SignaturePad from '../Shared/SignaturePad';
import GridInputItem from '../Shared/GridInputItem';
import {
    titleStyle,
    contentStyle,
    centerStyle,
    filledStyle,
    hazardTitleStyle,
} from './Styles';
import FormFactory from './Factory';
import {
    IToolbox,
    IToolboxData,
    SignatureName,
    SignatureListName,
} from '../../Interface/Toolbox';

export const QUERY_TOOLBOX_OPTIONS = gql`
    query toolboxOptions($siteId: String!) {
        contractingCorpName(siteId: $siteId)
    }
`;

export default function ToolboxForm({
    formProps,
    signatures,
    signatureLists,
}: {
    formProps: FormikProps<IToolbox>;
    signatures: Record<SignatureName, SignatureStateItem>;
    signatureLists: Record<SignatureListName, MultiSignatureStateItem>;
}) {
    const [data, setData] = useState<IToolboxData>({ contractingCorpName: [] });
    const f = new FormFactory(formProps, data, setData);
    useQuery(QUERY_TOOLBOX_OPTIONS, {
        variables: {
            siteId: formProps.values.siteId,
        },
        onCompleted: (d) => {
            setData({
                contractingCorpName: d.contractingCorpName,
            });
        },
        fetchPolicy: 'network-only',
    });

    // console.log(formProps.values);

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
                onClick={formProps.submitForm}
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
                    <Text>工具箱會議及巡檢紀錄</Text>
                </VStack>
                <Text pt={5}>
                    工具箱會議由監工單位監工於施工前針對當天工作內容及安全衛生議題進行告知或討論/協議(如最近發生的事故、作業場所的特殊危害、設備的安全操作、新的工作程序或與人員相關的作業安全)，並確實紀錄。
                </Text>
                <Grid
                    height="375px"
                    templateColumns="repeat(6, 1fr)"
                    templateRows="repeat(3, 32fr) repeat(5, 40fr)"
                >
                    <GridInputItem
                        gridRange={[1, 2, 1, 3]}
                        fieldName="meetingDate"
                        inputComponent={f.filledDateInput()}
                        inputLeftComponent={<Text>會議日期:</Text>}
                        inputLeftStyle={{ w: '5.5rem' }}
                        style={{ ...filledStyle }}
                    />
                    <GridInputItem
                        gridRange={[1, 2, 3, 5]}
                        fieldName="meetingTime"
                        inputComponent={f.filledTimeInput()}
                        inputLeftComponent={<Text>會議時間:</Text>}
                        inputLeftStyle={{ w: '5.5rem' }}
                        style={{ ...filledStyle }}
                    />
                    <GridInputItem
                        gridRange={[1, 2, 5, 7]}
                        fieldName="meetingPlace"
                        inputComponent={f.filledTextInput()}
                        inputLeftComponent={<Text>會議地點:</Text>}
                        inputLeftStyle={{ w: '5.5rem' }}
                        style={{ ...filledStyle, borderRightColor: '#919AA9' }}
                    />
                    <GridItem {...centerStyle}>主持人</GridItem>
                    <GridItem {...centerStyle}>共同作業廠商</GridItem>
                    <GridItem {...centerStyle}>主承攬商</GridItem>
                    <GridItem {...centerStyle}>再承攬商(1)</GridItem>
                    <GridItem {...centerStyle}>再承攬商(2)</GridItem>
                    <GridItem {...centerStyle} borderRight="1px">
                        再承攬商(3)
                    </GridItem>
                    <GridItem rowStart={3} rowEnd={5} {...centerStyle}>
                        系統工程師
                    </GridItem>
                    <GridItem {...centerStyle}>廠商名字</GridItem>
                    <GridInputItem
                        fieldName="primeContractCorp"
                        inputComponent={f.selectContractingCorpInput(
                            'primeContractCorp'
                        )}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...centerStyle }}
                    />
                    <GridInputItem
                        fieldName="minorContractCorpOne"
                        inputComponent={f.selectContractingCorpInput(
                            'minorContractCorpOne'
                        )}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...centerStyle }}
                    />
                    <GridInputItem
                        fieldName="minorContractCorpTwo"
                        inputComponent={f.selectContractingCorpInput(
                            'minorContractCorpTwo'
                        )}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...centerStyle }}
                    />
                    <GridInputItem
                        fieldName="minorContractCorpThree"
                        inputComponent={f.selectContractingCorpInput(
                            'minorContractCorpThree'
                        )}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...centerStyle, borderRight: '1px' }}
                    />
                    <GridItem {...centerStyle}>與會人員</GridItem>
                    <GridInputItem
                        fieldName="primeContractStaff"
                        inputComponent={f.contractStaffInput()}
                        style={{ ...centerStyle }}
                    />
                    <GridInputItem
                        fieldName="minorContractOneStaff"
                        inputComponent={f.contractStaffInput()}
                        style={{ ...centerStyle }}
                    />
                    <GridInputItem
                        fieldName="minorContractTwoStaff"
                        inputComponent={f.contractStaffInput()}
                        style={{ ...centerStyle }}
                    />
                    <GridInputItem
                        fieldName="minorContractThreeStaff"
                        inputComponent={f.contractStaffInput()}
                        style={{ ...centerStyle, borderRight: '1px' }}
                    />
                    <GridItem rowStart={5} rowEnd={7} {...centerStyle}>
                        本日工作項目
                    </GridItem>
                    <GridInputItem
                        gridRange={[5, 7, 2, 7]}
                        fieldName="workContent"
                        inputComponent={f.textArea()}
                        style={{ ...centerStyle, borderRight: '1px' }}
                    />
                    <GridItem rowStart={7} rowEnd={9} {...centerStyle}>
                        本日工作地點
                    </GridItem>
                    <GridInputItem
                        gridRange={[7, 9, 2, 7]}
                        fieldName="workPlace"
                        inputComponent={f.textArea()}
                        style={{ ...centerStyle, borderRight: '1px' }}
                    />
                </Grid>
                <Text pt={1}>
                    *本日作業區域/施作過程可能潛在危害(請逐一確認，有請「V」，無請「X」;□
                    無特殊危害)
                </Text>
                <Grid
                    height="270px"
                    templateColumns="200fr 120fr 462fr"
                    templateRows="repeat(7, 1fr)"
                >
                    <GridItem
                        rowStart={1}
                        rowEnd={3}
                        {...hazardTitleStyle}
                        borderTop="1px"
                    >
                        物理性危害
                    </GridItem>
                    <GridItem
                        rowStart={1}
                        rowEnd={3}
                        colStart={2}
                        colEnd={4}
                        {...titleStyle}
                        flexWrap="wrap"
                    >
                        {f.threeStateCheckbox('fall', '跌墜落')}
                        {f.threeStateCheckbox(
                            'scrape',
                            '擦、刺、扭、壓、夾、碰撞、割傷'
                        )}
                        {f.threeStateCheckbox('objectFall', '物體飛落')}
                        {f.threeStateCheckbox('foreignEnterEye', '異物入眼')}
                        {f.threeStateCheckbox('heatTouch', '與高溫接觸')}
                        {f.threeStateCheckbox('microthermTouch', '與低溫接觸')}
                        {f.threeStateCheckbox('noise', '噪音')}
                        {f.threeStateCheckbox('eletricDisaster', '感電')}
                        {f.threeStateCheckbox('collapse', '塌陷')}
                        {f.threeStateCheckbox('radiation', '游離輻射')}
                    </GridItem>
                    <GridItem {...hazardTitleStyle}>化學性危害</GridItem>
                    <GridItem
                        colStart={2}
                        colEnd={4}
                        {...contentStyle}
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('chemicalBurn', '化學性燒灼傷')}
                        {f.threeStateCheckbox(
                            'chemicalInhalation',
                            '化學物吸入'
                        )}
                    </GridItem>
                    <GridItem {...hazardTitleStyle}>火災危害</GridItem>
                    <GridItem
                        colStart={2}
                        colEnd={4}
                        {...contentStyle}
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('fireDisaster', '火災')}
                        {f.threeStateCheckbox('explode', '爆炸')}
                    </GridItem>
                    <GridItem {...hazardTitleStyle}>其他危害</GridItem>
                    <GridItem
                        colStart={2}
                        colEnd={4}
                        {...contentStyle}
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('otherDisasterNone', '無')}
                        {f.threeStateCheckbox('hypoxia', '缺氧')}
                        {f.threeStateCheckbox('biologicalHazard', '生物性危害')}
                        {f.threeStateCheckbox('outdoorHeat', '戶外高溫')}
                        {f.othersField('otherDisaster', '其他:')}
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} {...centerStyle}>
                        作業區域包含以下化學品及其附屬設備管線
                    </GridItem>
                    <GridItem {...contentStyle} borderRight="1px">
                        {f.threeStateCheckbox('chemicalNone', '無')}
                        {f.othersField('chemicalInclude', '化學品名稱:')}
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} {...centerStyle}>
                        作業區域包含以下氣體及其附屬設備管線
                    </GridItem>
                    <GridItem {...contentStyle} borderRight="1px">
                        {f.threeStateCheckbox('gasNone', '無')}
                        {f.othersField('gasInclude', '氣體名稱:')}
                    </GridItem>
                </Grid>
                <Text pt={1}>
                    *本日應採取之安全衛生措施
                    (請逐一確認，有請「V」，無請「X」;個人防護具需功能正常方可使用)
                </Text>
                <Grid
                    height="700px"
                    templateColumns="40fr 135fr 587fr"
                    templateRows="repeat(14, 1fr) 4fr"
                >
                    <GridItem
                        rowStart={1}
                        rowEnd={14}
                        {...centerStyle}
                        h="100%"
                        borderTop="1px"
                        letterSpacing="0.5em"
                        sx={{ writingMode: 'vertical-lr' }}
                    >
                        依作業性質自備防護具及措施
                    </GridItem>
                    <GridItem {...titleStyle} borderRight="0px">
                        <Text pl={1}>01.</Text>
                        {f.threeStateCheckbox('head', '頭部防護:')}
                    </GridItem>
                    <GridItem {...titleStyle} borderLeft="0px">
                        {f.threeStateCheckbox('headWorkspace', '工地用')}
                        {f.threeStateCheckbox('headElectric', '電工用')}
                        {f.threeStateCheckbox('headPlastic', '膠盔')}
                    </GridItem>
                    <GridItem {...contentStyle}>
                        <Text pl={1}>02.</Text>
                        {f.threeStateCheckbox('eye', '眼部防護:')}
                    </GridItem>
                    <GridItem
                        {...contentStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox(
                            'eyeMechanical',
                            '防禦機械能傷害的安全眼鏡'
                        )}
                        {f.threeStateCheckbox(
                            'eyeRadia',
                            '防禦輻射能傷害的安全眼鏡'
                        )}
                    </GridItem>
                    <GridItem {...contentStyle}>
                        <Text pl={1}>03.</Text>
                        {f.threeStateCheckbox('ear', '耳部防護:')}
                    </GridItem>
                    <GridItem
                        {...contentStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('earEarplugs', '耳塞')}
                        {f.threeStateCheckbox('earEarmuffs', '耳罩')}
                    </GridItem>
                    <GridItem {...contentStyle}>
                        <Text pl={1}>04.</Text>
                        {f.threeStateCheckbox('breathe', '呼吸防護:')}
                    </GridItem>
                    <GridItem
                        {...contentStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('breatheDust', '防塵')}
                        {f.threeStateCheckbox('breatheFiltration', '濾毒')}
                        {f.threeStateCheckbox('breatheScba', 'SCBA')}
                        {f.threeStateCheckbox('breathePapr', 'PAPR')}
                        {f.threeStateCheckbox('breathOxygen', '輸氣管面罩')}
                    </GridItem>
                    <GridItem {...contentStyle}>
                        <Text pl={1}>05.</Text>
                        {f.threeStateCheckbox('hand', '手部防護:')}
                    </GridItem>
                    <GridItem
                        {...contentStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('handCut', '耐切割')}
                        {f.threeStateCheckbox('handGrand', '耐磨')}
                        {f.threeStateCheckbox('handHeat', '耐熱')}
                        {f.threeStateCheckbox('handElectirc', '電工用')}
                        {f.threeStateCheckbox('haneChemical', '防化學')}
                    </GridItem>
                    <GridItem {...contentStyle}>
                        <Text pl={1}>06.</Text>
                        {f.threeStateCheckbox('foot', '足部防護:')}
                    </GridItem>
                    <GridItem
                        {...contentStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('footNormal', '一般安全鞋')}
                        {f.threeStateCheckbox('footChemical', '防化學安全鞋')}
                    </GridItem>
                    <GridItem {...contentStyle}>
                        <Text pl={1}>07.</Text>
                        {f.threeStateCheckbox('body', '身體防護:')}
                    </GridItem>
                    <GridItem
                        {...contentStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('bodyBelt', '背負式安全帶')}
                        {f.threeStateCheckbox('bodyMask', '電焊用防護面具')}
                        {f.threeStateCheckbox('bodyClothing', '化學防護衣')}
                        {f.threeStateCheckbox('bodyVest', '反光背心')}
                    </GridItem>
                    <GridItem rowStart={8} rowEnd={10} {...contentStyle}>
                        <Text pl={1}>08.</Text>
                        {f.threeStateCheckbox('fall', '墜落預防:')}
                    </GridItem>
                    <GridItem
                        rowStart={8}
                        rowEnd={10}
                        {...contentStyle}
                        borderLeft="0px"
                        borderRight="1px"
                        flexWrap="wrap"
                    >
                        {f.threeStateCheckbox('fallTrestleLadder', '合梯')}
                        {f.threeStateCheckbox('fallTravelLadder', '移動梯')}
                        {f.threeStateCheckbox('fallScaffold', '施工架')}
                        {f.threeStateCheckbox(
                            'fallAerialVehicle',
                            '高空工作車'
                        )}
                        {f.threeStateCheckbox('fallSafeLine', '安全母索')}
                        {f.threeStateCheckbox('fallCage', '護籠')}
                        {f.threeStateCheckbox('fallFence', '護欄')}
                        {f.threeStateCheckbox('fallCover', '護蓋')}
                        {f.threeStateCheckbox('fallSafeNet', '安全網')}
                        {f.threeStateCheckbox('fallWarningFence', '警示圍籬')}
                        {f.threeStateCheckbox('fallArrestor', '墜落防止器')}
                    </GridItem>
                    <GridItem {...contentStyle}>
                        <Text pl={1}>09.</Text>
                        {f.threeStateCheckbox('electric', '感電預防:')}
                    </GridItem>
                    <GridItem
                        {...contentStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('electricBreaker', '漏電斷路器')}
                        {f.threeStateCheckbox(
                            'electricShockPrevention',
                            '交流電焊機自動電擊防止裝置'
                        )}
                        {f.threeStateCheckbox('electricElectroscope', '檢電器')}
                    </GridItem>
                    <GridItem {...contentStyle}>
                        <Text pl={1}>10.</Text>
                        {f.threeStateCheckbox('fire', '火災預防:')}
                    </GridItem>
                    <GridItem
                        {...contentStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('fireExtinguisher', '滅火器')}
                        {f.threeStateCheckbox('fireBlanket', '防火毯')}
                        {f.threeStateCheckbox(
                            'fireBackfire',
                            '氧乙炔防回火裝置'
                        )}
                    </GridItem>
                    <GridItem {...contentStyle}>
                        <Text pl={1}>11.</Text>
                        {f.threeStateCheckbox('oxygen', '缺氧預防:')}
                    </GridItem>
                    <GridItem
                        {...contentStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.threeStateCheckbox('oxygenVentilation', '通風設備')}
                        {f.threeStateCheckbox(
                            'oxygenLifeDetection',
                            '生命偵測裝置'
                        )}
                        {f.threeStateCheckbox(
                            'oxygenGasDetection',
                            '氣體偵測器'
                        )}
                        {f.threeStateCheckbox('oxygenLifting', '吊升設備')}
                        {f.threeStateCheckbox('oxygenRescue', '搶救設備')}
                    </GridItem>
                    <GridItem
                        colStart={2}
                        colEnd={4}
                        {...contentStyle}
                        borderRight="1px"
                    >
                        <Text pl={1}>12.</Text>
                        {f.othersField('ohterPrevention', '其他預防:', '500px')}
                    </GridItem>
                    <GridItem
                        colStart={1}
                        colEnd={4}
                        {...contentStyle}
                        borderBottom="0px"
                        borderRight="1px"
                    >
                        <Text pl={1}>*其他溝通/協議/宣導事項：</Text>
                    </GridItem>
                    <GridInputItem
                        gridRange={[15, 17, 1, 4]}
                        fieldName="publicityMatters"
                        inputComponent={f.textArea()}
                        style={{ ...centerStyle, borderRight: '1px' }}
                    />
                </Grid>
            </Box>
        </Form>
    );
}
