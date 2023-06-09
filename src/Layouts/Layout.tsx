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
    query AccountSite($username: String!, $archived: Boolean) {
        accountSite(username: $username, archived: $archived) {
            siteId
            siteRef {
                name
                archived
            }
            role
        }
    }
`;

export interface siteValue {
    siteId: string;
    siteName: string;
    role: string;
}

export interface ISiteObject {
    [siteId: string]: siteValue;
}

export interface IAccountSite {
    siteId: string;
    siteRef: {
        name: string;
        archived: boolean;
    };
    role: string;
}

export default function Layout(props: { page: featureName }) {
    const cookieValue = new Cookies().get('jwt');
    const username: string = new Cookies().get('username');
    if (!cookieValue || !username) return <Navigate to={'/login'}></Navigate>;

    const { page } = props;

    const [sitesObject, setSitesObject] = React.useState<ISiteObject>({});
    const [selectedSiteId, setSelectedSiteId] = React.useState<string>();
    const siteValues = Object.values(sitesObject);
    const selectedSiteValue = selectedSiteId
        ? sitesObject[selectedSiteId]
        : siteValues[0];
    const featureMap = getFeatureMap(
        selectedSiteValue
            ? {
                  siteId: selectedSiteValue.siteId,
                  siteName: selectedSiteValue.siteName,
              }
            : { siteId: '', siteName: '' }
    );

    useQuery(QUERY_ACCOUNT_SITES, {
        variables: {
            username: username,
            archived: false,
        },
        onCompleted: ({ accountSite }) => {
            const sitesListFormatted: ISiteObject[] = accountSite.map(
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
            const sitesObject: ISiteObject = Object.assign(
                {},
                ...sitesListFormatted
            );
            const siteValues = Object.values(sitesObject);
            const storeSiteId = localStorage.getItem('siteId');
            const defaultSiteId =
                storeSiteId && sitesObject[storeSiteId]
                    ? sitesObject[storeSiteId].siteId
                    : siteValues[0].siteId;
            localStorage.setItem('siteId', defaultSiteId);
            localStorage.setItem(
                'siteName',
                sitesObject[defaultSiteId].siteName
            );
            setSelectedSiteId(defaultSiteId);
            setSitesObject(sitesObject);
        },
        onError: (error) => {
            console.log(error);
        },
        fetchPolicy: 'network-only',
    });

    return (
        <Flex
            direction={'row'}
            align="top"
            backgroundImage={`url(${Background})`}
            width={'100vw'}
            height={'100vh'}
        >
            <Sidebar
                username={username}
                role={selectedSiteValue?.role || ''}
                sitesObject={sitesObject}
                selectedSiteId={selectedSiteId}
                setSelectedSiteId={setSelectedSiteId}
                featureMap={featureMap}
            />
            <MainScreen>{featureMap[page].page}</MainScreen>
        </Flex>
    );
}
