import { QueryHookOptions, gql, useQuery } from '@apollo/client';
import React from 'react';
import { TActions } from '../Types/Auth';
import { initActions } from '../Constants/Auth';

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
    auth: TActions | null;
};

type gqlVariable = {
    siteId: string;
    service: string;
    subService: string;
};

export default function useAuth(
    options?: QueryHookOptions<gqlData, gqlVariable>
) {
    const [actions, setActions] = React.useState<TActions>(initActions);
    const queryResult = useQuery<gqlData, gqlVariable>(QUERY_AUTH, {
        ...options,
        onCompleted: ({ auth }) => {
            setActions(auth ?? initActions);
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
