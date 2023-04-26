import { gql } from '@apollo/client';

// "__typename" must be added in the last line of fragment
export const SIGNATURE_FIELDS = gql`
    fragment gqlSignatureFields on gqlSignature {
        no
        path
        time
        owner
        __typename
    }
`;

export const APPEARANCE_SIGN_FIELD = gql`
    fragment appearFields on gqlAppearanceSignature {
        no
        path
        time
        owner
        __typename
    }
`;

export const WORKITEM_FIELDS = gql`
    fragment workItem on gqlWorkItem {
        area
        today {
            dailyId
            siteId
            buildingName
            projectName
            location
            completeness
            description
            __typename
        }
        tomorrow {
            dailyId
            siteId
            buildingName
            projectName
            location
            description
            __typename
        }
        __typename
    }
`;
