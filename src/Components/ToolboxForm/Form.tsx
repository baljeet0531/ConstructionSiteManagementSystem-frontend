import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Grid,
    GridItem,
    Image,
    Flex,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FormikProps, Form } from 'formik';
import { useQuery } from '@apollo/client';
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
    diseaseStyle,
    hazardTitleStyle,
} from './Styles';
import FormFactory from './Factory';
import {
    IToolbox,
    IToolboxData,
    SignatureName,
    SignatureListName,
    IToolboxOptions,
} from '../../Interface/Toolbox';
import SignatureTable from './SignatureTable';
import { GQL_TOOLBOX_QUERY, parseToolbox } from './GQL';
import { FormLoading } from '../Shared/Loading';
import { SingleSignatureHandler } from '../../Utils/Signature/Single';

export default function ToolboxForm({
    formProps,
    signatures,
    signatureLists,
}: {
    formProps: FormikProps<IToolbox>;
    signatures: Record<SignatureName, SignatureStateItem>;
    signatureLists: Record<SignatureListName, MultiSignatureStateItem>;
}) {
    const number = localStorage.getItem('toolboxNumber') as string;
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<IToolboxData>({
        contractingCorpName: [],
        dashboardPublicMatters: '',
        toolboxHint: {},
    });
    const [options, setOptions] = useState<IToolboxOptions>({
        toolboxHint: {},
    });
    const f = new FormFactory(formProps, data, setData, options, setOptions);
    document.title = `工具箱會議及巡檢紀錄(${number})`;
    useQuery(GQL_TOOLBOX_QUERY, {
        variables: {
            siteId: localStorage.getItem('siteId'),
            number: number,
        },
        onCompleted: (d) => {
            setData({
                contractingCorpName: d.contractingCorpName,
                dashboardPublicMatters: d.dashboardPublicMatters,
                toolboxHint: d.toolboxHint,
            });

            setOptions({
                toolboxHint: d.toolboxHint,
            });

            const singleFormData = parseToolbox(
                d.toolboxMeeting,
                d.dashboardPublicMatters,
                signatures,
                signatureLists
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

    useEffect(() => {
        f.updateAllHint();
    }, [loading]);

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
                        inputLeftComponent={
                            <Text color="#FFFFFF">會議日期:</Text>
                        }
                        inputLeftStyle={{ w: '5.5rem' }}
                        style={{ ...filledStyle }}
                    />
                    <GridInputItem
                        gridRange={[1, 2, 3, 5]}
                        fieldName="meetingTime"
                        inputComponent={f.filledTimeInput()}
                        inputLeftComponent={
                            <Text color="#FFFFFF">會議時間:</Text>
                        }
                        inputLeftStyle={{ w: '5.5rem' }}
                        style={{ ...filledStyle }}
                    />
                    <GridInputItem
                        gridRange={[1, 2, 5, 7]}
                        fieldName="meetingPlace"
                        inputComponent={f.filledTextInput()}
                        inputLeftComponent={
                            <Text color="#FFFFFF">會議地點:</Text>
                        }
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
                        <SignaturePad
                            title="系統工程師"
                            signatureName="host.png"
                            handler={
                                new SingleSignatureHandler(signatures.host)
                            }
                            placeHolderText="系統工程師"
                            leftBottomComponent={
                                <Text w="100%" fontSize="0.75rem" align="left">
                                    {signatures.host[0]?.accountRef?.name}
                                </Text>
                            }
                            showTime={true}
                            h="90%"
                            disable={true}
                        />
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
                        {f.threeStateCheckbox('physicalFall', '跌墜落')}
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
                    height="600px"
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
                        <Text pl={1} w="30px">
                            01.
                        </Text>
                        {f.threeStateCheckbox('head', '頭部防護:')}
                    </GridItem>
                    <GridItem {...titleStyle} borderLeft="0px">
                        {f.threeStateCheckbox('headWorkspace', '工地用')}
                        {f.threeStateCheckbox('headElectric', '電工用')}
                        {f.threeStateCheckbox('headPlastic', '膠盔')}
                    </GridItem>
                    <GridItem {...contentStyle}>
                        <Text pl={1} w="30px">
                            02.
                        </Text>
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
                        <Text pl={1} w="30px">
                            03.
                        </Text>
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
                        <Text pl={1} w="30px">
                            04.
                        </Text>
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
                        <Text pl={1} w="30px">
                            05.
                        </Text>
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
                        <Text pl={1} w="30px">
                            06.
                        </Text>
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
                        <Text pl={1} w="30px">
                            07.
                        </Text>
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
                        <Text pl={1} w="30px">
                            08.
                        </Text>
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
                        <Text pl={1} w="30px">
                            09.
                        </Text>
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
                        <Text pl={1} w="30px">
                            10.
                        </Text>
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
                        <Text pl={1} w="30px">
                            11.
                        </Text>
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
                        <Text pl={1} w="30px">
                            12.
                        </Text>
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
                <Text pt={1}>
                    *健康危害告知(依勞工健康保護規則規定，有下列疾病人員，不得從事相對應的作業)
                </Text>
                <Grid
                    height="300px"
                    templateColumns="1fr 5fr"
                    templateRows="repeat(9, 1fr)"
                >
                    <GridItem
                        {...titleStyle}
                        justifyContent="center"
                        borderRight="0px"
                    >
                        作業名稱
                    </GridItem>
                    <GridItem
                        {...titleStyle}
                        justifyContent="center"
                        borderRight="1px"
                    >
                        考量不適合從事作業之疾病
                    </GridItem>
                    <GridItem {...diseaseStyle}>噪音作業</GridItem>
                    <GridItem {...diseaseStyle} borderRight="1px">
                        心血管疾病、聽力異常。
                    </GridItem>
                    <GridItem {...diseaseStyle}>振動作業</GridItem>
                    <GridItem {...diseaseStyle} borderRight="1px">
                        周邊神經系統疾病、周邊循環系統疾病、骨骼肌肉系統疾病。
                    </GridItem>
                    <GridItem {...diseaseStyle}>游離輻射作業</GridItem>
                    <GridItem {...diseaseStyle} borderRight="1px">
                        血液疾病、內分泌疾病、精神與神經異常、眼睛疾病、惡性腫瘤。
                    </GridItem>
                    <GridItem {...diseaseStyle}>非游離輻射作業</GridItem>
                    <GridItem {...diseaseStyle} borderRight="1px">
                        眼睛疾病、內分泌系統疾病。
                    </GridItem>
                    <GridItem {...diseaseStyle}>高架作業</GridItem>
                    <GridItem {...diseaseStyle} borderRight="1px">
                        癲癇、精神或神經系統疾病、高血壓、心血管疾病、貧血、平衡機能失常、呼吸系統疾病、色盲、視力不良、聽力障礙、肢體殘障。
                    </GridItem>
                    <GridItem {...diseaseStyle}>粉塵作業</GridItem>
                    <GridItem {...diseaseStyle} borderRight="1px">
                        心血管疾病、慢性阻塞性肺疾病、慢性氣管炎、氣喘等。
                    </GridItem>
                    <GridItem {...diseaseStyle}>正已烷作業</GridItem>
                    <GridItem {...diseaseStyle} borderRight="1px">
                        周邊神經系統疾病、接觸性皮膚疾病等。
                    </GridItem>
                    <GridItem {...diseaseStyle}>重力勞動作業</GridItem>
                    <GridItem {...diseaseStyle} borderRight="1px">
                        呼吸系統疾病、高血壓、心血管疾病、貧血、肝病、腎臟疾病、精神或神經系統疾病、骨骼肌肉系統疾病、內分泌系統疾病、視網膜玻璃體疾病、肢體殘障。
                    </GridItem>
                </Grid>
                <Box pt={2}>
                    <Text as="b">
                        *出席人員簽名(簽名時，本人已了解下列事項)：
                        <br />
                        1.已了解今日作業環境及作業內容的危害並願意全程使用防護具及遵守各項防範措施。
                        <br />
                        2.已了解健康危害告知內容，本人如有上述疾病時，不會從事該項作業。
                        <br />
                    </Text>
                </Box>
                <SignatureTable {...signatureLists} />
                <Text pt={1}>
                    *作業現場巡檢紀錄(確認檢查項目均符規定後方可作業)
                </Text>
                <Grid
                    height="600px"
                    templateColumns="30fr 300fr 110fr repeat(4, 80fr)"
                    templateRows="repeat(13, 1fr)"
                >
                    <GridItem
                        rowStart={1}
                        rowEnd={3}
                        {...titleStyle}
                        borderRight="0px"
                    />
                    <GridItem
                        rowStart={1}
                        rowEnd={3}
                        colStart={2}
                        colEnd={4}
                        {...titleStyle}
                        justifyContent="center"
                    >
                        <Text as="b">檢查項目</Text>
                    </GridItem>
                    <GridItem
                        rowStart={1}
                        rowEnd={2}
                        colStart={4}
                        colEnd={7}
                        {...titleStyle}
                        justifyContent="center"
                        borderLeft="0px"
                        borderBottom="0px"
                    >
                        主承攬商監工人員巡檢欄
                    </GridItem>
                    <GridItem
                        rowStart={1}
                        rowEnd={3}
                        {...titleStyle}
                        justifyContent="center"
                        borderLeft="0px"
                        textAlign="center"
                    >
                        監工單位巡檢欄
                    </GridItem>
                    <GridItem
                        rowStart={2}
                        rowEnd={3}
                        colStart={4}
                        colEnd={5}
                        {...centerStyle}
                        borderLeft="0px"
                    >
                        施工前
                    </GridItem>
                    <GridItem
                        rowStart={2}
                        rowEnd={3}
                        colStart={5}
                        colEnd={6}
                        {...centerStyle}
                        borderLeft="0px"
                    >
                        施工中
                    </GridItem>
                    <GridItem
                        rowStart={2}
                        rowEnd={3}
                        colStart={6}
                        colEnd={7}
                        {...centerStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        收工前
                    </GridItem>
                    <GridItem {...centerStyle}>1</GridItem>
                    <GridItem
                        {...contentStyle}
                        colStart={2}
                        colEnd={4}
                        borderRight="1px"
                        pl="8px"
                    >
                        作業內容符合申請種類。
                    </GridItem>
                    <GridInputItem
                        fieldName="contentConformBeforeWork"
                        inputComponent={f.checkBox(
                            'contentConformBeforeWork',
                            !!signatures.contractingCorpStaffSignatureFirst[0]
                        )}
                        style={{ borderBottom: '1px' }}
                    />
                    <GridInputItem
                        fieldName="contentConformDuringWork"
                        inputComponent={f.checkBox(
                            'contentConformDuringWork',
                            !!signatures.contractingCorpStaffSignatureSecond[0]
                        )}
                        style={{ borderBottom: '1px' }}
                    />
                    <GridItem borderBottom="1px" borderRight="1px" />
                    <GridInputItem
                        fieldName="contentConformSupervisor"
                        inputComponent={f.checkBox(
                            'contentConformSupervisor',
                            !!signatures.systemEngineerSignature[0]
                        )}
                        style={{ borderBottom: '1px', borderRight: '1px' }}
                    />
                    <GridItem {...centerStyle}>2</GridItem>
                    <GridItem
                        {...contentStyle}
                        colStart={2}
                        colEnd={4}
                        borderRight="1px"
                        pl="8px"
                    >
                        確實執行相關作業檢點及安全防範措施。
                    </GridItem>
                    <GridInputItem
                        fieldName="safetyMeasureBeforeWork"
                        inputComponent={f.checkBox(
                            'safetyMeasureBeforeWork',
                            !!signatures.contractingCorpStaffSignatureFirst[0]
                        )}
                        style={{ borderBottom: '1px' }}
                    />
                    <GridInputItem
                        fieldName="safetyMeasureDuringWork"
                        inputComponent={f.checkBox(
                            'safetyMeasureDuringWork',
                            !!signatures.contractingCorpStaffSignatureSecond[0]
                        )}
                        style={{ borderBottom: '1px' }}
                    />
                    <GridInputItem
                        fieldName="safetyMeasureKnockOff"
                        inputComponent={f.checkBox(
                            'safetyMeasureKnockOff',
                            !!signatures.contractingCorpStaffSignatureThird[0]
                        )}
                        style={{ borderBottom: '1px', borderRight: '1px' }}
                    />
                    <GridInputItem
                        fieldName="safetyMeasureSupervisor"
                        inputComponent={f.checkBox(
                            'safetyMeasureSupervisor',
                            !!signatures.systemEngineerSignature[0]
                        )}
                        style={{ borderBottom: '1px', borderRight: '1px' }}
                    />
                    <GridItem {...centerStyle}>3</GridItem>
                    <GridItem
                        {...contentStyle}
                        colStart={2}
                        colEnd={4}
                        borderRight="1px"
                        pl="8px"
                    >
                        作業人員確實配戴/使用安全防護具、精神狀態/身體狀況正常。
                    </GridItem>
                    <GridInputItem
                        fieldName="staffStateBeforeWork"
                        inputComponent={f.checkBox(
                            'staffStateBeforeWork',
                            !!signatures.contractingCorpStaffSignatureFirst[0]
                        )}
                        style={{ borderBottom: '1px' }}
                    />
                    <GridInputItem
                        fieldName="staffStateDuringWork"
                        inputComponent={f.checkBox(
                            'staffStateDuringWork',
                            !!signatures.contractingCorpStaffSignatureSecond[0]
                        )}
                        style={{ borderBottom: '1px' }}
                    />
                    <GridInputItem
                        fieldName="staffStateKnockOff"
                        inputComponent={f.checkBox(
                            'staffStateKnockOff',
                            !!signatures.contractingCorpStaffSignatureThird[0]
                        )}
                        style={{ borderBottom: '1px', borderRight: '1px' }}
                    />
                    <GridInputItem
                        fieldName="staffStateSupervisor"
                        inputComponent={f.checkBox(
                            'staffStateSupervisor',
                            !!signatures.systemEngineerSignature[0]
                        )}
                        style={{ borderBottom: '1px', borderRight: '1px' }}
                    />
                    <GridItem {...centerStyle}>4</GridItem>
                    <GridItem
                        {...contentStyle}
                        colStart={2}
                        colEnd={4}
                        borderRight="1px"
                        pl="8px"
                    >
                        作業主管確實於現場監督。
                    </GridItem>
                    <GridInputItem
                        fieldName="principleOnSiteBeforeWork"
                        inputComponent={f.checkBox(
                            'principleOnSiteBeforeWork',
                            !!signatures.contractingCorpStaffSignatureFirst[0]
                        )}
                        style={{ borderBottom: '1px' }}
                    />
                    <GridInputItem
                        fieldName="principleOnSiteDuringWork"
                        inputComponent={f.checkBox(
                            'principleOnSiteDuringWork',
                            !!signatures.contractingCorpStaffSignatureSecond[0]
                        )}
                        style={{ borderBottom: '1px' }}
                    />
                    <GridInputItem
                        fieldName="principleOnSiteKnockOff"
                        inputComponent={f.checkBox(
                            'principleOnSiteKnockOff',
                            !!signatures.contractingCorpStaffSignatureThird[0]
                        )}
                        style={{ borderBottom: '1px', borderRight: '1px' }}
                    />
                    <GridInputItem
                        fieldName="principleOnSiteSupervisor"
                        inputComponent={f.checkBox(
                            'principleOnSiteSupervisor',
                            !!signatures.systemEngineerSignature[0]
                        )}
                        style={{ borderBottom: '1px', borderRight: '1px' }}
                    />
                    <GridItem {...centerStyle}>5</GridItem>
                    <GridItem
                        {...contentStyle}
                        colStart={2}
                        colEnd={4}
                        borderRight="1px"
                        pl="8px"
                    >
                        收工前，施工地點應整理妥當，將水電氣設施及防護設備/措施復原。
                    </GridItem>
                    <GridItem borderBottom="1px" />
                    <GridItem borderBottom="1px" />
                    <GridInputItem
                        fieldName="restorationKnockOff"
                        inputComponent={f.checkBox(
                            'restorationKnockOff',
                            !!signatures.contractingCorpStaffSignatureThird[0]
                        )}
                        style={{ borderBottom: '1px', borderRight: '1px' }}
                    />
                    <GridInputItem
                        fieldName="restorationSupervisor"
                        inputComponent={f.checkBox(
                            'restorationSupervisor',
                            !!signatures.systemEngineerSignature[0]
                        )}
                        style={{ borderBottom: '1px', borderRight: '1px' }}
                    />
                    <GridItem borderLeft="1px" borderBottom="1px" />
                    <GridItem
                        colStart={2}
                        colEnd={4}
                        borderBottom="1px"
                        borderRight="1px"
                        borderLeft="1px"
                    />
                    <GridItem borderBottom="1px" />
                    <GridItem borderBottom="1px" />
                    <GridItem borderBottom="1px" borderRight="1px" />
                    <GridItem borderBottom="1px" borderRight="1px" />
                    <GridItem borderLeft="1px" borderBottom="1px" />
                    <GridItem
                        colStart={2}
                        colEnd={4}
                        borderBottom="1px"
                        borderRight="1px"
                        borderLeft="1px"
                    />
                    <GridItem borderBottom="1px" />
                    <GridItem borderBottom="1px" />
                    <GridItem borderBottom="1px" borderRight="1px" />
                    <GridItem borderBottom="1px" borderRight="1px" />
                    <GridItem
                        rowStart={10}
                        rowEnd={14}
                        {...centerStyle}
                        letterSpacing="0.5em"
                        sx={{ writingMode: 'vertical-lr' }}
                    >
                        巡視紀錄
                    </GridItem>
                    <GridItem rowStart={10} rowEnd={14} {...contentStyle}>
                        {f.abnormalRecord()}
                    </GridItem>
                    <GridItem
                        rowStart={10}
                        rowEnd={13}
                        {...centerStyle}
                        borderRight="1px"
                    >
                        <Text textAlign="center">
                            巡檢人員
                            <br /> 簽名
                        </Text>
                    </GridItem>
                    <GridItem
                        rowStart={10}
                        rowEnd={13}
                        borderBottom="1px"
                        pb="2px"
                    >
                        {f.validSignBeforeWork() ? (
                            <SignaturePad
                                title="施工前 - 簽名"
                                signatureName="before-work-signature.png"
                                handler={
                                    new SingleSignatureHandler(
                                        signatures.contractingCorpStaffSignatureFirst
                                    )
                                }
                                placeHolderText="承商人員"
                                showTime={false}
                                h="90%"
                                disable={
                                    !!signatures
                                        .contractingCorpStaffSignatureFirst[0]
                                        ?.no
                                }
                            />
                        ) : (
                            f.forbidSignOverlay()
                        )}
                    </GridItem>
                    <GridItem
                        rowStart={10}
                        rowEnd={13}
                        borderBottom="1px"
                        pb="2px"
                    >
                        {f.validSignDuringWork() ? (
                            <SignaturePad
                                title="施工中 - 簽名"
                                signatureName="during-work-signature.png"
                                handler={
                                    new SingleSignatureHandler(
                                        signatures.contractingCorpStaffSignatureSecond
                                    )
                                }
                                placeHolderText="承商人員"
                                showTime={false}
                                h="90%"
                                disable={
                                    !!signatures
                                        .contractingCorpStaffSignatureSecond[0]
                                        ?.no
                                }
                            />
                        ) : (
                            f.forbidSignOverlay()
                        )}
                    </GridItem>
                    <GridItem
                        rowStart={10}
                        rowEnd={13}
                        borderBottom="1px"
                        borderRight="1px"
                        pb="2px"
                    >
                        {f.validSignKnockOff() ? (
                            <SignaturePad
                                title="收工前 - 簽名"
                                signatureName="knock-off-signature.png"
                                handler={
                                    new SingleSignatureHandler(
                                        signatures.contractingCorpStaffSignatureThird
                                    )
                                }
                                placeHolderText="承商人員"
                                showTime={false}
                                h="90%"
                                disable={
                                    !!signatures
                                        .contractingCorpStaffSignatureThird[0]
                                        ?.no
                                }
                            />
                        ) : (
                            f.forbidSignOverlay()
                        )}
                    </GridItem>
                    <GridItem
                        rowStart={10}
                        rowEnd={13}
                        borderBottom="1px"
                        borderRight="1px"
                        pb="2px"
                    >
                        {f.validSignSupervisor() ? (
                            <SignaturePad
                                title="監工單位 - 簽名"
                                signatureName="knock-off-signature.png"
                                handler={
                                    new SingleSignatureHandler(
                                        signatures.systemEngineerSignature
                                    )
                                }
                                placeHolderText="系統工程師"
                                showTime={false}
                                h="90%"
                                disable={
                                    !!signatures.systemEngineerSignature[0]?.no
                                }
                            />
                        ) : (
                            f.forbidSignOverlay()
                        )}
                    </GridItem>
                    <GridItem {...centerStyle} borderRight="1px">
                        檢查時間(時/分)
                    </GridItem>
                    <GridItem {...centerStyle} borderLeft="0px">
                        {f.validSignBeforeWork()
                            ? f.checkTimeInput(
                                  signatures.contractingCorpStaffSignatureFirst
                              )
                            : f.forbidOverlay()}
                    </GridItem>
                    <GridItem {...centerStyle} borderLeft="0px">
                        {f.validSignDuringWork()
                            ? f.checkTimeInput(
                                  signatures.contractingCorpStaffSignatureSecond
                              )
                            : f.forbidOverlay()}
                    </GridItem>
                    <GridItem
                        {...centerStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.validSignKnockOff()
                            ? f.checkTimeInput(
                                  signatures.contractingCorpStaffSignatureThird
                              )
                            : f.forbidOverlay()}
                    </GridItem>
                    <GridItem
                        {...centerStyle}
                        borderLeft="0px"
                        borderRight="1px"
                    >
                        {f.validSignSupervisor()
                            ? f.checkTimeInput(
                                  signatures.systemEngineerSignature
                              )
                            : f.forbidOverlay()}
                    </GridItem>
                </Grid>
                <Flex justifyContent="space-between">
                    <Text>
                        ※主承攬商監工人員施工前/中/收工前各須巡檢一次，監工單位監工每天至少巡檢一次。
                    </Text>
                    <Text>EE-4411-15A</Text>
                </Flex>
            </Box>
            {(loading || formProps.isSubmitting) && <FormLoading />}
        </Form>
    );
}
