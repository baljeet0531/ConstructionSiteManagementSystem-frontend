import React from "react";
import { Button, VStack, Icon, Input, InputGroup, InputRightElement, IconButton, HStack, Text, Radio, RadioGroup, Flex } from "@chakra-ui/react";
import { MICIcon, ShowPasswordIcon, RemoteWorkingIcon } from "../../Icons/Icons";
import Background from "../../Images/BlueLoginBackground.svg"

import { useLazyQuery, gql } from '@apollo/client';

const QUERY_LOGIN = gql`
  query{
    auth(username:"johndoe",password:"secret"){
      accessToken
      role
    }
  } 
`

export default function Login() {

    const [show, setShow] = React.useState(false)
    const [version, setVersion] = React.useState("desktop")

    function showPassword() {
        setShow(!show)
    }

    const [queryLogin, loginResult] = useLazyQuery(QUERY_LOGIN)

    const [login, setLogin] = React.useState(false)

    if (loginResult) {
        if (loginResult.loading) console.log("loading login")
        if (loginResult.error) console.log(loginResult.error)
    }

    React.useEffect(() => {
        if (loginResult && loginResult.data && loginResult.data.auth)
            setLogin(true)
    }, [loginResult.data, loginResult])

    return (
        <Flex w="100vw" h="100vh" backgroundImage={`url(${Background})`}>
            <Flex w="67%" h="58%" m="auto" borderRadius="30px" background="#FFFFFF">
                <VStack w="47%" align="center" justify="center">
                    <Icon as={MICIcon}></Icon>
                    <Text>帆宣系統科技股份有限公司<br />Marketech International Corp.</Text>
                    <RadioGroup pt="25px" onChange={setVersion} value={version}>
                        <HStack >
                            <Radio value="desktop">桌面版</Radio>
                            <Radio value="mobile">手機版</Radio>
                        </HStack>
                    </RadioGroup>
                    <VStack w="52%" align="center" justify="center" m="auto" spacing="20px" pt="25px">
                        <Input type="email" placeholder="Account" border="2px solid #919AA9" borderRadius="4px"></Input>
                        <InputGroup>
                            <Input type={show ? "text" : "password"} placeholder="Password" border="2px solid #919AA9" borderRadius="4px"></Input>
                            <InputRightElement>
                                <IconButton
                                    aria-label='Show Password'
                                    icon={<ShowPasswordIcon />}
                                    onClick={showPassword}
                                    background="transparent"
                                    _active={{ background: "transparent" }}
                                    _focus={{ background: "transparent" }}
                                >
                                </IconButton>
                            </InputRightElement>
                        </InputGroup>
                        <Button w="100%" background="#4C7DE7" borderRadius="20px" color="#FFFFFF">log in</Button>
                    </VStack>
                </VStack>
                <VStack w="53%" align="center" justify="center" borderRadius="0px 30px 30px 0px" background="rgba(229, 229, 229, 0.2)">
                    <Icon as={RemoteWorkingIcon}></Icon>
                </VStack>
            </Flex>
        </Flex>
    )
}