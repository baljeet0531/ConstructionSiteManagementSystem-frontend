import React from "react";
import SiteAreas from "./SiteAreas";
import SiteRoles from "./SiteRoles";
import SiteInfo from "./SiteInfo";
import { CloseIcon } from "../../Icons/Icons";

import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";

export default function Site(props: {
    siteDetails: {
        id: any;
        name: string;
        avatar: string;
        start: string;
        end: string;
        line_id: string;
    },
    handlePopup: Function,
}) {

    const { handlePopup, siteDetails } = props
    const { id } = siteDetails

    return (
        <Box minH={"500px"} w={"100%"} border={"1px solid #667080"} borderRadius={"10px"} bg={"#FFFFFF"} mt={"20px"} p={"28px 34px"} position={"relative"}>
            <IconButton size={"xs"} aria-label="DeleteSite" icon={<CloseIcon />} bg={"none"} position={"absolute"} top={0} right={0} onClick={() => { handlePopup("deleteSite") }}></IconButton>
            <Flex w={"100%"} direction={"column"} align={"center"} justify={"start"}>
                <SiteInfo handlePopup={handlePopup} siteDetails={siteDetails}></SiteInfo>
                <SiteRoles handlePopup={handlePopup} siteId={id}></SiteRoles>
                <SiteAreas handlePopup={handlePopup} siteId={id}></SiteAreas>
            </Flex>
        </Box>
    )
}