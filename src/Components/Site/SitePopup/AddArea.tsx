import React from "react";

import {
    Center,
    Flex,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Select,
    IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "../../../Icons/Icons";

export default function AddArea(props: { setShowPopup: Function }) {

    const { setShowPopup } = props

    return (
        <Center position={"absolute"} top={0} left={0} w={"100vw"} h={"100vh"} bg={"#D9D9D980"} zIndex={2}>
            <Center border={"1px solid #667080"} w={"32%"} borderRadius={"10px"} bg={"#FFFFFF"} p={"30px 45px"}>
                <Flex h={"100%"} direction={"column"} color={"#667080"}>
                    <Text fontWeight={700} fontSize={"20px"} lineHeight={"20px"}>新增廠區</Text>
                    <Flex direction={"column"} mt={"20px"} rowGap={"20px"} bg={"#E3ECFF"} borderRadius={"10px"} p={"41px 20px"}>
                        <Flex justify={"flex-start"} h="36px">
                            <Text width={"35%"} fontWeight={"400"} fontSize={"14px"} lineHeight={"20px"} p="8px 12px">廠區</Text>
                            <Input width={"60%"} variant='outline' bg={"#FFFFFF"} type={"text"}></Input>
                        </Flex>
                        <Flex justify={"flex-start"} h="36px">
                            <Text width={"35%"} fontWeight={"400"} fontSize={"14px"} lineHeight={"20px"} p="8px 12px">區域</Text>
                            <InputGroup width={"60%"}>
                                <Input width={"100%"} variant='outline' bg={"#FFFFFF"} type={"text"}></Input>
                                <InputRightElement>
                                    <IconButton
                                        aria-label="DeleteZone"
                                        icon={<CloseIcon />}
                                        bg={"transparent"}
                                        position={"absolute"}
                                        right={"-35px"}
                                        _active={{ background: "transparent" }}
                                        _focus={{ background: "transparent" }}
                                    >
                                    </IconButton>
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                        <Flex justify={"flex-start"} h="36px">
                            <Text width={"35%"} fontWeight={"400"} fontSize={"14px"} lineHeight={"20px"} p="8px 12px"></Text>
                            <InputGroup width={"60%"}>
                                <Input width={"100%"} variant='outline' bg={"#FFFFFF"} type={"text"}></Input>
                                <InputRightElement>
                                    <IconButton
                                        aria-label="DeleteZone"
                                        icon={<CloseIcon />}
                                        bg={"transparent"}
                                        position={"absolute"}
                                        right={"-35px"}
                                        _active={{ background: "transparent" }}
                                        _focus={{ background: "transparent" }}
                                    >
                                    </IconButton>
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                        <Flex justify={"flex-start"} h="36px">
                            <Text width={"35%"} fontWeight={"400"} fontSize={"14px"} lineHeight={"20px"} p="8px 12px"></Text>
                            <InputGroup width={"60%"}>
                                <Input width={"100%"} variant='outline' bg={"#FFFFFF"} type={"text"}></Input>
                                <InputRightElement>
                                    <IconButton
                                        aria-label="DeleteZone"
                                        icon={<CloseIcon />}
                                        bg={"transparent"}
                                        position={"absolute"}
                                        right={"-35px"}
                                        _active={{ background: "transparent" }}
                                        _focus={{ background: "transparent" }}
                                    >
                                    </IconButton>
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                        <Flex justify={"flex-start"} h="36px">
                            <Text width={"35%"} fontWeight={"400"} fontSize={"14px"} lineHeight={"20px"} p="8px 12px"></Text>
                            <InputGroup width={"60%"}>
                                <Input width={"100%"} variant='outline' bg={"#FFFFFF"} type={"text"}></Input>
                                <InputRightElement>
                                    <IconButton
                                        aria-label="DeleteZone"
                                        icon={<CloseIcon />}
                                        bg={"transparent"}
                                        position={"absolute"}
                                        right={"-35px"}
                                        _active={{ background: "transparent" }}
                                        _focus={{ background: "transparent" }}
                                    >
                                    </IconButton>
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                    </Flex>
                    <Flex justify={"space-between"} h="36px" mt={"20px"}>
                        <Button onClick={() => { setShowPopup(false) }}>取消新增</Button>
                        <Button onClick={() => { setShowPopup(false) }}>確定新增</Button>
                    </Flex>
                </Flex>
            </Center>
        </Center>
    )
}