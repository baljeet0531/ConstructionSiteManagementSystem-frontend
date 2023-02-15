import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { featureName, getFeatureMap } from './FeatureMap';
import Sidebar from './Sidebar/Sidebar';
import MainScreen from './MainScreen/MainScreen';
import Background from '../Images/WhiteLoginBackground.svg';

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

export default function Layout(props: { page: featureName }) {
    const cookieValue = new Cookies().get('jwt');
    const username: string = new Cookies().get('username');
    if (!cookieValue || !username)
        return <Navigate to={'/login'} replace={true}></Navigate>;

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

    const featureMap = getFeatureMap({
        site: selectedSite
            ? { siteId: selectedSite.siteId, siteName: selectedSite.siteName }
            : { siteId: '', siteName: '' },
    });

    useQuery(QUERY_ACCOUNT_SITES, {
        onCompleted: ({ accountSite }) => {
            const sitesListFormatted = accountSite.map(
                (site: {
                    siteId: string;
                    role: string;
                    siteRef: {
                        name: string;
                    };
                }) => {
                    const { siteRef, siteId, role } = site;
                    return {
                        [siteId]: {
                            siteId,
                            role,
                            siteName: siteRef.name,
                        },
                    };
                }
            );
            const sitesListObject: {
                [siteId: string]: {
                    siteId: string;
                    siteName: string;
                    role: string;
                };
            } = Object.assign({}, ...sitesListFormatted);
            const sitesList = Object.values(sitesListObject);
            const defaultSiteId = localStorage.getItem('siteId');
            defaultSiteId && sitesListObject[defaultSiteId]
                ? setSelectedSite(sitesListFormatted[defaultSiteId])
                : setSelectedSite(sitesList[0]);
            setSitesList(sitesList);
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
        <Flex
            direction={'row'}
            align="top"
            backgroundImage={`url(${Background})`}
        >
            <Sidebar
                username={username}
                role={selectedSite?.role || ''}
                sitesList={sitesList}
                setSelectedSite={setSelectedSite}
                featureMap={featureMap}
            />
            <MainScreen key={selectedSite?.siteId}>
                {featureMap[page].page}
            </MainScreen>
        </Flex>
    );
}
