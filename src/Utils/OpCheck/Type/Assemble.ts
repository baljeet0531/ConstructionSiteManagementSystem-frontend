import { gql } from '@apollo/client';
import {
    IOpCheckFillItem,
    SignatureName,
} from '../../../Interface/OpCheck/Common';
import {
    IAssembleOpCheck,
    offKeys,
    onKeys,
} from '../../../Interface/OpCheck/Assemble';
import { SignatureStateItem } from '../../../Interface/Signature';
import { SIGNATURE_FIELDS } from '../../GQLFragments';
import { OpCheckHandler } from '../Handler';

interface IAssembleItem extends IOpCheckFillItem {
    ameliorate: keyof IAssembleOpCheck;
}

export class AssembleOpCheckHandler extends OpCheckHandler {
    queryName = 'assembleOpCheck';
    query = gql`
        ${SIGNATURE_FIELDS}
        query assembleOpCheck($siteId: String!, $number: String) {
            assembleOpCheck(siteId: $siteId, number: $number) {
                siteId
                number
                area
                zone
                department
                day
                BG01
                BG02
                BG03
                BG04
                BG05
                BG06
                BG07
                BG01Ameliorate
                BG02Ameliorate
                BG03Ameliorate
                BG04Ameliorate
                BG05Ameliorate
                BG06Ameliorate
                BG07Ameliorate
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
    mutationName = 'updateOpAssemble';
    mutation = gql`
        mutation updateOpAssemble(
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
            $BG01: Boolean
            $BG01Ameliorate: String
            $BG02: Boolean
            $BG02Ameliorate: String
            $BG03: Boolean
            $BG03Ameliorate: String
            $BG04: Boolean
            $BG04Ameliorate: String
            $BG05: Boolean
            $BG05Ameliorate: String
            $BG06: Boolean
            $BG06Ameliorate: String
            $BG07: Boolean
            $BG07Ameliorate: String
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
            updateOpAssemble(
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
                BG01: $BG01
                BG01Ameliorate: $BG01Ameliorate
                BG02: $BG02
                BG02Ameliorate: $BG02Ameliorate
                BG03: $BG03
                BG03Ameliorate: $BG03Ameliorate
                BG04: $BG04
                BG04Ameliorate: $BG04Ameliorate
                BG05: $BG05
                BG05Ameliorate: $BG05Ameliorate
                BG06: $BG06
                BG06Ameliorate: $BG06Ameliorate
                BG07: $BG07
                BG07Ameliorate: $BG07Ameliorate
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
    onItems: Record<onKeys, IAssembleItem> = {
        BG01: { ameliorate: 'BG01Ameliorate', content: '施工架組配作業主管於現場全程監督作業安全。' },
        BG02: { ameliorate: 'BG02Ameliorate', content: '施工架組配之基腳無沈陷之虞。' },
        BG03: { ameliorate: 'BG03Ameliorate', content: '遇地震時立即停止作業，使人員退避至安全避難場所。' },
        BG04: { ameliorate: 'BG04Ameliorate', content: '地震或地質變化後，徹底檢查施工架後再行作業。' },
        BG05: { ameliorate: 'BG05Ameliorate', content: '確實完成組配施工架之安全設備（如插銷、交叉連桿等）。' },
        BG06: { ameliorate: 'BG06Ameliorate', content: '施工架組配物料運送前確實綁紮，無掉落之虞。' },
        BG07: { ameliorate: 'BG07Ameliorate', content: '施工架組配作業靠近電線、輸配電設備，有護圍、絕緣或掩蔽。' },
    };

    offItems: Record<offKeys, IAssembleItem> = {
        AA19: { ameliorate: 'AA19Ameliorate', content: '下班收工後已將電氣設備、氣體鋼瓶關閉。' },
        AA22: { ameliorate: 'AA22Ameliorate', content: '已復原安全設施(如：安全網、平台護欄….等) 。' },
        AB01: { ameliorate: 'AB01Ameliorate', content: '每日工程收工前，整理現場、收拾工具，使之恢復正常狀況。' },
        AB02: { ameliorate: 'AB02Ameliorate', content: '每日工作後，將自動昇降機、A字梯、施工架等歸回定位。' },
        AB03: { ameliorate: 'AB03Ameliorate', content: '每日工作後，將作業平台上工具及施工物件、材料等收拾完成。' },
        AB04: { ameliorate: 'AB04Ameliorate', content: '庫存區、預置區、堆放區之機具、材料已分類、標示，廢棄物當日清除。' },
        AB05: { ameliorate: 'AB05Ameliorate', content: '每日收工前將物料、工具置於暫存區並將當日垃圾清理乾淨。' },
        AB06: { ameliorate: 'AB06Ameliorate', content: '生活廢棄物依照各區垃圾分類規定丟棄於各分類垃圾桶內。' },
    };

    constructor(
        siteId: string,
        number: string,
        signatures: Record<SignatureName, SignatureStateItem>
    ) {
        super(siteId, number, signatures);
    }

    getInitialValues(): IAssembleOpCheck {
        const base = super.getInitialValues();
        return {
            ...base,
            BG01: undefined,
            BG02: undefined,
            BG03: undefined,
            BG04: undefined,
            BG05: undefined,
            BG06: undefined,
            BG07: undefined,
            BG01Ameliorate: '',
            BG02Ameliorate: '',
            BG03Ameliorate: '',
            BG04Ameliorate: '',
            BG05Ameliorate: '',
            BG06Ameliorate: '',
            BG07Ameliorate: '',
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
