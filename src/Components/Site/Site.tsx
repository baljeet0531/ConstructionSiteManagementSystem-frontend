import { Flex, Center, Image, Text, Button } from "@chakra-ui/react";
import { AddIcon, AddPeopleIcon } from "../../Icons/Icons";
import React from "react";
import SiteAreas from "./SiteAreas";
import SiteRoles from "./SiteRoles";

export default function Site(props: {
    siteDetails: {
        id: any;
        name: string;
        avatar: string;
        start: string;
        end: string;
        line_id: string;
    }
}) {

    const { id, name, avatar, start, end, line_id } = props.siteDetails

    return (
        <Flex minH={"500px"} w={"100%"} direction={"column"} border={"1px solid #667080"} borderRadius={"10px"} bg={"#FFFFFF"} align={"center"} justify={"start"} mt={"20px"} p={"28px 34px"}>
            <Flex w={"100%"} direction={"row"} justify={"space-between"} align={"end"}>
                <Flex direction={"row"}>
                    <Center w={"129px"} h={"77px"} bg={"#E3ECFF"} borderRadius={"4px"}>
                        <Image src={avatar} />
                    </Center>
                    <Flex direction={"column"} gap={"5px"} ml={"5px"}>
                        <Flex direction={"row"} gap={"5px"} h={"36px"}>
                            <Text p={"8px 12px"} bg={"#E3ECFF"} color={"#13398D"} fontWeight={400} fontSize={"14px"} lineHeight={"20px"}>{id}</Text>
                            <Text p={"8px 12px"} bg={"#E3ECFF"} color={"#13398D"} fontWeight={400} fontSize={"14px"} lineHeight={"20px"}>{name}</Text>
                        </Flex>
                        <Flex direction={"row"} gap={"5px"} h={"36px"}>
                            <Text p={"8px 12px"} bg={"#E3ECFF"} color={"#13398D"} fontWeight={400} fontSize={"14px"} lineHeight={"20px"}>
                                {`工期：${start} ~ ${end}`}
                            </Text>
                            <Text p={"8px 12px"} bg={"#E3ECFF"} color={"#13398D"} fontWeight={400} fontSize={"14px"} lineHeight={"20px"}>
                                {`Line Notify ID: ${line_id}`}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex direction={"row"} w={"218px"} h={"36px"} gap={"10px"}>
                    <Button h={"36px"} p={"8px 12px"} fontWeight={400} fontSize={"14px"} lineHeight={"20px"} leftIcon={<AddIcon />} bg={"#4C7DE7"} color={"#FFFFFF"}>新增工地</Button>
                    <Button h={"36px"} p={"8px 12px"} fontWeight={400} fontSize={"14px"} lineHeight={"20px"} leftIcon={<AddPeopleIcon />} bg={"#4C7DE7"} color={"#FFFFFF"}>新增人員</Button>
                </Flex>
            </Flex>
            <SiteRoles siteId={id}></SiteRoles>
            <SiteAreas siteId={id}></SiteAreas>
        </Flex>
    )
}