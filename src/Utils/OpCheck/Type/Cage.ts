import { gql } from '@apollo/client';
import {
    IOpCheckFillItem,
    SignatureName,
} from '../../../Interface/OpCheck/Common';
import { ICageOpCheck, offKeys, onKeys } from '../../../Interface/OpCheck/Cage';
import { SignatureStateItem } from '../../../Interface/Signature';
import { SIGNATURE_FIELDS } from '../../GQLFragments';
import { OpCheckHandler } from '../Handler';

interface ICageItem extends IOpCheckFillItem {
    ameliorate: keyof ICageOpCheck;
}

export class CageOpCheckHandler extends OpCheckHandler {
    queryName = 'cageOpCheck';
    query = gql`
        ${SIGNATURE_FIELDS}
        query cageOpCheck($siteId: String!, $number: String) {
            cageOpCheck(siteId: $siteId, number: $number) {
                siteId
                number
                area
                zone
                department
                day
                BE01
                BE02
                BE03
                BE04
                BE01Ameliorate
                BE02Ameliorate
                BE03Ameliorate
                BE04Ameliorate
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
    mutationName = 'updateOpCage';
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
                zone: $zone
            ) {
                ok
                message
            }
        }
    `;
    onItems: Record<onKeys, ICageItem> = {
        BE01: {
            ameliorate: 'BE01Ameliorate',
            content: '吊籠經檢查合格取得檢查合格證。',
        },
        BE02: {
            ameliorate: 'BE02Ameliorate',
            content: '操作人員經教育訓練合格，領有結業證書。',
        },
        BE03: {
            ameliorate: 'BE03Ameliorate',
            content: '每次作業前確實做好檢點工作。',
        },
        BE04: {
            ameliorate: 'BE04Ameliorate',
            content: '作業人員確實使用防墜落裝置。',
        },
    };
    offItems: Record<offKeys, ICageItem> = {
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

    getInitialValues(): ICageOpCheck {
        const base = super.getInitialValues();
        return {
            ...base,
            BE01: undefined,
            BE02: undefined,
            BE03: undefined,
            BE04: undefined,
            BE01Ameliorate: '',
            BE02Ameliorate: '',
            BE03Ameliorate: '',
            BE04Ameliorate: '',
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
