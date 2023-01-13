/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { HStack } from '@chakra-ui/react';
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Sidebar from './Sidebar/Sidebar';
import MainScreen from './MainScreen/MainScreen';
import Background from '../Images/WhiteLoginBackground.svg';

import Home from '../Components/Home/Home';
import Dashboard from '../Components/Dashboard/Dashboard';
import People from '../Components/HumanResource/HumanResource';
import Photo from '../Components/Photo/Photo';
import Site from '../Components/Site/Site';
import Report from '../Components/Report/Report';
import Schedule from '../Components/Schedule/Schedule';
import Security from '../Components/Security/Security';

export const QUERY_ACCOUNT_SITES = gql`
    query AccountSite($username: String!) {
        accountSite(username: $username) {
            siteId
            siteRef {
                name
            }
            role
        }
    }
`;

export default function Layout(props: { page: keyof typeof layoutMap }) {
    const cookieValue = new Cookies().get('jwt');
    const username: string = new Cookies().get('username');
    // if (!cookieValue || !username)
    //     return <Navigate to={'/login'} replace={true}></Navigate>;

    const { page } = props;

    const [sitesList, setSitesList] = React.useState<
        {
            siteId: string;
            siteName: string;
            role: string;
        }[]
    >([]);
    const [selectedSite, setSelectedSite] = React.useState<{
        siteId: string;
        siteName: string;
        role: string;
    }>();

    const layoutMap = {
        Home: <Home />,
        Site: <Site />,
        Schedule: <Schedule siteId={selectedSite ? selectedSite.siteId : ''} />,
        People: <People />,
        Security: <Security />,
        Report: <Report />,
        Photo: <Photo />,
        Dashboard: <Dashboard />,
    };
    useQuery(QUERY_ACCOUNT_SITES, {
        onCompleted: ({ accountSite }) => {
            const sitesListFormatted = accountSite.map(
                (
                    site: {
                        siteId: string;
                        role: string;
                        siteRef: {
                            name: string;
                        };
                    },
                    index: number
                ) => {
                    const { siteRef, ...siteIdRole } = site;
                    if (index == 0)
                        setSelectedSite({
                            ...siteIdRole,
                            siteName: siteRef.name,
                        });
                    return {
                        ...siteIdRole,
                        siteName: siteRef.name,
                    };
                }
            );
            setSitesList(sitesListFormatted);
        },
        onError: (error) => {
            console.log(error);
        },
        variables: {
            username: username,
        },
        fetchPolicy: 'cache-and-network',
    });

    return (
        <HStack align="top" backgroundImage={`url(${Background})`}>
            <Sidebar
                username={username}
                role={selectedSite?.role || ''}
                sitesList={sitesList}
                setSelectedSite={setSelectedSite}
            />
            <MainScreen>{layoutMap[page]}</MainScreen>
        </HStack>
    );
}
