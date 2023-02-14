import React from 'react';

import Menu from './Menu';
import { VStack, Avatar, Text, AspectRatio } from '@chakra-ui/react';
import { AvatarIcon } from '../../Icons/Icons';

import { featureName, featureItem } from '../FeatureMap';

export default function Sidebar(props: {
    username: string;
    role: string;
    sitesList: {
        siteId: string;
        siteName: string;
        role: string;
    }[];
    setSelectedSite: Function;
    featureMap: Record<featureName, featureItem>;
}) {
    const { username, role, sitesList, setSelectedSite, featureMap } = props;

    return (
        <VStack mt="50px" w="20vw" h={'100vh'}>
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
                featureMap={featureMap}
                setSelectedSite={setSelectedSite}
            ></Menu>
        </VStack>
    );
}
