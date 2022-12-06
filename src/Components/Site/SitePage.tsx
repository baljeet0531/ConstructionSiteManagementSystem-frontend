import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import Site from './Site';
import {
    Button,
    Flex,
    Spacer,
    Text,
    Box,
    Center,
    Spinner,
    useToast,
} from '@chakra-ui/react';
import { AddIcon } from '../../Icons/Icons';

import AddSite from './SitePopup/AddSite';
import { useQuery, gql } from '@apollo/client';

export const QUERY_SITE = gql`
    query {
        validSites {
            siteId
            name
            avatar
            start
            end
            city
            lineNotifyToken
        }
    }
`;

export default function SitePage() {
    const toast = useToast();

    const [rerender, setRerender] = React.useState<Boolean>(true);
    const [showPopup, setShowPopup] = React.useState(false);
    const [popupComponent, setPopupComponent] = React.useState(<></>);
    const [sites, setSites] = React.useState<
        {
            siteId: any;
            name: string;
            avatar: string;
            start: string;
            end: string;
            city: string;
        }[]
    >([]);

    if (!IsPermit('site')) return <Navigate to="/" replace={true} />;

    const { loading } = useQuery(QUERY_SITE, {
        onCompleted: (data) => {
            setSites(data.validSites);
        },
        onError: (error) => {
            toast({
                title: '錯誤',
                description: error.message,
                status: 'error',
                duration: null,
                isClosable: true,
            });
        },
    });

    if (loading) {
        return (
            <Center w={'100%'} h={'100%'}>
                <Spinner size={'xl'} />
            </Center>
        );
    }

    if (sites.length != 0) {
        const allSites = sites.map((siteDetails, index) => {
            return (
                <Site
                    key={index}
                    siteDetails={siteDetails}
                    setPopupComponent={setPopupComponent}
                    setShowPopup={setShowPopup}
                    rerender={rerender}
                    setRerender={setRerender}
                ></Site>
            );
        });

        return (
            <Box>
                <Flex
                    direction={'column'}
                    h={'100vh'}
                    pl={'30px'}
                    pr={'30px'}
                    pt={'47px'}
                    pb={'20px'}
                    overflowY={'auto'}
                >
                    <Flex
                        direction={'row'}
                        justify="space-between"
                        align={'end'}
                        mb={'5px'}
                    >
                        <Text
                            fontSize={'36px'}
                            fontWeight={400}
                            fontFamily={'Inter'}
                            color={'#667080'}
                        >
                            專案管理
                        </Text>
                        <Spacer />
                        <Button
                            leftIcon={<AddIcon />}
                            bg={'#4C7DE7'}
                            color={'#FFFFFF'}
                            onClick={() => {
                                setPopupComponent(
                                    <AddSite
                                        setShowPopup={setShowPopup}
                                    ></AddSite>
                                );
                                setShowPopup(true);
                            }}
                        >
                            新增專案
                        </Button>
                    </Flex>
                    <Flex direction={'column'}>{allSites}</Flex>
                </Flex>
                {showPopup && popupComponent}
            </Box>
        );
    } else {
        return (
            <Center w={'100%'} h={'100%'}>
                <Text>尚無資料</Text>
            </Center>
        );
    }
}
