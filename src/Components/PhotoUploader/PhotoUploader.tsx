import React from 'react';
import { Flex, Select, Text } from '@chakra-ui/react';
import Background from '../../Images/WhiteLoginBackground.svg';
import { useQuery } from '@apollo/client';
import { IAccountSite, QUERY_ACCOUNT_SITES } from '../../Layouts/Layout';
import { Cookies } from 'react-cookie';

export default function PhotoUploader() {
    const username: string = new Cookies().get('username');

    const [accountSites, setAccountSites] = React.useState<IAccountSite[]>([]);

    const siteOptions = accountSites.map((site, index) => (
        <option key={index} value={site.siteId}>
            {site.siteRef.name}
        </option>
    ));

    useQuery(QUERY_ACCOUNT_SITES, {
        variables: {
            username: username,
            archived: false,
        },
        onCompleted: ({ accountSite }: { accountSite: IAccountSite[] }) => {
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
            bgSize={'cover'}
            bgImage={`url(${Background})`}
            p={'20px 30px'}
        >
            <Text w={'400'} fontSize={'1.5rem'}>
                上傳照片
            </Text>
            <Select mt={'10px'} variant={'grayOutline'}>
                {siteOptions}
            </Select>
        </Flex>
    );
}
