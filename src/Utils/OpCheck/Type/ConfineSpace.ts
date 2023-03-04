import { gql } from '@apollo/client';
import {
    IOpCheckFillItem,
    SignatureName,
} from '../../../Interface/OpCheck/Common';
import {
    IConfineSpaceOpCheck,
    offKeys,
    onKeys,
} from '../../../Interface/OpCheck/ConfineSpace';
import { SignatureStateItem } from '../../../Interface/Signature';
import { SIGNATURE_FIELDS } from '../../GQLFragments';
import { OpCheckHandler } from '../Handler';

interface IConfineSpaceItem extends IOpCheckFillItem {
    ameliorate: keyof IConfineSpaceOpCheck;
}

export class ConfineSpaceOpCheckHandler extends OpCheckHandler {
    queryName = 'confineSpaceOpCheck';
    query = gql`
        ${SIGNATURE_FIELDS}
        query confineSpaceOpCheck($siteId: String!, $number: String) {
            confineSpaceOpCheck(siteId: $siteId, number: $number) {
                siteId
                number
                area
                zone
                department
                day
                BC01
                BC02
                hypoxiaOpSupervisor
                BC03
                BC04
                BC05
                laborNum
                supervisorNum
                BC06
                enterTime
                outTime
                BC07
                BC08
                BC09
                BC10
                BC11
                BC01Ameliorate
                BC02Ameliorate
                BC03Ameliorate
                BC04Ameliorate
                BC05Ameliorate
                BC06Ameliorate
                BC07Ameliorate
                BC08Ameliorate
                BC09Ameliorate
                BC10Ameliorate
                BC11Ameliorate
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
    mutationName = 'updateOpConfined';
    mutation = gql`
        mutation updateOpConfined(
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
            $BC01: Boolean
            $BC01Ameliorate: String
            $BC02: Boolean
            $BC02Ameliorate: String
            $BC03: Boolean
            $BC03Ameliorate: String
            $BC04: Boolean
            $BC04Ameliorate: String
            $BC05: Boolean
            $BC05Ameliorate: String
            $BC06: Boolean
            $BC06Ameliorate: String
            $BC07: Boolean
            $BC07Ameliorate: String
            $BC08: Boolean
            $BC08Ameliorate: String
            $BC09: Boolean
            $BC09Ameliorate: String
            $BC10: Boolean
            $BC10Ameliorate: String
            $BC11: Boolean
            $BC11Ameliorate: String
            $area: String
            $day: Date
            $department: String
            $enterTime: DateTime
            $hypoxiaOpSupervisor: String
            $laborNum: String
            $number: String!
            $outTime: DateTime
            $siteId: String!
            $staffAfter: signatureInput
            $staffBefore: signatureInput
            $supervisorAfter: signatureInput
            $supervisorBefore: signatureInput
            $supervisorNum: String
            $timeAfter: DateTime
            $timeBefore: DateTime
            $zone: String
        ) {
            updateOpConfined(
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
                BC01: $BC01
                BC01Ameliorate: $BC01Ameliorate
                BC02: $BC02
                BC02Ameliorate: $BC02Ameliorate
                BC03: $BC03
                BC03Ameliorate: $BC03Ameliorate
                BC04: $BC04
                BC04Ameliorate: $BC04Ameliorate
                BC05: $BC05
                BC05Ameliorate: $BC05Ameliorate
                BC06: $BC06
                BC06Ameliorate: $BC06Ameliorate
                BC07: $BC07
                BC07Ameliorate: $BC07Ameliorate
                BC08: $BC08
                BC08Ameliorate: $BC08Ameliorate
                BC09: $BC09
                BC09Ameliorate: $BC09Ameliorate
                BC10: $BC10
                BC10Ameliorate: $BC10Ameliorate
                BC11: $BC11
                BC11Ameliorate: $BC11Ameliorate
                area: $area
                day: $day
                department: $department
                enterTime: $enterTime
                hypoxiaOpSupervisor: $hypoxiaOpSupervisor
                laborNum: $laborNum
                number: $number
                outTime: $outTime
                siteId: $siteId
                staffAfter: $staffAfter
                staffBefore: $staffBefore
                supervisorAfter: $supervisorAfter
                supervisorBefore: $supervisorBefore
                supervisorNum: $supervisorNum
                timeAfter: $timeAfter
                timeBefore: $timeBefore
                zone: $zone
            ) {
                ok
                message
            }
        }
    `;
    onItems: Record<onKeys, IConfineSpaceItem> = {
        BC01: {
            ameliorate: 'BC01Ameliorate',
            content:
                '已對局限空間進行氧氣含量及有害物濃度測試合格後才進入作業。(O2濃度18~21%)',
        },
        BC02: {
            ameliorate: 'BC02Ameliorate',
            content: '缺氧作業主管於現場全程監督作業安全。',
        },
        BC03: {
            ameliorate: 'BC03Ameliorate',
            content: '人體有害物質已做妥隔離、遮斷、盲封、清除。',
        },
        BC04: {
            ameliorate: 'BC04Ameliorate',
            content: '作業現場備有良好且正確運作之通風設備。',
        },
        BC05: {
            ameliorate: 'BC05Ameliorate',
            content: '人員經許可後，再進入局限空間。',
        },
        BC06: {
            ameliorate: 'BC06Ameliorate',
            content: '許可進入局限空間作業之人員已載明進入時間及期限。',
        },
        BC07: {
            ameliorate: 'BC07Ameliorate',
            content:
                '引火性液體之蒸氣或可燃性氣體之濃度不得超過其爆炸下限之30%。',
        },
        BC08: {
            ameliorate: 'BC08Ameliorate',
            content:
                '人員應配戴適當之呼吸防護具(濾氣式呼吸防護具、供氣式呼吸防護具等)。',
        },
        BC09: {
            ameliorate: 'BC09Ameliorate',
            content: '已訂定危害防止計畫供依循。',
        },
        BC10: {
            ameliorate: 'BC10Ameliorate',
            content: '於作業場所顯而易見處公告禁止進入。',
        },
        BC11: {
            ameliorate: 'BC11Ameliorate',
            content: '防護設備及救援設備已準備。',
        },
    };
    offItems: Record<offKeys, IConfineSpaceItem> = {
        AA19: {
            ameliorate: 'AB06Ameliorate',
            content: '下班收工後已將電氣設備、氣體鋼瓶關閉。',
        },
        AA22: {
            ameliorate: 'AB05Ameliorate',
            content: '已復原安全設施(如：安全網、平台護欄….等) 。',
        },
        AB01: {
            ameliorate: 'AB04Ameliorate',
            content: '每日工程收工前，整理現場、收拾工具，使之恢復正常狀況。',
        },
        AB02: {
            ameliorate: 'AB03Ameliorate',
            content: '每日工作後，將自動昇降機、A字梯、施工架等歸回定位。',
        },
        AB03: {
            ameliorate: 'AB02Ameliorate',
            content: '每日工作後，將作業平台上工具及施工物件、材料等收拾完成。',
        },
        AB04: {
            ameliorate: 'AB01Ameliorate',
            content:
                '庫存區、預置區、堆放區之機具、材料已分類、標示，廢棄物當日清除。',
        },
        AB05: {
            ameliorate: 'AA22Ameliorate',
            content: '每日收工前將物料、工具置於暫存區並將當日垃圾清理乾淨。',
        },
        AB06: {
            ameliorate: 'AA19Ameliorate',
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

    getInitialValues(): IConfineSpaceOpCheck {
        const base = super.getInitialValues();
        return {
            ...base,
            BC01: undefined,
            BC02: undefined,
            hypoxiaOpSupervisor: '',
            BC03: undefined,
            BC04: undefined,
            BC05: undefined,
            laborNum: undefined,
            supervisorNum: undefined,
            BC06: undefined,
            enterTime: '',
            outTime: '',
            BC07: undefined,
            BC08: undefined,
            BC09: undefined,
            BC10: undefined,
            BC11: undefined,
            BC01Ameliorate: '',
            BC02Ameliorate: '',
            BC03Ameliorate: '',
            BC04Ameliorate: '',
            BC05Ameliorate: '',
            BC06Ameliorate: '',
            BC07Ameliorate: '',
            BC08Ameliorate: '',
            BC09Ameliorate: '',
            BC10Ameliorate: '',
            BC11Ameliorate: '',
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

    marshal(submitValues: IConfineSpaceOpCheck): void {
        super.marshal(submitValues);
        submitValues.laborNum = submitValues.laborNum?.toString();
        submitValues.supervisorNum = submitValues.supervisorNum?.toString();
    }
}
