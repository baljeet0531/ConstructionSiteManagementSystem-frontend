import React from 'react';
import { useMutation, gql } from '@apollo/client';

import { Center, Flex, Text, Input, Button } from '@chakra-ui/react';

import { QUERY_SITE } from '../SitePage';

const ADD_SITE = gql`
    mutation CreateSite {
        createSite(
            siteId: "TEST-111"
            name: "測試工地-1"
            avatar: "/images/avatar/test_1.jpg"
            start: "2021/01/01"
            end: "2025-07-07"
            lineId: "@testIJK"
        ) {
            site {
                siteId
            }
        }
    }
`;

export default function AddSite(props: { setShowPopup: Function }) {
    const { setShowPopup } = props;
    const siteId = React.useRef<HTMLInputElement>(null);
    const siteName = React.useRef<HTMLInputElement>(null);

    const [addSite, { data, loading, error }] = useMutation(ADD_SITE, {
        refetchQueries: [
            { query: QUERY_SITE }, // DocumentNode object parsed with gql
        ],
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
                <Flex h={'100%'} direction={'column'} color={'#667080'}>
                    <Text
                        fontWeight={700}
                        fontSize={'20px'}
                        lineHeight={'20px'}
                    >
                        新增工地
                    </Text>
                    <Flex
                        direction={'column'}
                        mt={'20px'}
                        rowGap={'20px'}
                        bg={'#E3ECFF'}
                        borderRadius={'10px'}
                        p={'41px 20px'}
                    >
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                業主頭像
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'file'}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                工地編號
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                ref={siteId}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                工地名稱
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                ref={siteName}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                工期開始
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'date'}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                工期結束
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'date'}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                Line ID
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                disabled
                                value="12345678"
                            ></Input>
                        </Flex>
                    </Flex>
                    <Flex justify={'space-between'} h="36px" mt={'20px'}>
                        <Button
                            onClick={() => {
                                setShowPopup(false);
                            }}
                        >
                            取消新增
                        </Button>
                        <Button
                            onClick={() => {
                                // if (
                                //     siteId.current?.value &&
                                //     siteName.current?.value
                                // ) {
                                //     console.log(siteId.current.value);
                                //     console.log(siteName.current.value);
                                //     addSite({
                                //         variables: {
                                //             siteId: 'TEST-444',
                                //         },
                                //     });
                                // } else {
                                //     console.log('編號或名稱不能為空');
                                // }
                                addSite();
                                setShowPopup(false);
                            }}
                        >
                            確定新增
                        </Button>
                    </Flex>
                </Flex>
            </Center>
        </Center>
    );
}
