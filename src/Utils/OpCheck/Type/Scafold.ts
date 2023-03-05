import { gql } from '@apollo/client';
import {
    IOpCheckFillItem,
    SignatureName,
} from '../../../Interface/OpCheck/Common';
import {
    IScafoldOpCheck,
    offKeys,
    onKeys,
} from '../../../Interface/OpCheck/Scafold';
import { SignatureStateItem } from '../../../Interface/Signature';
import { SIGNATURE_FIELDS } from '../../GQLFragments';
import { OpCheckHandler } from '../Handler';

interface IScafoldItem extends IOpCheckFillItem {
    ameliorate: keyof IScafoldOpCheck;
}

export class ScafoldOpCheckHandler extends OpCheckHandler {
    queryName = 'scafoldOpCheck';
    query = gql`
        ${SIGNATURE_FIELDS}
        query scafoldOpCheck($siteId: String!, $number: String) {
            scafoldOpCheck(siteId: $siteId, number: $number) {
                siteId
                number
                area
                zone
                department
                day
                BB01
                BB02
                BB03
                BB04
                BB05
                BB06
                BB07
                BB08
                BB09
                BB10
                BB11
                BB12
                BB13
                BB14
                BB15
                BB16
                BB17
                BB01Ameliorate
                BB02Ameliorate
                BB03Ameliorate
                BB04Ameliorate
                BB05Ameliorate
                BB06Ameliorate
                BB07Ameliorate
                BB08Ameliorate
                BB09Ameliorate
                BB10Ameliorate
                BB11Ameliorate
                BB12Ameliorate
                BB13Ameliorate
                BB14Ameliorate
                BB15Ameliorate
                BB16Ameliorate
                BB17Ameliorate
                supervisorBefore
                staffBefore
                timeBefore
                AA19
                AA22
                AB01
                AB02
                AB03
                AB04
                AB05
                AB06
                AA19Ameliorate
                AA22Ameliorate
                AB01Ameliorate
                AB02Ameliorate
                AB03Ameliorate
                AB04Ameliorate
                AB05Ameliorate
                AB06Ameliorate
                supervisorAfter
                staffAfter
                timeAfter
                supervisorBeforeRef {
                    ...gqlSignatureFields
                }
                staffBeforeRef {
                    ...gqlSignatureFields
                }
                supervisorAfterRef {
                    ...gqlSignatureFields
                }
                staffAfterRef {
                    ...gqlSignatureFields
                }
            }
        }
    `;
    mutationName = 'updateOpScafold';
    mutation = gql`
        mutation refactored344(
            $AA19: Boolean
            $AA19Ameliorate: String
            $AA22: Boolean
            $AA22Ameliorate: String
            $AB01: Boolean
            $AB01Ameliorate: String
            $AB02: Boolean
            $AB02Ameliorate: String
            $AB03: Boolean
            $AB03Ameliorate: String
            $AB04: Boolean
            $AB04Ameliorate: String
            $AB05: Boolean
            $AB05Ameliorate: String
            $AB06: Boolean
            $AB06Ameliorate: String
            $BB01: Boolean
            $BB01Ameliorate: String
            $BB02: Boolean
            $BB02Ameliorate: String
            $BB03: Boolean
            $BB03Ameliorate: String
            $BB04: Boolean
            $BB04Ameliorate: String
            $BB05: Boolean
            $BB05Ameliorate: String
            $BB06: Boolean
            $BB06Ameliorate: String
            $BB07: Boolean
            $BB07Ameliorate: String
            $BB08: Boolean
            $BB08Ameliorate: String
            $BB09: Boolean
            $BB09Ameliorate: String
            $BB10: Boolean
            $BB10Ameliorate: String
            $BB11: Boolean
            $BB11Ameliorate: String
            $BB12: Boolean
            $BB12Ameliorate: String
            $BB13: Boolean
            $BB13Ameliorate: String
            $BB14: Boolean
            $BB14Ameliorate: String
            $BB15: Boolean
            $BB15Ameliorate: String
            $BB16: Boolean
            $BB16Ameliorate: String
            $BB17: Boolean
            $BB17Ameliorate: String
            $area: String
            $day: Date
            $department: String
            $number: String!
            $siteId: String!
            $staffAfter: signatureInput
            $staffBefore: signatureInput
            $supervisorAfter: signatureInput
            $supervisorBefore: signatureInput
            $timeAfter: DateTime
            $timeBefore: DateTime
            $zone: String
        ) {
            updateOpScafold(
                AA19: $AA19
                AA19Ameliorate: $AA19Ameliorate
                AA22: $AA22
                AA22Ameliorate: $AA22Ameliorate
                AB01: $AB01
                AB01Ameliorate: $AB01Ameliorate
                AB02: $AB02
                AB02Ameliorate: $AB02Ameliorate
                AB03: $AB03
                AB03Ameliorate: $AB03Ameliorate
                AB04: $AB04
                AB04Ameliorate: $AB04Ameliorate
                AB05: $AB05
                AB05Ameliorate: $AB05Ameliorate
                AB06: $AB06
                AB06Ameliorate: $AB06Ameliorate
                BB01: $BB01
                BB01Ameliorate: $BB01Ameliorate
                BB02: $BB02
                BB02Ameliorate: $BB02Ameliorate
                BB03: $BB03
                BB03Ameliorate: $BB03Ameliorate
                BB04: $BB04
                BB04Ameliorate: $BB04Ameliorate
                BB05: $BB05
                BB05Ameliorate: $BB05Ameliorate
                BB06: $BB06
                BB06Ameliorate: $BB06Ameliorate
                BB07: $BB07
                BB07Ameliorate: $BB07Ameliorate
                BB08: $BB08
                BB08Ameliorate: $BB08Ameliorate
                BB09: $BB09
                BB09Ameliorate: $BB09Ameliorate
                BB10: $BB10
                BB10Ameliorate: $BB10Ameliorate
                BB11: $BB11
                BB11Ameliorate: $BB11Ameliorate
                BB12: $BB12
                BB12Ameliorate: $BB12Ameliorate
                BB13: $BB13
                BB13Ameliorate: $BB13Ameliorate
                BB14: $BB14
                BB14Ameliorate: $BB14Ameliorate
                BB15: $BB15
                BB15Ameliorate: $BB15Ameliorate
                BB16: $BB16
                BB16Ameliorate: $BB16Ameliorate
                BB17: $BB17
                BB17Ameliorate: $BB17Ameliorate
                area: $area
                day: $day
                department: $department
                number: $number
                siteId: $siteId
                staffAfter: $staffAfter
                staffBefore: $staffBefore
                supervisorAfter: $supervisorAfter
                supervisorBefore: $supervisorBefore
                timeAfter: $timeAfter
                timeBefore: $timeBefore
                zone: $zone
            ) {
                ok
                message
            }
        }
    `;
    onItems: Record<onKeys, IScafoldItem> = {
        BB01: {
            ameliorate: 'BB01Ameliorate',
            content:
                '依照施工地點之地形、地物使用下列之安全器具：(a)施工架/作業平台(含牢固護欄)(b)自動升降機(c)安全帶(d)安全網(e)A字梯(f)安全母索(g)其他防墜措施。',
        },
        BB02: {
            ameliorate: 'BB02Ameliorate',
            content:
                '未僱用下列人員從事高架作業：(a)患有高血壓、心血管疾病或貧血者(b)曾患有癲癇精神或神精疾病(c)平衡機能失常者(d)患有哮喘症者(e)四肢不全者(f)色盲者(g)聽力不正常者(h)酗酒者(i)身體虛弱者(j)情緒不佳有安全顧慮者(k)年齡未滿十八歲或超過五十五歲者。',
        },
        BB03: {
            ameliorate: 'BB03Ameliorate',
            content: '施工架上未再搭接梯子或踏凳等從事作業。',
        },
        BB04: {
            ameliorate: 'BB04Ameliorate',
            content: '移動式施工架於定位時應踩下車輪煞車器固定。',
        },
        BB05: {
            ameliorate: 'BB05Ameliorate',
            content: '人員位於施工架上時，未移動施工架。',
        },
        BB06: {
            ameliorate: 'BB06Ameliorate',
            content:
                '施工使用A字梯時，以一人在梯上一人在下扶持A字梯之夥同方式作業(作業廠區規定時適用)。',
        },
        BB07: {
            ameliorate: 'BB07Ameliorate',
            content: '未使用損毀凹陷的A字梯、施工架。',
        },
        BB08: {
            ameliorate: 'BB08Ameliorate',
            content: '高差超過1.5公尺以上之場所，使用人員能安全上下之設備。',
        },
        BB09: {
            ameliorate: 'BB09Ameliorate',
            content: '未從高處投下物體，或使用適當之承受設備。',
        },
        BB10: {
            ameliorate: 'BB10Ameliorate',
            content:
                '高空工作車應標示空重、載重、額定荷重等，且不得超過高空工作車之積載荷重及能力。',
        },
        BB11: {
            ameliorate: 'BB11Ameliorate',
            content:
                '高空工作車事先應視作業場所之狀況、工作台高度、伸臂長度及作業場所地形等，規定適當之行駛速率，操作人員應依規定操作。',
        },
        BB12: {
            ameliorate: 'BB12Ameliorate',
            content:
                '在工作台以外之處所操作工作台時，操作人員與工作台上之人員間應規定統一指揮信號，並依信號從事指揮作業。',
        },
        BB13: {
            ameliorate: 'BB13Ameliorate',
            content:
                '除乘坐席位及工作台外不得搭載人員，且作業時禁止非相關人員進入操作半徑內，或附近有危險之虞之場所。',
        },
        BB14: {
            ameliorate: 'BB14Ameliorate',
            content:
                '應將其外伸撐座完全伸出，並採取防止地盤沉陷或崩塌等必要措施',
        },
        BB15: {
            ameliorate: 'BB15Ameliorate',
            content: '高空工作車禁止停放斜坡，除非已採有安全措施。',
        },
        BB16: {
            ameliorate: 'BB16Ameliorate',
            content:
                '使用高空工作車從事作業時，工作台上的人員應佩帶背負式安全帶，工作台出入口處應有確保防止人員墜落的安全設施。',
        },
        BB17: {
            ameliorate: 'BB17Ameliorate',
            content:
                '工作車移動時，應將工作台下降至最低位置；若不使用時應確實使用制動裝置保持高空工作車於穩定狀態。',
        },
    };
    offItems: Record<offKeys, IScafoldItem> = {
        AA19: {
            ameliorate: 'AA19Ameliorate',
            content: '下班收工後已將電氣設備、氣體鋼瓶關閉。',
        },
        AA22: {
            ameliorate: 'AA22Ameliorate',
            content: '已復原安全設施(如：安全網、平台護欄….等) 。',
        },
        AB01: {
            ameliorate: 'AB01Ameliorate',
            content: '每日工程收工前，整理現場、收拾工具，使之恢復正常狀況。',
        },
        AB02: {
            ameliorate: 'AB02Ameliorate',
            content: '每日工作後，將自動昇降機、A字梯、施工架等歸回定位。 ',
        },
        AB03: {
            ameliorate: 'AB03Ameliorate',
            content: '每日工作後，將作業平台上工具及施工物件、材料等收拾完成。',
        },
        AB04: {
            ameliorate: 'AB04Ameliorate',
            content:
                '庫存區、預置區、堆放區之機具、材料已分類、標示，廢棄物當日清除。',
        },
        AB05: {
            ameliorate: 'AB05Ameliorate',
            content: '每日收工前將物料、工具置於暫存區並將當日垃圾清理乾淨。',
        },
        AB06: {
            ameliorate: 'AB06Ameliorate',
            content: '生活廢棄物依照各區垃圾分類規定丟棄於各分類垃圾桶內。',
        },
    };

    constructor(
        siteId: string,
        number: string,
        signatures: Record<SignatureName, SignatureStateItem>
    ) {
        super(siteId, number, signatures);
    }

    getInitialValues(): IScafoldOpCheck {
        const base = super.getInitialValues();
        return {
            ...base,
            BB01: undefined,
            BB02: undefined,
            BB03: undefined,
            BB04: undefined,
            BB05: undefined,
            BB06: undefined,
            BB07: undefined,
            BB08: undefined,
            BB09: undefined,
            BB10: undefined,
            BB11: undefined,
            BB12: undefined,
            BB13: undefined,
            BB14: undefined,
            BB15: undefined,
            BB16: undefined,
            BB17: undefined,
            BB01Ameliorate: '',
            BB02Ameliorate: '',
            BB03Ameliorate: '',
            BB04Ameliorate: '',
            BB05Ameliorate: '',
            BB06Ameliorate: '',
            BB07Ameliorate: '',
            BB08Ameliorate: '',
            BB09Ameliorate: '',
            BB10Ameliorate: '',
            BB11Ameliorate: '',
            BB12Ameliorate: '',
            BB13Ameliorate: '',
            BB14Ameliorate: '',
            BB15Ameliorate: '',
            BB16Ameliorate: '',
            BB17Ameliorate: '',
            AA19: undefined,
            AA22: undefined,
            AB01: undefined,
            AB02: undefined,
            AB03: undefined,
            AB04: undefined,
            AB05: undefined,
            AB06: undefined,
            AA19Ameliorate: '',
            AA22Ameliorate: '',
            AB01Ameliorate: '',
            AB02Ameliorate: '',
            AB03Ameliorate: '',
            AB04Ameliorate: '',
            AB05Ameliorate: '',
            AB06Ameliorate: '',
        };
    }
}
