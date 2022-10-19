import React from 'react';
import { Navigate } from "react-router-dom";
import { IsPermit } from '../../Mockdata/Mockdata';
import Site from './Site';
import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { AddIcon } from '../../Icons/Icons';

const MOCK_SITE = {
    allsites: [
        {
            id: "A-1",
            name: "穩懋南科路竹廠機電一期新建工程",
            avatar: "/SiteIcons/A-1.svg",
            start: "2022/01/02",
            end: "2022/06/30",
            line_id: "12345678",
        },
        {
            id: "A-2",
            name: "穩懋龜山廠P3/3F擴建工程",
            avatar: "/SiteIcons/A-1.svg",
            start: "2022/05/15",
            end: "2022/12/30",
            line_id: "56789012",
        },
    ]
}

export default function SitePage() {

    if (!IsPermit("site"))
        return <Navigate to="/" replace={true} />

    const allSites = MOCK_SITE.allsites.map((siteDetails, index) => {
        return <Site key={index} siteDetails={siteDetails}></Site>
    })

    return (
        <Flex direction={"column"} h={"100vh"} pl={"30px"} pr={"30px"} pt={"47px"} pb={"20px"} overflowY={"auto"}>
            <Flex direction={"row"} justify="space-between" align={"end"} mb={"5px"}>
                <Text fontSize={"36px"} fontWeight={400} fontFamily={"Inter"} color={"#667080"}>工地管理</Text>
                <Spacer />
                <Button leftIcon={<AddIcon />} bg={"#4C7DE7"} color={"#FFFFFF"}>新增工地</Button>
            </Flex>
            <Flex direction={"column"}>
                {allSites}
            </Flex>
        </Flex>
    )
}