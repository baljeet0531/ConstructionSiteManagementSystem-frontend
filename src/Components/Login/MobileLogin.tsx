import React from 'react';
import { Text, Flex, Center, Box } from '@chakra-ui/react';
import { MICIcon } from '../../Icons/Icons';
import Background from '../../Images/BlueLoginBackground.svg';
import LoginForm from './LoginForm';
import { VERSION } from '../../Constants/EnvConstants';

export default function MobileLogin() {
    return (
        <Center w="100vw" h="100vh" backgroundImage={`url(${Background})`}>
            <Flex
                w={'300px'}
                borderRadius="30px"
                background="#FFFFFF"
                direction={'column'}
            >
                <Flex
                    align="center"
                    justify="center"
                    direction={'column'}
                    padding={'24px 38px'}
                    gap={'10px'}
                >
                    <Box w={'50%'}>
                        <MICIcon />
                    </Box>
                    <Text
                        textAlign={'center'}
                        fontWeight={400}
                        fontSize={'0.875rem'}
                        lineHeight={'1.25rem'}
                    >
                        帆宣系統科技股份有限公司
                        <br />
                        Marketech International Corp.
                    </Text>
                    <Text
                        fontWeight={400}
                        fontSize={'1.25rem'}
                        lineHeight={'1.5rem'}
                    >
                        帆宣戰情中心
                    </Text>
                </Flex>
                <Flex direction={'column'} padding={'31px 65px'}>
                    <LoginForm mode={'mobile'} />
                </Flex>
                <Text textAlign={'center'}>版本：{VERSION}</Text>
            </Flex>
        </Center>
    );
}
