import React from 'react';

import Menu from './Menu';
import {
    VStack,
    Avatar,
    Text,
    Button,
    Flex,
    AvatarBadge,
    Box,
} from '@chakra-ui/react';

import { featureName, featureItem } from '../FeatureMap';
import Admin from '../../Images/Avatars/Admin.svg';
import ProjectManager from '../../Images/Avatars/ProjectManager.svg';
import SiteManager from '../../Images/Avatars/SiteManager.svg';
import ProjectEngineer from '../../Images/Avatars/ProjectEngineer.svg';
import SystemEngineer from '../../Images/Avatars/SystemEngineer.svg';
import SecurityStaff from '../../Images/Avatars/SecurityStaff.svg';
import OutSourcer from '../../Images/Avatars/OutSourcer.svg';
import Owner from '../../Images/Avatars/Owner.svg';
import { ISiteObject } from '../Layout';
import { LogoutIcon } from '../../Icons/Icons';
import { useCookies } from 'react-cookie';
import { VERSION } from '../../Constants/EnvConstants';
import { TODO_LIST } from '../../Components/Dashboard/TodoList';
import { useLazyQuery } from '@apollo/client';

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
    sitesObject: ISiteObject;
    selectedSiteId?: string;
    setSelectedSiteId: Function;
    featureMap: Record<featureName, featureItem>;
}) {
    const {
        username,
        role,
        sitesObject,
        selectedSiteId,
        setSelectedSiteId,
        featureMap,
    } = props;

    const [, , removeCookie] = useCookies(['jwt', 'username']);

    const [todoListAmount, setTodoListAmount] = React.useState<number>(0);
    const [getTodoListAmount] = useLazyQuery(TODO_LIST, {
        onCompleted: ({
            dashboardTodolist,
        }: {
            dashboardTodolist: string[];
        }) => {
            setTodoListAmount(dashboardTodolist.length);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    React.useEffect(() => {
        selectedSiteId &&
            getTodoListAmount({
                variables: {
                    siteId: selectedSiteId,
                    username: username,
                },
            });
    }, [selectedSiteId]);

    return (
        <VStack
            padding={'50px 26px 10px 26px'}
            w="20vw"
            h={'100%'}
            overflowY={'auto'}
            justify={'space-between'}
        >
            <Flex direction={'column'} align={'center'} justify={'flex-start'}>
                <Box w={'66%'} style={{ aspectRatio: 1 }}>
                    <Avatar
                        w={'100%'}
                        h={'100%'}
                        src={roleAvatarMap[role as keyof typeof roleAvatarMap]}
                        ignoreFallback
                    >
                        {todoListAmount !== 0 && (
                            <AvatarBadge
                                boxSize="1.5em"
                                bg="red"
                                right={'0.5rem'}
                                bottom={'0.5rem'}
                            >
                                <Text
                                    fontSize={'0.75rem'}
                                    lineHeight={'1.5rem'}
                                    color={'#FFFFFF'}
                                >
                                    {todoListAmount}
                                </Text>
                            </AvatarBadge>
                        )}
                    </Avatar>
                </Box>
                <Text
                    mt={'15px'}
                    mb={'5px'}
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
                    sitesObject={sitesObject}
                    featureMap={featureMap}
                    selectedSiteId={selectedSiteId}
                    setSelectedSiteId={setSelectedSiteId}
                ></Menu>
            </Flex>
            <VStack w="100%">
                <Button
                    leftIcon={<LogoutIcon />}
                    flexShrink={0}
                    height={'44px'}
                    width={'100%'}
                    color={'#667080'}
                    bg={'#6670801A'}
                    borderRadius={'30px'}
                    fontSize={'15px'}
                    onClick={() => {
                        removeCookie('jwt', {
                            path: '/',
                            secure: false,
                        });
                        removeCookie('username', {
                            path: '/',
                            secure: false,
                        });
                        window.location.href = '/login';
                    }}
                >
                    登出
                </Button>
                <Text variant="w400s12">版本：{VERSION}</Text>
            </VStack>
        </VStack>
    );
}
