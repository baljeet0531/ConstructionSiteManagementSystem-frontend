import { gql } from '@apollo/client';
import {
    IOpCheckFillItem,
    SignatureName,
} from '../../../Interface/OpCheck/Common';
import { IFireOpCheck, offKeys, onKeys } from '../../../Interface/OpCheck/Fire';
import { SignatureStateItem } from '../../../Interface/Signature';
import { SIGNATURE_FIELDS } from '../../GQLFragments';
import { OpCheckHandler } from '../Handler';

interface IFireItem extends IOpCheckFillItem {
    ameliorate: keyof IFireOpCheck;
}

export class FireOpCheckHandler extends OpCheckHandler {
    schema: IFireOpCheck;
    query = gql`
        ${SIGNATURE_FIELDS}
        query fireOpCheck($siteId: String!, $number: String) {
            fireOpCheck(siteId: $siteId, number: $number) {
                siteId
                number
                area
                zone
                department
                day
                BA01
                BA02
                BA03
                BA04
                BA05
                BA06
                BA07
                BA08
                BA09
                BA01Ameliorate
                BA02Ameliorate
                BA03Ameliorate
                BA04Ameliorate
                BA05Ameliorate
                BA06Ameliorate
                BA07Ameliorate
                BA08Ameliorate
                BA09Ameliorate
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
    mutation = gql`
        mutation updateOpCage(
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
            $BE01: Boolean
            $BE01Ameliorate: String
            $BE02: Boolean
            $BE02Ameliorate: String
            $BE03: Boolean
            $BE03Ameliorate: String
            $BE04: Boolean
            $BE04Ameliorate: String
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
            $username: String!
            $zone: String
        ) {
            updateOpCage(
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
                BE01: $BE01
                BE01Ameliorate: $BE01Ameliorate
                BE02: $BE02
                BE02Ameliorate: $BE02Ameliorate
                BE03: $BE03
                BE03Ameliorate: $BE03Ameliorate
                BE04: $BE04
                BE04Ameliorate: $BE04Ameliorate
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
                username: $username
                zone: $zone
            ) {
                ok
                message
            }
        }
    `;
    onItems: Record<onKeys, IFireItem> = {
        BA01: {
            ameliorate: 'BA01Ameliorate',
            content: '作業現場備有正確、足夠之滅火器，且有效期限未過期。',
        },
        BA02: {
            ameliorate: 'BA02Ameliorate',
            content: '作業現場易燃物已移除或加以防護。',
        },
        BA03: {
            ameliorate: 'BA03Ameliorate',
            content: '氣體鋼瓶集中時，保持豎立，或使用專用手推車搬運氣體鋼瓶。',
        },
        BA04: {
            ameliorate: 'BA04Ameliorate',
            content: '氣體鋼瓶使用鐵鍊、非彈性繩索固定，或每日作業後裝妥護蓋。',
        },
        BA05: {
            ameliorate: 'BA05Ameliorate',
            content: '焊接機具裝設有效之自動電擊防止裝置及漏電斷路器。',
        },
        BA06: {
            ameliorate: 'BA06Ameliorate',
            content: '氧氣鋼瓶裝有合乎規格之專用減壓調節器及防爆逆止閥。',
        },
        BA07: {
            ameliorate: 'BA07Ameliorate',
            content: '高處動火有以耐燃材料阻隔、收集、抑制火星四散或掉落。',
        },
        BA08: {
            ameliorate: 'BA08Ameliorate',
            content: '焊接時使用絕緣良好之安全手把、配戴盔帽及遮光玻璃。 ',
        },
        BA09: {
            ameliorate: 'BA09Ameliorate',
            content:
                '焊接地線已儘可能接近焊接點，電流迴路無經其它設備而導致跳電之虞。',
        },
    };
    offItems: Record<offKeys, IFireItem> = {
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
        this.schema = this.getInitialValues();
    }

    getInitialValues(): IFireOpCheck {
        const base = super.getInitialValues();
        return {
            ...base,
            BA01: undefined,
            BA02: undefined,
            BA03: undefined,
            BA04: undefined,
            BA05: undefined,
            BA06: undefined,
            BA07: undefined,
            BA08: undefined,
            BA09: undefined,
            BA01Ameliorate: '',
            BA02Ameliorate: '',
            BA03Ameliorate: '',
            BA04Ameliorate: '',
            BA05Ameliorate: '',
            BA06Ameliorate: '',
            BA07Ameliorate: '',
            BA08Ameliorate: '',
            BA09Ameliorate: '',
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
