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
} from '@chakra-ui/react';

import { QUERY_SITE } from '../SitePage';
import { AddFileIcon } from '../../../Icons/Icons';

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
    const siteId = React.useRef<HTMLInputElement>(null);
    const siteName = React.useRef<HTMLInputElement>(null);

    const [addSite, { data, loading, error }] = useMutation(ADD_SITE, {
        refetchQueries: [{ query: QUERY_SITE }],
    });
    if (loading) console.log('Submitting...');
    if (error) console.log(`Submission error! ${error.message}`);
    if (data) console.log(data);

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
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                業主商標
                            </Text>
                            <Box
                                w={'60%'}
                                h={'108px'}
                                bg={'#FFFFFF'}
                                borderRadius={'0.375rem'}
                            >
                                <Center w={'100%'} h={'100%'} pos={'relative'}>
                                    {file ? (
                                        <Image
                                            className="avatar"
                                            w={'100%'}
                                            h={'100%'}
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
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                專案編號
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                ref={siteId}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                專案名稱
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                ref={siteName}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                工期開始
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'date'}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                工期結束
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'date'}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                Line ID
                            </Text>
                            <Input
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                disabled
                                value="12345678"
                            ></Input>
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
