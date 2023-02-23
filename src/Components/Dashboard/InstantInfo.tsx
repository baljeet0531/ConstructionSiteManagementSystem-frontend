import {
    Button,
    Flex,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import React from 'react';
import { EditIcon } from '../../Icons/Icons';
import { warningText } from './Style';

export default function InstantInfo() {
    const [editDisabled, setEditDisabled] = React.useState<boolean>(true);

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
                            <Th w={'142px'}></Th>
                            <Th w={'80px'}>施工前</Th>
                            <Th w={'80px'}>施工中</Th>
                            <Th w={'80px'}>收工前</Th>
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
                            <Th w={'142px'}></Th>
                            <Th w={'120px'}>施工前</Th>
                            <Th w={'120px'}>收工前</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>ＯＯ工程/OB棟</Td>
                            <Td>09:15</Td>
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
                            <Th w={'142px'}></Th>
                            <Th w={'120px'}>施工前</Th>
                            <Th w={'120px'}>收工前</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>ＯＯ工程/OB棟</Td>
                            <Td>09:02</Td>
                            <Td>17:28</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Flex align={'center'} justify={'space-between'}>
                <Text variant={'dashboardList'}>週月管理值</Text>
                <IconButton
                    size={'xs'}
                    h={'20px'}
                    color={'#667080'}
                    bg={'#FFFFFF'}
                    aria-label="edit administration"
                    icon={<EditIcon />}
                    onClick={() => {
                        setEditDisabled(false);
                    }}
                />
            </Flex>
            <TableContainer>
                <Table variant={'dashboardBlue'} minW={'382px'}>
                    <Thead>
                        <Tr>
                            <Th w={'142px'}>承商</Th>
                            <Th w={'240px'}>目標值</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>承商A</Td>
                            <Td padding={0}>
                                <Textarea
                                    defaultValue={'40'}
                                    variant={'dashboardAdministration'}
                                    disabled={editDisabled}
                                ></Textarea>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>承商B</Td>
                            <Td padding={0}>
                                <Textarea
                                    defaultValue={'本週須完成管架施工'}
                                    variant={'dashboardAdministration'}
                                    disabled={editDisabled}
                                ></Textarea>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>承商C</Td>
                            <Td padding={0}>
                                <Textarea
                                    defaultValue={'下週須完成管路施工'}
                                    variant={'dashboardAdministration'}
                                    disabled={editDisabled}
                                ></Textarea>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Flex justify={'flex-end'} gap={'10px'} mt={'15px'}>
                <Button size={'xs'} variant={'whiteOutline'}>
                    取消
                </Button>
                <Button
                    size={'xs'}
                    variant={'buttonBlueSolid'}
                    onClick={() => {
                        setEditDisabled(true);
                    }}
                >
                    確定
                </Button>
            </Flex>
        </Flex>
    );
}
