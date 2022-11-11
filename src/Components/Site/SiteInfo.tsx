/* eslint-disable no-unused-vars */
import React from 'react';
import { EditIcon, AddIcon, AddPeopleIcon, LinkIcon } from '../../Icons/Icons';
import BACKEND from '../../Constants/EnvConstants';
import { Cookies } from 'react-cookie';

import {
    Flex,
    Center,
    Image,
    Text,
    IconButton,
    Button,
    Link,
} from '@chakra-ui/react';

export default function SiteInfo(props: {
    handlePopup: Function;
    siteDetails: {
        siteId: any;
        name: string;
        avatar: string;
        start: string;
        end: string;
        lineId: string;
    };
}) {
    const { handlePopup, siteDetails } = props;
    const { siteId, name, avatar, start, end } = siteDetails;
    const [img, setImg] = React.useState<string>('');

    async function getAvatar(avatar: string) {
        const cookieValue = new Cookies().get('jwt');
        const response = await fetch(BACKEND + `/static/${avatar}`, {
            headers: {
                Authorization: `Bearer ${cookieValue}`,
            },
            method: 'GET',
        });
        if (response.status >= 400) {
            console.log(response);
        } else {
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
        }
    }

    React.useEffect(() => {
        getAvatar(avatar);
    }, []);

    return (
        <Flex w={'100%'} direction={'row'}>
            <Center w={'129px'} h={'77px'} bg={'#E3ECFF'} borderRadius={'4px'}>
                <Image
                    h={'100%'}
                    w={'100%'}
                    objectFit={'contain'}
                    src={img}
                    onLoad={(e) => {
                        const image = e.target as HTMLImageElement;
                        URL.revokeObjectURL(image.src);
                    }}
                />
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
                    >
                        {name}
                    </Text>
                    <Center color={'#667080'}>
                        <IconButton
                            aria-label="EditSite"
                            icon={<EditIcon />}
                            bg={'none'}
                            onClick={() => {
                                handlePopup('editSite');
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
                                handlePopup('addArea');
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
                                handlePopup('addRole');
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
