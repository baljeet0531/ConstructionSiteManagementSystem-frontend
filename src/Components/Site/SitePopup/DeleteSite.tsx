import React from 'react';

import { Center, Flex, Text, Button } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { QUERY_SITE } from '../SitePage';

const DELETE_SITE = gql`
    mutation deleteSite($siteId: String!) {
        deleteSite(siteId: $siteId) {
            ok
        }
    }
`;

export default function DeleteSite(props: {
    setShowPopup: Function;
    siteName: string;
    siteId: string;
}) {
    const { setShowPopup, siteName, siteId } = props;
    const [deleteSite, { loading, error, data }] = useMutation(DELETE_SITE, {
        refetchQueries: [{ query: QUERY_SITE }],
    });
    if (loading) console.log('Submitting...');
    if (error) console.log(`Submission error! ${error.message}`);
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
                <Flex
                    h={'100%'}
                    direction={'column'}
                    color={'#667080'}
                    maxW={'70%'}
                >
                    <Text
                        fontWeight={700}
                        fontSize={'20px'}
                        lineHeight={'20px'}
                    >
                        確定刪除以下工地？
                    </Text>
                    <Center
                        bg={'#E3ECFF'}
                        borderRadius={'10px'}
                        mt={'20px'}
                        p={'41px 20px'}
                    >
                        <Text
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                            wordBreak={'break-word'}
                        >
                            {siteName}
                        </Text>
                    </Center>
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
                                deleteSite({ variables: { siteId: siteId } });
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
