import React from 'react';
import { Flex, Select, Text } from '@chakra-ui/react';
import Background from '../../Images/WhiteLoginBackground.svg';
import { useQuery } from '@apollo/client';
import { IAccountSite, QUERY_ACCOUNT_SITES } from '../../Layouts/Layout';
import { Cookies } from 'react-cookie';
import { Camera } from './Camera';
import PhotoUploadForm from './PhotoUploadForm';

export const SiteIdContext = React.createContext<string | undefined>(undefined);

export default function PhotoUploader() {
    const username: string = new Cookies().get('username');

    const [accountSites, setAccountSites] = React.useState<IAccountSite[]>([]);
    const [imageList, setImageList] = React.useState<string[]>([]);
    const [selectedSite, setSelectedSite] = React.useState<string>();

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
            align={'center'}
            bgImage={`url(${Background})`}
            overflowY={'auto'}
        >
            <Flex
                w={'390px'}
                direction={'column'}
                align={'center'}
                p={'30px 20px'}
                gap={'10px'}
            >
                <Text w={'400'} fontSize={'1.5rem'}>
                    上傳照片
                </Text>
                <Select
                    value={selectedSite}
                    variant={'grayOutline'}
                    onChange={(e) => {
                        setSelectedSite(e.target.value);
                    }}
                >
                    {siteOptions}
                </Select>
                <Camera setImageList={setImageList} />

                <SiteIdContext.Provider value={selectedSite}>
                    <Flex
                        direction={'column'}
                        align={'center'}
                        justify={'center'}
                        gap={'10px'}
                        w={'100%'}
                    >
                        {imageList.map((src, index) => (
                            <PhotoUploadForm key={index} imageSrc={src} />
                        ))}
                    </Flex>
                </SiteIdContext.Provider>
            </Flex>
        </Flex>
    );
}
