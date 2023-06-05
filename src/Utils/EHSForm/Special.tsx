import { gql } from '@apollo/client';
import {
    IEHSFormFillItem,
    SignaturesStateItem,
} from '../../Interface/EHSForm/Common';
import {
    IEHSFormSpecial,
    SpecialGroupKey,
} from '../../Interface/EHSForm/Special';
import {
    EHSFORM_SIGNATURE_FIELDS,
    EHSFORM_IN_ITEM_FIELDS,
} from '../GQLFragments';
import { EHSFormHandler } from './Handler';
import { SignatureStateItem } from '../../Interface/Signature';

interface IEHSFormSpecialItem extends IEHSFormFillItem {
    normal: keyof IEHSFormSpecial;
    misfit: keyof IEHSFormSpecial;
    ameliorate: keyof IEHSFormSpecial;
}

interface IEHSFormNormalGroup {
    name: string;
    items: IEHSFormSpecialItem[];
}

export class EHSFormSpecialHandler extends EHSFormHandler {
    queryName = 'EHSFormSpecial';
    query = gql`
        ${EHSFORM_SIGNATURE_FIELDS}
        ${EHSFORM_IN_ITEM_FIELDS}
        query EHSFormSpecial($siteId: String!, $day: Date, $role: String) {
            searchName(siteId: $siteId, role: $role)
            EHSFormSpecial(siteId: $siteId, day: $day) {
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
                BA01Normal
                BA02Normal
                BA03Normal
                BA04Normal
                BA05Normal
                BA06Normal
                BA07Normal
                BA08Normal
                BA09Normal
                BB01Normal
                BB02Normal
                BB03Normal
                BB04Normal
                BB05Normal
                BB06Normal
                BB07Normal
                BB08Normal
                BB09Normal
                BB10Normal
                BB11Normal
                BB12Normal
                BB13Normal
                BB14Normal
                BB15Normal
                BB16Normal
                BB17Normal
                BC01Normal
                BC02Normal
                BC03Normal
                BC04Normal
                BC05Normal
                BC06Normal
                BC07Normal
                BC08Normal
                BC09Normal
                BC10Normal
                BC11Normal
                BD01Normal
                BD02Normal
                BD03Normal
                BD04Normal
                BD05Normal
                BD06Normal
                BD07Normal
                BD08Normal
                BD09Normal
                BD10Normal
                BD11Normal
                BD12Normal
                BD13Normal
                BD14Normal
                BD15Normal
                BD16Normal
                BE01Normal
                BE02Normal
                BE03Normal
                BE04Normal
                BF01Normal
                BF02Normal
                BF03Normal
                BF04Normal
                BF05Normal
                BF06Normal
                BF07Normal
                BF08Normal
                BF09Normal
                BF10Normal
                BF11Normal
                BG01Normal
                BG02Normal
                BG03Normal
                BG04Normal
                BG05Normal
                BG06Normal
                BG07Normal
                BH01Normal
                BH02Normal
                BH03Normal
                BH04Normal
                BI01Normal
                BI02Normal
                BI03Normal
                BJ01Normal
                BJ02Normal
                BJ03Normal
                BJ04Normal
                BJ05Normal
                BA01Misfit
                BA02Misfit
                BA03Misfit
                BA04Misfit
                BA05Misfit
                BA06Misfit
                BA07Misfit
                BA08Misfit
                BA09Misfit
                BB01Misfit
                BB02Misfit
                BB03Misfit
                BB04Misfit
                BB05Misfit
                BB06Misfit
                BB07Misfit
                BB08Misfit
                BB09Misfit
                BB10Misfit
                BB11Misfit
                BB12Misfit
                BB13Misfit
                BB14Misfit
                BB15Misfit
                BB16Misfit
                BB17Misfit
                BC01Misfit
                BC02Misfit
                BC03Misfit
                BC04Misfit
                BC05Misfit
                BC06Misfit
                BC07Misfit
                BC08Misfit
                BC09Misfit
                BC10Misfit
                BC11Misfit
                BD01Misfit
                BD02Misfit
                BD03Misfit
                BD04Misfit
                BD05Misfit
                BD06Misfit
                BD07Misfit
                BD08Misfit
                BD09Misfit
                BD10Misfit
                BD11Misfit
                BD12Misfit
                BD13Misfit
                BD14Misfit
                BD15Misfit
                BD16Misfit
                BE01Misfit
                BE02Misfit
                BE03Misfit
                BE04Misfit
                BF01Misfit
                BF02Misfit
                BF03Misfit
                BF04Misfit
                BF05Misfit
                BF06Misfit
                BF07Misfit
                BF08Misfit
                BF09Misfit
                BF10Misfit
                BF11Misfit
                BG01Misfit
                BG02Misfit
                BG03Misfit
                BG04Misfit
                BG05Misfit
                BG06Misfit
                BG07Misfit
                BH01Misfit
                BH02Misfit
                BH03Misfit
                BH04Misfit
                BI01Misfit
                BI02Misfit
                BI03Misfit
                BJ01Misfit
                BJ02Misfit
                BJ03Misfit
                BJ04Misfit
                BJ05Misfit
                BA01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BA02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BA03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BA04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BA05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BA06Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BA07Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BA08Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BA09Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB06Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB07Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB08Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB09Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB10Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB11Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB12Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB13Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB14Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB15Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB16Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BB17Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC06Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC07Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC08Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC09Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC10Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BC11Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD06Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD07Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD08Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD09Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD10Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD11Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD12Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD13Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD14Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD15Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BD16Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BE01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BE02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BE03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BE04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF06Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF07Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF08Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF09Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF10Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BF11Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BG01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BG02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BG03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BG04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BG05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BG06Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BG07Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BH01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BH02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BH03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BH04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BI01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BI02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BI03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BJ01Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BJ02Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BJ03Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BJ04Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
                BJ05Ameliorate {
                    ...gqlEHSFormTargetInItemFields
                }
            }
        }
    `;
    mutationName = 'updateEHSFormSpecial';
    mutation = gql`
        mutation updateEHSFormSpecial(
            $BA01Ameliorate: gqlEHSFormTargetInItemInput
            $BA01Misfit: Boolean
            $BA01Normal: Boolean
            $BA02Ameliorate: gqlEHSFormTargetInItemInput
            $BA02Misfit: Boolean
            $BA02Normal: Boolean
            $BA03Ameliorate: gqlEHSFormTargetInItemInput
            $BA03Misfit: Boolean
            $BA03Normal: Boolean
            $BA04Ameliorate: gqlEHSFormTargetInItemInput
            $BA04Misfit: Boolean
            $BA04Normal: Boolean
            $BA05Ameliorate: gqlEHSFormTargetInItemInput
            $BA05Misfit: Boolean
            $BA05Normal: Boolean
            $BA06Ameliorate: gqlEHSFormTargetInItemInput
            $BA06Misfit: Boolean
            $BA06Normal: Boolean
            $BA07Ameliorate: gqlEHSFormTargetInItemInput
            $BA07Misfit: Boolean
            $BA07Normal: Boolean
            $BA08Ameliorate: gqlEHSFormTargetInItemInput
            $BA08Misfit: Boolean
            $BA08Normal: Boolean
            $BA09Ameliorate: gqlEHSFormTargetInItemInput
            $BA09Misfit: Boolean
            $BA09Normal: Boolean
            $BB01Ameliorate: gqlEHSFormTargetInItemInput
            $BB01Misfit: Boolean
            $BB01Normal: Boolean
            $BB02Ameliorate: gqlEHSFormTargetInItemInput
            $BB02Misfit: Boolean
            $BB02Normal: Boolean
            $BB03Ameliorate: gqlEHSFormTargetInItemInput
            $BB03Misfit: Boolean
            $BB03Normal: Boolean
            $BB04Ameliorate: gqlEHSFormTargetInItemInput
            $BB04Misfit: Boolean
            $BB04Normal: Boolean
            $BB05Ameliorate: gqlEHSFormTargetInItemInput
            $BB05Misfit: Boolean
            $BB05Normal: Boolean
            $BB06Ameliorate: gqlEHSFormTargetInItemInput
            $BB06Misfit: Boolean
            $BB06Normal: Boolean
            $BB07Ameliorate: gqlEHSFormTargetInItemInput
            $BB07Misfit: Boolean
            $BB07Normal: Boolean
            $BB08Ameliorate: gqlEHSFormTargetInItemInput
            $BB08Misfit: Boolean
            $BB08Normal: Boolean
            $BB09Ameliorate: gqlEHSFormTargetInItemInput
            $BB09Misfit: Boolean
            $BB09Normal: Boolean
            $BB10Ameliorate: gqlEHSFormTargetInItemInput
            $BB10Misfit: Boolean
            $BB10Normal: Boolean
            $BB11Ameliorate: gqlEHSFormTargetInItemInput
            $BB11Misfit: Boolean
            $BB11Normal: Boolean
            $BB12Ameliorate: gqlEHSFormTargetInItemInput
            $BB12Misfit: Boolean
            $BB12Normal: Boolean
            $BB13Ameliorate: gqlEHSFormTargetInItemInput
            $BB13Misfit: Boolean
            $BB13Normal: Boolean
            $BB14Ameliorate: gqlEHSFormTargetInItemInput
            $BB14Misfit: Boolean
            $BB14Normal: Boolean
            $BB15Ameliorate: gqlEHSFormTargetInItemInput
            $BB15Misfit: Boolean
            $BB15Normal: Boolean
            $BB16Ameliorate: gqlEHSFormTargetInItemInput
            $BB16Misfit: Boolean
            $BB16Normal: Boolean
            $BB17Ameliorate: gqlEHSFormTargetInItemInput
            $BB17Misfit: Boolean
            $BB17Normal: Boolean
            $BC01Ameliorate: gqlEHSFormTargetInItemInput
            $BC01Misfit: Boolean
            $BC01Normal: Boolean
            $BC02Ameliorate: gqlEHSFormTargetInItemInput
            $BC02Misfit: Boolean
            $BC02Normal: Boolean
            $BC03Ameliorate: gqlEHSFormTargetInItemInput
            $BC03Misfit: Boolean
            $BC03Normal: Boolean
            $BC04Ameliorate: gqlEHSFormTargetInItemInput
            $BC04Misfit: Boolean
            $BC04Normal: Boolean
            $BC05Ameliorate: gqlEHSFormTargetInItemInput
            $BC05Misfit: Boolean
            $BC05Normal: Boolean
            $BC06Ameliorate: gqlEHSFormTargetInItemInput
            $BC06Misfit: Boolean
            $BC06Normal: Boolean
            $BC07Ameliorate: gqlEHSFormTargetInItemInput
            $BC07Misfit: Boolean
            $BC07Normal: Boolean
            $BC08Ameliorate: gqlEHSFormTargetInItemInput
            $BC08Misfit: Boolean
            $BC08Normal: Boolean
            $BC09Ameliorate: gqlEHSFormTargetInItemInput
            $BC09Misfit: Boolean
            $BC09Normal: Boolean
            $BC10Ameliorate: gqlEHSFormTargetInItemInput
            $BC10Misfit: Boolean
            $BC10Normal: Boolean
            $BC11Ameliorate: gqlEHSFormTargetInItemInput
            $BC11Misfit: Boolean
            $BC11Normal: Boolean
            $BD01Ameliorate: gqlEHSFormTargetInItemInput
            $BD01Misfit: Boolean
            $BD01Normal: Boolean
            $BD02Ameliorate: gqlEHSFormTargetInItemInput
            $BD02Misfit: Boolean
            $BD02Normal: Boolean
            $BD03Ameliorate: gqlEHSFormTargetInItemInput
            $BD03Misfit: Boolean
            $BD03Normal: Boolean
            $BD04Ameliorate: gqlEHSFormTargetInItemInput
            $BD04Misfit: Boolean
            $BD04Normal: Boolean
            $BD05Ameliorate: gqlEHSFormTargetInItemInput
            $BD05Misfit: Boolean
            $BD05Normal: Boolean
            $BD06Ameliorate: gqlEHSFormTargetInItemInput
            $BD06Misfit: Boolean
            $BD06Normal: Boolean
            $BD07Ameliorate: gqlEHSFormTargetInItemInput
            $BD07Misfit: Boolean
            $BD07Normal: Boolean
            $BD08Ameliorate: gqlEHSFormTargetInItemInput
            $BD08Misfit: Boolean
            $BD08Normal: Boolean
            $BD09Ameliorate: gqlEHSFormTargetInItemInput
            $BD09Misfit: Boolean
            $BD09Normal: Boolean
            $BD10Ameliorate: gqlEHSFormTargetInItemInput
            $BD10Misfit: Boolean
            $BD10Normal: Boolean
            $BD11Ameliorate: gqlEHSFormTargetInItemInput
            $BD11Misfit: Boolean
            $BD11Normal: Boolean
            $BD12Ameliorate: gqlEHSFormTargetInItemInput
            $BD12Misfit: Boolean
            $BD12Normal: Boolean
            $BD13Ameliorate: gqlEHSFormTargetInItemInput
            $BD13Misfit: Boolean
            $BD13Normal: Boolean
            $BD14Ameliorate: gqlEHSFormTargetInItemInput
            $BD14Misfit: Boolean
            $BD14Normal: Boolean
            $BD15Ameliorate: gqlEHSFormTargetInItemInput
            $BD15Misfit: Boolean
            $BD15Normal: Boolean
            $BD16Ameliorate: gqlEHSFormTargetInItemInput
            $BD16Misfit: Boolean
            $BD16Normal: Boolean
            $BE01Ameliorate: gqlEHSFormTargetInItemInput
            $BE01Misfit: Boolean
            $BE01Normal: Boolean
            $BE02Ameliorate: gqlEHSFormTargetInItemInput
            $BE02Misfit: Boolean
            $BE02Normal: Boolean
            $BE03Ameliorate: gqlEHSFormTargetInItemInput
            $BE03Misfit: Boolean
            $BE03Normal: Boolean
            $BE04Ameliorate: gqlEHSFormTargetInItemInput
            $BE04Misfit: Boolean
            $BE04Normal: Boolean
            $BF01Ameliorate: gqlEHSFormTargetInItemInput
            $BF01Misfit: Boolean
            $BF01Normal: Boolean
            $BF02Ameliorate: gqlEHSFormTargetInItemInput
            $BF02Misfit: Boolean
            $BF02Normal: Boolean
            $BF03Ameliorate: gqlEHSFormTargetInItemInput
            $BF03Misfit: Boolean
            $BF03Normal: Boolean
            $BF04Ameliorate: gqlEHSFormTargetInItemInput
            $BF04Misfit: Boolean
            $BF04Normal: Boolean
            $BF05Ameliorate: gqlEHSFormTargetInItemInput
            $BF05Misfit: Boolean
            $BF05Normal: Boolean
            $BF06Ameliorate: gqlEHSFormTargetInItemInput
            $BF06Misfit: Boolean
            $BF06Normal: Boolean
            $BF07Ameliorate: gqlEHSFormTargetInItemInput
            $BF07Misfit: Boolean
            $BF07Normal: Boolean
            $BF08Ameliorate: gqlEHSFormTargetInItemInput
            $BF08Misfit: Boolean
            $BF08Normal: Boolean
            $BF09Ameliorate: gqlEHSFormTargetInItemInput
            $BF09Misfit: Boolean
            $BF09Normal: Boolean
            $BF10Ameliorate: gqlEHSFormTargetInItemInput
            $BF10Misfit: Boolean
            $BF10Normal: Boolean
            $BF11Ameliorate: gqlEHSFormTargetInItemInput
            $BF11Misfit: Boolean
            $BF11Normal: Boolean
            $BG01Ameliorate: gqlEHSFormTargetInItemInput
            $BG01Misfit: Boolean
            $BG01Normal: Boolean
            $BG02Ameliorate: gqlEHSFormTargetInItemInput
            $BG02Misfit: Boolean
            $BG02Normal: Boolean
            $BG03Ameliorate: gqlEHSFormTargetInItemInput
            $BG03Misfit: Boolean
            $BG03Normal: Boolean
            $BG04Ameliorate: gqlEHSFormTargetInItemInput
            $BG04Misfit: Boolean
            $BG04Normal: Boolean
            $BG05Ameliorate: gqlEHSFormTargetInItemInput
            $BG05Misfit: Boolean
            $BG05Normal: Boolean
            $BG06Ameliorate: gqlEHSFormTargetInItemInput
            $BG06Misfit: Boolean
            $BG06Normal: Boolean
            $BG07Ameliorate: gqlEHSFormTargetInItemInput
            $BG07Misfit: Boolean
            $BG07Normal: Boolean
            $BH01Ameliorate: gqlEHSFormTargetInItemInput
            $BH01Misfit: Boolean
            $BH01Normal: Boolean
            $BH02Ameliorate: gqlEHSFormTargetInItemInput
            $BH02Misfit: Boolean
            $BH02Normal: Boolean
            $BH03Ameliorate: gqlEHSFormTargetInItemInput
            $BH03Misfit: Boolean
            $BH03Normal: Boolean
            $BH04Ameliorate: gqlEHSFormTargetInItemInput
            $BH04Misfit: Boolean
            $BH04Normal: Boolean
            $BI01Ameliorate: gqlEHSFormTargetInItemInput
            $BI01Misfit: Boolean
            $BI01Normal: Boolean
            $BI02Ameliorate: gqlEHSFormTargetInItemInput
            $BI02Misfit: Boolean
            $BI02Normal: Boolean
            $BI03Ameliorate: gqlEHSFormTargetInItemInput
            $BI03Misfit: Boolean
            $BI03Normal: Boolean
            $BJ01Ameliorate: gqlEHSFormTargetInItemInput
            $BJ01Misfit: Boolean
            $BJ01Normal: Boolean
            $BJ02Ameliorate: gqlEHSFormTargetInItemInput
            $BJ02Misfit: Boolean
            $BJ02Normal: Boolean
            $BJ03Ameliorate: gqlEHSFormTargetInItemInput
            $BJ03Misfit: Boolean
            $BJ03Normal: Boolean
            $BJ04Ameliorate: gqlEHSFormTargetInItemInput
            $BJ04Misfit: Boolean
            $BJ04Normal: Boolean
            $BJ05Ameliorate: gqlEHSFormTargetInItemInput
            $BJ05Misfit: Boolean
            $BJ05Normal: Boolean
            $checkDept: String
            $checkStaff: String
            $checkTarget: [gqlEHSFormTargetInput]
            $day: Date!
            $location: String
            $responsibleUnitSignature: [gqlEHSFormSignatureInput]
            $siteId: String!
            $supervisorUnitSignature: [gqlEHSFormSignatureInput]
        ) {
            updateEHSFormSpecial(
                BA01Ameliorate: $BA01Ameliorate
                BA01Misfit: $BA01Misfit
                BA01Normal: $BA01Normal
                BA02Ameliorate: $BA02Ameliorate
                BA02Misfit: $BA02Misfit
                BA02Normal: $BA02Normal
                BA03Ameliorate: $BA03Ameliorate
                BA03Misfit: $BA03Misfit
                BA03Normal: $BA03Normal
                BA04Ameliorate: $BA04Ameliorate
                BA04Misfit: $BA04Misfit
                BA04Normal: $BA04Normal
                BA05Ameliorate: $BA05Ameliorate
                BA05Misfit: $BA05Misfit
                BA05Normal: $BA05Normal
                BA06Ameliorate: $BA06Ameliorate
                BA06Misfit: $BA06Misfit
                BA06Normal: $BA06Normal
                BA07Ameliorate: $BA07Ameliorate
                BA07Misfit: $BA07Misfit
                BA07Normal: $BA07Normal
                BA08Ameliorate: $BA08Ameliorate
                BA08Misfit: $BA08Misfit
                BA08Normal: $BA08Normal
                BA09Ameliorate: $BA09Ameliorate
                BA09Misfit: $BA09Misfit
                BA09Normal: $BA09Normal
                BB01Ameliorate: $BB01Ameliorate
                BB01Misfit: $BB01Misfit
                BB01Normal: $BB01Normal
                BB02Ameliorate: $BB02Ameliorate
                BB02Misfit: $BB02Misfit
                BB02Normal: $BB02Normal
                BB03Ameliorate: $BB03Ameliorate
                BB03Misfit: $BB03Misfit
                BB03Normal: $BB03Normal
                BB04Ameliorate: $BB04Ameliorate
                BB04Misfit: $BB04Misfit
                BB04Normal: $BB04Normal
                BB05Ameliorate: $BB05Ameliorate
                BB05Misfit: $BB05Misfit
                BB05Normal: $BB05Normal
                BB06Ameliorate: $BB06Ameliorate
                BB06Misfit: $BB06Misfit
                BB06Normal: $BB06Normal
                BB07Ameliorate: $BB07Ameliorate
                BB07Misfit: $BB07Misfit
                BB07Normal: $BB07Normal
                BB08Ameliorate: $BB08Ameliorate
                BB08Misfit: $BB08Misfit
                BB08Normal: $BB08Normal
                BB09Ameliorate: $BB09Ameliorate
                BB09Misfit: $BB09Misfit
                BB09Normal: $BB09Normal
                BB10Ameliorate: $BB10Ameliorate
                BB10Misfit: $BB10Misfit
                BB10Normal: $BB10Normal
                BB11Ameliorate: $BB11Ameliorate
                BB11Misfit: $BB11Misfit
                BB11Normal: $BB11Normal
                BB12Ameliorate: $BB12Ameliorate
                BB12Misfit: $BB12Misfit
                BB12Normal: $BB12Normal
                BB13Ameliorate: $BB13Ameliorate
                BB13Misfit: $BB13Misfit
                BB13Normal: $BB13Normal
                BB14Ameliorate: $BB14Ameliorate
                BB14Misfit: $BB14Misfit
                BB14Normal: $BB14Normal
                BB15Ameliorate: $BB15Ameliorate
                BB15Misfit: $BB15Misfit
                BB15Normal: $BB15Normal
                BB16Ameliorate: $BB16Ameliorate
                BB16Misfit: $BB16Misfit
                BB16Normal: $BB16Normal
                BB17Ameliorate: $BB17Ameliorate
                BB17Misfit: $BB17Misfit
                BB17Normal: $BB17Normal
                BC01Ameliorate: $BC01Ameliorate
                BC01Misfit: $BC01Misfit
                BC01Normal: $BC01Normal
                BC02Ameliorate: $BC02Ameliorate
                BC02Misfit: $BC02Misfit
                BC02Normal: $BC02Normal
                BC03Ameliorate: $BC03Ameliorate
                BC03Misfit: $BC03Misfit
                BC03Normal: $BC03Normal
                BC04Ameliorate: $BC04Ameliorate
                BC04Misfit: $BC04Misfit
                BC04Normal: $BC04Normal
                BC05Ameliorate: $BC05Ameliorate
                BC05Misfit: $BC05Misfit
                BC05Normal: $BC05Normal
                BC06Ameliorate: $BC06Ameliorate
                BC06Misfit: $BC06Misfit
                BC06Normal: $BC06Normal
                BC07Ameliorate: $BC07Ameliorate
                BC07Misfit: $BC07Misfit
                BC07Normal: $BC07Normal
                BC08Ameliorate: $BC08Ameliorate
                BC08Misfit: $BC08Misfit
                BC08Normal: $BC08Normal
                BC09Ameliorate: $BC09Ameliorate
                BC09Misfit: $BC09Misfit
                BC09Normal: $BC09Normal
                BC10Ameliorate: $BC10Ameliorate
                BC10Misfit: $BC10Misfit
                BC10Normal: $BC10Normal
                BC11Ameliorate: $BC11Ameliorate
                BC11Misfit: $BC11Misfit
                BC11Normal: $BC11Normal
                BD01Ameliorate: $BD01Ameliorate
                BD01Misfit: $BD01Misfit
                BD01Normal: $BD01Normal
                BD02Ameliorate: $BD02Ameliorate
                BD02Misfit: $BD02Misfit
                BD02Normal: $BD02Normal
                BD03Ameliorate: $BD03Ameliorate
                BD03Misfit: $BD03Misfit
                BD03Normal: $BD03Normal
                BD04Ameliorate: $BD04Ameliorate
                BD04Misfit: $BD04Misfit
                BD04Normal: $BD04Normal
                BD05Ameliorate: $BD05Ameliorate
                BD05Misfit: $BD05Misfit
                BD05Normal: $BD05Normal
                BD06Ameliorate: $BD06Ameliorate
                BD06Misfit: $BD06Misfit
                BD06Normal: $BD06Normal
                BD07Ameliorate: $BD07Ameliorate
                BD07Misfit: $BD07Misfit
                BD07Normal: $BD07Normal
                BD08Ameliorate: $BD08Ameliorate
                BD08Misfit: $BD08Misfit
                BD08Normal: $BD08Normal
                BD09Ameliorate: $BD09Ameliorate
                BD09Misfit: $BD09Misfit
                BD09Normal: $BD09Normal
                BD10Ameliorate: $BD10Ameliorate
                BD10Misfit: $BD10Misfit
                BD10Normal: $BD10Normal
                BD11Ameliorate: $BD11Ameliorate
                BD11Misfit: $BD11Misfit
                BD11Normal: $BD11Normal
                BD12Ameliorate: $BD12Ameliorate
                BD12Misfit: $BD12Misfit
                BD12Normal: $BD12Normal
                BD13Ameliorate: $BD13Ameliorate
                BD13Misfit: $BD13Misfit
                BD13Normal: $BD13Normal
                BD14Ameliorate: $BD14Ameliorate
                BD14Misfit: $BD14Misfit
                BD14Normal: $BD14Normal
                BD15Ameliorate: $BD15Ameliorate
                BD15Misfit: $BD15Misfit
                BD15Normal: $BD15Normal
                BD16Ameliorate: $BD16Ameliorate
                BD16Misfit: $BD16Misfit
                BD16Normal: $BD16Normal
                BE01Ameliorate: $BE01Ameliorate
                BE01Misfit: $BE01Misfit
                BE01Normal: $BE01Normal
                BE02Ameliorate: $BE02Ameliorate
                BE02Misfit: $BE02Misfit
                BE02Normal: $BE02Normal
                BE03Ameliorate: $BE03Ameliorate
                BE03Misfit: $BE03Misfit
                BE03Normal: $BE03Normal
                BE04Ameliorate: $BE04Ameliorate
                BE04Misfit: $BE04Misfit
                BE04Normal: $BE04Normal
                BF01Ameliorate: $BF01Ameliorate
                BF01Misfit: $BF01Misfit
                BF01Normal: $BF01Normal
                BF02Ameliorate: $BF02Ameliorate
                BF02Misfit: $BF02Misfit
                BF02Normal: $BF02Normal
                BF03Ameliorate: $BF03Ameliorate
                BF03Misfit: $BF03Misfit
                BF03Normal: $BF03Normal
                BF04Ameliorate: $BF04Ameliorate
                BF04Misfit: $BF04Misfit
                BF04Normal: $BF04Normal
                BF05Ameliorate: $BF05Ameliorate
                BF05Misfit: $BF05Misfit
                BF05Normal: $BF05Normal
                BF06Ameliorate: $BF06Ameliorate
                BF06Misfit: $BF06Misfit
                BF06Normal: $BF06Normal
                BF07Ameliorate: $BF07Ameliorate
                BF07Misfit: $BF07Misfit
                BF07Normal: $BF07Normal
                BF08Ameliorate: $BF08Ameliorate
                BF08Misfit: $BF08Misfit
                BF08Normal: $BF08Normal
                BF09Ameliorate: $BF09Ameliorate
                BF09Misfit: $BF09Misfit
                BF09Normal: $BF09Normal
                BF10Ameliorate: $BF10Ameliorate
                BF10Misfit: $BF10Misfit
                BF10Normal: $BF10Normal
                BF11Ameliorate: $BF11Ameliorate
                BF11Misfit: $BF11Misfit
                BF11Normal: $BF11Normal
                BG01Ameliorate: $BG01Ameliorate
                BG01Misfit: $BG01Misfit
                BG01Normal: $BG01Normal
                BG02Ameliorate: $BG02Ameliorate
                BG02Misfit: $BG02Misfit
                BG02Normal: $BG02Normal
                BG03Ameliorate: $BG03Ameliorate
                BG03Misfit: $BG03Misfit
                BG03Normal: $BG03Normal
                BG04Ameliorate: $BG04Ameliorate
                BG04Misfit: $BG04Misfit
                BG04Normal: $BG04Normal
                BG05Ameliorate: $BG05Ameliorate
                BG05Misfit: $BG05Misfit
                BG05Normal: $BG05Normal
                BG06Ameliorate: $BG06Ameliorate
                BG06Misfit: $BG06Misfit
                BG06Normal: $BG06Normal
                BG07Ameliorate: $BG07Ameliorate
                BG07Misfit: $BG07Misfit
                BG07Normal: $BG07Normal
                BH01Ameliorate: $BH01Ameliorate
                BH01Misfit: $BH01Misfit
                BH01Normal: $BH01Normal
                BH02Ameliorate: $BH02Ameliorate
                BH02Misfit: $BH02Misfit
                BH02Normal: $BH02Normal
                BH03Ameliorate: $BH03Ameliorate
                BH03Misfit: $BH03Misfit
                BH03Normal: $BH03Normal
                BH04Ameliorate: $BH04Ameliorate
                BH04Misfit: $BH04Misfit
                BH04Normal: $BH04Normal
                BI01Ameliorate: $BI01Ameliorate
                BI01Misfit: $BI01Misfit
                BI01Normal: $BI01Normal
                BI02Ameliorate: $BI02Ameliorate
                BI02Misfit: $BI02Misfit
                BI02Normal: $BI02Normal
                BI03Ameliorate: $BI03Ameliorate
                BI03Misfit: $BI03Misfit
                BI03Normal: $BI03Normal
                BJ01Ameliorate: $BJ01Ameliorate
                BJ01Misfit: $BJ01Misfit
                BJ01Normal: $BJ01Normal
                BJ02Ameliorate: $BJ02Ameliorate
                BJ02Misfit: $BJ02Misfit
                BJ02Normal: $BJ02Normal
                BJ03Ameliorate: $BJ03Ameliorate
                BJ03Misfit: $BJ03Misfit
                BJ03Normal: $BJ03Normal
                BJ04Ameliorate: $BJ04Ameliorate
                BJ04Misfit: $BJ04Misfit
                BJ04Normal: $BJ04Normal
                BJ05Ameliorate: $BJ05Ameliorate
                BJ05Misfit: $BJ05Misfit
                BJ05Normal: $BJ05Normal
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

    itemGroups: Record<SpecialGroupKey, IEHSFormNormalGroup> = {
        BA: {
            name: '動火作業 BA',
            items: [
                {
                    code: 'BA01',
                    content:
                        '作業現場備有正確、足夠之滅火器，且有效期限未過期。',
                    normal: 'BA01Normal',
                    misfit: 'BA01Misfit',
                    ameliorate: 'BA01Ameliorate',
                },
                {
                    code: 'BA02',
                    content: '作業現場易燃物已移除或加以防護。',
                    normal: 'BA02Normal',
                    misfit: 'BA02Misfit',
                    ameliorate: 'BA02Ameliorate',
                },
                {
                    code: 'BA03',
                    content:
                        '氣體鋼瓶集中時，保持豎立，或使用專用手推車搬運氣體鋼瓶。',
                    normal: 'BA03Normal',
                    misfit: 'BA03Misfit',
                    ameliorate: 'BA03Ameliorate',
                },
                {
                    code: 'BA04',
                    content:
                        '氣體鋼瓶使用鐵鍊、非彈性繩索固定，或每日作業後裝妥護蓋。',
                    normal: 'BA04Normal',
                    misfit: 'BA04Misfit',
                    ameliorate: 'BA04Ameliorate',
                },
                {
                    code: 'BA05',
                    content: '焊接機具裝設有效之自動電擊防止裝置及漏電斷路器。',
                    normal: 'BA05Normal',
                    misfit: 'BA05Misfit',
                    ameliorate: 'BA05Ameliorate',
                },
                {
                    code: 'BA06',
                    content:
                        '氧氣鋼瓶裝有合乎規格之專用減壓調節器及防爆逆止閥。',
                    normal: 'BA06Normal',
                    misfit: 'BA06Misfit',
                    ameliorate: 'BA06Ameliorate',
                },
                {
                    code: 'BA07',
                    content:
                        '高處動火有以耐燃材料阻隔、收集、抑制火星四散或掉落。',
                    normal: 'BA07Normal',
                    misfit: 'BA07Misfit',
                    ameliorate: 'BA07Ameliorate',
                },
                {
                    code: 'BA08',
                    content:
                        '焊接時使用絕緣良好之安全手把、配戴盔帽及遮光玻璃。',
                    normal: 'BA08Normal',
                    misfit: 'BA08Misfit',
                    ameliorate: 'BA08Ameliorate',
                },
                {
                    code: 'BA09',
                    content:
                        '焊接地線已儘可能接近焊接點，電流迴路無經其它設備而導致跳電之虞。',
                    normal: 'BA09Normal',
                    misfit: 'BA09Misfit',
                    ameliorate: 'BA09Ameliorate',
                },
            ],
        },
        BB: {
            name: '高架作業 BB',
            items: [
                {
                    code: 'BB01',
                    content:
                        '依照施工地點之地形、地物使用下列之安全器具：(a)施工架/作業平台(含牢固護欄)(b)自動升降機(c)安全帶(d)安全網(e)A字梯(f)安全母索(g)其他防墜措施。',
                    normal: 'BB01Normal',
                    misfit: 'BB01Misfit',
                    ameliorate: 'BB01Ameliorate',
                },
                {
                    code: 'BB02',
                    content:
                        '未僱用下列人員從事高架作業：(a)患有高血壓、心血管疾病或貧血者(b)曾患有癲癇精神或神精疾病(c)平衡機能失常者(d)患有哮喘症者(e)四肢不全者(f)色盲者(g)聽力不正常者(h)酗酒者(i)身體虛弱者(j)情緒不佳有安全顧慮者(k)年齡未滿十八歲或超過五十五歲者。',
                    normal: 'BB02Normal',
                    misfit: 'BB02Misfit',
                    ameliorate: 'BB02Ameliorate',
                },
                {
                    code: 'BB03',
                    content: '施工架上未再搭接梯子或踏凳等從事作業。',
                    normal: 'BB03Normal',
                    misfit: 'BB03Misfit',
                    ameliorate: 'BB03Ameliorate',
                },
                {
                    code: 'BB04',
                    content: '移動式施工架於定位時應踩下車輪煞車器固定。',
                    normal: 'BB04Normal',
                    misfit: 'BB04Misfit',
                    ameliorate: 'BB04Ameliorate',
                },
                {
                    code: 'BB05',
                    content: '人員位於施工架上時，未移動施工架。',
                    normal: 'BB05Normal',
                    misfit: 'BB05Misfit',
                    ameliorate: 'BB05Ameliorate',
                },
                {
                    code: 'BB06',
                    content:
                        '施工使用A字梯時，以一人在梯上一人在下扶持A字梯之夥同方式作業(作業廠區規定時適用) 。',
                    normal: 'BB06Normal',
                    misfit: 'BB06Misfit',
                    ameliorate: 'BB06Ameliorate',
                },
                {
                    code: 'BB07',
                    content: '未使用損毀凹陷的A字梯、施工架。',
                    normal: 'BB07Normal',
                    misfit: 'BB07Misfit',
                    ameliorate: 'BB07Ameliorate',
                },
                {
                    code: 'BB08',
                    content:
                        '高差超過1.5公尺以上之場所，使用人員能安全上下之設備。',
                    normal: 'BB08Normal',
                    misfit: 'BB08Misfit',
                    ameliorate: 'BB08Ameliorate',
                },
                {
                    code: 'BB09',
                    content: '未從高處投下物體，或使用適當之承受設備。',
                    normal: 'BB09Normal',
                    misfit: 'BB09Misfit',
                    ameliorate: 'BB09Ameliorate',
                },
                {
                    code: 'BB10',
                    content:
                        '高空工作車應標示空重、載重、額定荷重等，且不得超過高空工作車之積載荷重及能力。',
                    normal: 'BB10Normal',
                    misfit: 'BB10Misfit',
                    ameliorate: 'BB10Ameliorate',
                },
                {
                    code: 'BB11',
                    content:
                        '高空工作車事先應視作業場所之狀況、工作台高度、伸臂長度及作業場所地形等，規定適當之行駛速率，操作人員應依規定操作。',
                    normal: 'BB11Normal',
                    misfit: 'BB11Misfit',
                    ameliorate: 'BB11Ameliorate',
                },
                {
                    code: 'BB12',
                    content:
                        '在工作台以外之處所操作工作台時，操作人員與工作台上之人員間應規定統一指揮信號，並依信號從事指揮作業。',
                    normal: 'BB12Normal',
                    misfit: 'BB12Misfit',
                    ameliorate: 'BB12Ameliorate',
                },
                {
                    code: 'BB13',
                    content:
                        '除乘坐席位及工作台外不得搭載人員，且作業時禁止非相關人員進入操作半徑內，或附近有危險之虞之場所。',
                    normal: 'BB13Normal',
                    misfit: 'BB13Misfit',
                    ameliorate: 'BB13Ameliorate',
                },
                {
                    code: 'BB14',
                    content:
                        '應將其外伸撐座完全伸出，並採取防止地盤沉陷或崩塌等必要措施。',
                    normal: 'BB14Normal',
                    misfit: 'BB14Misfit',
                    ameliorate: 'BB14Ameliorate',
                },
                {
                    code: 'BB15',
                    content: '高空工作車禁止停放斜坡，除非已採有安全措施。',
                    normal: 'BB15Normal',
                    misfit: 'BB15Misfit',
                    ameliorate: 'BB15Ameliorate',
                },
                {
                    code: 'BB16',
                    content:
                        '使用高空工作車從事作業時，工作台上的人員應佩帶背負式安全帶，工作台出入口處應有確保防止人員墜落的安全設施。',
                    normal: 'BB16Normal',
                    misfit: 'BB16Misfit',
                    ameliorate: 'BB16Ameliorate',
                },
                {
                    code: 'BB17',
                    content:
                        '工作車移動時，應將工作台下降至最低位置；若不使用時應確實使用制動裝置保持高空工作車於穩定狀態。',
                    normal: 'BB17Normal',
                    misfit: 'BB17Misfit',
                    ameliorate: 'BB17Ameliorate',
                },
            ],
        },
        BC: {
            name: '侷限空間作業 BC',
            items: [
                {
                    code: 'BC01',
                    content:
                        '已對局限空間進行氧氣含量及有害物濃度測試合格後才進入作業。(O2濃度18~21%)',
                    normal: 'BC01Normal',
                    misfit: 'BC01Misfit',
                    ameliorate: 'BC01Ameliorate',
                },
                {
                    code: 'BC02',
                    content: '缺氧作業主管於現場全程監督作業安全。',
                    normal: 'BC02Normal',
                    misfit: 'BC02Misfit',
                    ameliorate: 'BC02Ameliorate',
                },
                {
                    code: 'BC03',
                    content: '人體有害物質已做妥隔離、遮斷、盲封、清除。',
                    normal: 'BC03Normal',
                    misfit: 'BC03Misfit',
                    ameliorate: 'BC03Ameliorate',
                },
                {
                    code: 'BC04',
                    content: '作業現場備有良好且正確運作之通風設備。',
                    normal: 'BC04Normal',
                    misfit: 'BC04Misfit',
                    ameliorate: 'BC04Ameliorate',
                },
                {
                    code: 'BC05',
                    content: '人員經許可後，再進入局限空間。',
                    normal: 'BC05Normal',
                    misfit: 'BC05Misfit',
                    ameliorate: 'BC05Ameliorate',
                },
                {
                    code: 'BC06',
                    content: '許可進入局限空間作業之人員已載明進入時間及期限。',
                    normal: 'BC06Normal',
                    misfit: 'BC06Misfit',
                    ameliorate: 'BC06Ameliorate',
                },
                {
                    code: 'BC07',
                    content:
                        '引火性液體之蒸氣或可燃性氣體之濃度不得超過其爆炸下限之30%。',
                    normal: 'BC07Normal',
                    misfit: 'BC07Misfit',
                    ameliorate: 'BC07Ameliorate',
                },
                {
                    code: 'BC08',
                    content:
                        '人員應配戴適當之呼吸防護具(濾過式、供氣式呼吸防護具等)。',
                    normal: 'BC08Normal',
                    misfit: 'BC08Misfit',
                    ameliorate: 'BC08Ameliorate',
                },
                {
                    code: 'BC09',
                    content: '已訂定危害防止計劃供依循。',
                    normal: 'BC09Normal',
                    misfit: 'BC09Misfit',
                    ameliorate: 'BC09Ameliorate',
                },
                {
                    code: 'BC10',
                    content: '於作業場所顯而易見處公告禁止進入。',
                    normal: 'BC10Normal',
                    misfit: 'BC10Misfit',
                    ameliorate: 'BC10Ameliorate',
                },
                {
                    code: 'BC11',
                    content: '防護設備及救援設備已準備。',
                    normal: 'BC11Normal',
                    misfit: 'BC11Misfit',
                    ameliorate: 'BC11Ameliorate',
                },
            ],
        },
        BD: {
            name: '電力作業 BD',
            items: [
                {
                    code: 'BD01',
                    content: '插頭依規定格式標示公司名稱、連絡人及連絡電話。',
                    normal: 'BD01Normal',
                    misfit: 'BD01Misfit',
                    ameliorate: 'BD01Ameliorate',
                },
                {
                    code: 'BD02',
                    content: '使用之電線、插頭無破損或絕緣不良之現象。',
                    normal: 'BD02Normal',
                    misfit: 'BD02Misfit',
                    ameliorate: 'BD02Ameliorate',
                },
                {
                    code: 'BD03',
                    content:
                        '電線橫越道路及車輛行駛較頻繁之場所，以管路埋設地下或以厚鋼管、槽鐵等掩護或架高配設，且未形成通行障礙。',
                    normal: 'BD03Normal',
                    misfit: 'BD03Misfit',
                    ameliorate: 'BD03Ameliorate',
                },
                {
                    code: 'BD04',
                    content: '使用經檢驗合格之電器設備。',
                    normal: 'BD04Normal',
                    misfit: 'BD04Misfit',
                    ameliorate: 'BD04Ameliorate',
                },
                {
                    code: 'BD05',
                    content: '未以電線或其他金屬代替保險絲。',
                    normal: 'BD05Normal',
                    misfit: 'BD05Misfit',
                    ameliorate: 'BD05Ameliorate',
                },
                {
                    code: 'BD06',
                    content: '施工用電使用〝施工專用電盤〞接電。',
                    normal: 'BD06Normal',
                    misfit: 'BD06Misfit',
                    ameliorate: 'BD06Ameliorate',
                },
                {
                    code: 'BD07',
                    content:
                        '使用〝施工專用電盤〞由上下開孔接電，不會妨礙電盤門開閉。',
                    normal: 'BD07Normal',
                    misfit: 'BD07Misfit',
                    ameliorate: 'BD07Ameliorate',
                },
                {
                    code: 'BD08',
                    content: '危險地區加裝護欄及掛有安全標示。',
                    normal: 'BD08Normal',
                    misfit: 'BD08Misfit',
                    ameliorate: 'BD08Ameliorate',
                },
                {
                    code: 'BD09',
                    content: '電氣設備遠離易燃品或有適當防護。',
                    normal: 'BD09Normal',
                    misfit: 'BD09Misfit',
                    ameliorate: 'BD09Ameliorate',
                },
                {
                    code: 'BD10',
                    content:
                        '非指定人員未隨意開動或關閉機械設備，以及工作起動後有關電氣設備部分之使用，經機械、設備之管理人員許可。',
                    normal: 'BD10Normal',
                    misfit: 'BD10Misfit',
                    ameliorate: 'BD10Ameliorate',
                },
                {
                    code: 'BD11',
                    content:
                        '馬達、穿孔器、一般常用之測試儀器及電動手工具，具有良好之絕緣設備，才可使用。',
                    normal: 'BD11Normal',
                    misfit: 'BD11Misfit',
                    ameliorate: 'BD11Ameliorate',
                },
                {
                    code: 'BD12',
                    content: '電動工具使用前，依規定接地。',
                    normal: 'BD12Normal',
                    misfit: 'BD12Misfit',
                    ameliorate: 'BD12Ameliorate',
                },
                {
                    code: 'BD13',
                    content:
                        '電動工具裝設良好絕緣插頭，未以裸接方式直接插入插座上。',
                    normal: 'BD13Normal',
                    misfit: 'BD13Misfit',
                    ameliorate: 'BD13Ameliorate',
                },
                {
                    code: 'BD14',
                    content:
                        '在潮溼地區著乾燥之橡膠鞋及絕緣等措施，才使用電動手工具。',
                    normal: 'BD14Normal',
                    misfit: 'BD14Misfit',
                    ameliorate: 'BD14Ameliorate',
                },
                {
                    code: 'BD15',
                    content: '使用之延長線有過載保護裝置。',
                    normal: 'BD15Normal',
                    misfit: 'BD15Misfit',
                    ameliorate: 'BD15Ameliorate',
                },
                {
                    code: 'BD16',
                    content:
                        '活線或臨時斷/供電作業，已標示、隔離，且作業後復原環境。',
                    normal: 'BD16Normal',
                    misfit: 'BD16Misfit',
                    ameliorate: 'BD16Ameliorate',
                },
            ],
        },
        BE: {
            name: '吊籠作業 BE',
            items: [
                {
                    code: 'BE01',
                    content: '吊籠經檢查合格取得檢查合格證。',
                    normal: 'BE01Normal',
                    misfit: 'BE01Misfit',
                    ameliorate: 'BE01Ameliorate',
                },
                {
                    code: 'BE02',
                    content: '操作人員經教育訓練合格，領有結業證書。',
                    normal: 'BE02Normal',
                    misfit: 'BE02Misfit',
                    ameliorate: 'BE02Ameliorate',
                },
                {
                    code: 'BE03',
                    content: '每次作業前確實做好檢點工作。',
                    normal: 'BE03Normal',
                    misfit: 'BE03Misfit',
                    ameliorate: 'BE03Ameliorate',
                },
                {
                    code: 'BE04',
                    content: '作業人員確實使用防墜落裝置。',
                    normal: 'BE04Normal',
                    misfit: 'BE04Misfit',
                    ameliorate: 'BE04Ameliorate',
                },
            ],
        },
        BF: {
            name: '起重吊掛作業 BF',
            items: [
                {
                    code: 'BF01',
                    content: '於吊掛現場設置警告標誌且有專人管制人員通行。',
                    normal: 'BF01Normal',
                    misfit: 'BF01Misfit',
                    ameliorate: 'BF01Ameliorate',
                },
                {
                    code: 'BF02',
                    content: '使用之起重機具經檢查合格取得檢查合格證。',
                    normal: 'BF02Normal',
                    misfit: 'BF02Misfit',
                    ameliorate: 'BF02Ameliorate',
                },
                {
                    code: 'BF03',
                    content: '起重機具標示最高負荷，且未超過此項限制。',
                    normal: 'BF03Normal',
                    misfit: 'BF03Misfit',
                    ameliorate: 'BF03Ameliorate',
                },
                {
                    code: 'BF04',
                    content:
                        '起重機具之吊鉤，有防止吊舉中所吊物體脫落之安全防滑舌片。',
                    normal: 'BF04Normal',
                    misfit: 'BF04Misfit',
                    ameliorate: 'BF04Ameliorate',
                },
                {
                    code: 'BF05',
                    content: '設置/使用過捲揚預防裝置。',
                    normal: 'BF05Normal',
                    misfit: 'BF05Misfit',
                    ameliorate: 'BF05Ameliorate',
                },
                {
                    code: 'BF06',
                    content: '作業現場有一人以上執行吊掛指揮、督導。',
                    normal: 'BF06Normal',
                    misfit: 'BF06Misfit',
                    ameliorate: 'BF06Ameliorate',
                },
                {
                    code: 'BF07',
                    content: '人員未由吊掛現場下方通過。',
                    normal: 'BF07Normal',
                    misfit: 'BF07Misfit',
                    ameliorate: 'BF07Ameliorate',
                },
                {
                    code: 'BF08',
                    content: '使用、操作危險性機械設備，持有合格操作證照。',
                    normal: 'BF08Normal',
                    misfit: 'BF08Misfit',
                    ameliorate: 'BF08Ameliorate',
                },
                {
                    code: 'BF09',
                    content: '實施作業前檢點。',
                    normal: 'BF09Normal',
                    misfit: 'BF09Misfit',
                    ameliorate: 'BF09Ameliorate',
                },
                {
                    code: 'BF10',
                    content: '機械運轉時有警示燈或蜂鳴裝置。',
                    normal: 'BF10Normal',
                    misfit: 'BF10Misfit',
                    ameliorate: 'BF10Ameliorate',
                },
                {
                    code: 'BF11',
                    content: '未以起重機或吊掛機為人員升降工具。',
                    normal: 'BF11Normal',
                    misfit: 'BF11Misfit',
                    ameliorate: 'BF11Ameliorate',
                },
            ],
        },
        BG: {
            name: '施工架組裝作業 BG',
            items: [
                {
                    code: 'BG01',
                    content: '施工架組配作業主管於現場全程監督作業安全。',
                    normal: 'BG01Normal',
                    misfit: 'BG01Misfit',
                    ameliorate: 'BG01Ameliorate',
                },
                {
                    code: 'BG02',
                    content: '施工架組配之基腳無沈陷之虞。',
                    normal: 'BG02Normal',
                    misfit: 'BG02Misfit',
                    ameliorate: 'BG02Ameliorate',
                },
                {
                    code: 'BG03',
                    content: '遇地震時立即停止作業，使人員退避至安全避難場所。',
                    normal: 'BG03Normal',
                    misfit: 'BG03Misfit',
                    ameliorate: 'BG03Ameliorate',
                },
                {
                    code: 'BG04',
                    content: '地震或地質變化後，徹底檢查施工架後再行作業。',
                    normal: 'BG04Normal',
                    misfit: 'BG04Misfit',
                    ameliorate: 'BG04Ameliorate',
                },
                {
                    code: 'BG05',
                    content:
                        '確實完成組配施工架之安全設備（如插銷、交叉連桿等）。',
                    normal: 'BG05Normal',
                    misfit: 'BG05Misfit',
                    ameliorate: 'BG05Ameliorate',
                },
                {
                    code: 'BG06',
                    content: '施工架組配物料運送前確實綁紮，無掉落之虞。',
                    normal: 'BG06Normal',
                    misfit: 'BG06Misfit',
                    ameliorate: 'BG06Ameliorate',
                },
                {
                    code: 'BG07',
                    content:
                        '施工架組配作業靠近電線、輸配電設備，有護圍、絕緣或掩蔽。',
                    normal: 'BG07Normal',
                    misfit: 'BG07Misfit',
                    ameliorate: 'BG07Ameliorate',
                },
            ],
        },
        BH: {
            name: '管線作業 BH',
            items: [
                {
                    code: 'BH01',
                    content:
                        '舊電力、化學或氣體管線拆除前，確認管內已無殘留危害物程序。',
                    normal: 'BH01Normal',
                    misfit: 'BH01Misfit',
                    ameliorate: 'BH01Ameliorate',
                },
                {
                    code: 'BH02',
                    content: '管線清洗、拆離前，人員確實穿著防護用具。',
                    normal: 'BH02Normal',
                    misfit: 'BH02Misfit',
                    ameliorate: 'BH02Ameliorate',
                },
                {
                    code: 'BH03',
                    content: '作業時，主管在現場場督導。',
                    normal: 'BH03Normal',
                    misfit: 'BH03Misfit',
                    ameliorate: 'BH03Ameliorate',
                },
                {
                    code: 'BH04',
                    content:
                        '管路拆除範圍，有防止非相關人員進入之標示及管制措施。',
                    normal: 'BH04Normal',
                    misfit: 'BH04Misfit',
                    ameliorate: 'BH04Ameliorate',
                },
            ],
        },
        BI: {
            name: '開口作業 BI',
            items: [
                {
                    code: 'BI01',
                    content: '工作場所之地面或牆壁如有開口，已裝設護欄或蓋板。',
                    normal: 'BI01Normal',
                    misfit: 'BI01Misfit',
                    ameliorate: 'BI01Ameliorate',
                },
                {
                    code: 'BI02',
                    content: '移開高架地板施工前，已先設置警示圍籬、標示。',
                    normal: 'BI02Normal',
                    misfit: 'BI02Misfit',
                    ameliorate: 'BI02Ameliorate',
                },
                {
                    code: 'BI03',
                    content: '移開高架地板施工完畢後，已將高架地板復原並固定。',
                    normal: 'BI03Normal',
                    misfit: 'BI03Misfit',
                    ameliorate: 'BI03Ameliorate',
                },
            ],
        },
        BJ: {
            name: '化學作業 BJ',
            items: [
                {
                    code: 'BJ01',
                    content: '化學物質皆清楚標示。',
                    normal: 'BJ01Normal',
                    misfit: 'BJ01Misfit',
                    ameliorate: 'BJ01Ameliorate',
                },
                {
                    code: 'BJ02',
                    content: '化學物質使用完畢後，置於指定地點。',
                    normal: 'BJ02Normal',
                    misfit: 'BJ02Misfit',
                    ameliorate: 'BJ02Ameliorate',
                },
                {
                    code: 'BJ03',
                    content:
                        '化學物質使用、處置、儲存、作業，備有物質安全資料表(MSDS)。',
                    normal: 'BJ03Normal',
                    misfit: 'BJ03Misfit',
                    ameliorate: 'BJ03Ameliorate',
                },
                {
                    code: 'BJ04',
                    content: '可能產生危害之區域，設有警告標示及護欄。',
                    normal: 'BJ04Normal',
                    misfit: 'BJ04Misfit',
                    ameliorate: 'BJ04Ameliorate',
                },
                {
                    code: 'BJ05',
                    content: '化學物質作業，已穿戴適當的個人防護具。',
                    normal: 'BJ05Normal',
                    misfit: 'BJ05Misfit',
                    ameliorate: 'BJ05Ameliorate',
                },
            ],
        },
    };

    constructor(
        siteId: string,
        number: string,
        supervisorSignature: SignatureStateItem,
        responsibleSignatures: SignaturesStateItem
    ) {
        super(siteId, number, supervisorSignature, responsibleSignatures);
    }

    getInitialValues(): IEHSFormSpecial {
        const base = super.getInitialValues();
        return {
            ...base,
            BA01Normal: null,
            BA02Normal: null,
            BA03Normal: null,
            BA04Normal: null,
            BA05Normal: null,
            BA06Normal: null,
            BA07Normal: null,
            BA08Normal: null,
            BA09Normal: null,
            BB01Normal: null,
            BB02Normal: null,
            BB03Normal: null,
            BB04Normal: null,
            BB05Normal: null,
            BB06Normal: null,
            BB07Normal: null,
            BB08Normal: null,
            BB09Normal: null,
            BB10Normal: null,
            BB11Normal: null,
            BB12Normal: null,
            BB13Normal: null,
            BB14Normal: null,
            BB15Normal: null,
            BB16Normal: null,
            BB17Normal: null,
            BC01Normal: null,
            BC02Normal: null,
            BC03Normal: null,
            BC04Normal: null,
            BC05Normal: null,
            BC06Normal: null,
            BC07Normal: null,
            BC08Normal: null,
            BC09Normal: null,
            BC10Normal: null,
            BC11Normal: null,
            BD01Normal: null,
            BD02Normal: null,
            BD03Normal: null,
            BD04Normal: null,
            BD05Normal: null,
            BD06Normal: null,
            BD07Normal: null,
            BD08Normal: null,
            BD09Normal: null,
            BD10Normal: null,
            BD11Normal: null,
            BD12Normal: null,
            BD13Normal: null,
            BD14Normal: null,
            BD15Normal: null,
            BD16Normal: null,
            BE01Normal: null,
            BE02Normal: null,
            BE03Normal: null,
            BE04Normal: null,
            BF01Normal: null,
            BF02Normal: null,
            BF03Normal: null,
            BF04Normal: null,
            BF05Normal: null,
            BF06Normal: null,
            BF07Normal: null,
            BF08Normal: null,
            BF09Normal: null,
            BF10Normal: null,
            BF11Normal: null,
            BG01Normal: null,
            BG02Normal: null,
            BG03Normal: null,
            BG04Normal: null,
            BG05Normal: null,
            BG06Normal: null,
            BG07Normal: null,
            BH01Normal: null,
            BH02Normal: null,
            BH03Normal: null,
            BH04Normal: null,
            BI01Normal: null,
            BI02Normal: null,
            BI03Normal: null,
            BJ01Normal: null,
            BJ02Normal: null,
            BJ03Normal: null,
            BJ04Normal: null,
            BJ05Normal: null,

            BA01Misfit: null,
            BA02Misfit: null,
            BA03Misfit: null,
            BA04Misfit: null,
            BA05Misfit: null,
            BA06Misfit: null,
            BA07Misfit: null,
            BA08Misfit: null,
            BA09Misfit: null,
            BB01Misfit: null,
            BB02Misfit: null,
            BB03Misfit: null,
            BB04Misfit: null,
            BB05Misfit: null,
            BB06Misfit: null,
            BB07Misfit: null,
            BB08Misfit: null,
            BB09Misfit: null,
            BB10Misfit: null,
            BB11Misfit: null,
            BB12Misfit: null,
            BB13Misfit: null,
            BB14Misfit: null,
            BB15Misfit: null,
            BB16Misfit: null,
            BB17Misfit: null,
            BC01Misfit: null,
            BC02Misfit: null,
            BC03Misfit: null,
            BC04Misfit: null,
            BC05Misfit: null,
            BC06Misfit: null,
            BC07Misfit: null,
            BC08Misfit: null,
            BC09Misfit: null,
            BC10Misfit: null,
            BC11Misfit: null,
            BD01Misfit: null,
            BD02Misfit: null,
            BD03Misfit: null,
            BD04Misfit: null,
            BD05Misfit: null,
            BD06Misfit: null,
            BD07Misfit: null,
            BD08Misfit: null,
            BD09Misfit: null,
            BD10Misfit: null,
            BD11Misfit: null,
            BD12Misfit: null,
            BD13Misfit: null,
            BD14Misfit: null,
            BD15Misfit: null,
            BD16Misfit: null,
            BE01Misfit: null,
            BE02Misfit: null,
            BE03Misfit: null,
            BE04Misfit: null,
            BF01Misfit: null,
            BF02Misfit: null,
            BF03Misfit: null,
            BF04Misfit: null,
            BF05Misfit: null,
            BF06Misfit: null,
            BF07Misfit: null,
            BF08Misfit: null,
            BF09Misfit: null,
            BF10Misfit: null,
            BF11Misfit: null,
            BG01Misfit: null,
            BG02Misfit: null,
            BG03Misfit: null,
            BG04Misfit: null,
            BG05Misfit: null,
            BG06Misfit: null,
            BG07Misfit: null,
            BH01Misfit: null,
            BH02Misfit: null,
            BH03Misfit: null,
            BH04Misfit: null,
            BI01Misfit: null,
            BI02Misfit: null,
            BI03Misfit: null,
            BJ01Misfit: null,
            BJ02Misfit: null,
            BJ03Misfit: null,
            BJ04Misfit: null,
            BJ05Misfit: null,

            BA01Ameliorate: [],
            BA02Ameliorate: [],
            BA03Ameliorate: [],
            BA04Ameliorate: [],
            BA05Ameliorate: [],
            BA06Ameliorate: [],
            BA07Ameliorate: [],
            BA08Ameliorate: [],
            BA09Ameliorate: [],
            BB01Ameliorate: [],
            BB02Ameliorate: [],
            BB03Ameliorate: [],
            BB04Ameliorate: [],
            BB05Ameliorate: [],
            BB06Ameliorate: [],
            BB07Ameliorate: [],
            BB08Ameliorate: [],
            BB09Ameliorate: [],
            BB10Ameliorate: [],
            BB11Ameliorate: [],
            BB12Ameliorate: [],
            BB13Ameliorate: [],
            BB14Ameliorate: [],
            BB15Ameliorate: [],
            BB16Ameliorate: [],
            BB17Ameliorate: [],
            BC01Ameliorate: [],
            BC02Ameliorate: [],
            BC03Ameliorate: [],
            BC04Ameliorate: [],
            BC05Ameliorate: [],
            BC06Ameliorate: [],
            BC07Ameliorate: [],
            BC08Ameliorate: [],
            BC09Ameliorate: [],
            BC10Ameliorate: [],
            BC11Ameliorate: [],
            BD01Ameliorate: [],
            BD02Ameliorate: [],
            BD03Ameliorate: [],
            BD04Ameliorate: [],
            BD05Ameliorate: [],
            BD06Ameliorate: [],
            BD07Ameliorate: [],
            BD08Ameliorate: [],
            BD09Ameliorate: [],
            BD10Ameliorate: [],
            BD11Ameliorate: [],
            BD12Ameliorate: [],
            BD13Ameliorate: [],
            BD14Ameliorate: [],
            BD15Ameliorate: [],
            BD16Ameliorate: [],
            BE01Ameliorate: [],
            BE02Ameliorate: [],
            BE03Ameliorate: [],
            BE04Ameliorate: [],
            BF01Ameliorate: [],
            BF02Ameliorate: [],
            BF03Ameliorate: [],
            BF04Ameliorate: [],
            BF05Ameliorate: [],
            BF06Ameliorate: [],
            BF07Ameliorate: [],
            BF08Ameliorate: [],
            BF09Ameliorate: [],
            BF10Ameliorate: [],
            BF11Ameliorate: [],
            BG01Ameliorate: [],
            BG02Ameliorate: [],
            BG03Ameliorate: [],
            BG04Ameliorate: [],
            BG05Ameliorate: [],
            BG06Ameliorate: [],
            BG07Ameliorate: [],
            BH01Ameliorate: [],
            BH02Ameliorate: [],
            BH03Ameliorate: [],
            BH04Ameliorate: [],
            BI01Ameliorate: [],
            BI02Ameliorate: [],
            BI03Ameliorate: [],
            BJ01Ameliorate: [],
            BJ02Ameliorate: [],
            BJ03Ameliorate: [],
            BJ04Ameliorate: [],
            BJ05Ameliorate: [],
        };
    }
}
