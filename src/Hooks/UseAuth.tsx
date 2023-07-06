import { gql, useLazyQuery } from '@apollo/client';
import React from 'react';
import { TActions } from '../Types/Auth';

const QUERY_AUTH = gql`
    query Auth($siteId: String!, $service: String!, $subService: String!) {
        auth(siteId: $siteId, service: $service, subService: $subService)
    }
`;

type gqlData = {
    auth: TActions[];
};

type gqlVariable = {
    siteId: string;
    service: string;
    subService: string;
};

export default function useAuth() {
    const [actions, setActions] = React.useState<TActions[]>([]);
    const lazyQueryResultTuple = useLazyQuery<gqlData, gqlVariable>(
        QUERY_AUTH,
        {
            onCompleted: ({ auth }) => {
                setActions(auth);
            },
            onError: (err) => {
                console.log(err);
            },
            fetchPolicy: 'network-only',
        }
    );
    return {
        actions,
        lazyQueryResultTuple,
    };
}
