import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { Center, Flex, Text, Button } from '@chakra-ui/react';
import { QUERY_SITE_AREAS } from '../SiteAreas';

const DELETE_AREA = gql`
    mutation DeleteSiteArea($siteId: String!, $name: String!) {
        deleteSiteArea(siteId: $siteId, name: $name) {
            ok
        }
    }
`;

export default function DeleteArea(props: {
    setShowPopup: Function;
    areaName: string;
    siteId: string;
    siteName: string;
}) {
    const { setShowPopup, areaName, siteId, siteName } = props;
    const [deleteSiteArea, { data, error }] = useMutation(DELETE_AREA, {
        refetchQueries: [
            { query: QUERY_SITE_AREAS, variables: { siteId: siteId } },
        ],
    });
    if (error) console.log(`${error.message}`);
    if (data) console.log(data);

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
                        確定刪除以下廠區資料？
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
                        direction={'column'}
                        rowGap={'20px'}
                        bg={'#E3ECFF'}
                        borderRadius={'10px'}
                        p={'41px 20px'}
                    >
                        <Text
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                        >
                            {areaName}
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
                                deleteSiteArea({
                                    variables: {
                                        siteId: siteId,
                                        name: areaName,
                                    },
                                });
                                setShowPopup(false);
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
