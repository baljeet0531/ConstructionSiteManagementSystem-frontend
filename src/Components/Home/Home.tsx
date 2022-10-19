import React from 'react';

import { useQuery, gql } from '@apollo/client';

const QUERY_HELLO = gql`
query {
    role{
        edges {
            node {
                username
                account{
                    password
                }
                role
                siteId
            }
        }
    }
    site{
        edges{
            node{
                id
            }
        }
    }
}
`


export default function Home() {

    const { loading, error, data } = useQuery(QUERY_HELLO, { errorPolicy: "all" })

    if (loading) console.log('Loading...');
    if (error) {
        console.log(error)
        console.log(JSON.stringify(error, null, 4));
    }

    if (data) {
        console.log(data)
    }

    return (
        <p>Home</p>
    )
}