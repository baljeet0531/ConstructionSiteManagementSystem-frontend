import React from "react";
import { Button, VStack, Icon, Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { MICIcon, ShowPasswordIcon } from "../Icons/Icons";

export default function Login(props: { handleLogin: Function }) {

    const [show, setShow] = React.useState(false)

    function showPassword() {
        setShow(!show)
    }

    return (
        <VStack w="30vw" maxW="30vw" h="100vh" align="center" justify="center" m="auto">
            <Icon as={MICIcon}></Icon>
            <VStack w="60%" maxW="60%" align="center" justify="center" m="auto" spacing="20px" pt="42px">
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
                <Button w="100%" background="#4C7DE7" borderRadius="20px" color="#FFFFFF" onClick={() => props.handleLogin()}>log in</Button>
            </VStack>
        </VStack>
    )
}