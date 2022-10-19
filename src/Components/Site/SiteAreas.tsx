import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Icon,
    Flex,
    Center,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from "../../Icons/Icons";

const Mock_Area = {
    "A-1": [
        {
            area_name: "CUB棟",
            zone: [
                "2F",
                "3F",
                "4F",
                "5F",
                "6F",
                "7F",
                "8F",
            ]
        },
        {
            area_name: "貨櫃屋前",
            zone: [
                "A區",
                "B區",
                "C區",
            ]
        },
        {
            area_name: "工務所預定地aaaaaaaaa",
            zone: [
                "aaaaaaa南側aaaaaaaaaa",
                "北側",
                "東側",
                "西側",
            ]
        },
        {
            area_name: "工務所預定地aaaaaa",
            zone: [
                "南側",
                "北側",
                "東側",
                "西側",
            ]
        },
    ],
    "A-2": [
        {
            area_name: "CUB棟",
            zone: [
                "2F",
                "3F",
                "4F",
                "5F",
                "6F",
            ]
        },
        {
            area_name: "貨櫃屋前",
            zone: [
                "A區",
                "B區",
                "C區",
            ]
        },
    ],
}

export default function SiteAreas(props: { siteId: keyof typeof Mock_Area }) {

    const areaDetalis = Mock_Area[props.siteId]

    const areaElements = areaDetalis.map((area, index) => {

        const { area_name, zone } = area

        while (zone.length < 5)
            zone.push("")

        const zoneElements = zone.map((zoneName, index) => {
            return (
                <Tr key={index}>
                    <Td textAlign="center">{index + 1}.</Td>
                    <Td overflowX={"auto"}>{zoneName}</Td>
                    <Td></Td>
                    <Td></Td>
                </Tr>
            )
        })

        return (
            <TableContainer flexBasis={"32%"} mt={"16px"} h={"265.5px"} maxH={"265.5px"} overflowY={"auto"} key={index}
                border={"1px solid #919AA9"} borderBottom={"none"}>
                <Table >
                    <Thead position={"sticky"} top={0} zIndex={1}>
                        <Tr>
                            <Th w={"23%"} textAlign="center">廠區</Th>
                            <Th w={"37%"} overflowX={"auto"}>{area_name}</Th>
                            <Th w={"20%"}>
                                <Center>
                                    <Icon as={EditIcon}></Icon>
                                </Center>
                            </Th>
                            <Th w={"20%"}>
                                <Center>
                                    <Icon as={DeleteIcon}></Icon>
                                </Center>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {zoneElements}
                    </Tbody>
                </Table>
            </TableContainer>
        )
    })

    return (
        <Flex w={"100%"} flexWrap="wrap" columnGap={"2%"}>
            {areaElements}
        </Flex>
    )
}