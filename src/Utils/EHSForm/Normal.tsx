import { gql } from '@apollo/client';
import {
    IEHSFormFillItem,
} from '../../Interface/EHSForm/Common';
import { IEHSFormNormal, NormalGroupKey } from '../../Interface/EHSForm/Normal';
import {
    EHSFORM_SIGNATURE_FIELDS,
    EHSFORM_IN_ITEM_FIELDS,
} from '../GQLFragments';
import { EHSFormHandler } from './Handler';
import {
    ObjectSignatureStateItem,
    SignatureStateItem,
} from '../../Interface/Signature';

interface IEHSFormNormalItem extends IEHSFormFillItem {
    normal: keyof IEHSFormNormal;
    misfit: keyof IEHSFormNormal;
    ameliorate: keyof IEHSFormNormal;
}

interface IEHSFormNormalGroup {
    name: string;
    items: IEHSFormNormalItem[];
}

export class EHSFormNormalHandler extends EHSFormHandler<IEHSFormNormal> {
    queryName = 'EHSFormNormal';
    query = gql`
        ${EHSFORM_SIGNATURE_FIELDS}
        ${EHSFORM_IN_ITEM_FIELDS}
        query EHSFormNormal($siteId: String!, $day: Date, $role: String) {
            searchName(siteId: $siteId, role: $role)
            EHSFormNormal(siteId: $siteId, day: $day) {
                siteId
                day
                checkDept
                checkStaff
                checkTarget {
                    siteId
                    day
                    corpName
                }
                location
                responsibleUnitSignature {
                    ...gqlEHSFormSignatureFields
                }
                supervisorUnitSignature {
                    ...gqlEHSFormSignatureFields
                }
                AA01Normal
                AA02Normal
                AA03Normal
                AA04Normal
                AA05Normal
                AA06Normal
                AA07Normal
                AA08Normal
                AA09Normal
                AA10Normal
                AA11Normal
                AA12Normal
                AA13Normal
                AA14Normal
                AA15Normal
                AA16Normal
                AA17Normal
                AA18Normal
                AA19Normal
                AA20Normal
                AA21Normal
                AA22Normal
                AB01Normal
                AB02Normal
                AB03Normal
                AB04Normal
                AB05Normal
                AB06Normal
                AC01Normal
                AC02Normal
                AC03Normal
                AD01Normal
                AD02Normal
                AD03Normal
                AD04Normal
                AD05Normal
                AD06Normal
                AD07Normal
                AD08Normal
                AE01Normal
                AE02Normal
                AE03Normal
                AE04Normal
                AE05Normal
                AE06Normal
                AE07Normal
                AF01Normal
                AF02Normal
                AF03Normal
                AF04Normal
                AA01Misfit
                AA02Misfit
                AA03Misfit
                AA04Misfit
                AA05Misfit
                AA06Misfit
                AA07Misfit
                AA08Misfit
                AA09Misfit
                AA10Misfit
                AA11Misfit
                AA12Misfit
                AA13Misfit
                AA14Misfit
                AA15Misfit
                AA16Misfit
                AA17Misfit
                AA18Misfit
                AA19Misfit
                AA20Misfit
                AA21Misfit
                AA22Misfit
                AB01Misfit
                AB02Misfit
                AB03Misfit
                AB04Misfit
                AB05Misfit
                AB06Misfit
                AC01Misfit
                AC02Misfit
                AC03Misfit
                AD01Misfit
                AD02Misfit
                AD03Misfit
                AD04Misfit
                AD05Misfit
                AD06Misfit
                AD07Misfit
                AD08Misfit
                AE01Misfit
                AE02Misfit
                AE03Misfit
                AE04Misfit
                AE05Misfit
                AE06Misfit
                AE07Misfit
                AF01Misfit
                AF02Misfit
                AF03Misfit
                AF04Misfit
                AA01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA06Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA07Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA08Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA09Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA10Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA11Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA12Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA13Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA14Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA15Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA16Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA17Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA18Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA19Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA20Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA21Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AA22Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AB01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AB02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AB03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AB04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AB05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AB06Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AC01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AC02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AC03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AD01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AD02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AD03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AD04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AD05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AD06Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AD07Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AD08Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AE01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AE02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AE03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AE04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AE05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AE06Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AE07Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AF01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AF02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AF03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                AF04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
            }
        }
    `;
    mutationName = 'updateEHSFormNormal';
    mutation = gql`
        mutation updateEHSFormNormal(
            $AA01Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA01Misfit: Boolean
            $AA01Normal: Boolean
            $AA02Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA02Misfit: Boolean
            $AA02Normal: Boolean
            $AA03Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA03Misfit: Boolean
            $AA03Normal: Boolean
            $AA04Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA04Misfit: Boolean
            $AA04Normal: Boolean
            $AA05Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA05Misfit: Boolean
            $AA05Normal: Boolean
            $AA06Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA06Misfit: Boolean
            $AA06Normal: Boolean
            $AA07Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA07Misfit: Boolean
            $AA07Normal: Boolean
            $AA08Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA08Misfit: Boolean
            $AA08Normal: Boolean
            $AA09Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA09Misfit: Boolean
            $AA09Normal: Boolean
            $AA10Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA10Misfit: Boolean
            $AA10Normal: Boolean
            $AA11Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA11Misfit: Boolean
            $AA11Normal: Boolean
            $AA12Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA12Misfit: Boolean
            $AA12Normal: Boolean
            $AA13Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA13Misfit: Boolean
            $AA13Normal: Boolean
            $AA14Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA14Misfit: Boolean
            $AA14Normal: Boolean
            $AA15Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA15Misfit: Boolean
            $AA15Normal: Boolean
            $AA16Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA16Misfit: Boolean
            $AA16Normal: Boolean
            $AA17Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA17Misfit: Boolean
            $AA17Normal: Boolean
            $AA18Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA18Misfit: Boolean
            $AA18Normal: Boolean
            $AA19Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA19Misfit: Boolean
            $AA19Normal: Boolean
            $AA20Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA20Misfit: Boolean
            $AA20Normal: Boolean
            $AA21Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA21Misfit: Boolean
            $AA21Normal: Boolean
            $AA22Ameliorate: [gqlEHSFormTargetInItemInput]
            $AA22Misfit: Boolean
            $AA22Normal: Boolean
            $AB01Ameliorate: [gqlEHSFormTargetInItemInput]
            $AB01Misfit: Boolean
            $AB01Normal: Boolean
            $AB02Ameliorate: [gqlEHSFormTargetInItemInput]
            $AB02Misfit: Boolean
            $AB02Normal: Boolean
            $AB03Ameliorate: [gqlEHSFormTargetInItemInput]
            $AB03Misfit: Boolean
            $AB03Normal: Boolean
            $AB04Ameliorate: [gqlEHSFormTargetInItemInput]
            $AB04Misfit: Boolean
            $AB04Normal: Boolean
            $AB05Ameliorate: [gqlEHSFormTargetInItemInput]
            $AB05Misfit: Boolean
            $AB05Normal: Boolean
            $AB06Ameliorate: [gqlEHSFormTargetInItemInput]
            $AB06Misfit: Boolean
            $AB06Normal: Boolean
            $AC01Ameliorate: [gqlEHSFormTargetInItemInput]
            $AC01Misfit: Boolean
            $AC01Normal: Boolean
            $AC02Ameliorate: [gqlEHSFormTargetInItemInput]
            $AC02Misfit: Boolean
            $AC02Normal: Boolean
            $AC03Ameliorate: [gqlEHSFormTargetInItemInput]
            $AC03Misfit: Boolean
            $AC03Normal: Boolean
            $AD01Ameliorate: [gqlEHSFormTargetInItemInput]
            $AD01Misfit: Boolean
            $AD01Normal: Boolean
            $AD02Ameliorate: [gqlEHSFormTargetInItemInput]
            $AD02Misfit: Boolean
            $AD02Normal: Boolean
            $AD03Ameliorate: [gqlEHSFormTargetInItemInput]
            $AD03Misfit: Boolean
            $AD03Normal: Boolean
            $AD04Ameliorate: [gqlEHSFormTargetInItemInput]
            $AD04Misfit: Boolean
            $AD04Normal: Boolean
            $AD05Ameliorate: [gqlEHSFormTargetInItemInput]
            $AD05Misfit: Boolean
            $AD05Normal: Boolean
            $AD06Ameliorate: [gqlEHSFormTargetInItemInput]
            $AD06Misfit: Boolean
            $AD06Normal: Boolean
            $AD07Ameliorate: [gqlEHSFormTargetInItemInput]
            $AD07Misfit: Boolean
            $AD07Normal: Boolean
            $AD08Ameliorate: [gqlEHSFormTargetInItemInput]
            $AD08Misfit: Boolean
            $AD08Normal: Boolean
            $AE01Ameliorate: [gqlEHSFormTargetInItemInput]
            $AE01Misfit: Boolean
            $AE01Normal: Boolean
            $AE02Ameliorate: [gqlEHSFormTargetInItemInput]
            $AE02Misfit: Boolean
            $AE02Normal: Boolean
            $AE03Ameliorate: [gqlEHSFormTargetInItemInput]
            $AE03Misfit: Boolean
            $AE03Normal: Boolean
            $AE04Ameliorate: [gqlEHSFormTargetInItemInput]
            $AE04Misfit: Boolean
            $AE04Normal: Boolean
            $AE05Ameliorate: [gqlEHSFormTargetInItemInput]
            $AE05Misfit: Boolean
            $AE05Normal: Boolean
            $AE06Ameliorate: [gqlEHSFormTargetInItemInput]
            $AE06Misfit: Boolean
            $AE06Normal: Boolean
            $AE07Ameliorate: [gqlEHSFormTargetInItemInput]
            $AE07Misfit: Boolean
            $AE07Normal: Boolean
            $AF01Ameliorate: [gqlEHSFormTargetInItemInput]
            $AF01Misfit: Boolean
            $AF01Normal: Boolean
            $AF02Ameliorate: [gqlEHSFormTargetInItemInput]
            $AF02Misfit: Boolean
            $AF02Normal: Boolean
            $AF03Ameliorate: [gqlEHSFormTargetInItemInput]
            $AF03Misfit: Boolean
            $AF03Normal: Boolean
            $AF04Ameliorate: [gqlEHSFormTargetInItemInput]
            $AF04Misfit: Boolean
            $AF04Normal: Boolean
            $checkDept: String
            $checkStaff: String
            $checkTarget: [gqlEHSFormTargetInput]
            $day: Date!
            $location: String
            $responsibleUnitSignature: [gqlEHSFormSignatureInput]
            $siteId: String!
            $supervisorUnitSignature: [gqlEHSFormSignatureInput]
        ) {
            updateEHSFormNormal(
                AA01Ameliorate: $AA01Ameliorate
                AA01Misfit: $AA01Misfit
                AA01Normal: $AA01Normal
                AA02Ameliorate: $AA02Ameliorate
                AA02Misfit: $AA02Misfit
                AA02Normal: $AA02Normal
                AA03Ameliorate: $AA03Ameliorate
                AA03Misfit: $AA03Misfit
                AA03Normal: $AA03Normal
                AA04Ameliorate: $AA04Ameliorate
                AA04Misfit: $AA04Misfit
                AA04Normal: $AA04Normal
                AA05Ameliorate: $AA05Ameliorate
                AA05Misfit: $AA05Misfit
                AA05Normal: $AA05Normal
                AA06Ameliorate: $AA06Ameliorate
                AA06Misfit: $AA06Misfit
                AA06Normal: $AA06Normal
                AA07Ameliorate: $AA07Ameliorate
                AA07Misfit: $AA07Misfit
                AA07Normal: $AA07Normal
                AA08Ameliorate: $AA08Ameliorate
                AA08Misfit: $AA08Misfit
                AA08Normal: $AA08Normal
                AA09Ameliorate: $AA09Ameliorate
                AA09Misfit: $AA09Misfit
                AA09Normal: $AA09Normal
                AA10Ameliorate: $AA10Ameliorate
                AA10Misfit: $AA10Misfit
                AA10Normal: $AA10Normal
                AA11Ameliorate: $AA11Ameliorate
                AA11Misfit: $AA11Misfit
                AA11Normal: $AA11Normal
                AA12Ameliorate: $AA12Ameliorate
                AA12Misfit: $AA12Misfit
                AA12Normal: $AA12Normal
                AA13Ameliorate: $AA13Ameliorate
                AA13Misfit: $AA13Misfit
                AA13Normal: $AA13Normal
                AA14Ameliorate: $AA14Ameliorate
                AA14Misfit: $AA14Misfit
                AA14Normal: $AA14Normal
                AA15Ameliorate: $AA15Ameliorate
                AA15Misfit: $AA15Misfit
                AA15Normal: $AA15Normal
                AA16Ameliorate: $AA16Ameliorate
                AA16Misfit: $AA16Misfit
                AA16Normal: $AA16Normal
                AA17Ameliorate: $AA17Ameliorate
                AA17Misfit: $AA17Misfit
                AA17Normal: $AA17Normal
                AA18Ameliorate: $AA18Ameliorate
                AA18Misfit: $AA18Misfit
                AA18Normal: $AA18Normal
                AA19Ameliorate: $AA19Ameliorate
                AA19Misfit: $AA19Misfit
                AA19Normal: $AA19Normal
                AA20Ameliorate: $AA20Ameliorate
                AA20Misfit: $AA20Misfit
                AA20Normal: $AA20Normal
                AA21Ameliorate: $AA21Ameliorate
                AA21Misfit: $AA21Misfit
                AA21Normal: $AA21Normal
                AA22Ameliorate: $AA22Ameliorate
                AA22Misfit: $AA22Misfit
                AA22Normal: $AA22Normal
                AB01Ameliorate: $AB01Ameliorate
                AB01Misfit: $AB01Misfit
                AB01Normal: $AB01Normal
                AB02Ameliorate: $AB02Ameliorate
                AB02Misfit: $AB02Misfit
                AB02Normal: $AB02Normal
                AB03Ameliorate: $AB03Ameliorate
                AB03Misfit: $AB03Misfit
                AB03Normal: $AB03Normal
                AB04Ameliorate: $AB04Ameliorate
                AB04Misfit: $AB04Misfit
                AB04Normal: $AB04Normal
                AB05Ameliorate: $AB05Ameliorate
                AB05Misfit: $AB05Misfit
                AB05Normal: $AB05Normal
                AB06Ameliorate: $AB06Ameliorate
                AB06Misfit: $AB06Misfit
                AB06Normal: $AB06Normal
                AC01Ameliorate: $AC01Ameliorate
                AC01Misfit: $AC01Misfit
                AC01Normal: $AC01Normal
                AC02Ameliorate: $AC02Ameliorate
                AC02Misfit: $AC02Misfit
                AC02Normal: $AC02Normal
                AC03Ameliorate: $AC03Ameliorate
                AC03Misfit: $AC03Misfit
                AC03Normal: $AC03Normal
                AD01Ameliorate: $AD01Ameliorate
                AD01Misfit: $AD01Misfit
                AD01Normal: $AD01Normal
                AD02Ameliorate: $AD02Ameliorate
                AD02Misfit: $AD02Misfit
                AD02Normal: $AD02Normal
                AD03Ameliorate: $AD03Ameliorate
                AD03Misfit: $AD03Misfit
                AD03Normal: $AD03Normal
                AD04Ameliorate: $AD04Ameliorate
                AD04Misfit: $AD04Misfit
                AD04Normal: $AD04Normal
                AD05Ameliorate: $AD05Ameliorate
                AD05Misfit: $AD05Misfit
                AD05Normal: $AD05Normal
                AD06Ameliorate: $AD06Ameliorate
                AD06Misfit: $AD06Misfit
                AD06Normal: $AD06Normal
                AD07Ameliorate: $AD07Ameliorate
                AD07Misfit: $AD07Misfit
                AD07Normal: $AD07Normal
                AD08Ameliorate: $AD08Ameliorate
                AD08Misfit: $AD08Misfit
                AD08Normal: $AD08Normal
                AE01Ameliorate: $AE01Ameliorate
                AE01Misfit: $AE01Misfit
                AE01Normal: $AE01Normal
                AE02Ameliorate: $AE02Ameliorate
                AE02Misfit: $AE02Misfit
                AE02Normal: $AE02Normal
                AE03Ameliorate: $AE03Ameliorate
                AE03Misfit: $AE03Misfit
                AE03Normal: $AE03Normal
                AE04Ameliorate: $AE04Ameliorate
                AE04Misfit: $AE04Misfit
                AE04Normal: $AE04Normal
                AE05Ameliorate: $AE05Ameliorate
                AE05Misfit: $AE05Misfit
                AE05Normal: $AE05Normal
                AE06Ameliorate: $AE06Ameliorate
                AE06Misfit: $AE06Misfit
                AE06Normal: $AE06Normal
                AE07Ameliorate: $AE07Ameliorate
                AE07Misfit: $AE07Misfit
                AE07Normal: $AE07Normal
                AF01Ameliorate: $AF01Ameliorate
                AF01Misfit: $AF01Misfit
                AF01Normal: $AF01Normal
                AF02Ameliorate: $AF02Ameliorate
                AF02Misfit: $AF02Misfit
                AF02Normal: $AF02Normal
                AF03Ameliorate: $AF03Ameliorate
                AF03Misfit: $AF03Misfit
                AF03Normal: $AF03Normal
                AF04Ameliorate: $AF04Ameliorate
                AF04Misfit: $AF04Misfit
                AF04Normal: $AF04Normal
                checkDept: $checkDept
                checkStaff: $checkStaff
                checkTarget: $checkTarget
                day: $day
                location: $location
                responsibleUnitSignature: $responsibleUnitSignature
                siteId: $siteId
                supervisorUnitSignature: $supervisorUnitSignature
            ) {
                ok
                message
            }
        }
    `;

    itemGroups: Record<NormalGroupKey, IEHSFormNormalGroup> = {
        AA: {
            name: '一般安全管理 AA',
            items: [
                {
                    code: 'AA01',
                    content: '進入施工區域已正確配戴安全帽並扣上帽帶。',
                    normal: 'AA01Normal',
                    misfit: 'AA01Misfit',
                    ameliorate: 'AA01Ameliorate',
                },
                {
                    code: 'AA02',
                    content: '穿著及膝之長褲及覆肩之上衣。',
                    normal: 'AA02Normal',
                    misfit: 'AA02Misfit',
                    ameliorate: 'AA02Ameliorate',
                },
                {
                    code: 'AA03',
                    content: '人員無嚼食檳榔、追逐嬉戲、賭博、打架等行為。',
                    normal: 'AA03Normal',
                    misfit: 'AA03Misfit',
                    ameliorate: 'AA03Ameliorate',
                },
                {
                    code: 'AA04',
                    content: '人員未攜帶或飲用含酒精性飲料。',
                    normal: 'AA04Normal',
                    misfit: 'AA04Misfit',
                    ameliorate: 'AA04Ameliorate',
                },
                {
                    code: 'AA05',
                    content:
                        '未攜帶管制物品(如：照相機、NOTEBOOK、磁片、打火機…等)。',
                    normal: 'AA05Normal',
                    misfit: 'AA05Misfit',
                    ameliorate: 'AA05Ameliorate',
                },
                {
                    code: 'AA06',
                    content: '施工人員無酒醉、吸毒或精神不能集中等異常現象。',
                    normal: 'AA06Normal',
                    misfit: 'AA06Misfit',
                    ameliorate: 'AA06Ameliorate',
                },
                {
                    code: 'AA07',
                    content:
                        '施工區、預置區、堆放區已設置圍籬及標示廠商名稱、連絡人及電話。',
                    normal: 'AA07Normal',
                    misfit: 'AA07Misfit',
                    ameliorate: 'AA07Ameliorate',
                },
                {
                    code: 'AA08',
                    content: '現場地面放置工具、物料已舖設塑膠布或不鏽鋼板。',
                    normal: 'AA08Normal',
                    misfit: 'AA08Misfit',
                    ameliorate: 'AA08Ameliorate',
                },
                {
                    code: 'AA09',
                    content:
                        '在樓梯、通道上、緊急疏散路線、沖身洗眼器、逃生門以及緊急應變用品櫃附近，堆放機具、材料者。',
                    normal: 'AA09Normal',
                    misfit: 'AA09Misfit',
                    ameliorate: 'AA09Ameliorate',
                },
                {
                    code: 'AA10',
                    content: '將工具、材料置於安全處。',
                    normal: 'AA10Normal',
                    misfit: 'AA10Misfit',
                    ameliorate: 'AA10Ameliorate',
                },
                {
                    code: 'AA11',
                    content: '於指定區域用餐、飲食、休息。',
                    normal: 'AA11Normal',
                    misfit: 'AA11Misfit',
                    ameliorate: 'AA11Ameliorate',
                },
                {
                    code: 'AA12',
                    content: '於指定地點抽煙。',
                    normal: 'AA12Normal',
                    misfit: 'AA12Misfit',
                    ameliorate: 'AA12Ameliorate',
                },
                {
                    code: 'AA13',
                    content: '車輛持有通行證、依規定停放、未阻礙通道。',
                    normal: 'AA13Normal',
                    misfit: 'AA13Misfit',
                    ameliorate: 'AA13Ameliorate',
                },
                {
                    code: 'AA14',
                    content: '行車未超過速限/未逆向行駛。',
                    normal: 'AA14Normal',
                    misfit: 'AA14Misfit',
                    ameliorate: 'AA14Ameliorate',
                },
                {
                    code: 'AA15',
                    content:
                        '未任意拆除或挪用機電設備、警告標誌、防護設備、消防設施(含消防管或滅火器移做他用)….等。',
                    normal: 'AA15Normal',
                    misfit: 'AA15Misfit',
                    ameliorate: 'AA15Ameliorate',
                },
                {
                    code: 'AA16',
                    content: '已申請拆除安全設施(如：安全網、平台護欄….等)。',
                    normal: 'AA16Normal',
                    misfit: 'AA16Misfit',
                    ameliorate: 'AA16Ameliorate',
                },
                {
                    code: 'AA17',
                    content:
                        '施工現場已無其他方式須直接踐踏機台、管路等，且已事先向管理單位申請許可。',
                    normal: 'AA17Normal',
                    misfit: 'AA17Misfit',
                    ameliorate: 'AA17Ameliorate',
                },
                {
                    code: 'AA18',
                    content:
                        '轉動任一管路之閥類開關或電氣開關前已通知相關負責人員。',
                    normal: 'AA18Normal',
                    misfit: 'AA18Misfit',
                    ameliorate: 'AA18Ameliorate',
                },
                {
                    code: 'AA19',
                    content: '下班收工後已將電氣設備、氣體鋼瓶關閉。',
                    normal: 'AA19Normal',
                    misfit: 'AA19Misfit',
                    ameliorate: 'AA19Ameliorate',
                },
                {
                    code: 'AA20',
                    content: '現場作業時正確配帶個人防護具。',
                    normal: 'AA20Normal',
                    misfit: 'AA20Misfit',
                    ameliorate: 'AA20Ameliorate',
                },
                {
                    code: 'AA21',
                    content: '未在廠內隨地便溺。',
                    normal: 'AA21Normal',
                    misfit: 'AA21Misfit',
                    ameliorate: 'AA21Ameliorate',
                },
                {
                    code: 'AA22',
                    content: '已復原安全設施(如：安全網、平台護欄….等) 。',
                    normal: 'AA22Normal',
                    misfit: 'AA22Misfit',
                    ameliorate: 'AA22Ameliorate',
                },
            ],
        },
        AB: {
            name: '整理整頓 AB',
            items: [
                {
                    code: 'AB01',
                    content:
                        '每日工程收工前，整理現場、收拾工具，使之恢復正常狀況。',
                    normal: 'AB01Normal',
                    misfit: 'AB01Misfit',
                    ameliorate: 'AB01Ameliorate',
                },
                {
                    code: 'AB02',
                    content:
                        '每日工作後，將自動昇降機、A字梯、施工架等歸回定位。',
                    normal: 'AB02Normal',
                    misfit: 'AB02Misfit',
                    ameliorate: 'AB02Ameliorate',
                },
                {
                    code: 'AB03',
                    content:
                        '每日工作後，將作業平台上工具及施工物件、材料等收拾完成。',
                    normal: 'AB03Normal',
                    misfit: 'AB03Misfit',
                    ameliorate: 'AB03Ameliorate',
                },
                {
                    code: 'AB04',
                    content:
                        '庫存區、預置區、堆放區之機具、材料已分類、標示，廢棄物當日清除。',
                    normal: 'AB04Normal',
                    misfit: 'AB04Misfit',
                    ameliorate: 'AB04Ameliorate',
                },
                {
                    code: 'AB05',
                    content:
                        '每日收工前將物料、工具置於暫存區並將當日垃圾清理乾淨。',
                    normal: 'AB05Normal',
                    misfit: 'AB05Misfit',
                    ameliorate: 'AB05Ameliorate',
                },
                {
                    code: 'AB06',
                    content:
                        '生活廢棄物依照各區垃圾分類規定丟棄於各分類垃圾桶內。',
                    normal: 'AB06Normal',
                    misfit: 'AB06Misfit',
                    ameliorate: 'AB06Ameliorate',
                },
            ],
        },
        AC: {
            name: '作業檢點 AC',
            items: [
                {
                    code: 'AC01',
                    content: '作業許可證或其他規定表格標示於現場明顯處。',
                    normal: 'AC01Normal',
                    misfit: 'AC01Misfit',
                    ameliorate: 'AC01Ameliorate',
                },
                {
                    code: 'AC02',
                    content: '實施作業自主檢點或機具檢點、檢查。',
                    normal: 'AC02Normal',
                    misfit: 'AC02Misfit',
                    ameliorate: 'AC02Ameliorate',
                },
                {
                    code: 'AC03',
                    content:
                        '進行切管、修改等作業前，已經管理單位、人員確認無誤。',
                    normal: 'AC03Normal',
                    misfit: 'AC03Misfit',
                    ameliorate: 'AC03Ameliorate',
                },
            ],
        },
        AD: {
            name: '門禁管理 AD',
            items: [
                {
                    code: 'AD01',
                    content: '施工人員正確配戴識別證及穿著施工背心。',
                    normal: 'AD01Normal',
                    misfit: 'AD01Misfit',
                    ameliorate: 'AD01Ameliorate',
                },
                {
                    code: 'AD02',
                    content: '入廠施工人員依規定接受相關工安訓練課程。',
                    normal: 'AD02Normal',
                    misfit: 'AD02Misfit',
                    ameliorate: 'AD02Ameliorate',
                },
                {
                    code: 'AD03',
                    content: '人員未持來賓證進入廠區施作。',
                    normal: 'AD03Normal',
                    misfit: 'AD03Misfit',
                    ameliorate: 'AD03Ameliorate',
                },
                {
                    code: 'AD04',
                    content: '證件未借與他人或未冒用他人證件進出廠區。',
                    normal: 'AD04Normal',
                    misfit: 'AD04Misfit',
                    ameliorate: 'AD04Ameliorate',
                },
                {
                    code: 'AD05',
                    content: '已事先獲得管理人員許可才入廠施工。',
                    normal: 'AD05Normal',
                    misfit: 'AD05Misfit',
                    ameliorate: 'AD05Ameliorate',
                },
                {
                    code: 'AD06',
                    content: '未出入非經許可之區域(依識別證門禁區域判別)。',
                    normal: 'AD06Normal',
                    misfit: 'AD06Misfit',
                    ameliorate: 'AD06Ameliorate',
                },
                {
                    code: 'AD07',
                    content: '未於非緊急狀態違規打開或進出安全門。',
                    normal: 'AD07Normal',
                    misfit: 'AD07Misfit',
                    ameliorate: 'AD07Ameliorate',
                },
                {
                    code: 'AD08',
                    content: '未闖越簽到、讀卡、換證等門禁管制區域。',
                    normal: 'AD08Normal',
                    misfit: 'AD08Misfit',
                    ameliorate: 'AD08Ameliorate',
                },
            ],
        },
        AE: {
            name: '無塵室管理 AE',
            items: [
                {
                    code: 'AE01',
                    content: '符合無塵室穿著規定。',
                    normal: 'AE01Normal',
                    misfit: 'AE01Misfit',
                    ameliorate: 'AE01Ameliorate',
                },
                {
                    code: 'AE02',
                    content:
                        '設備材料機具進入無塵室，已擦拭乾淨及存放於規定區域。',
                    normal: 'AE02Normal',
                    misfit: 'AE02Misfit',
                    ameliorate: 'AE02Ameliorate',
                },
                {
                    code: 'AE03',
                    content: '於無塵室施工已做好潔淨措施。',
                    normal: 'AE03Normal',
                    misfit: 'AE03Misfit',
                    ameliorate: 'AE03Ameliorate',
                },
                {
                    code: 'AE04',
                    content: '施工時人員未直接坐於地面上。',
                    normal: 'AE04Normal',
                    misfit: 'AE04Misfit',
                    ameliorate: 'AE04Ameliorate',
                },
                {
                    code: 'AE05',
                    content: '未嚼食口香糖。',
                    normal: 'AE05Normal',
                    misfit: 'AE05Misfit',
                    ameliorate: 'AE05Ameliorate',
                },
                {
                    code: 'AE06',
                    content:
                        '未攜帶管制物品(如：照相機、NOTEBOOK、磁片、鉛筆、非無塵紙、立可白、紙箱、行動電話、打火機…等)。',
                    normal: 'AE06Normal',
                    misfit: 'AE06Misfit',
                    ameliorate: 'AE06Ameliorate',
                },
                {
                    code: 'AE07',
                    content: '遵守其他無塵室相關規定。',
                    normal: 'AE07Normal',
                    misfit: 'AE07Misfit',
                    ameliorate: 'AE07Ameliorate',
                },
            ],
        },
        AF: {
            name: '其他管理 AF',
            items: [
                {
                    code: 'AF01',
                    content: '遵守每日出工人員簽到規定。',
                    normal: 'AF01Normal',
                    misfit: 'AF01Misfit',
                    ameliorate: 'AF01Ameliorate',
                },
                {
                    code: 'AF02',
                    content: '依規定繳交相關文件。',
                    normal: 'AF02Normal',
                    misfit: 'AF02Misfit',
                    ameliorate: 'AF02Ameliorate',
                },
                {
                    code: 'AF03',
                    content: '出席『供應商安全衛生會議』。',
                    normal: 'AF03Normal',
                    misfit: 'AF03Misfit',
                    ameliorate: 'AF03Ameliorate',
                },
                {
                    code: 'AF04',
                    content: '遵守其他安全、管理相關規定。',
                    normal: 'AF04Normal',
                    misfit: 'AF04Misfit',
                    ameliorate: 'AF04Ameliorate',
                },
            ],
        },
    };

    constructor(
        siteId: string,
        number: string,
        supervisorSignature: SignatureStateItem,
        responsibleSignatures: ObjectSignatureStateItem
    ) {
        super(siteId, number, supervisorSignature, responsibleSignatures);
    }

    getInitialValues(): IEHSFormNormal {
        const base = super.getInitialValues();
        return {
            ...base,
            AA01Normal: null,
            AA02Normal: null,
            AA03Normal: null,
            AA04Normal: null,
            AA05Normal: null,
            AA06Normal: null,
            AA07Normal: null,
            AA08Normal: null,
            AA09Normal: null,
            AA10Normal: null,
            AA11Normal: null,
            AA12Normal: null,
            AA13Normal: null,
            AA14Normal: null,
            AA15Normal: null,
            AA16Normal: null,
            AA17Normal: null,
            AA18Normal: null,
            AA19Normal: null,
            AA20Normal: null,
            AA21Normal: null,
            AA22Normal: null,
            AB01Normal: null,
            AB02Normal: null,
            AB03Normal: null,
            AB04Normal: null,
            AB05Normal: null,
            AB06Normal: null,
            AC01Normal: null,
            AC02Normal: null,
            AC03Normal: null,
            AD01Normal: null,
            AD02Normal: null,
            AD03Normal: null,
            AD04Normal: null,
            AD05Normal: null,
            AD06Normal: null,
            AD07Normal: null,
            AD08Normal: null,
            AE01Normal: null,
            AE02Normal: null,
            AE03Normal: null,
            AE04Normal: null,
            AE05Normal: null,
            AE06Normal: null,
            AE07Normal: null,
            AF01Normal: null,
            AF02Normal: null,
            AF03Normal: null,
            AF04Normal: null,

            AA01Misfit: null,
            AA02Misfit: null,
            AA03Misfit: null,
            AA04Misfit: null,
            AA05Misfit: null,
            AA06Misfit: null,
            AA07Misfit: null,
            AA08Misfit: null,
            AA09Misfit: null,
            AA10Misfit: null,
            AA11Misfit: null,
            AA12Misfit: null,
            AA13Misfit: null,
            AA14Misfit: null,
            AA15Misfit: null,
            AA16Misfit: null,
            AA17Misfit: null,
            AA18Misfit: null,
            AA19Misfit: null,
            AA20Misfit: null,
            AA21Misfit: null,
            AA22Misfit: null,
            AB01Misfit: null,
            AB02Misfit: null,
            AB03Misfit: null,
            AB04Misfit: null,
            AB05Misfit: null,
            AB06Misfit: null,
            AC01Misfit: null,
            AC02Misfit: null,
            AC03Misfit: null,
            AD01Misfit: null,
            AD02Misfit: null,
            AD03Misfit: null,
            AD04Misfit: null,
            AD05Misfit: null,
            AD06Misfit: null,
            AD07Misfit: null,
            AD08Misfit: null,
            AE01Misfit: null,
            AE02Misfit: null,
            AE03Misfit: null,
            AE04Misfit: null,
            AE05Misfit: null,
            AE06Misfit: null,
            AE07Misfit: null,
            AF01Misfit: null,
            AF02Misfit: null,
            AF03Misfit: null,
            AF04Misfit: null,

            AA01Ameliorate: [],
            AA02Ameliorate: [],
            AA03Ameliorate: [],
            AA04Ameliorate: [],
            AA05Ameliorate: [],
            AA06Ameliorate: [],
            AA07Ameliorate: [],
            AA08Ameliorate: [],
            AA09Ameliorate: [],
            AA10Ameliorate: [],
            AA11Ameliorate: [],
            AA12Ameliorate: [],
            AA13Ameliorate: [],
            AA14Ameliorate: [],
            AA15Ameliorate: [],
            AA16Ameliorate: [],
            AA17Ameliorate: [],
            AA18Ameliorate: [],
            AA19Ameliorate: [],
            AA20Ameliorate: [],
            AA21Ameliorate: [],
            AA22Ameliorate: [],
            AB01Ameliorate: [],
            AB02Ameliorate: [],
            AB03Ameliorate: [],
            AB04Ameliorate: [],
            AB05Ameliorate: [],
            AB06Ameliorate: [],
            AC01Ameliorate: [],
            AC02Ameliorate: [],
            AC03Ameliorate: [],
            AD01Ameliorate: [],
            AD02Ameliorate: [],
            AD03Ameliorate: [],
            AD04Ameliorate: [],
            AD05Ameliorate: [],
            AD06Ameliorate: [],
            AD07Ameliorate: [],
            AD08Ameliorate: [],
            AE01Ameliorate: [],
            AE02Ameliorate: [],
            AE03Ameliorate: [],
            AE04Ameliorate: [],
            AE05Ameliorate: [],
            AE06Ameliorate: [],
            AE07Ameliorate: [],
            AF01Ameliorate: [],
            AF02Ameliorate: [],
            AF03Ameliorate: [],
            AF04Ameliorate: [],
        };
    }

    isAmeliorateDisabled(values: IEHSFormNormal, code: string): boolean {
        const normalKey = `${code}Normal` as keyof IEHSFormNormal;
        const misfitKey = `${code}Misfit` as keyof IEHSFormNormal;
        const normal = values[normalKey];
        const misfit = values[misfitKey];
        return normal !== false || misfit === true;
    }
}
