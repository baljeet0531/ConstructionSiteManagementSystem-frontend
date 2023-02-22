import {
    Button,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import React from 'react';
import { warningText } from './Style';

export default function InstantInfo() {
    return (
        <Flex direction={'column'}>
            <Text variant={'w700s16'}>即時資訊</Text>
            <Flex mt={'10px'}>
                <Text variant={'dashboardList'}>
                    工作許可單（完成數/申請數）：
                </Text>
                <Text
                    variant={'dashboardList'}
                    fontWeight={700}
                    fontSize={'1rem'}
                >
                    3張/5張
                </Text>
            </Flex>
            <Text variant={'dashboardList'}>工具箱會議</Text>
            <TableContainer>
                <Table variant={'dashboardBlue'} minW={'382px'}>
                    <Thead>
                        <Tr>
                            <Th w={'37%'}></Th>
                            <Th w={'21%'}>施工前</Th>
                            <Th w={'21%'}>施工中</Th>
                            <Th w={'21%'}>收工前</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>CUB棟/給排水系統/管架</Td>
                            <Td>18:17</Td>
                            <Td {...warningText}>14:03</Td>
                            <Td>17:30</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Text variant={'dashboardList'}>自主檢查</Text>
            <TableContainer>
                <Table variant={'dashboardBlue'} minW={'382px'}>
                    <Thead>
                        <Tr>
                            <Th w={'37%'}></Th>
                            <Th w={'31.5%'}>施工前</Th>
                            <Th w={'31.5%'}>收工前</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>ＯＯ工程/OB棟</Td>
                            <Td>18:17</Td>
                            <Td {...warningText}>尚未填寫</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Text variant={'dashboardList'}>特殊作業</Text>
            <TableContainer>
                <Table variant={'dashboardBlue'} minW={'382px'}>
                    <Thead>
                        <Tr>
                            <Th w={'37%'}></Th>
                            <Th w={'31.5%'}>施工前</Th>
                            <Th w={'31.5%'}>收工前</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>ＯＯ工程/OB棟</Td>
                            <Td>18:17</Td>
                            <Td {...warningText}>尚未填寫</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Text variant={'dashboardList'}>週月管理值</Text>
            <TableContainer>
                <Table variant={'dashboardBlue'} minW={'382px'}>
                    <Thead>
                        <Tr>
                            <Th w={'37%'}>承商</Th>
                            <Th w={'63%'}>目標值</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>承商A</Td>
                            <Td>40</Td>
                        </Tr>
                        <Tr>
                            <Td>承商B</Td>
                            <Td>本週須完成管架施工</Td>
                        </Tr>
                        <Tr>
                            <Td>承商C</Td>
                            <Td>下週須完成管路施工</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Flex justify={'flex-end'} gap={'10px'} mt={'15px'}>
                <Button size={'xs'} variant={'whiteOutline'}>
                    取消
                </Button>
                <Button size={'xs'} variant={'buttonBlueSolid'}>
                    確定
                </Button>
            </Flex>
        </Flex>
    );
}
