import { gql } from '@apollo/client';
import {
    IOpCheckFillItem,
    SignatureName,
} from '../../../Interface/OpCheck/Common';
import {
    IChemicalOpCheck,
    offKeys,
    onKeys,
} from '../../../Interface/OpCheck/Chemical';
import { SignatureStateItem } from '../../../Interface/Signature';
import { SIGNATURE_FIELDS } from '../../GQLFragments';
import { OpCheckHandler } from '../Handler';

interface IChemicalItem extends IOpCheckFillItem {
    ameliorate: keyof IChemicalOpCheck;
}

export class ChemicalOpCheckHandler extends OpCheckHandler {
    queryName = 'chemicalOpCheck';
    query = gql`
        ${SIGNATURE_FIELDS}
        query chemicalOpCheck($siteId: String!, $number: String) {
            chemicalOpCheck(siteId: $siteId, number: $number) {
                siteId
                number
                area
                zone
                department
                day
                BJ01
                BJ02
                BJ03
                BJ04
                BJ05
                BJ06
                BJ07
                BJ08
                BJ01Ameliorate
                BJ02Ameliorate
                BJ03Ameliorate
                BJ04Ameliorate
                BJ05Ameliorate
                BJ06Ameliorate
                BJ07Ameliorate
                BJ08Ameliorate
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
    mutationName = 'updateOpChemical';
    mutation = gql`
        mutation updateOpChemical(
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
            $BJ01: Boolean
            $BJ01Ameliorate: String
            $BJ02: Boolean
            $BJ02Ameliorate: String
            $BJ03: Boolean
            $BJ03Ameliorate: String
            $BJ04: Boolean
            $BJ04Ameliorate: String
            $BJ05: Boolean
            $BJ05Ameliorate: String
            $BJ06: Boolean
            $BJ06Ameliorate: String
            $BJ07: Boolean
            $BJ07Ameliorate: String
            $BJ08: Boolean
            $BJ08Ameliorate: String
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
            updateOpChemical(
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
                BJ01: $BJ01
                BJ01Ameliorate: $BJ01Ameliorate
                BJ02: $BJ02
                BJ02Ameliorate: $BJ02Ameliorate
                BJ03: $BJ03
                BJ03Ameliorate: $BJ03Ameliorate
                BJ04: $BJ04
                BJ04Ameliorate: $BJ04Ameliorate
                BJ05: $BJ05
                BJ05Ameliorate: $BJ05Ameliorate
                BJ06: $BJ06
                BJ06Ameliorate: $BJ06Ameliorate
                BJ07: $BJ07
                BJ07Ameliorate: $BJ07Ameliorate
                BJ08: $BJ08
                BJ08Ameliorate: $BJ08Ameliorate
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
    onItems: Record<onKeys, IChemicalItem> = {
        BJ01: {
            ameliorate: 'BJ01Ameliorate',
            content: '裝有化學物質之容器皆清楚標示。',
        },
        BJ02: {
            ameliorate: 'BJ02Ameliorate',
            content: '化學物質使用完畢後，置於指定地點。',
        },
        BJ03: {
            ameliorate: 'BJ03Ameliorate',
            content: '化學物質使用、處置、儲存、作業，備有安全資料表(SDS)。',
        },
        BJ04: {
            ameliorate: 'BJ04Ameliorate',
            content: '可能產生危害之區域，設有警告標示及護欄。',
        },
        BJ05: {
            ameliorate: 'BJ05Ameliorate',
            content: '化學物質作業，已穿戴適當的個人防護具。',
        },
        BJ06: { ameliorate: 'BJ06Ameliorate', content: '作業主管於現場督導。' },
        BJ07: {
            ameliorate: 'BJ07Ameliorate',
            content: '作業場所保持通風/換氣。',
        },
        BJ08: {
            ameliorate: 'BJ08Ameliorate',
            content: '作業區域1.5公尺內未有火源。',
        },
    };
    offItems: Record<offKeys, IChemicalItem> = {
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

    getInitialValues(): IChemicalOpCheck {
        const base = super.getInitialValues();
        return {
            ...base,
            BJ01: undefined,
            BJ02: undefined,
            BJ03: undefined,
            BJ04: undefined,
            BJ05: undefined,
            BJ06: undefined,
            BJ07: undefined,
            BJ08: undefined,
            BJ01Ameliorate: '',
            BJ02Ameliorate: '',
            BJ03Ameliorate: '',
            BJ04Ameliorate: '',
            BJ05Ameliorate: '',
            BJ06Ameliorate: '',
            BJ07Ameliorate: '',
            BJ08Ameliorate: '',
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
