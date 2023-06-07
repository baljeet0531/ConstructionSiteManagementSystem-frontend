import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import Background from '../../Images/WhiteLoginBackground.svg';
import { useQuery } from '@apollo/client';
import {
    IAccountSite,
    ISiteObject,
    QUERY_ACCOUNT_SITES,
} from '../../Layouts/Layout';
import { Cookies, useCookies } from 'react-cookie';
import PhotoUploaderFormik from './Formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { LogoutIcon } from '../../Icons/Icons';

export default function PhotoUploader() {
    const cookieValue = new Cookies().get('jwt');
    const username: string = new Cookies().get('username');
    const navigate = useNavigate();
    if (!cookieValue || !username)
        return <Navigate to={'/mobile/login'}></Navigate>;

    const [, , removeCookie] = useCookies(['jwt', 'username']);

    const [accountSites, setAccountSites] = React.useState<IAccountSite[]>([]);
    const [siteObject, setSiteObject] = React.useState<ISiteObject>({});

    useQuery(QUERY_ACCOUNT_SITES, {
        variables: {
            username: username,
            archived: false,
        },
        onCompleted: ({ accountSite }: { accountSite: IAccountSite[] }) => {
            if (!localStorage.getItem('siteId')) {
                localStorage.setItem('siteName', accountSites[0].siteRef.name);
                localStorage.setItem('siteId', accountSites[0].siteId);
            }

            const siteObject = accountSite.reduce(
                (a, { siteId, siteRef: { name }, role }) => {
                    a[siteId] = {
                        siteId: siteId,
                        siteName: name,
                        role: role,
                    };
                    return a;
                },
                {} as ISiteObject
            );
            setSiteObject(siteObject);
            setAccountSites(accountSite);
        },
        onError: (err) => {
            console.log(err);
        },
    });

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
                onClick={() => {
                    removeCookie('jwt', {
                        path: '/',
                        secure: false,
                    });
                    removeCookie('username', {
                        path: '/',
                        secure: false,
                    });
                    navigate('/mobile/login');
                }}
            >
                登出
            </Button>
            <PhotoUploaderFormik
                accountSites={accountSites}
                siteObject={siteObject}
            />
        </Flex>
    );
}
