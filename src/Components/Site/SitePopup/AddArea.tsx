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
    useToast,
} from '@chakra-ui/react';
import { CloseIcon } from '../../../Icons/Icons';
import { QUERY_SITE_AREAS } from '../SiteAreas';

const ADD_SITE_AREA = gql`
    mutation CreateSiteArea(
        $siteId: String!
        $name: String!
        $zone: [String!]
    ) {
        createSiteArea(siteId: $siteId, name: $name, zone: $zone) {
            siteArea {
                name
                zone
            }
        }
    }
`;

export default function AddArea(props: {
    setShowPopup: Function;
    siteId: string;
    siteName: string;
}) {
    const toast = useToast();
    const { setShowPopup, siteId, siteName } = props;

    const areaName = React.useRef<HTMLInputElement>(null);
    const [zoneList, setZoneList] = React.useState<string[]>(['']);

    const [addSiteArea, { data, error }] = useMutation(ADD_SITE_AREA, {
        refetchQueries: [
            { query: QUERY_SITE_AREAS, variables: { siteId: siteId } },
        ],
    });

    if (error) console.log(`${error.message}`);
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
                maxH={'80%'}
                borderRadius={'10px'}
                bg={'#FFFFFF'}
                p={'30px 45px'}
            >
                <Flex
                    h={'100%'}
                    maxH={'100%'}
                    direction={'column'}
                    color={'#667080'}
                >
                    <Text
                        fontWeight={700}
                        fontSize={'20px'}
                        lineHeight={'20px'}
                    >
                        新增廠區
                    </Text>
                    <Text
                        fontWeight={500}
                        fontSize={'12px'}
                        lineHeight={'20px'}
                        textAlign={'end'}
                    >
                        {siteName}
                    </Text>
                    <Flex
                        direction={'column'}
                        rowGap={'20px'}
                        bg={'#E3ECFF'}
                        borderRadius={'10px'}
                        p={'41px 20px'}
                        flex={'1 1 auto'}
                        maxH={'400px'}
                        overflow={'hidden auto'}
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
                                ref={areaName}
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
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
                                if (areaName.current?.value) {
                                    addSiteArea({
                                        variables: {
                                            siteId: siteId,
                                            name: areaName.current.value.trim(),
                                            zone: zoneListFiltered,
                                        },
                                    });
                                    setShowPopup(false);
                                } else {
                                    toast({
                                        title: '錯誤',
                                        description: `廠區名稱不能為空`,
                                        status: 'error',
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                }
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
