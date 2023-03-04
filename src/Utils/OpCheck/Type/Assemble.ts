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
        BG01: { ameliorate: 'BG01Ameliorate', content: '' },
        BG02: { ameliorate: 'BG02Ameliorate', content: '' },
        BG03: { ameliorate: 'BG03Ameliorate', content: '' },
        BG04: { ameliorate: 'BG04Ameliorate', content: '' },
        BG05: { ameliorate: 'BG05Ameliorate', content: '' },
        BG06: { ameliorate: 'BG06Ameliorate', content: '' },
        BG07: { ameliorate: 'BG07Ameliorate', content: '' },
    };

    offItems: Record<offKeys, IAssembleItem> = {
        AA19: { ameliorate: 'AA19Ameliorate', content: '' },
        AA22: { ameliorate: 'AA22Ameliorate', content: '' },
        AB01: { ameliorate: 'AB01Ameliorate', content: '' },
        AB02: { ameliorate: 'AB02Ameliorate', content: '' },
        AB03: { ameliorate: 'AB03Ameliorate', content: '' },
        AB04: { ameliorate: 'AB04Ameliorate', content: '' },
        AB05: { ameliorate: 'AB05Ameliorate', content: '' },
        AB06: { ameliorate: 'AB06Ameliorate', content: '' },
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
