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
import People from '../Components/People/People';
import Photo from '../Components/Photo/Photo';
import Site from '../Components/Site/SitePage';
import Report from '../Components/Report/Report';
import Schedule from '../Components/Schedule/Schedule';
import Security from '../Components/Security/Security';

const QUERY_ACCOUNT_SITES = gql`
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

const nameMap = {
    系統管理員: {
        name: 'admin',
        'chinese name': '系統管理員',
    },
    專案經理: {
        name: 'project manager',
        'chinese name': '專案經理',
    },
    工地經理: {
        name: 'site manager',
        'chinese name': '工地經理',
    },
    專案工程師: {
        name: 'project engineer',
        'chinese name': '專案工程師',
    },
    系統工程師: {
        name: 'system engineer',
        'chinese name': '系統工程師',
    },
    工安人員: {
        name: 'secure staff',
        'chinese name': '工安人員',
    },
    外包商: {
        name: 'out sourcer',
        'chinese name': '外包商',
    },
    業主: {
        name: 'owner',
        'chinese name': '業主',
    },
};

export default function Layout(props: { page: keyof typeof layoutMap }) {
    const cookieValue = new Cookies().get('jwt');
    if (!cookieValue) return <Navigate to={'/login'} replace={true}></Navigate>;

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
            username: 'kenny', ///////////////todo
        },
        fetchPolicy: 'cache-and-network',
    });

    return (
        <HStack align="top" backgroundImage={`url(${Background})`}>
            <Sidebar
                role={
                    selectedSite
                        ? {
                              english:
                                  nameMap[
                                      selectedSite.role as keyof typeof nameMap
                                  ]['name'],
                              chinese: selectedSite.role,
                          }
                        : { english: '', chinese: '' }
                }
                sitesList={sitesList}
                setSelectedSite={setSelectedSite}
            />
            <MainScreen>{layoutMap[page]}</MainScreen>
        </HStack>
    );
}
