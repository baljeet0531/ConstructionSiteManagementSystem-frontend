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
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../../Utils/DefaultToast';
import { FormLoading } from '../../Shared/Loading';

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
    siteId: string;
    siteName: string;
    areaName: string;
    zone: string[];
}) {
    const { setShowPopup, siteId, siteName, areaName, zone } = props;

    const toast = useToast();
    const areaNewName = React.useRef<HTMLInputElement>(null);
    const [zoneList, setZoneList] = React.useState<string[]>([...zone, '']);

    const [updateSiteArea, { loading }] = useMutation(UPDATE_SITE_AREA, {
        onCompleted: () => {
            setShowPopup(false);
            defaultSuccessToast(toast, '成功編輯');
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        refetchQueries: [
            { query: QUERY_SITE_AREAS, variables: { siteId: siteId } },
        ],
        onQueryUpdated: (observableQuery) => observableQuery.refetch(),
        fetchPolicy: 'network-only',
    });
    const zoneElements = zoneList.map((zoneName, index) => {
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
                            value={zoneName}
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

    return loading ? (
        <FormLoading />
    ) : (
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
                w={'380px'}
                maxH={'80%'}
                borderRadius={'10px'}
                bg={'#FFFFFF'}
                p={'30px 45px'}
            >
                <Flex
                    h={'100%'}
                    w={'100%'}
                    direction={'column'}
                    color={'#667080'}
                >
                    <Text
                        fontWeight={700}
                        fontSize={'20px'}
                        lineHeight={'20px'}
                    >
                        編輯廠區
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
                            取消修改
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
                            }}
                        >
                            確定修改
                        </Button>
                    </Flex>
                </Flex>
            </Center>
        </Center>
    );
}
