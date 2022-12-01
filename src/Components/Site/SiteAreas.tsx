import React from 'react';

import { useQuery, gql } from '@apollo/client';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    IconButton,
    Flex,
    Center,
    Text,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '../../Icons/Icons';
import EditArea from './SitePopup/EditArea';
import DeleteArea from './SitePopup/DeleteArea';

export const QUERY_SITE_AREAS = gql`
    query siteAreas($siteId: String!) {
        siteAreas(siteId: $siteId) {
            name
            zone
        }
    }
`;

export default function SiteAreas(props: {
    siteId: string;
    setPopupComponent: Function;
    setShowPopup: Function;
    handlePopup: Function;
}) {
    const { siteId, setPopupComponent, setShowPopup } = props;
    const { data, loading, error } = useQuery(QUERY_SITE_AREAS, {
        variables: {
            siteId: siteId,
        },
    });
    if (loading) console.log('loading');
    if (error) console.log(error);

    let areaElements: any = <></>;
    if (data) {
        const siteAreasData: { name: string; zone: string }[] = data.siteAreas;
        let siteAreasObject: { [key: string]: string[] } = {};

        for (let i = 0; i < siteAreasData.length; i++) {
            const { name, zone } = siteAreasData[i];
            const zoneTrimmed = zone.trim();

            if (!siteAreasObject[name]) siteAreasObject[name] = [];
            if (zoneTrimmed != '') siteAreasObject[name].push(zoneTrimmed);
        }
        areaElements = Object.entries(siteAreasObject).map((area, index) => {
            const [areaName, zone] = area;

            const zoneData = [...zone];
            while (zoneData.length < 5) zoneData.push('');
            const zoneElements = zoneData.map((zoneName, index) => {
                return (
                    <Tr key={index}>
                        <Td textAlign="center">{index + 1}.</Td>
                        <Td overflowX={'auto'} whiteSpace={'pre'}>
                            {zoneName}
                        </Td>
                    </Tr>
                );
            });

            return (
                <TableContainer
                    flexBasis={'32%'}
                    mt={'16px'}
                    h={'265.5px'}
                    maxH={'265.5px'}
                    overflowY={'auto'}
                    key={index}
                    border={'1px solid #919AA9'}
                    borderBottom={'none'}
                >
                    <Table>
                        <Thead position={'sticky'} top={0} zIndex={1}>
                            <Tr>
                                <Th w={'23%'} textAlign="center">
                                    廠區
                                </Th>
                                <Th w={'77%'}>
                                    <Flex columnGap={'16px'}>
                                        <Text
                                            flex={1}
                                            overflowX={'auto'}
                                            lineHeight={'20px'}
                                        >
                                            {areaName}
                                        </Text>
                                        <Center w={'20px'}>
                                            <IconButton
                                                size={'xs'}
                                                h={'20px'}
                                                aria-label="EditArea"
                                                icon={<EditIcon />}
                                                bg={'none'}
                                                onClick={() => {
                                                    setPopupComponent(
                                                        <EditArea
                                                            setShowPopup={
                                                                setShowPopup
                                                            }
                                                            areaName={areaName}
                                                            siteId={siteId}
                                                            zone={zone}
                                                        ></EditArea>
                                                    );
                                                    setShowPopup(true);
                                                }}
                                            ></IconButton>
                                        </Center>
                                        <Center w={'20px'}>
                                            <IconButton
                                                size={'xs'}
                                                h={'20px'}
                                                aria-label="DeleteArea"
                                                icon={<DeleteIcon />}
                                                bg={'none'}
                                                onClick={() => {
                                                    setPopupComponent(
                                                        <DeleteArea
                                                            setShowPopup={
                                                                setShowPopup
                                                            }
                                                            areaName={areaName}
                                                            siteId={siteId}
                                                        ></DeleteArea>
                                                    );
                                                    setShowPopup(true);
                                                }}
                                            ></IconButton>
                                        </Center>
                                    </Flex>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>{zoneElements}</Tbody>
                    </Table>
                </TableContainer>
            );
        });
    }
    return (
        <Flex w={'100%'} flexWrap="wrap" columnGap={'2%'}>
            {areaElements}
        </Flex>
    );
}
