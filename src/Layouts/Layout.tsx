import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { featureName, getFeatureMap } from './FeatureMap';
import Sidebar from './Sidebar/Sidebar';
import MainScreen from './MainScreen/MainScreen';
import Background from '../Images/WhiteLoginBackground.svg';
import useAuth from '../Hooks/UseAuth';
import { CustomLoading } from '../Components/Shared/Loading';
import {
    pagePrefixToRoleFeatureMap,
    pageToFeatureAuthMap,
} from '../Constants/Auth';
import { TUserRole } from '../Types/Auth';
import { checkAuth } from '../Utils/Web';
import NoContentPage from '../Components/Shared/NoContentPage';

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
    role: TUserRole;
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
    role: TUserRole;
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
                    role: TUserRole;
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

    const checkLayoutAuth = () => {
        const pagePrefix = page.split('_')[0];
        const roleFeature = pagePrefixToRoleFeatureMap[pagePrefix];
        return selectedSiteValue
            ? roleFeature
                ? checkAuth(roleFeature, selectedSiteValue.role)
                : true
            : false;
    };

    const {
        actions,
        queryResult: { refetch, loading },
    } = useAuth({
        variables: {
            siteId: selectedSiteId || '',
            service: pageToFeatureAuthMap[page],
            subService: 'ALL',
        },
    });

    React.useEffect(() => {
        selectedSiteId &&
            refetch({
                siteId: selectedSiteId,
                service: pageToFeatureAuthMap[page],
                subService: 'ALL',
            });
    }, [selectedSiteId, page]);

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
            <MainScreen>
                {loading ? (
                    <CustomLoading />
                ) : checkLayoutAuth() && actions.R ? (
                    featureMap[page].page
                ) : (
                    <NoContentPage label="您沒有訪問權限" />
                )}
            </MainScreen>
        </Flex>
    );
}
