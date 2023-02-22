import { gql } from '@apollo/client';

export const SIGNATURE_FIELDS = gql`
    fragment gqlSignatureFields on gqlSignature {
        path
        time
        owner
    }
`;
