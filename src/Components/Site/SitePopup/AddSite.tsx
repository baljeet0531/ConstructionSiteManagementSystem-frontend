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
} from '@chakra-ui/react';

import { QUERY_SITE } from '../SitePage';
import { AddFileIcon } from '../../../Icons/Icons';
import { CityData } from '../../../Constants/CityData';

const ADD_SITE = gql`
    mutation CreateSite($siteId: String!, $name: String!, $avatar: Upload!) {
        createSite(siteId: $siteId, name: $name, avatar: $avatar) {
            site {
                siteId
                name
                avatar
                start
                end
                city
                lineNotifyToken
            }
        }
    }
`;

export default function AddSite(props: { setShowPopup: Function }) {
    const { setShowPopup } = props;
    const [file, setFile] = React.useState<File>();
    const [city, setCity] = React.useState<string>('新北市');
    const siteId = React.useRef<HTMLInputElement>(null);
    const siteName = React.useRef<HTMLInputElement>(null);

    const [addSite, { data, loading, error }] = useMutation(ADD_SITE, {
        refetchQueries: [{ query: QUERY_SITE }],
    });
    if (loading) console.log('Submitting...');
    if (error) console.log(`Submission error! ${error.message}`);
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
                                    {file ? (
                                        <Image
                                            h={'100%'}
                                            w={'100%'}
                                            objectFit={'contain'}
                                            className="avatar"
                                            src={URL.createObjectURL(file)}
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
                                                setFile(e.target.files[0]);
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
                                    variant="outline"
                                    bg={'#FFFFFF'}
                                    fontWeight={'400'}
                                    fontSize={'14px'}
                                    lineHeight={'20px'}
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                    }}
                                >
                                    {citySelect}
                                </Select>
                                <Select
                                    variant="outline"
                                    bg={'#FFFFFF'}
                                    fontWeight={'400'}
                                    fontSize={'14px'}
                                    lineHeight={'20px'}
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
                                    file
                                ) {
                                    console.log(siteId.current.value);
                                    console.log(siteName.current.value);
                                    console.log(file);
                                    addSite({
                                        variables: {
                                            siteId: siteId.current.value,
                                            name: siteName.current.value,
                                            avatar: file,
                                        },
                                    });
                                } else {
                                    console.log('欄位不能為空');
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
