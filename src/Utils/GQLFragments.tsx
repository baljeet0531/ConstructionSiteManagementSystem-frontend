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
    fragment gqlEHSFormSignatureFields on gqlEHSFormSignature {
        no
        siteId
        day
        owner
        path
        time
        corpName
        signatureType
        __typename
    }
`;

export const EHSFORM_IN_ITEM_FIELDS = gql`
    fragment gqlEHSFormTargetInItemFields on gqlEHSFormTargetInItem {
        siteId
        day
        code
        corpName
        __typename
    }
`;
