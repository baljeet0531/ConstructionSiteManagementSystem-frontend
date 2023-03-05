import { gql } from '@apollo/client';
import { OpCheckQueryType } from '../../Interface/OpCheck/Common';
import { SIGNATURE_FIELDS } from '../../Utils/GQLFragments';

export const OpCheckGQL = (type: OpCheckQueryType) =>
    type === 'all'
        ? gql`
    ${SIGNATURE_FIELDS}
    query AllOpCheck($siteId: String!, $number: String, $startDate: Date, $endDate: Date) {
        assembleOpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
        cageOpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
        chemicalOpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
        confineSpaceOpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
        electricOpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
        fireOpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
        holeOpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
        liftOpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
        pipeDistructOpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
        scafoldOpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
    }
`
        : gql`
    ${SIGNATURE_FIELDS}
    query ${type}OpCheck($siteId: String!, $number: String, $startDate: Date, $endDate: Date) {
        ${type}OpCheck
        ${OPCHECK_INPUTS}
        ${OPCHECK_FIELDS}
    }
`;

const OPCHECK_INPUTS = `
    (
        siteId: $siteId
        number: $number
        startDate: $startDate
        endDate: $endDate
    )
`;

const OPCHECK_FIELDS = `
    {
        day
        number
        area
        department
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
`;

export const EXPORT_OPCHECK = gql`
    mutation ExportOps(
        $infos: [infoinput]!
        $siteId: String!
        $username: String!
    ) {
        exportOps(infos: $infos, siteId: $siteId, username: $username) {
            ok
            message
            path
        }
    }
`;
