import React from "react";
import { Feature } from "./Feature";
import { SettingIcon } from "../Icons/Icons";

import { VStack } from "@chakra-ui/react";

export default function Menu(props: { features: string[], handleClick: Function }) {

    const features = props.features.map((feature, index) => {
        return (
            <Feature key={index} handleClick={props.handleClick} icon={SettingIcon}>{feature}</Feature>
        )
    })

    return (
        <VStack border="1px" borderRadius="30px" pt="24px" pb="24px" pl="17px" w="80%" m="auto" spacing="24px" align="left">
            {features}
        </VStack>
    )
}