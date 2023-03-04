import { gql } from '@apollo/client';
import {
    IOpCheckFillItem,
    SignatureName,
} from '../../../Interface/OpCheck/Common';
import {
    IPipeDistructOpCheck,
    offKeys,
    onKeys,
} from '../../../Interface/OpCheck/PipeDistruct';
import { SignatureStateItem } from '../../../Interface/Signature';
import { SIGNATURE_FIELDS } from '../../GQLFragments';
import { OpCheckHandler } from '../Handler';

interface IPipeDistructItem extends IOpCheckFillItem {
    ameliorate: keyof IPipeDistructOpCheck;
}

export class PipeDistructOpCheckHandler extends OpCheckHandler {
    queryName = 'pipeDistructOpCheck';
    query = gql`
        ${SIGNATURE_FIELDS}
        query pipeDistructOpCheck($siteId: String!, $number: String) {
            pipeDistructOpCheck(siteId: $siteId, number: $number) {
                siteId
                number
                area
                zone
                department
                day
                BH01
                BH02
                BH03
                BH04
                BH01Ameliorate
                BH02Ameliorate
                BH03Ameliorate
                BH04Ameliorate
                supervisorBefore
                staffBefore
                timeBefore
                AA16
                AA19
                AB01
                AB02
                AB03
                AB04
                AB05
                AB06
                AA16Ameliorate
                AA19Ameliorate
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
    mutationName = 'updateOpPipeDistruct';
    mutation = gql`
        mutation updateOpPipeDistruct(
            $AA16: Boolean
            $AA16Ameliorate: String
            $AA19: Boolean
            $AA19Ameliorate: String
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
            $BH01: Boolean
            $BH01Ameliorate: String
            $BH02: Boolean
            $BH02Ameliorate: String
            $BH03: Boolean
            $BH03Ameliorate: String
            $BH04: Boolean
            $BH04Ameliorate: String
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
            updateOpPipeDistruct(
                AA16: $AA16
                AA16Ameliorate: $AA16Ameliorate
                AA19: $AA19
                AA19Ameliorate: $AA19Ameliorate
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
                BH01: $BH01
                BH01Ameliorate: $BH01Ameliorate
                BH02: $BH02
                BH02Ameliorate: $BH02Ameliorate
                BH03: $BH03
                BH03Ameliorate: $BH03Ameliorate
                BH04: $BH04
                BH04Ameliorate: $BH04Ameliorate
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
    onItems: Record<onKeys, IPipeDistructItem> = {
        BH01: {
            ameliorate: 'BH01Ameliorate',
            content:
                '舊電力、化學或氣體管線拆除前，確認管內已無殘留危害物程序。',
        },
        BH02: {
            ameliorate: 'BH02Ameliorate',
            content: '管線清洗、拆離前，人員確實穿著防護用具。',
        },
        BH03: {
            ameliorate: 'BH03Ameliorate',
            content: '作業時，主管在現場場督導。',
        },
        BH04: {
            ameliorate: 'BH04Ameliorate',
            content: '管路拆除範圍，有防止非相關人員進入之標示及管制措施。',
        },
    };
    offItems: Record<offKeys, IPipeDistructItem> = {
        AA16: {
            ameliorate: 'AA16Ameliorate',
            content: '已復原安全設施(如：安全網、平台護欄….等)。',
        },
        AA19: {
            ameliorate: 'AA19Ameliorate',
            content: '下班收工後已將電氣設備、氣體鋼瓶關閉。',
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

    getInitialValues(): IPipeDistructOpCheck {
        const base = super.getInitialValues();
        return {
            ...base,
            BH01: undefined,
            BH02: undefined,
            BH03: undefined,
            BH04: undefined,
            BH01Ameliorate: '',
            BH02Ameliorate: '',
            BH03Ameliorate: '',
            BH04Ameliorate: '',
            AA16: undefined,
            AA19: undefined,
            AB01: undefined,
            AB02: undefined,
            AB03: undefined,
            AB04: undefined,
            AB05: undefined,
            AB06: undefined,
            AA16Ameliorate: '',
            AA19Ameliorate: '',
            AB01Ameliorate: '',
            AB02Ameliorate: '',
            AB03Ameliorate: '',
            AB04Ameliorate: '',
            AB05Ameliorate: '',
            AB06Ameliorate: '',
        };
    }
}
