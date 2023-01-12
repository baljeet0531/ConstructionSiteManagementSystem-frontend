/* eslint-disable no-undef */
import React from 'react';
import { HStack } from '@chakra-ui/react';
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Sidebar from './Sidebar/Sidebar';
import MainScreen from './MainScreen/MainScreen';
import Background from '../Images/WhiteLoginBackground.svg';

import Dashboard from '../Components/Dashboard/Dashboard';
import Site from '../Components/Site/Site';
import Organization from '../Components/Organization/Organization';
import PeopleOverview from '../Components/PeopleOverview/PeopleOverview';
import PeopleApproval from '../Components/PeopleApproval/PeopleApproval';
import PeopleEstablishment from '../Components/PeopleEstablishment/PeopleEstablishment';
import Schedule from '../Components/Schedule/Schedule';
import Report from '../Components/Report/Report';
import Photo from '../Components/Photo/Photo';
import WorkPermitForm from '../Components/WorkPermitForm/WorkPermitForm';
import ToolboxForm from '../Components/ToolboxForm/ToolboxForm';
import EngFaultForm from '../Components/EngFaultForm/EngFaultForm';
import EnvSecurityForm from '../Components/EnvSecurityForm/EnvSecurityForm';
import SpecialForm from '../Components/SpecialForm/SpecialForm';
import EHSForm from '../Components/EHSForm/EHSForm';
import EHSFaultForm from '../Components/EHSFaultForm/EHSFaultForm';
import MachineryManagement from '../Components/MachineryManagement/MachineryManagement';
import MachineryEstablishment from '../Components/MachineryEstablishment/MachineryEstablishment';
import OutsourceFaultForm from '../Components/OutsourceFaultForm/OutsourceFaultForm';

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

    const layoutMap = {
        Dashboard: <Dashboard />,
        Site: <Site />,
        Organization: <Organization />,
        PeopleOverview: <PeopleOverview />,
        PeopleApproval: <PeopleApproval />,
        PeopleEstablishment: <PeopleEstablishment />,
        Schedule: <Schedule siteId={selectedSite ? selectedSite.siteId : ''} />,
        Report: <Report />,
        Photo: <Photo />,
        WorkPermitForm: <WorkPermitForm />,
        ToolboxForm: <ToolboxForm />,
        EngFaultForm: <EngFaultForm />,
        EnvSecurityForm: <EnvSecurityForm />,
        SpecialForm: <SpecialForm />,
        EHSForm: <EHSForm />,
        EHSFaultForm: <EHSFaultForm />,
        MachineryManagement: <MachineryManagement />,
        MachineryEstablishment: <MachineryEstablishment />,
        OutsourceFaultForm: <OutsourceFaultForm />
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
