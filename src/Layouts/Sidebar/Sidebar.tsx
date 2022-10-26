import React from 'react';

import Menu from './Menu';
import { VStack, Avatar, Text, AspectRatio } from '@chakra-ui/react';
import { AvatarIcon } from '../../Icons/Icons';

import { PERMISSION } from '../../Mockdata/Mockdata';
// import { Cookies } from "react-cookie";

export default function Sidebar() {
    const ROLE = 'admin';

    const { name, 'chinese name': chineseName } = PERMISSION[ROLE];

    return (
        <VStack mt="50px" w="20vw" maxW="20vw">
            <AspectRatio w="50%" ratio={1}>
                <Avatar name="" src={`${AvatarIcon}`} bg="#4C7DE7"></Avatar>
            </AspectRatio>
            <Text
                fontWeight="600"
                color="#4C7DE7"
                fontSize="20px"
                textAlign="center"
            >
                {name}
                <br />
                {chineseName}
            </Text>
            <Menu></Menu>
        </VStack>
    );
}
