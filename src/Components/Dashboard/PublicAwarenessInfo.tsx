import React from 'react';
import {
    Button,
    Flex,
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
export default function PublicAwarenessInfo() {
    return (
        <Flex direction={'column'} mr={'11px'}>
            <Text variant={'w700s16'}>宣導事項</Text>
            <Textarea
                mt={'15px'}
                ml={'11px'}
                h={'205px'}
                w={'auto'}
                border={'2px dashed'}
                borderColor={'#EA9895'}
                resize={'none'}
                _hover={{
                    borderColor: '#EA989580',
                }}
                value={
                    '1. 災情資訊_警示內容（含災後各項檢查提醒）\n2. 應辦理及注意事項'
                }
            ></Textarea>
            <Flex justify={'flex-end'} gap={'10px'} mt={'15px'}>
                <Button size={'xs'} variant={'whiteOutline'}>
                    取消
                </Button>
                <Button size={'xs'} variant={'buttonBlueSolid'}>
                    確定
                </Button>
            </Flex>
            <Text variant={'w700s16'} mt={'20px'}>
                今日執行工項列表
            </Text>
            <TableContainer mt={'15px'} ml={'11px'}>
                <Table variant={'dashboardBlue'} minW={'360px'}>
                    <Thead>
                        <Tr>
                            <Th w={'60px'}>系統別</Th>
                            <Th w={'60px'}>作業區域</Th>
                            <Th w={'60px'}>作業類別</Th>
                            <Th w={'60px'}>施作項目</Th>
                            <Th w={'60px'}>承商名稱</Th>
                            <Th w={'60px'}>施工人數</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>空調</Td>
                            <Td>空調室</Td>
                            <Td>吊掛作業</Td>
                            <Td>管路施工</Td>
                            <Td>承商A</Td>
                            <Td>6</Td>
                        </Tr>
                        <Tr>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                        </Tr>
                        <Tr>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                        </Tr>
                        <Tr>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
}
