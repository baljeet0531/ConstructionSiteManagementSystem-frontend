import React from 'react';
import {
    Button,
    VStack,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    HStack,
    Text,
    Radio,
    RadioGroup,
    Flex,
    useToast,
} from '@chakra-ui/react';
import {
    MICIcon,
    ShowPasswordIcon,
    RemoteWorkingIcon,
} from '../../Icons/Icons';
import Background from '../../Images/BlueLoginBackground.svg';
import { useCookies } from 'react-cookie';
import BACKEND from '../../Constants/EnvConstants';

export default function Login() {
    const [show, setShow] = React.useState(false);
    const [version, setVersion] = React.useState('desktop');
    const [isLoading, setisLoading] = React.useState(false);
    const userName = React.useRef<HTMLInputElement>(null);
    const password = React.useRef<HTMLInputElement>(null);
    // eslint-disable-next-line no-unused-vars
    const [cookie, setCookie] = useCookies(['jwt']);

    const toast = useToast();

    async function fetchLogin() {
        let response = await fetch(BACKEND + '/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName.current?.value,
                password: password.current?.value,
            }),
            method: 'POST',
        });

        if (response.status >= 400) {
            console.log(response.statusText);
            setisLoading(false);
            if (response.statusText == 'Unauthorized') {
                toast({
                    title: '錯誤',
                    description: `帳號或密碼錯誤`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: '錯誤',
                    description: `${response.statusText}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } else {
            setCookie('jwt', await response.text(), {
                path: '/',
                secure: true,
                sameSite: 'strict',
            });
            window.location.href = '/';
        }
    }

    function showPassword() {
        setShow(!show);
    }
    return (
        <Flex w="100vw" h="100vh" backgroundImage={`url(${Background})`}>
            <Flex
                w="67%"
                h="58%"
                m="auto"
                borderRadius="30px"
                background="#FFFFFF"
            >
                <VStack w="47%" align="center" justify="center">
                    <Icon as={MICIcon}></Icon>
                    <Text>
                        帆宣系統科技股份有限公司
                        <br />
                        Marketech International Corp.
                    </Text>
                    <RadioGroup pt="25px" onChange={setVersion} value={version}>
                        <HStack>
                            <Radio value="desktop">桌面版</Radio>
                            <Radio value="mobile">手機版</Radio>
                        </HStack>
                    </RadioGroup>
                    <VStack
                        w="52%"
                        align="center"
                        justify="center"
                        m="auto"
                        spacing="20px"
                        pt="25px"
                    >
                        <Input
                            type="email"
                            placeholder="Account"
                            border="2px solid #919AA9"
                            borderRadius="4px"
                            ref={userName}
                        ></Input>
                        <InputGroup>
                            <Input
                                type={show ? 'text' : 'password'}
                                placeholder="Password"
                                border="2px solid #919AA9"
                                borderRadius="4px"
                                ref={password}
                            ></Input>
                            <InputRightElement>
                                <IconButton
                                    aria-label="Show Password"
                                    icon={<ShowPasswordIcon />}
                                    onClick={showPassword}
                                    background="transparent"
                                    _active={{ background: 'transparent' }}
                                    _focus={{ background: 'transparent' }}
                                    _hover={{ background: 'transparent' }}
                                ></IconButton>
                            </InputRightElement>
                        </InputGroup>
                        <Button
                            w="100%"
                            borderRadius="20px"
                            color="#FFFFFF"
                            background="#4C7DE7"
                            _active={{ background: '#4C7DE7' }}
                            _focus={{ background: '#4C7DE7' }}
                            _hover={{ background: '#4C7DE7' }}
                            isLoading={isLoading}
                            onClick={() => {
                                if (
                                    !userName.current?.value ||
                                    !password.current?.value
                                ) {
                                    toast({
                                        title: '錯誤',
                                        description: '帳號或密碼不能為空',
                                        status: 'error',
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                    return;
                                }
                                setisLoading(true);
                                fetchLogin();
                            }}
                        >
                            log in
                        </Button>
                    </VStack>
                </VStack>
                <VStack
                    w="53%"
                    align="center"
                    justify="center"
                    borderRadius="0px 30px 30px 0px"
                    background="rgba(229, 229, 229, 0.2)"
                >
                    <Icon as={RemoteWorkingIcon}></Icon>
                </VStack>
            </Flex>
        </Flex>
    );
}
