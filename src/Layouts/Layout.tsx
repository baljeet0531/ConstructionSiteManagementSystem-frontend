import React from 'react';
import { HStack } from '@chakra-ui/react';
import Sidebar from './Sidebar/Sidebar';
import MainScreen from './MainScreen/MainScreen';
import Background from '../Images/WhiteLoginBackground.svg';
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

export default function Layout(props: { page: React.ReactNode }) {
    const cookieValue = new Cookies().get('jwt');
    if (!cookieValue) return <Navigate to={'/login'} replace={true}></Navigate>;

    return (
        <HStack align="top" backgroundImage={`url(${Background})`}>
            <Sidebar />
            <MainScreen>{props.page}</MainScreen>
        </HStack>
    );
}
