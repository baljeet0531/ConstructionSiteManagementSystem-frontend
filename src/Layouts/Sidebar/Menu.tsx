import React from "react";
import { Feature } from "./Feature";

import { VStack } from "@chakra-ui/react";

import { features, PERMISSION } from '../../Mockdata/Mockdata';
import { Cookies } from "react-cookie";

export default function Menu() {

    const ROLE = "admin"

    const {
        site,
        schedule,
        people,
        security,
        report,
        photo,
        dashboard,
    }: features = PERMISSION[ROLE].features

    return (
        <VStack borderRadius="30px" pt="24px" pb="24px" w="80%" m="auto" pl="12px" pr="12px" spacing="24px" align="left" background="#FFFFFF">
            {site && <Feature feature="site"></Feature>}
            {schedule && <Feature feature="schedule"></Feature>}
            {people && <Feature feature="people"></Feature>}
            {security && <Feature feature="security"></Feature>}
            {report && <Feature feature="report"></Feature>}
            {photo && <Feature feature="photo"></Feature>}
            {dashboard && <Feature feature="dashboard"></Feature>}
        </VStack>
    )
}