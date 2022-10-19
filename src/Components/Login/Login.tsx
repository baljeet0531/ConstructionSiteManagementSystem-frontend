import React from "react";
import { Button, VStack, Icon, Input, InputGroup, InputRightElement, IconButton, HStack, Text, Radio, RadioGroup, Flex } from "@chakra-ui/react";
import { MICIcon, ShowPasswordIcon, RemoteWorkingIcon } from "../../Icons/Icons";
import Background from "../../Images/BlueLoginBackground.svg"

import { useLazyQuery, gql } from '@apollo/client';
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const QUERY_LOGIN = gql`
  query Login($username: String!, $password: String!){
    login(username: $username,password: $password){
        accessToken
    }
  }
`

export default function Login() {

    const [show, setShow] = React.useState(false)
    const [version, setVersion] = React.useState("desktop")
    const [isLoading, setisLoading] = React.useState(false)
    const userName = React.useRef<HTMLInputElement>(null)
    const password = React.useRef<HTMLInputElement>(null)

    const [cookie, setCookie] = useCookies(["jwt"])

    function showPassword() {
        setShow(!show)
    }

    const [queryLogin, { loading, error, data }] = useLazyQuery(QUERY_LOGIN)

    if (loading) {
        if (!isLoading) setisLoading(true)
        console.log("loading")
    }
    if (error) {
        if (isLoading) setisLoading(false)
        console.log(error)
        console.log(JSON.stringify(error))
    }

    if (data?.login) {
        setCookie("jwt", data.login, {
            path: "/",
            secure: true,
            sameSite: "strict",
        })
    }

    return (
        <Flex w="100vw" h="100vh" backgroundImage={`url(${Background})`}>
            {data?.auth && <Navigate to="/" replace={true} />}
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
                        <Input type="email" placeholder="Account" border="2px solid #919AA9" borderRadius="4px"
                            ref={userName} ></Input>
                        <InputGroup>
                            <Input type={show ? "text" : "password"} placeholder="Password" border="2px solid #919AA9" borderRadius="4px"
                                ref={password} ></Input>
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
                        <Button
                            w="100%" borderRadius="20px" color="#FFFFFF" background="#4C7DE7" _active={{ background: "#4C7DE7" }} _focus={{ background: "#4C7DE7" }}
                            isLoading={isLoading} onClick={() => {
                                queryLogin({ variables: { username: userName.current?.value, password: password.current?.value } })
                            }
                            }>
                            log in
                        </Button>
                    </VStack>
                </VStack>
                <VStack w="53%" align="center" justify="center" borderRadius="0px 30px 30px 0px" background="rgba(229, 229, 229, 0.2)">
                    <Icon as={RemoteWorkingIcon}></Icon>
                </VStack>
            </Flex>
        </Flex>
    )
}