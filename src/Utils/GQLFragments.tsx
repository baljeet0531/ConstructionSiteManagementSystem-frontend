import { gql } from '@apollo/client';

export const SIGNATURE_FIELDS = gql`
    fragment gqlSignatureFields on gqlSignature {
        path
        time
        owner
    }
`

export const APPEARANCE_SIGN_FIELD = gql`
fragment gqlAppearFields on gqlAppearanceSignature {
    path
    time
    owner
}
`;