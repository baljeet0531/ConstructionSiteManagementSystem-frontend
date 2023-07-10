import { QueryHookOptions, ServerError, gql, useQuery } from '@apollo/client';
import React from 'react';
import { TActions } from '../Types/Auth';
import { initActions } from '../Constants/Auth';
import { useLogOut } from './UseLogOut';

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
    const logout = useLogOut('/login');
    const [actions, setActions] = React.useState<TActions>(initActions);
    const queryResult = useQuery<gqlData, gqlVariable>(QUERY_AUTH, {
        ...options,
        onCompleted: ({ auth }) => {
            setActions(auth ?? initActions);
        },
        onError: (err) => {
            console.log(err);
            if (
                err.networkError &&
                (err.networkError as ServerError).statusCode === 401
            ) {
                logout();
            }
        },
        fetchPolicy: 'network-only',
    });
    return {
        actions,
        queryResult,
    };
}
