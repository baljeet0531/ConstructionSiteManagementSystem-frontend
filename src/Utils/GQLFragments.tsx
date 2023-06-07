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
        }
        tomorrow {
            dailyId
            siteId
            buildingName
            projectName
            location
            description
        }
        __typename
    }
`;

export const EHSFORM_SIGNATURE_FIELDS = gql`
    fragment gqlSafetyCheckSignatureFields on gqlSafetyCheckSignature {
        no
        siteId
        day
        owner
        path
        time
        signatureType
        __typename
    }
`;

export const EHSFORM_IN_ITEM_FIELDS = gql`
    fragment gqlSafetyCheckTargetInItemFields on gqlSafetyCheckTargetInItem {
        siteId
        day
        code
        corpName
    }
`;
