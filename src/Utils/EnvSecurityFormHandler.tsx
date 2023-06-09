import {
    gqlSignatureColNames,
    IGQLOpCheck,
    signatureColNames,
    SignatureName,
} from '../Interface/OpCheck/Common';
import {
    convertSignature,
    getSignature,
    IGQLSignature,
    ISignature,
    SignatureStateItem,
} from '../Interface/Signature';
import {
    IEnvSecurityForm,
    IEnvSecurityItem,
    IGQLEnvSecurityForm,
    onKeys,
    offKeys,
    onKeyList,
    offKeyList,
} from '../Interface/EnvSecurityForm';
import { gql } from '@apollo/client';
import { SIGNATURE_FIELDS } from './GQLFragments';
import { FormikErrors } from 'formik';

export class EnvSecurityFormHandler {
    siteId: string;
    number: string;
    signatures: Record<SignatureName, SignatureStateItem>;
    queryName = 'envSecurityCheck';
    query = gql`
        ${SIGNATURE_FIELDS}
        query envSecurityCheck($siteId: String!, $number: String) {
            envSecurityCheck(siteId: $siteId, number: $number) {
                siteId
                number
                department
                area
                zone
                day
                AA01
                AA02
                AA03
                AA04
                AA05
                AA06
                AA07
                AA08
                AA09
                AA10
                AA11
                AA12
                AA13
                AA14
                AA15
                AA16
                AA17
                AA18
                AA19
                AA20
                AA21
                AA22
                AB01
                AB02
                AB03
                AB04
                AB05
                AB06
                AC01
                AC02
                AC03
                AD01
                AD02
                AD03
                AD04
                AD05
                AD06
                AD07
                AD08
                AE01
                AE02
                AE03
                AE04
                AE05
                AE06
                AE07
                AF01
                AF02
                AF03
                AF04
                AA01Ameliorate
                AA02Ameliorate
                AA03Ameliorate
                AA04Ameliorate
                AA05Ameliorate
                AA06Ameliorate
                AA07Ameliorate
                AA08Ameliorate
                AA09Ameliorate
                AA10Ameliorate
                AA11Ameliorate
                AA12Ameliorate
                AA13Ameliorate
                AA14Ameliorate
                AA15Ameliorate
                AA16Ameliorate
                AA17Ameliorate
                AA18Ameliorate
                AA19Ameliorate
                AA20Ameliorate
                AA21Ameliorate
                AA22Ameliorate
                AB01Ameliorate
                AB02Ameliorate
                AB03Ameliorate
                AB04Ameliorate
                AB05Ameliorate
                AB06Ameliorate
                AC01Ameliorate
                AC02Ameliorate
                AC03Ameliorate
                AD01Ameliorate
                AD02Ameliorate
                AD03Ameliorate
                AD04Ameliorate
                AD05Ameliorate
                AD06Ameliorate
                AD07Ameliorate
                AD08Ameliorate
                AE01Ameliorate
                AE02Ameliorate
                AE03Ameliorate
                AE04Ameliorate
                AE05Ameliorate
                AE06Ameliorate
                AE07Ameliorate
                AF01Ameliorate
                AF02Ameliorate
                AF03Ameliorate
                AF04Ameliorate
                supervisorBefore
                staffBefore
                timeBefore
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
    mutationName = 'updateEnvSecurityCheck';
    mutation = gql`
        mutation updateEnvSecurityCheck(
            $AA01: Boolean
            $AA01Ameliorate: String
            $AA02: Boolean
            $AA02Ameliorate: String
            $AA03: Boolean
            $AA03Ameliorate: String
            $AA04: Boolean
            $AA04Ameliorate: String
            $AA05: Boolean
            $AA05Ameliorate: String
            $AA06: Boolean
            $AA06Ameliorate: String
            $AA07: Boolean
            $AA07Ameliorate: String
            $AA08: Boolean
            $AA08Ameliorate: String
            $AA09: Boolean
            $AA09Ameliorate: String
            $AA10: Boolean
            $AA10Ameliorate: String
            $AA11: Boolean
            $AA11Ameliorate: String
            $AA12: Boolean
            $AA12Ameliorate: String
            $AA13: Boolean
            $AA13Ameliorate: String
            $AA14: Boolean
            $AA14Ameliorate: String
            $AA15: Boolean
            $AA15Ameliorate: String
            $AA16: Boolean
            $AA16Ameliorate: String
            $AA17: Boolean
            $AA17Ameliorate: String
            $AA18: Boolean
            $AA18Ameliorate: String
            $AA19: Boolean
            $AA19Ameliorate: String
            $AA20: Boolean
            $AA20Ameliorate: String
            $AA21: Boolean
            $AA21Ameliorate: String
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
            $AC01: Boolean
            $AC01Ameliorate: String
            $AC02: Boolean
            $AC02Ameliorate: String
            $AC03: Boolean
            $AC03Ameliorate: String
            $AD01: Boolean
            $AD01Ameliorate: String
            $AD02: Boolean
            $AD02Ameliorate: String
            $AD03: Boolean
            $AD03Ameliorate: String
            $AD04: Boolean
            $AD04Ameliorate: String
            $AD05: Boolean
            $AD05Ameliorate: String
            $AD06: Boolean
            $AD06Ameliorate: String
            $AD07: Boolean
            $AD07Ameliorate: String
            $AD08: Boolean
            $AD08Ameliorate: String
            $AE01: Boolean
            $AE01Ameliorate: String
            $AE02: Boolean
            $AE02Ameliorate: String
            $AE03: Boolean
            $AE03Ameliorate: String
            $AE04: Boolean
            $AE04Ameliorate: String
            $AE05: Boolean
            $AE05Ameliorate: String
            $AE06: Boolean
            $AE06Ameliorate: String
            $AE07: Boolean
            $AE07Ameliorate: String
            $AF01: Boolean
            $AF01Ameliorate: String
            $AF02: Boolean
            $AF02Ameliorate: String
            $AF03: Boolean
            $AF03Ameliorate: String
            $AF04: Boolean
            $AF04Ameliorate: String
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
            updateEnvSecurityCheck(
                AA01: $AA01
                AA01Ameliorate: $AA01Ameliorate
                AA02: $AA02
                AA02Ameliorate: $AA02Ameliorate
                AA03: $AA03
                AA03Ameliorate: $AA03Ameliorate
                AA04: $AA04
                AA04Ameliorate: $AA04Ameliorate
                AA05: $AA05
                AA05Ameliorate: $AA05Ameliorate
                AA06: $AA06
                AA06Ameliorate: $AA06Ameliorate
                AA07: $AA07
                AA07Ameliorate: $AA07Ameliorate
                AA08: $AA08
                AA08Ameliorate: $AA08Ameliorate
                AA09: $AA09
                AA09Ameliorate: $AA09Ameliorate
                AA10: $AA10
                AA10Ameliorate: $AA10Ameliorate
                AA11: $AA11
                AA11Ameliorate: $AA11Ameliorate
                AA12: $AA12
                AA12Ameliorate: $AA12Ameliorate
                AA13: $AA13
                AA13Ameliorate: $AA13Ameliorate
                AA14: $AA14
                AA14Ameliorate: $AA14Ameliorate
                AA15: $AA15
                AA15Ameliorate: $AA15Ameliorate
                AA16: $AA16
                AA16Ameliorate: $AA16Ameliorate
                AA17: $AA17
                AA17Ameliorate: $AA17Ameliorate
                AA18: $AA18
                AA18Ameliorate: $AA18Ameliorate
                AA19: $AA19
                AA19Ameliorate: $AA19Ameliorate
                AA20: $AA20
                AA20Ameliorate: $AA20Ameliorate
                AA21: $AA21
                AA21Ameliorate: $AA21Ameliorate
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
                AC01: $AC01
                AC01Ameliorate: $AC01Ameliorate
                AC02: $AC02
                AC02Ameliorate: $AC02Ameliorate
                AC03: $AC03
                AC03Ameliorate: $AC03Ameliorate
                AD01: $AD01
                AD01Ameliorate: $AD01Ameliorate
                AD02: $AD02
                AD02Ameliorate: $AD02Ameliorate
                AD03: $AD03
                AD03Ameliorate: $AD03Ameliorate
                AD04: $AD04
                AD04Ameliorate: $AD04Ameliorate
                AD05: $AD05
                AD05Ameliorate: $AD05Ameliorate
                AD06: $AD06
                AD06Ameliorate: $AD06Ameliorate
                AD07: $AD07
                AD07Ameliorate: $AD07Ameliorate
                AD08: $AD08
                AD08Ameliorate: $AD08Ameliorate
                AE01: $AE01
                AE01Ameliorate: $AE01Ameliorate
                AE02: $AE02
                AE02Ameliorate: $AE02Ameliorate
                AE03: $AE03
                AE03Ameliorate: $AE03Ameliorate
                AE04: $AE04
                AE04Ameliorate: $AE04Ameliorate
                AE05: $AE05
                AE05Ameliorate: $AE05Ameliorate
                AE06: $AE06
                AE06Ameliorate: $AE06Ameliorate
                AE07: $AE07
                AE07Ameliorate: $AE07Ameliorate
                AF01: $AF01
                AF01Ameliorate: $AF01Ameliorate
                AF02: $AF02
                AF02Ameliorate: $AF02Ameliorate
                AF03: $AF03
                AF03Ameliorate: $AF03Ameliorate
                AF04: $AF04
                AF04Ameliorate: $AF04Ameliorate
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
    onItems: Record<onKeys, IEnvSecurityItem> = {
        AA01: {
            ameliorate: 'AA01Ameliorate',
            content: '進入施工區域已正確配戴安全帽並扣上帽帶。',
        },
        AA02: {
            ameliorate: 'AA02Ameliorate',
            content: '穿著及膝之長褲及覆肩之上衣。',
        },
        AA03: {
            ameliorate: 'AA03Ameliorate',
            content: '人員無嚼食檳榔、追逐嬉戲、賭博、打架等行為。',
        },
        AA04: {
            ameliorate: 'AA04Ameliorate',
            content: '人員未攜帶或飲用含酒精性飲料。',
        },
        AA05: {
            ameliorate: 'AA05Ameliorate',
            content: '未攜帶管制物品(如：照相機、NOTEBOOK、磁片、打火機…等)。',
        },
        AA06: {
            ameliorate: 'AA06Ameliorate',
            content: '施工人員無酒醉、吸毒或精神不能集中等異常現象。',
        },
        AA08: {
            ameliorate: 'AA08Ameliorate',
            content:
                '施工區、預置區、堆放區已設置圍籬及標示廠商名稱、連絡人及電話。',
        },
        AA07: {
            ameliorate: 'AA07Ameliorate',
            content: '現場地面放置工具、物料已舖設塑膠布或不鏽鋼板。',
        },
        AA09: {
            ameliorate: 'AA09Ameliorate',
            content:
                '未在樓梯、通道上、緊急疏散路線、沖身洗眼器、逃生門以及緊急應變用品櫃附近，堆放機具、材料者。',
        },
        AA10: {
            ameliorate: 'AA10Ameliorate',
            content: '將工具、材料置於安全處。',
        },
        AA11: {
            ameliorate: 'AA11Ameliorate',
            content: '於指定區域用餐、飲食、休息。',
        },
        AA12: { ameliorate: 'AA12Ameliorate', content: '於指定地點抽煙。' },
        AA13: {
            ameliorate: 'AA13Ameliorate',
            content: '車輛持有通行證、依規定停放、未阻礙通道。',
        },
        AA14: {
            ameliorate: 'AA14Ameliorate',
            content: '行車未超過速限/未逆向行駛。',
        },
        AA15: {
            ameliorate: 'AA15Ameliorate',
            content:
                '未任意拆除或挪用機電設備、警告標誌、防護設備、消防設施(含消防管或滅火器移做他用)….等。',
        },
        AA16: {
            ameliorate: 'AA16Ameliorate',
            content: '已申請拆除安全設施(如：安全網、平台護欄….等)。',
        },
        AA17: {
            ameliorate: 'AA17Ameliorate',
            content:
                '施工現場已無其他方式須直接踐踏機台、管路等，且已事先向管理單位申請許可。',
        },
        AA18: {
            ameliorate: 'AA18Ameliorate',
            content: '轉動任一管路之閥類開關或電氣開關前已通知相關負責人員。',
        },
        AA20: {
            ameliorate: 'AA20Ameliorate',
            content: '現場作業時正確配帶個人防護具。',
        },
        AA21: { ameliorate: 'AA21Ameliorate', content: '未在廠內隨地便溺。' },
        AC01: {
            ameliorate: 'AC01Ameliorate',
            content: '作業許可證或其他規定表格標示於現場明顯處。',
        },
        AC02: {
            ameliorate: 'AC02Ameliorate',
            content: '實施作業自主檢點或機具檢點、檢查。',
        },
        AC03: {
            ameliorate: 'AC03Ameliorate',
            content: '進行切管、修改等作業前，已經管理單位、人員確認無誤。',
        },
        AD01: {
            ameliorate: 'AD01Ameliorate',
            content: '施工人員正確配戴識別證及穿著施工背心。',
        },
        AD02: {
            ameliorate: 'AD02Ameliorate',
            content: '入廠施工人員依規定接受相關工安訓練課程。',
        },
        AD03: {
            ameliorate: 'AD03Ameliorate',
            content: '人員未持來賓證進入廠區施作。',
        },
        AD04: {
            ameliorate: 'AD04Ameliorate',
            content: '證件未借與他人或未冒用他人證件進出廠區。',
        },
        AD05: {
            ameliorate: 'AD05Ameliorate',
            content: '證件未借與他人或未冒用他人證件進出廠區。',
        },
        AD06: {
            ameliorate: 'AD06Ameliorate',
            content: '未出入非經許可之區域(依識別證門禁區域判別)。',
        },
        AD07: {
            ameliorate: 'AD07Ameliorate',
            content: '未於非緊急狀態違規打開或進出安全門。',
        },
        AD08: {
            ameliorate: 'AD08Ameliorate',
            content: '未闖越簽到、讀卡、換證等門禁管制區域。',
        },
        AE01: { ameliorate: 'AE01Ameliorate', content: '符合無塵室穿著規定。' },
        AE02: {
            ameliorate: 'AE02Ameliorate',
            content: '設備材料機具進入無塵室，已擦拭乾淨及存放於規定區域。',
        },
        AE03: {
            ameliorate: 'AE03Ameliorate',
            content: '於無塵室施工已做好潔淨措施。',
        },
        AE04: {
            ameliorate: 'AE04Ameliorate',
            content: '施工時人員未直接坐於地面上。',
        },
        AE05: { ameliorate: 'AE05Ameliorate', content: '未嚼食口香糖。' },
        AE06: {
            ameliorate: 'AE06Ameliorate',
            content:
                '未攜帶管制物品(如：照相機、NOTEBOOK、磁片、鉛筆、非無塵紙、立可白、紙箱、行動電話、打火機…等)。',
        },
        AE07: {
            ameliorate: 'AE07Ameliorate',
            content: '遵守其他無塵室相關規定。',
        },
        AF01: {
            ameliorate: 'AF01Ameliorate',
            content: '遵守每日出工人員簽到規定。',
        },
        AF02: { ameliorate: 'AF02Ameliorate', content: '依規定繳交相關文件。' },
        AF03: {
            ameliorate: 'AF03Ameliorate',
            content: '出席『供應商安全衛生會議』。',
        },
        AF04: {
            ameliorate: 'AF04Ameliorate',
            content: '遵守其他安全、管理相關規定。',
        },
    };
    offItems: Record<offKeys, IEnvSecurityItem> = {
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
        this.siteId = siteId;
        this.number = number;
        this.signatures = signatures;
    }

    getInitialValues(): IEnvSecurityForm {
        return {
            siteId: this.siteId,
            number: this.number,
            area: '',
            zone: '',
            department: '',
            day: '',
            supervisorBefore: undefined,
            staffBefore: undefined,
            timeBefore: undefined,
            supervisorAfter: undefined,
            staffAfter: undefined,
            timeAfter: undefined,
            AA01: null,
            AA02: null,
            AA03: null,
            AA04: null,
            AA05: null,
            AA06: null,
            AA07: null,
            AA08: null,
            AA09: null,
            AA10: null,
            AA11: null,
            AA12: null,
            AA13: null,
            AA14: null,
            AA15: null,
            AA16: null,
            AA17: null,
            AA18: null,
            AA19: null,
            AA20: null,
            AA21: null,
            AA22: null,
            AB01: null,
            AB02: null,
            AB03: null,
            AB04: null,
            AB05: null,
            AB06: null,
            AC01: null,
            AC02: null,
            AC03: null,
            AD01: null,
            AD02: null,
            AD03: null,
            AD04: null,
            AD05: null,
            AD06: null,
            AD07: null,
            AD08: null,
            AE01: null,
            AE02: null,
            AE03: null,
            AE04: null,
            AE05: null,
            AE06: null,
            AE07: null,
            AF01: null,
            AF02: null,
            AF03: null,
            AF04: null,
            AA01Ameliorate: '',
            AA02Ameliorate: '',
            AA03Ameliorate: '',
            AA04Ameliorate: '',
            AA05Ameliorate: '',
            AA06Ameliorate: '',
            AA07Ameliorate: '',
            AA08Ameliorate: '',
            AA09Ameliorate: '',
            AA10Ameliorate: '',
            AA11Ameliorate: '',
            AA12Ameliorate: '',
            AA13Ameliorate: '',
            AA14Ameliorate: '',
            AA15Ameliorate: '',
            AA16Ameliorate: '',
            AA17Ameliorate: '',
            AA18Ameliorate: '',
            AA19Ameliorate: '',
            AA20Ameliorate: '',
            AA21Ameliorate: '',
            AA22Ameliorate: '',
            AB01Ameliorate: '',
            AB02Ameliorate: '',
            AB03Ameliorate: '',
            AB04Ameliorate: '',
            AB05Ameliorate: '',
            AB06Ameliorate: '',
            AC01Ameliorate: '',
            AC02Ameliorate: '',
            AC03Ameliorate: '',
            AD01Ameliorate: '',
            AD02Ameliorate: '',
            AD03Ameliorate: '',
            AD04Ameliorate: '',
            AD05Ameliorate: '',
            AD06Ameliorate: '',
            AD07Ameliorate: '',
            AD08Ameliorate: '',
            AE01Ameliorate: '',
            AE02Ameliorate: '',
            AE03Ameliorate: '',
            AE04Ameliorate: '',
            AE05Ameliorate: '',
            AE06Ameliorate: '',
            AE07Ameliorate: '',
            AF01Ameliorate: '',
            AF02Ameliorate: '',
            AF03Ameliorate: '',
            AF04Ameliorate: '',
        };
    }

    parse(data: IGQLEnvSecurityForm[]): IEnvSecurityForm | undefined {
        if (!data[0]) return;
        const t = { ...data[0] };

        for (let i = 0; i < signatureColNames.length; i++) {
            const key = signatureColNames[i];
            const [, setSignature] = this.signatures[key];
            const GQLkey = gqlSignatureColNames[i] as keyof IGQLOpCheck;
            const GQLsign = t[GQLkey] as IGQLSignature | undefined;
            if (GQLsign) {
                getSignature(GQLsign).then((item) => {
                    setSignature(item);
                });
            }
        }

        if (!t.area) t.area = '';
        if (!t.zone) t.zone = '';
        if (!t.department) t.department = '';

        return t;
    }

    marshal(submitValues: IEnvSecurityForm) {
        if (this.signatures.staffBefore[0]?.time) {
            submitValues.timeBefore =
                this.signatures.staffBefore[0].time.format(
                    'YYYY-MM-DDTHH:mm:ss'
                );
        }
        if (this.signatures.staffAfter[0]?.time) {
            submitValues.timeAfter = this.signatures.staffAfter[0].time.format(
                'YYYY-MM-DDTHH:mm:ss'
            );
        }

        let key: keyof Record<SignatureName, SignatureStateItem>;
        for (key in this.signatures) {
            const [signature] = this.signatures[key];
            submitValues[key] = convertSignature(signature) as ISignature;
        }
    }

    validate(values: IEnvSecurityForm) {
        const errors: FormikErrors<IEnvSecurityForm> = {};
        const filledOffKeys = [];
        for (let key of onKeyList) {
            if (values[key] === null) {
                errors[key] = '必填';
            }
        }
        for (let key of offKeyList) {
            filledOffKeys.push(values[key]);
        }

        if (filledOffKeys.some((key) => key === true || key === false)) {
            for (let key of offKeyList) {
                if (values[key] === null) {
                    errors[key] = '必填';
                }
            }
        }
        return errors;
    }
}
