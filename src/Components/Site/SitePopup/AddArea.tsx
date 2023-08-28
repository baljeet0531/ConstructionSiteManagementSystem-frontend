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

    const [addSiteArea, { loading }] = useMutation(ADD_SITE_AREA, {
        onCompleted: () => {
            setShowPopup(false);
            defaultSuccessToast(toast, '成功新增');
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
                    maxH={'100%'}
                    w={'100%'}
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
                                } else {
                                    defaultErrorToast(
                                        toast,
                                        '廠區名稱不能為空'
                                    );
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
