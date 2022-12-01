import React from 'react';
import { useMutation, gql } from '@apollo/client';

import {
    Center,
    Flex,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '../../../Icons/Icons';
import { QUERY_SITE_AREAS } from '../SiteAreas';

const UPDATE_SITE_AREA = gql`
    mutation UpdateSiteArea(
        $name: String!
        $rename: String
        $siteId: String!
        $zone: [String!]
    ) {
        updateSiteArea(
            name: $name
            rename: $rename
            siteId: $siteId
            zone: $zone
        ) {
            siteArea {
                name
                zone
                siteId
            }
        }
    }
`;

export default function EditArea(props: {
    setShowPopup: Function;
    siteId: String;
    areaName: string;
    zone: string[];
}) {
    const { setShowPopup, siteId, areaName, zone } = props;

    const areaNewName = React.useRef<HTMLInputElement>(null);
    const [zoneList, setZoneList] = React.useState<string[]>([...zone, '']);

    const [updateSiteArea, { data, loading, error }] = useMutation(
        UPDATE_SITE_AREA,
        {
            refetchQueries: [
                { query: QUERY_SITE_AREAS, variables: { siteId: siteId } },
            ],
        }
    );
    if (loading) console.log('Submitting...');
    if (error) console.log(`Submission error! ${error.message}`);
    if (data) console.log(data);

    const zoneElements = zoneList.map((zonename, index) => {
        return (
            <Flex justify={'flex-start'} h="36px" key={index}>
                <Text
                    width={'35%'}
                    fontWeight={'400'}
                    fontSize={'14px'}
                    lineHeight={'20px'}
                    p="8px 12px"
                >
                    {index == 0 ? '區域' : ''}
                </Text>
                {index == zoneList.length - 1 ? (
                    <Input
                        width={'60%'}
                        variant="outline"
                        bg={'#FFFFFF'}
                        type={'text'}
                        onChange={(e) => {
                            setZoneList([
                                ...zoneList.slice(0, index),
                                e.target.value,
                                '',
                            ]);
                        }}
                    ></Input>
                ) : (
                    <InputGroup width={'60%'}>
                        <Input
                            width={'100%'}
                            variant="outline"
                            bg={'#FFFFFF'}
                            type={'text'}
                            value={zonename}
                            autoFocus
                            onChange={(e) => {
                                setZoneList([
                                    ...zoneList.slice(0, index),
                                    e.target.value,
                                    ...zoneList.slice(index + 1),
                                ]);
                            }}
                        ></Input>
                        <InputRightElement>
                            <IconButton
                                aria-label="DeleteZone"
                                icon={<CloseIcon />}
                                bg={'transparent'}
                                position={'absolute'}
                                right={'-35px'}
                                _active={{ background: 'transparent' }}
                                _focus={{ background: 'transparent' }}
                                onClick={() => {
                                    setZoneList([
                                        ...zoneList.slice(0, index),
                                        ...zoneList.slice(index + 1),
                                    ]);
                                }}
                            ></IconButton>
                        </InputRightElement>
                    </InputGroup>
                )}
            </Flex>
        );
    });

    return (
        <Center
            position={'absolute'}
            top={0}
            left={0}
            w={'100vw'}
            h={'100vh'}
            bg={'#D9D9D980'}
            zIndex={2}
        >
            <Center
                border={'1px solid #667080'}
                w={'32%'}
                borderRadius={'10px'}
                bg={'#FFFFFF'}
                p={'30px 45px'}
            >
                <Flex h={'100%'} direction={'column'} color={'#667080'}>
                    <Text
                        fontWeight={700}
                        fontSize={'20px'}
                        lineHeight={'20px'}
                    >
                        編輯廠區
                    </Text>
                    <Flex
                        direction={'column'}
                        mt={'20px'}
                        rowGap={'20px'}
                        bg={'#E3ECFF'}
                        borderRadius={'10px'}
                        p={'41px 20px'}
                    >
                        <Flex justify={'flex-start'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                廠區
                            </Text>
                            <Input
                                defaultValue={areaName}
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                ref={areaNewName}
                            ></Input>
                        </Flex>
                        {zoneElements}
                    </Flex>
                    <Flex justify={'space-between'} h="36px" mt={'20px'}>
                        <Button
                            onClick={() => {
                                setShowPopup(false);
                            }}
                        >
                            取消新增
                        </Button>
                        <Button
                            onClick={() => {
                                const zoneListFiltered: string[] = [];
                                for (let i = 0; i < zoneList.length; i++) {
                                    const zone = zoneList[i].trim();
                                    if (zone !== '')
                                        zoneListFiltered.push(zone);
                                }
                                if (
                                    areaNewName.current?.value &&
                                    areaNewName.current.value.trim() !==
                                        areaName
                                ) {
                                    updateSiteArea({
                                        variables: {
                                            siteId: siteId,
                                            name: areaName,
                                            rename: areaNewName.current.value.trim(),
                                            zone: zoneListFiltered,
                                        },
                                    });
                                } else {
                                    updateSiteArea({
                                        variables: {
                                            siteId: siteId,
                                            name: areaName,
                                            zone: zoneListFiltered,
                                        },
                                    });
                                }
                                setShowPopup(false);
                            }}
                        >
                            確定新增
                        </Button>
                    </Flex>
                </Flex>
            </Center>
        </Center>
    );
}
