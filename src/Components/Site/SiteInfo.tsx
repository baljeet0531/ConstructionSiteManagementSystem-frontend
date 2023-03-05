import React from 'react';
import { EditIcon, AddIcon, AddPeopleIcon, LinkIcon } from '../../Icons/Icons';
import BACKEND from '../../Constants/EnvConstants';
import { Cookies } from 'react-cookie';

import EditSite from './SitePopup/EditSite';
import AddArea from './SitePopup/AddArea';
import AddRole from './SitePopup/AddRole';

import {
    Flex,
    Center,
    Image,
    Text,
    IconButton,
    Button,
    Link,
    Spinner,
} from '@chakra-ui/react';
import { useQuery, gql } from '@apollo/client';

const GET_NOTIFY_LINK = gql`
    query refactored284($siteId: String!) {
        subsribeUrl(siteId: $siteId)
    }
`;

export default function SiteInfo(props: {
    setPopupComponent: Function;
    setShowPopup: Function;
    siteDetails: {
        siteId: any;
        name: string;
        avatar: string;
        start: string;
        end: string;
        city: string;
    };
}) {
    const { siteDetails, setPopupComponent, setShowPopup } = props;
    const { siteId, name: siteName, avatar, start, end } = siteDetails;
    const [imgBlob, setImgBlob] = React.useState<Blob>();
    const [loading, setLoading] = React.useState<Boolean>(true);
    const [notifyLink, setNotifyLink] = React.useState<string>();

    useQuery(GET_NOTIFY_LINK, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ subsribeUrl }) => {
            setNotifyLink(subsribeUrl);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    async function getAvatar(avatar: string, signal: AbortSignal) {
        const cookieValue = new Cookies().get('jwt');
        const response = await fetch(BACKEND + `/${avatar}`, {
            signal,
            cache: 'no-cache',
            headers: {
                Authorization: `Bearer ${cookieValue}`,
            },
            method: 'GET',
        });
        if (response.status >= 400) {
            setImgBlob(undefined);
        } else {
            const imageBlob = await response.blob();
            setImgBlob(imageBlob);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (avatar) {
            if (!loading) setLoading(true);
            getAvatar(avatar, signal);
        }
        return () => controller.abort();
    }, [avatar]);

    return (
        <Flex w={'100%'} direction={'row'}>
            <Center w={'129px'} h={'77px'} bg={'#E3ECFF'} borderRadius={'4px'}>
                {avatar ? (
                    loading ? (
                        <Spinner />
                    ) : imgBlob ? (
                        <Image
                            h={'100%'}
                            w={'100%'}
                            objectFit={'contain'}
                            src={URL.createObjectURL(imgBlob)}
                            onLoad={(e) => {
                                const image = e.target as HTMLImageElement;
                                URL.revokeObjectURL(image.src);
                            }}
                        />
                    ) : (
                        <Text color={'#13398D80'}>圖片錯誤</Text>
                    )
                ) : (
                    <Text color={'#13398D80'}>尚無照片</Text>
                )}
            </Center>
            <Flex direction={'column'} gap={'5px'} ml={'5px'} flexGrow={1}>
                <Flex direction={'row'} gap={'5px'} h={'36px'}>
                    <Text
                        p={'8px 12px'}
                        bg={'#E3ECFF'}
                        color={'#13398D'}
                        fontWeight={400}
                        fontSize={'14px'}
                        lineHeight={'20px'}
                        borderRadius={'4px'}
                    >
                        {siteId}
                    </Text>
                    <Text
                        p={'8px 12px'}
                        bg={'#E3ECFF'}
                        color={'#13398D'}
                        fontWeight={400}
                        fontSize={'14px'}
                        lineHeight={'20px'}
                        borderRadius={'4px'}
                    >
                        {siteName}
                    </Text>
                    <Center color={'#667080'}>
                        <IconButton
                            aria-label="EditSite"
                            icon={<EditIcon />}
                            bg={'none'}
                            onClick={() => {
                                setPopupComponent(
                                    <EditSite
                                        setShowPopup={setShowPopup}
                                        siteDetails={{
                                            ...siteDetails,
                                            avatar: imgBlob,
                                        }}
                                    ></EditSite>
                                );
                                setShowPopup(true);
                            }}
                        ></IconButton>
                    </Center>
                </Flex>
                <Flex
                    direction={'row'}
                    h={'36px'}
                    justifyContent={'space-between'}
                >
                    <Text
                        p={'8px 12px'}
                        bg={'#E3ECFF'}
                        color={'#13398D'}
                        fontWeight={400}
                        fontSize={'14px'}
                        lineHeight={'20px'}
                        borderRadius={'4px'}
                    >
                        {`工期：${start} ~ ${end}`}
                    </Text>
                    <Flex direction={'row'} h={'36px'} gap={'10px'}>
                        <Link
                            h={'36px'}
                            p={'8px 12px'}
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                            borderRadius={'4px'}
                            bg={'#12C646'}
                            color={'#FFFFFF'}
                            display={'flex'}
                            gap={'4px'}
                            onClick={() => {
                                notifyLink && window.open(notifyLink, '_blank');
                            }}
                        >
                            <LinkIcon />
                            LINE Notify
                        </Link>
                        <Button
                            h={'36px'}
                            p={'8px 12px'}
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                            leftIcon={<AddIcon />}
                            bg={'#4C7DE7'}
                            color={'#FFFFFF'}
                            onClick={() => {
                                setPopupComponent(
                                    <AddArea
                                        siteId={siteId}
                                        siteName={siteName}
                                        setShowPopup={setShowPopup}
                                    ></AddArea>
                                );
                                setShowPopup(true);
                            }}
                        >
                            新增廠區
                        </Button>
                        <Button
                            h={'36px'}
                            p={'8px 12px'}
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                            leftIcon={<AddPeopleIcon />}
                            bg={'#4C7DE7'}
                            color={'#FFFFFF'}
                            onClick={() => {
                                setPopupComponent(
                                    <AddRole
                                        siteId={siteId}
                                        siteName={siteName}
                                        setShowPopup={setShowPopup}
                                    ></AddRole>
                                );
                                setShowPopup(true);
                            }}
                        >
                            新增人員
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
