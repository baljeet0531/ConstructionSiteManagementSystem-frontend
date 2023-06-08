import { gql } from '@apollo/client';
import { EHSFormName } from '../../Interface/EHSForm/Common';
import { EHSFORM_SIGNATURE_FIELDS } from '../../Utils/GQLFragments';

const EHSFORM_OVERVIEW_INPUTS = `
(siteId: $siteId, day: $day, start: $start, end: $end)
`;
const EHSFORM_OVERVIEW_FIELDS = `
{
    siteId
    day
    checkDept
    checkStaff
    checkTarget {
      corpName
    }
    responsibleUnitSignature {
      ...gqlEHSFormSignatureFields
    }
    supervisorUnitSignature {
      ...gqlEHSFormSignatureFields
    }
}
`;

export const QUERY_EHS_FORM = (queryType: EHSFormName) => gql`
    ${EHSFORM_SIGNATURE_FIELDS}
    query EHSForm(
        $siteId: String!
        $day: Date
        $start: Date
        $end: Date
    ) {
        ${queryType === 'normal' ? `EHSFormNormal` : `EHSFormSpecial`}
        ${EHSFORM_OVERVIEW_INPUTS}
        ${EHSFORM_OVERVIEW_FIELDS}
    }
`;
