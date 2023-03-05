import { gql } from '@apollo/client';
import { SIGNATURE_FIELDS } from '../../Utils/GQLFragments';

export type OpCheckName =
    | 'assemble' // 施工架組裝作業
    | 'cage' // 吊籠作業
    | 'chemical' // 化學作業
    | 'confineSpace' // 侷限空間作業
    | 'electric' // 電力作業
    | 'fire' // 動火作業
    | 'hole' // 開口作業
    | 'lift' // 起重吊掛作業
    | 'pipeDistruct' // 管線拆離作業
    | 'scafold'; // 高架作業

export type operationType =
    | '全部'
    | '動火作業'
    | '高架作業'
    | '侷限空間作業'
    | '電力作業'
    | '吊籠作業'
    | '起重吊掛作業'
    | '施工架組裝作業'
    | '管線拆離作業'
    | '開口作業'
    | '化學作業';

export type OpCheckQueryType = OpCheckName | 'all';

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
