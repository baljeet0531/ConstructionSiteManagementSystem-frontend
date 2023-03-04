import { gql } from '@apollo/client';
import {
    IOpCheckFillItem,
    SignatureName,
} from '../../../Interface/OpCheck/Common';
import { ILiftOpCheck, offKeys, onKeys } from '../../../Interface/OpCheck/Lift';
import { SignatureStateItem } from '../../../Interface/Signature';
import { SIGNATURE_FIELDS } from '../../GQLFragments';
import { OpCheckHandler } from '../Handler';

interface ILiftItem extends IOpCheckFillItem {
    ameliorate: keyof ILiftOpCheck;
}

export class LiftOpCheckHandler extends OpCheckHandler {
    queryName = 'liftOpCheck';
    query = gql`
        ${SIGNATURE_FIELDS}
        query liftOpCheck($siteId: String!, $number: String) {
            liftOpCheck(siteId: $siteId, number: $number) {
                siteId
                number
                area
                zone
                department
                day
                BF01
                BF02
                BF03
                BF04
                BF05
                BF06
                BF07
                BF08
                BF09
                BF10
                BF11
                BF01Ameliorate
                BF02Ameliorate
                BF03Ameliorate
                BF04Ameliorate
                BF05Ameliorate
                BF06Ameliorate
                BF07Ameliorate
                BF08Ameliorate
                BF09Ameliorate
                BF10Ameliorate
                BF11Ameliorate
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
    mutationName = 'updateOpLift';
    mutation = gql`
        mutation updateOpLift(
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
            $BF01: Boolean
            $BF01Ameliorate: String
            $BF02: Boolean
            $BF02Ameliorate: String
            $BF03: Boolean
            $BF03Ameliorate: String
            $BF04: Boolean
            $BF04Ameliorate: String
            $BF05: Boolean
            $BF05Ameliorate: String
            $BF06: Boolean
            $BF06Ameliorate: String
            $BF07: Boolean
            $BF07Ameliorate: String
            $BF08: Boolean
            $BF08Ameliorate: String
            $BF09: Boolean
            $BF09Ameliorate: String
            $BF10: Boolean
            $BF10Ameliorate: String
            $BF11: Boolean
            $BF11Ameliorate: String
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
            updateOpLift(
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
                BF01: $BF01
                BF01Ameliorate: $BF01Ameliorate
                BF02: $BF02
                BF02Ameliorate: $BF02Ameliorate
                BF03: $BF03
                BF03Ameliorate: $BF03Ameliorate
                BF04: $BF04
                BF04Ameliorate: $BF04Ameliorate
                BF05: $BF05
                BF05Ameliorate: $BF05Ameliorate
                BF06: $BF06
                BF06Ameliorate: $BF06Ameliorate
                BF07: $BF07
                BF07Ameliorate: $BF07Ameliorate
                BF08: $BF08
                BF08Ameliorate: $BF08Ameliorate
                BF09: $BF09
                BF09Ameliorate: $BF09Ameliorate
                BF10: $BF10
                BF10Ameliorate: $BF10Ameliorate
                BF11: $BF11
                BF11Ameliorate: $BF11Ameliorate
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
    onItems: Record<onKeys, ILiftItem> = {
        BF01: {
            ameliorate: 'BF01Ameliorate',
            content: '於吊掛現場設置警告標誌且有專人管制人員通行。',
        },
        BF02: {
            ameliorate: 'BF02Ameliorate',
            content: '使用之起重機具經檢查合格取得檢查合格證。',
        },
        BF03: {
            ameliorate: 'BF03Ameliorate',
            content: '起重機具標示最高負荷，且未超過此項限制。',
        },
        BF04: {
            ameliorate: 'BF04Ameliorate',
            content: '起重機具之吊鉤，有防止吊舉中所吊物體脫落之安全防滑舌片。',
        },
        BF05: {
            ameliorate: 'BF05Ameliorate',
            content: '設置/使用過捲揚預防裝置。',
        },
        BF06: {
            ameliorate: 'BF06Ameliorate',
            content: '作業現場有一人以上執行吊掛指揮、督導。',
        },
        BF07: {
            ameliorate: 'BF07Ameliorate',
            content: '人員未由吊掛現場下方通過。',
        },
        BF08: {
            ameliorate: 'BF08Ameliorate',
            content: '使用、操作危險性機械設備，持有合格操作證照。',
        },
        BF09: { ameliorate: 'BF09Ameliorate', content: '實施作業前檢點。' },
        BF10: {
            ameliorate: 'BF10Ameliorate',
            content: '機械運轉時有警示燈或蜂鳴裝置。',
        },
        BF11: {
            ameliorate: 'BF11Ameliorate',
            content: '未以起重機或吊掛機為人員升降工具。',
        },
    };
    offItems: Record<offKeys, ILiftItem> = {
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
    }

    getInitialValues(): ILiftOpCheck {
        const base = super.getInitialValues();
        return {
            ...base,
            BF01: undefined,
            BF02: undefined,
            BF03: undefined,
            BF04: undefined,
            BF05: undefined,
            BF06: undefined,
            BF07: undefined,
            BF08: undefined,
            BF09: undefined,
            BF10: undefined,
            BF11: undefined,
            BF01Ameliorate: '',
            BF02Ameliorate: '',
            BF03Ameliorate: '',
            BF04Ameliorate: '',
            BF05Ameliorate: '',
            BF06Ameliorate: '',
            BF07Ameliorate: '',
            BF08Ameliorate: '',
            BF09Ameliorate: '',
            BF10Ameliorate: '',
            BF11Ameliorate: '',
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
