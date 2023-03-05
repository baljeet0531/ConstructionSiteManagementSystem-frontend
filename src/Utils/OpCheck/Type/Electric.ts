import { gql } from '@apollo/client';
import {
    IOpCheckFillItem,
    SignatureName,
} from '../../../Interface/OpCheck/Common';
import {
    IElectricOpCheck,
    offKeys,
    onKeys,
} from '../../../Interface/OpCheck/Electric';
import { SignatureStateItem } from '../../../Interface/Signature';
import { SIGNATURE_FIELDS } from '../../GQLFragments';
import { OpCheckHandler } from '../Handler';

interface IElectricItem extends IOpCheckFillItem {
    ameliorate: keyof IElectricOpCheck;
}

export class ElectricOpCheckHandler extends OpCheckHandler {
    queryName = 'electricOpCheck';
    query = gql`
        ${SIGNATURE_FIELDS}
        query electricOpCheck($siteId: String!, $number: String) {
            electricOpCheck(siteId: $siteId, number: $number) {
                siteId
                number
                area
                zone
                department
                day
                BD01
                BD02
                BD03
                BD04
                BD05
                BD06
                BD07
                BD08
                BD09
                BD10
                BD11
                BD12
                BD13
                BD14
                BD15
                BD16
                BD01Ameliorate
                BD02Ameliorate
                BD03Ameliorate
                BD04Ameliorate
                BD05Ameliorate
                BD06Ameliorate
                BD07Ameliorate
                BD08Ameliorate
                BD09Ameliorate
                BD10Ameliorate
                BD11Ameliorate
                BD12Ameliorate
                BD13Ameliorate
                BD14Ameliorate
                BD15Ameliorate
                BD16Ameliorate
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
    mutationName = 'updateOpElectric';
    mutation = gql`
        mutation updateOpElectric(
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
            $BD01: Boolean
            $BD01Ameliorate: String
            $BD02: Boolean
            $BD02Ameliorate: String
            $BD03: Boolean
            $BD03Ameliorate: String
            $BD04: Boolean
            $BD04Ameliorate: String
            $BD05: Boolean
            $BD05Ameliorate: String
            $BD06: Boolean
            $BD06Ameliorate: String
            $BD07: Boolean
            $BD07Ameliorate: String
            $BD08: Boolean
            $BD08Ameliorate: String
            $BD09: Boolean
            $BD09Ameliorate: String
            $BD10: Boolean
            $BD10Ameliorate: String
            $BD11: Boolean
            $BD11Ameliorate: String
            $BD12: Boolean
            $BD12Ameliorate: String
            $BD13: Boolean
            $BD13Ameliorate: String
            $BD14: Boolean
            $BD14Ameliorate: String
            $BD15: Boolean
            $BD15Ameliorate: String
            $BD16: Boolean
            $BD16Ameliorate: String
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
            updateOpElectric(
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
                BD01: $BD01
                BD01Ameliorate: $BD01Ameliorate
                BD02: $BD02
                BD02Ameliorate: $BD02Ameliorate
                BD03: $BD03
                BD03Ameliorate: $BD03Ameliorate
                BD04: $BD04
                BD04Ameliorate: $BD04Ameliorate
                BD05: $BD05
                BD05Ameliorate: $BD05Ameliorate
                BD06: $BD06
                BD06Ameliorate: $BD06Ameliorate
                BD07: $BD07
                BD07Ameliorate: $BD07Ameliorate
                BD08: $BD08
                BD08Ameliorate: $BD08Ameliorate
                BD09: $BD09
                BD09Ameliorate: $BD09Ameliorate
                BD10: $BD10
                BD10Ameliorate: $BD10Ameliorate
                BD11: $BD11
                BD11Ameliorate: $BD11Ameliorate
                BD12: $BD12
                BD12Ameliorate: $BD12Ameliorate
                BD13: $BD13
                BD13Ameliorate: $BD13Ameliorate
                BD14: $BD14
                BD14Ameliorate: $BD14Ameliorate
                BD15: $BD15
                BD15Ameliorate: $BD15Ameliorate
                BD16: $BD16
                BD16Ameliorate: $BD16Ameliorate
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
    onItems: Record<onKeys, IElectricItem> = {
        BD01: {
            ameliorate: 'BD01Ameliorate',
            content: '插頭依規定格式標示公司名稱、連絡人及連絡電話。',
        },
        BD02: {
            ameliorate: 'BD02Ameliorate',
            content: '使用之電線、插頭無破損或絕緣不良之現象。',
        },
        BD03: {
            ameliorate: 'BD03Ameliorate',
            content:
                '電線橫越道路及車輛行駛較頻繁之場所，以管路埋設地下或以厚鋼管、槽鐵等掩護或架高配設，且未形成通行障礙。',
        },
        BD04: {
            ameliorate: 'BD04Ameliorate',
            content: '使用經檢驗合格之電器設備。',
        },
        BD05: {
            ameliorate: 'BD05Ameliorate',
            content: '未以電線或其他金屬代替保險絲。',
        },
        BD06: {
            ameliorate: 'BD06Ameliorate',
            content: '施工用電使用〝施工專用電盤〞接電。',
        },
        BD07: {
            ameliorate: 'BD07Ameliorate',
            content: '使用〝施工專用電盤〞由上下開孔接電，不會妨礙電盤門開閉。',
        },
        BD08: {
            ameliorate: 'BD08Ameliorate',
            content: '危險地區加裝護欄及掛有安全標示。',
        },
        BD09: {
            ameliorate: 'BD09Ameliorate',
            content: '電氣設備遠離易燃品或有適當防護。',
        },
        BD10: {
            ameliorate: 'BD10Ameliorate',
            content:
                '非指定人員未隨意開動或關閉機械設備，以及工作起動後有關電氣設備部分之使用，經機械、設備之管理人員許可。',
        },
        BD11: {
            ameliorate: 'BD11Ameliorate',
            content:
                '馬達、穿孔器、一般常用之測試儀器及電動手工具，具有良好之絕緣設備，才可使用。',
        },
        BD12: {
            ameliorate: 'BD12Ameliorate',
            content: '電動工具使用前，依規定接地。',
        },
        BD13: {
            ameliorate: 'BD13Ameliorate',
            content: '電動工具裝設良好絕緣插頭，未以裸接方式直接插入插座上。',
        },
        BD14: {
            ameliorate: 'BD14Ameliorate',
            content: '在潮溼地區著乾燥之橡膠鞋及絕緣等措施，才使用電動手工具。',
        },
        BD15: {
            ameliorate: 'BD15Ameliorate',
            content: '使用之延長線有過載保護裝置。',
        },
        BD16: {
            ameliorate: 'BD16Ameliorate',
            content: '活線或臨時斷/供電作業，已標示、隔離，且作業後復原環境。',
        },
    };
    offItems: Record<offKeys, IElectricItem> = {
        AA19: {
            ameliorate: 'AA19Ameliorate',
            content: '下班收工後已將電氣設備、氣體鋼瓶關閉。',
        },
        AA22: {
            ameliorate: 'AA22Ameliorate',
            content: '已復原安全設施(如：安全網、平台護欄….等)。',
        },
        AB01: {
            ameliorate: 'AB01Ameliorate',
            content: '每日工程收工前，整理現場、收拾工具，使之恢復正常狀況。',
        },
        AB02: {
            ameliorate: 'AB02Ameliorate',
            content: '每日工作後，將自動昇降機、A字梯、施工架等歸回定位。',
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

    getInitialValues(): IElectricOpCheck {
        const base = super.getInitialValues();
        return {
            ...base,
            BD01: undefined,
            BD02: undefined,
            BD03: undefined,
            BD04: undefined,
            BD05: undefined,
            BD06: undefined,
            BD07: undefined,
            BD08: undefined,
            BD09: undefined,
            BD10: undefined,
            BD11: undefined,
            BD12: undefined,
            BD13: undefined,
            BD14: undefined,
            BD15: undefined,
            BD16: undefined,
            BD01Ameliorate: '',
            BD02Ameliorate: '',
            BD03Ameliorate: '',
            BD04Ameliorate: '',
            BD05Ameliorate: '',
            BD06Ameliorate: '',
            BD07Ameliorate: '',
            BD08Ameliorate: '',
            BD09Ameliorate: '',
            BD10Ameliorate: '',
            BD11Ameliorate: '',
            BD12Ameliorate: '',
            BD13Ameliorate: '',
            BD14Ameliorate: '',
            BD15Ameliorate: '',
            BD16Ameliorate: '',
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
