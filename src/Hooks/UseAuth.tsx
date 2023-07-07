import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import React from 'react';
import { TActions } from '../Types/Auth';

const QUERY_AUTH = gql`
    query Auth($siteId: String!, $service: String!, $subService: String!) {
        auth(siteId: $siteId, service: $service, subService: $subService) {
            C
            R
            U
            D
        }
    }
`;

type gqlData = {
    auth: TActions;
};

type gqlVariable = {
    siteId: string;
    service: string;
    subService: string;
};

export default function useAuth(
    options?: QueryHookOptions<gqlData, gqlVariable>
) {
    const [actions, setActions] = React.useState<TActions>({
        C: false,
        R: false,
        U: false,
        D: false,
    });
    const queryResult = useQuery<gqlData, gqlVariable>(QUERY_AUTH, {
        ...options,
        onCompleted: ({ auth }) => {
            setActions(auth);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });
    return {
        actions,
        queryResult,
    };
}
