import React from 'react';

import { Center, Flex, Text, Button } from '@chakra-ui/react';

export default function DeleteRole(props: { setShowPopup: Function }) {
    const { setShowPopup } = props;

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
                    <Flex
                        justify={'flex-start'}
                        columnGap={'30px'}
                        bg={'#E3ECFF'}
                        borderRadius={'10px'}
                        mt={'20px'}
                        p={'41px 20px'}
                    >
                        <Text
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                        >
                            梁樂謙
                        </Text>
                        <Text
                            fontWeight={400}
                            fontSize={'14px'}
                            lineHeight={'20px'}
                        >
                            lhleung
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
