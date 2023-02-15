import React from 'react';

import Menu from './Menu';
import { VStack, Avatar, Text, AspectRatio } from '@chakra-ui/react';

import { featureName, featureItem } from '../FeatureMap';
import Admin from '../../Images/Avatars/Admin.svg';
import ProjectManager from '../../Images/Avatars/ProjectManager.svg';
import SiteManager from '../../Images/Avatars/SiteManager.svg';
import ProjectEngineer from '../../Images/Avatars/ProjectEngineer.svg';
import SystemEngineer from '../../Images/Avatars/SystemEngineer.svg';
import SecurityStaff from '../../Images/Avatars/SecurityStaff.svg';
import OutSourcer from '../../Images/Avatars/OutSourcer.svg';
import Owner from '../../Images/Avatars/Owner.svg';

const roleAvatarMap = {
    系統管理員: Admin,
    專案經理: ProjectManager,
    工地經理: SiteManager,
    專案工程師: ProjectEngineer,
    系統工程師: SystemEngineer,
    工安人員: SecurityStaff,
    外包商: OutSourcer,
    業主: Owner,
};

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
        <VStack mt="50px" w="20vw" minW={'20vw'} maxH={'20VW'}>
            <AspectRatio w="50%" ratio={1}>
                <Avatar
                    name=""
                    src={roleAvatarMap[role as keyof typeof roleAvatarMap]}
                    bg="#4C7DE7"
                    ignoreFallback
                ></Avatar>
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
