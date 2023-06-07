import React from 'react';
import { Flex } from '@chakra-ui/react';
import Background from '../../Images/WhiteLoginBackground.svg';
import { useQuery } from '@apollo/client';
import {
    IAccountSite,
    ISiteObject,
    QUERY_ACCOUNT_SITES,
} from '../../Layouts/Layout';
import { Cookies } from 'react-cookie';
import PhotoUploaderFormik from './Formik';

export default function PhotoUploader() {

    const username: string = new Cookies().get('username');

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
            <PhotoUploaderFormik
                accountSites={accountSites}
                siteObject={siteObject}
            />
        </Flex>
    );
}
