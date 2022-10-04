import React from "react";
import { Feature } from "./Feature";

import { VStack } from "@chakra-ui/react";

export default function Menu(props: { features: string[] }) {

    const features = props.features.map((feature, index) => {
        return (
            <Feature key={index}>{feature}</Feature>
        )
    })

    return (
        <VStack borderRadius="30px" pt="24px" pb="24px" w="80%" m="auto" pl="12px" pr="12px" spacing="24px" align="left" background="#FFFFFF">
            {features}
        </VStack>
    )
}