import React from 'react';
import { EditIcon, AddIcon, AddPeopleIcon } from '../../Icons/Icons';

import {
    Flex,
    Center,
    Image,
    Text,
    IconButton,
    Button,
} from '@chakra-ui/react';

export default function SiteInfo(props: {
    handlePopup: Function;
    siteDetails: {
        id: any;
        name: string;
        avatar: string;
        start: string;
        end: string;
        line_id: string;
    };
}) {
    const { handlePopup, siteDetails } = props;
    const { id, name, avatar, start, end, line_id } = siteDetails;

    return (
        <Flex
            w={'100%'}
            direction={'row'}
            justify={'space-between'}
            align={'end'}
        >
            <Flex direction={'row'}>
                <Center
                    w={'129px'}
                    h={'77px'}
                    bg={'#E3ECFF'}
                    borderRadius={'4px'}
                >
                    <Image src={avatar} />
                </Center>
                <Flex direction={'column'} gap={'5px'} ml={'5px'}>
                    <Flex direction={'row'} gap={'5px'} h={'36px'}>
                        <Text
                            p={'8px 12px'}
                            bg={'#E3ECFF'}
                            color={'#13398D'}
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                        >
                            {id}
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
                    <Flex direction={'row'} gap={'5px'} h={'36px'}>
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
                        <Text
                            p={'8px 12px'}
                            bg={'#E3ECFF'}
                            color={'#13398D'}
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                        >
                            {`Line Notify ID: ${line_id}`}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex direction={'row'} w={'218px'} h={'36px'} gap={'10px'}>
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
    );
}
