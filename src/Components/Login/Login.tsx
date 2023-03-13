import React from 'react';
import {
    Text,
    Flex,
    Center,
    Box,
    // Radio,
    // RadioGroup,
} from '@chakra-ui/react';
import { MICIcon, RemoteWorkingIcon } from '../../Icons/Icons';
import Background from '../../Images/BlueLoginBackground.svg';
import LoginForm from './LoginForm';

export default function Login() {
    // const [version, setVersion] = React.useState('desktop');

    return (
        <Center w="100vw" h="100vh" backgroundImage={`url(${Background})`}>
            <Flex
                w={'67%'}
                maxW={'808px'}
                minW={'480px'}
                h={'480px'}
                borderRadius="30px"
                background="#FFFFFF"
            >
                <Flex
                    w="47%"
                    align="center"
                    justify="center"
                    direction={'column'}
                    padding={'0px 43px'}
                >
                    <Box w={'50%'} maxW={'200px'} minW={'120px'}>
                        <MICIcon />
                    </Box>
                    <Text textAlign={'center'}>
                        帆宣系統科技股份有限公司
                        <br />
                        Marketech International Corp.
                    </Text>
                    {/* <RadioGroup pt="25px" onChange={setVersion} value={version}>
                        <HStack>
                            <Radio value="desktop">桌面版</Radio>
                            <Radio value="mobile">手機版</Radio>
                        </HStack>
                    </RadioGroup> */}
                    <LoginForm />
                </Flex>
                <Center
                    w={'57%'}
                    borderRadius="0px 30px 30px 0px"
                    bg="#E5E5E533"
                >
                    <Box w={'87%'} maxW={'400px'}>
                        <RemoteWorkingIcon />
                    </Box>
                </Center>
            </Flex>
        </Center>
    );
}
