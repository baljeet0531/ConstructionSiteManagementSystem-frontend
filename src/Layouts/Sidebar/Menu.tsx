import React from "react";
import { Feature } from "./Feature";

import { VStack } from "@chakra-ui/react";

import { features, PERMISSION } from '../../Mockdata/Mockdata';
import { Cookies } from "react-cookie";

export default function Menu() {

    const ROLE = new Cookies().get("role") as keyof typeof PERMISSION
    const {
        place,
        schedule,
        people,
        security,
        report,
        photo,
        dashboard,
    }: features = PERMISSION[ROLE].features

    return (
        <VStack borderRadius="30px" pt="24px" pb="24px" w="80%" m="auto" pl="12px" pr="12px" spacing="24px" align="left" background="#FFFFFF">
            {place && <Feature feature="place"></Feature>}
            {schedule && <Feature feature="schedule"></Feature>}
            {people && <Feature feature="people"></Feature>}
            {security && <Feature feature="security"></Feature>}
            {report && <Feature feature="report"></Feature>}
            {photo && <Feature feature="photo"></Feature>}
            {dashboard && <Feature feature="dashboard"></Feature>}
        </VStack>
    )
}