import React from 'react';

import { Center, Flex, Text, Button, useToast } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { QUERY_SITE_ROLES } from '../SiteRoles';

const DELETE_SITE_ROLE = gql`
    mutation DeleteSiteRole($siteId: String!, $username: String!) {
        deleteSiteRole(siteId: $siteId, username: $username) {
            ok
        }
    }
`;

export default function DeleteRole(props: {
    setShowPopup: Function;
    siteId: string;
    siteName: string;
    name: string;
    username: string;
}) {
    const { setShowPopup, siteId, siteName, name, username } = props;

    const toast = useToast();
    const [deleteSiteRole] = useMutation(DELETE_SITE_ROLE, {
        onCompleted: () => {
            setShowPopup(false);
        },
        onError: ({ message, graphQLErrors }) => {
            toast({
                title: '錯誤',
                description: message,
                status: 'error',
                duration: null,
                isClosable: true,
            });
            for (let i = 0; i < graphQLErrors.length; i++) {
                toast({
                    title: '錯誤',
                    description: graphQLErrors[i].message,
                    status: 'error',
                    duration: null,
                    isClosable: true,
                });
            }
        },
        refetchQueries: [
            { query: QUERY_SITE_ROLES, variables: { siteId: siteId } },
        ],
    });

    return (
        <Center
            position={'absolute'}
            top={0}
            left={0}
            w={'100vw'}
            h={'100vh'}
            bg={'#D9D9D980'}
            zIndex={2}
        >
            <Center
                border={'1px solid #667080'}
                w={'32%'}
                borderRadius={'10px'}
                bg={'#FFFFFF'}
                p={'30px 45px'}
            >
                <Flex h={'100%'} direction={'column'} color={'#667080'}>
                    <Text
                        fontWeight={700}
                        fontSize={'20px'}
                        lineHeight={'20px'}
                    >
                        確定刪除以下人員資料？
                    </Text>
                    <Text
                        fontWeight={500}
                        fontSize={'12px'}
                        lineHeight={'20px'}
                        textAlign={'end'}
                    >
                        {siteName}
                    </Text>
                    <Flex
                        justify={'flex-start'}
                        columnGap={'30px'}
                        bg={'#E3ECFF'}
                        borderRadius={'10px'}
                        p={'41px 20px'}
                    >
                        <Text
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                        >
                            {name}
                        </Text>
                        <Text
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                        >
                            {username}
                        </Text>
                    </Flex>
                    <Flex justify={'space-between'} h="36px" mt={'20px'}>
                        <Button
                            onClick={() => {
                                setShowPopup(false);
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            onClick={() => {
                                deleteSiteRole({
                                    variables: {
                                        siteId: siteId,
                                        username: username,
                                    },
                                });
                            }}
                        >
                            確定
                        </Button>
                    </Flex>
                </Flex>
            </Center>
        </Center>
    );
}
