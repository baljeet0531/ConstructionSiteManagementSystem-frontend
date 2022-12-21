import React from 'react';

import Menu from './Menu';
import { VStack, Avatar, Text, AspectRatio } from '@chakra-ui/react';
import { AvatarIcon } from '../../Icons/Icons';

export default function Sidebar(props: {
    username: string;
    role: string;
    sitesList: {
        siteId: string;
        siteName: string;
        role: string;
    }[];
    setSelectedSite: Function;
}) {
    const { username, role, sitesList, setSelectedSite } = props;

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
                {username}
                <br />
                {role}
            </Text>

            <Menu
                sitesList={sitesList}
                setSelectedSite={setSelectedSite}
            ></Menu>
        </VStack>
    );
}
