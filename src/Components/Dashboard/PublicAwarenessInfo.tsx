import React from 'react';
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
import { EditIcon } from '../../Icons/Icons';
export default function PublicAwarenessInfo() {
    const [editDisabled, setEditDisabled] = React.useState<boolean>(true);

    return (
        <Flex direction={'column'} mr={'11px'}>
            <Flex align={'center'} justify={'space-between'}>
                <Text variant={'w700s16'}>宣導事項</Text>
                <IconButton
                    size={'xs'}
                    h={'20px'}
                    color={'#667080'}
                    bg={'#FFFFFF'}
                    aria-label="edit awareness"
                    icon={<EditIcon />}
                    onClick={() => {
                        setEditDisabled(false);
                    }}
                />
            </Flex>
            <Textarea
                defaultValue={
                    '1. 災情資訊_警示內容（含災後各項檢查提醒）\n2. 應辦理及注意事項'
                }
                mt={'15px'}
                ml={'11px'}
                h={'205px'}
                w={'auto'}
                resize={'none'}
                color={'#000000'}
                _disabled={{
                    border: '2px dashed #EA9895',
                    cursor: 'default',
                    opacity: 1,
                    color: '#667080',
                    _hover: {
                        borderColor: '#EA989580',
                    },
                }}
                disabled={editDisabled}
            ></Textarea>
            <Flex justify={'flex-end'} gap={'10px'} mt={'15px'}>
                <Button
                    size={'xs'}
                    variant={'whiteOutline'}
                    onClick={() => {
                        setEditDisabled(true);
                    }}
                >
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
