import React from 'react';
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

const Mock_Area = {
    'TEST-1': [
        {
            area_name: 'CUB棟',
            zone: ['2F', '3F', '4F', '5F', '6F', '7F', '8F'],
        },
        {
            area_name: '貨櫃屋前',
            zone: ['A區', 'B區', 'C區'],
        },
        {
            area_name: '工務所預定地',
            zone: ['南側', '北側', '東側', '西側'],
        },
        {
            area_name: '工務所預定地',
            zone: ['南側', '北側', '東側', '西側'],
        },
    ],
    'TEST-2': [
        {
            area_name: 'CUB棟',
            zone: ['2F', '3F', '4F', '5F', '6F'],
        },
        {
            area_name: '貨櫃屋前',
            zone: ['A區', 'B區', 'C區'],
        },
    ],
};

export default function SiteAreas(props: {
    siteId: keyof typeof Mock_Area;
    handlePopup: Function;
}) {
    const { handlePopup } = props;

    const areaDetalis = Mock_Area[props.siteId];
    if (!areaDetalis) {
        return <></>;
    }

    const areaElements = areaDetalis.map((area, index) => {
        const { area_name, zone } = area;

        while (zone.length < 5) zone.push('');

        const zoneElements = zone.map((zoneName, index) => {
            return (
                <Tr key={index}>
                    <Td textAlign="center">{index + 1}.</Td>
                    <Td overflowX={'auto'}>{zoneName}</Td>
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
                                        {area_name}
                                    </Text>
                                    <Center w={'20px'}>
                                        <IconButton
                                            size={'xs'}
                                            h={'20px'}
                                            aria-label="EditArea"
                                            icon={<EditIcon />}
                                            bg={'none'}
                                            onClick={() => {
                                                handlePopup('editArea');
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
                                                handlePopup('deleteArea');
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

    return (
        <Flex w={'100%'} flexWrap="wrap" columnGap={'2%'}>
            {areaElements}
        </Flex>
    );
}
