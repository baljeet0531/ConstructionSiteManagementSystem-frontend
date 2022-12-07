import React from 'react';
import { useMutation, gql } from '@apollo/client';

import {
    Center,
    Flex,
    Text,
    Input,
    Button,
    Box,
    Image,
    Select,
    useToast,
} from '@chakra-ui/react';

import { QUERY_SITE } from '../Site';
import { AddFileIcon } from '../../../Icons/Icons';
import { CityData } from '../../../Constants/CityData';

const ADD_SITE = gql`
    mutation CreateSite(
        $avatar: Upload
        $siteId: String!
        $name: String!
        $start: Date!
        $end: Date!
        $city: String!
    ) {
        createSite(
            avatar: $avatar
            siteId: $siteId
            name: $name
            start: $start
            end: $end
            city: $city
        ) {
            site {
                avatar
                siteId
                name
                start
                end
                city
                lineNotifyToken
            }
        }
    }
`;

export default function AddSite(props: { setShowPopup: Function }) {
    const toast = useToast();
    const { setShowPopup } = props;
    const [avatar, setAvatar] = React.useState<File>();
    const [city, setCity] = React.useState<string>('新北市');
    const [district, setDistrict] = React.useState<string>('板橋區');
    const siteId = React.useRef<HTMLInputElement>(null);
    const siteName = React.useRef<HTMLInputElement>(null);
    const startTime = React.useRef<HTMLInputElement>(null);
    const endTime = React.useRef<HTMLInputElement>(null);

    const [addSite, { data, error }] = useMutation(ADD_SITE, {
        refetchQueries: [{ query: QUERY_SITE }],
    });
    if (error) console.log(`${error.message}`);
    if (data) console.log(data);

    const citySelect = Object.keys(CityData).map((cityName, index) => {
        return (
            <option key={index} value={cityName}>
                {cityName}
            </option>
        );
    });

    const districtSelect =
        city &&
        CityData[city as keyof typeof CityData].map((districtName, index) => {
            return (
                <option key={index} value={districtName}>
                    {districtName}
                </option>
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
                w={'40%'}
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
                        新增專案
                    </Text>
                    <Flex
                        direction={'column'}
                        mt={'20px'}
                        rowGap={'20px'}
                        bg={'#E3ECFF'}
                        borderRadius={'10px'}
                        p={'41px 20px'}
                    >
                        <Flex justify={'space-between'}>
                            <Text
                                width={'fit-content'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                                whiteSpace={'nowrap'}
                            >
                                業主商標
                            </Text>
                            <Box
                                flexGrow={1}
                                h={'108px'}
                                bg={'#FFFFFF'}
                                borderRadius={'0.375rem'}
                            >
                                <Center w={'100%'} h={'100%'} pos={'relative'}>
                                    {avatar ? (
                                        <Image
                                            h={'100%'}
                                            w={'100%'}
                                            objectFit={'contain'}
                                            className="avatar"
                                            src={URL.createObjectURL(avatar)}
                                            onLoad={(e) => {
                                                const image =
                                                    e.target as HTMLImageElement;
                                                URL.revokeObjectURL(image.src);
                                            }}
                                        />
                                    ) : (
                                        <AddFileIcon />
                                    )}
                                    <Input
                                        pos={'absolute'}
                                        h={'100%'}
                                        w={'100%'}
                                        lineHeight={'108px'}
                                        opacity={0}
                                        type={'file'}
                                        accept={'image/*'}
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setAvatar(e.target.files[0]);
                                            }
                                        }}
                                    ></Input>
                                </Center>
                            </Box>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'fit-content'}
                                whiteSpace={'nowrap'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                專案編號
                            </Text>
                            <Input
                                flexGrow={1}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                ref={siteId}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'fit-content'}
                                whiteSpace={'nowrap'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                專案名稱
                            </Text>
                            <Input
                                flexGrow={1}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                ref={siteName}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'fit-content'}
                                whiteSpace={'nowrap'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                工期開始
                            </Text>
                            <Input
                                flexGrow={1}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'date'}
                                ref={startTime}
                                onKeyDown={(e) => e.preventDefault()}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'fit-content'}
                                whiteSpace={'nowrap'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                工期結束
                            </Text>
                            <Input
                                flexGrow={1}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'date'}
                                ref={endTime}
                                onKeyDown={(e) => e.preventDefault()}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'fit-content'}
                                whiteSpace={'nowrap'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                專案地址
                            </Text>
                            <Flex
                                flexGrow={1}
                                gap={'5%'}
                                justifyContent={'space-between'}
                            >
                                <Select
                                    value={city}
                                    variant="outline"
                                    bg={'#FFFFFF'}
                                    fontWeight={'400'}
                                    fontSize={'14px'}
                                    lineHeight={'20px'}
                                    onChange={(e) => {
                                        const cityInput = e.target
                                            .value as keyof typeof CityData;
                                        setCity(cityInput);
                                        setDistrict(CityData[cityInput][0]);
                                    }}
                                >
                                    {citySelect}
                                </Select>
                                <Select
                                    value={district}
                                    variant="outline"
                                    bg={'#FFFFFF'}
                                    fontWeight={'400'}
                                    fontSize={'14px'}
                                    lineHeight={'20px'}
                                    onChange={(e) => {
                                        setDistrict(e.target.value);
                                    }}
                                >
                                    {districtSelect}
                                </Select>
                            </Flex>
                        </Flex>
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
                                if (
                                    siteId.current?.value &&
                                    siteName.current?.value &&
                                    startTime.current?.value &&
                                    endTime.current?.value &&
                                    city &&
                                    district
                                ) {
                                    if (
                                        new Date(
                                            startTime.current?.value
                                        ).getTime() >
                                        new Date(
                                            endTime.current?.value
                                        ).getTime()
                                    ) {
                                        toast({
                                            title: '錯誤',
                                            description:
                                                '開始日期不能超過結束日期',
                                            status: 'error',
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                    } else {
                                        addSite({
                                            variables: {
                                                avatar: avatar,
                                                siteId: siteId.current.value,
                                                name: siteName.current.value,
                                                start: startTime.current.value,
                                                end: endTime.current.value,
                                                city: city + district,
                                            },
                                        });
                                        setShowPopup(false);
                                    }
                                } else {
                                    toast({
                                        title: '錯誤',
                                        description: '欄位不能為空',
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
