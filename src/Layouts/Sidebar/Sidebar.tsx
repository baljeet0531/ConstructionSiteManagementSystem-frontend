import React from 'react';

import Menu from './Menu';
import { VStack, Avatar, Text, AspectRatio } from '@chakra-ui/react';
import { AvatarIcon } from '../../Icons/Icons';

export default function Sidebar(props: {
    role: {
        english: string;
        chinese: string;
    };
    sitesList: {
        siteId: string;
        siteName: string;
        role: string;
    }[];
    setSelectedSite: Function;
}) {
    const { role, sitesList, setSelectedSite } = props;

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
                {role.english}
                <br />
                {role.chinese}
            </Text>

            <Menu
                sitesList={sitesList}
                setSelectedSite={setSelectedSite}
            ></Menu>
        </VStack>
    );
}
