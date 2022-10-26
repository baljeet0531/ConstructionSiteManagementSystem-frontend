import React from "react";
import { Box } from "@chakra-ui/react";

export default function MainScreen(props: { children: React.ReactNode }) {
    return (
        <Box h={"100vh"} m={"0px"} borderLeft={"1px solid #000000"}>{props.children}</Box>
    )
}