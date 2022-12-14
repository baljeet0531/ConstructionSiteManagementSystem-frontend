/* eslint-disable no-unused-vars */
import React from 'react';

import {
    Button,
    Spacer,
    Text,
    Flex,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Td,
    Input,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/react';
import { ReplyIcon } from '../../Icons/Icons';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import FullCalendarElement from './FullCalenderElement';
import Preview from './Preview';

export default function Schedule() {
    if (!IsPermit('schedule')) return <Navigate to="/" replace={true} />;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [preview, setPreview] = React.useState<Boolean>(false);
    return (
        <Flex
            direction={'column'}
            h={'100vh'}
            w={'100%'}
            pl={'30px'}
            pr={'30px'}
            pt={'47px'}
            pb={'20px'}
            overflowY={'auto'}
        >
            <Text
                fontWeight={500}
                fontSize={'14px'}
                lineHeight={'20px'}
                position={'absolute'}
                top={'20px'}
                right={'30px'}
            >
                穩懋南科路竹廠機電一期新建工程
            </Text>
            {!preview && (
                <Flex w={'100%'} h={'fit-content'} direction={'column'}>
                    <Flex
                        w={'100%'}
                        direction={'row'}
                        justify="space-between"
                        align={'end'}
                        mb={'5px'}
                    >
                        <Text
                            fontSize={'36px'}
                            fontWeight={400}
                            fontFamily={'Inter'}
                            color={'#667080'}
                        >
                            排程管理
                        </Text>
                        <Spacer />
                        <Button
                            leftIcon={<ReplyIcon />}
                            bg={'#4C7DE7'}
                            color={'#FFFFFF'}
                            onClick={onOpen}
                            // onClick={() => {
                            //     setShowPopup(true);
                            // }}
                        >
                            匯入
                        </Button>
                    </Flex>
                    <FullCalendarElement />
                </Flex>
            )}
            {!preview && (
                <Flex
                    w={'100%'}
                    h={'fit-content'}
                    mt={'51px'}
                    direction={'column'}
                >
                    <Text
                        w={'100%'}
                        fontSize={'36px'}
                        lineHeight={'44px'}
                        fontWeight={400}
                        fontFamily={'Inter'}
                        color={'#667080'}
                    >
                        總進度表
                    </Text>
                    <TableContainer
                        mt={'30px'}
                        maxH={'76vh'}
                        overflowY={'auto'}
                        bg={'#FFFFFF'}
                        border={'1px solid #919AA9'}
                        borderBottom={'none'}
                    >
                        <Table variant={'iemGraySchedule'} h={'100%'}>
                            <Thead position={'sticky'} top={0} zIndex={1}>
                                <Tr h={'36px'}>
                                    <Th width={'8.5%'}>識別碼</Th>
                                    <Th width={'8.5%'}>工作類型</Th>
                                    <Th>工作名稱</Th>
                                    <Th width={'12%'}>工期（天數）</Th>
                                    <Th width={'20%'}>開始時間</Th>
                                    <Th width={'20%'}>結束時間</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Data</Td>
                                    <Td>Data</Td>
                                    <Td>Data</Td>
                                    <Td>Data</Td>
                                    <Td>Data</Td>
                                    <Td>Data</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Flex>
            )}
            {preview && <Preview setPreview={setPreview}></Preview>}

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent
                    border={'1px solid #667080'}
                    w={'47%'}
                    borderRadius={'10px'}
                    bg={'#FFFFFF'}
                    p={'30px 45px'}
                >
                    <ModalHeader p={0}>匯入排程資料</ModalHeader>
                    <ModalBody p={0}>
                        <Flex
                            direction={'column'}
                            justify={'center'}
                            align={'center'}
                            border={'1px dashed #667080'}
                            borderRadius={'10px'}
                            gap={'10px'}
                            mt={'17px'}
                            p={'41px 20px'}
                        >
                            <Text
                                fontWeight={400}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                textAlign={'center'}
                            >
                                請將資料拖拉到這裡上傳
                            </Text>
                            <Text
                                fontWeight={400}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                textAlign={'center'}
                            >
                                或
                            </Text>
                            <Button
                                width={'64px'}
                                fontWeight={400}
                                fontSize={'12px'}
                                lineHeight={'20px'}
                                variant={'outline'}
                                color={'#4C7DE7'}
                                border={'2px solid #4C7DE7'}
                            >
                                選取檔案
                                <Input
                                    type={'file'}
                                    accept={'.csv'}
                                    pos={'absolute'}
                                    h={'100%'}
                                    w={'100%'}
                                    opacity={0}
                                ></Input>
                            </Button>
                            <Text
                                fontWeight={400}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                textAlign={'center'}
                            >
                                上傳檔案格式:.csv
                            </Text>
                        </Flex>
                    </ModalBody>

                    <ModalFooter
                        h="36px"
                        mt={'17px'}
                        p={0}
                        justifyContent={'space-between'}
                    >
                        <Button onClick={onClose}>取消</Button>
                        <Button
                            bg={'#4C7DE7'}
                            color={'#FFFFFF'}
                            onClick={() => {
                                onClose();
                                setPreview(true);
                            }}
                        >
                            預覽
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
