import { HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";

export function Feature(props: { handleClick: Function, icon: any, children: string }) {
    return (
        <HStack cursor="pointer" onClick={() => props.handleClick({ variables: { feature: props.children } })}>
            <Icon as={props.icon}></Icon>
            <Text>{props.children}</Text>
        </HStack>
    )
}