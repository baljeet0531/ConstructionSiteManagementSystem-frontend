import React from 'react';

import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Flex,
    Button,
} from '@chakra-ui/react';
import { BackIcon, ReplyIcon } from '../../Icons/Icons';

export default function Preview(props: { setPreview: Function }) {
    const { setPreview } = props;

    return (
        <Flex w={'100%'} h={'fit-content'} direction={'column'}>
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
            <Flex w={'100%'} justify={'space-between'} mt={'11px'}>
                <Button
                    leftIcon={<BackIcon />}
                    bg={'#6670801A'}
                    border={'2px solid #919AA9'}
                    borderRadius={'4px'}
                    color={'#667080'}
                    onClick={() => {
                        setPreview(false);
                    }}
                >
                    上一頁
                </Button>
                <Button
                    leftIcon={<ReplyIcon />}
                    bg={'#4C7DE7'}
                    color={'#FFFFFF'}
                    onClick={() => {
                        setPreview(false);
                    }}
                >
                    確定匯入
                </Button>
            </Flex>
            <TableContainer
                mt={'11px'}
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
    );
}
