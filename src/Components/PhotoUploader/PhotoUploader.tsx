import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import Background from '../../Images/WhiteLoginBackground.svg';
import { Cookies } from 'react-cookie';
import PhotoUploaderFormik from './Formik';
import { Navigate } from 'react-router-dom';
import { LogoutIcon } from '../../Icons/Icons';
import { useLogOut } from '../../Hooks/UseLogOut';

export default function PhotoUploader() {
    const cookieValue = new Cookies().get('jwt');
    const username: string = new Cookies().get('username');
    if (!cookieValue || !username)
        return <Navigate to={'/mobile/login'}></Navigate>;

    const logout = useLogOut('/mobile/login');

    return (
        <Flex
            w={'100vw'}
            h={'100vh'}
            direction={'column'}
            align={'center'}
            bgImage={`url(${Background})`}
            overflowY={'auto'}
        >
            <Button
                position={'absolute'}
                top={'5px'}
                left={'5px'}
                leftIcon={<LogoutIcon />}
                color={'#667080'}
                bg={'#6670801A'}
                borderRadius={'30px'}
                onClick={logout}
            >
                登出
            </Button>
            <PhotoUploaderFormik />
        </Flex>
    );
}
