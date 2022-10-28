import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Icon,
    IconButton,
    Flex,
    Center,
} from '@chakra-ui/react';

import { SortIcon, EditIcon, DeleteIcon } from '../../Icons/Icons';

const Mock_Roles = {
    'A-1': [
        {
            name: '梁樂謙',
            role: '專案經理',
            username: 'lhleung',
        },
        {
            name: '黃家琳',
            role: '工安人員',
            username: 'jlhuang',
        },
        {
            name: 'OOO',
            role: '外包商',
            username: 'ＯＯＯ',
        },
        {
            name: 'ＸＸＸ',
            role: '業主',
            username: 'ＸＸＸ',
        },
    ],
    'A-2': [
        {
            name: '梁樂謙',
            role: '專案經理',
            username: 'lhleung',
        },
        {
            name: '黃家琳',
            role: '工安人員',
            username: 'jlhuang',
        },
        {
            name: 'OOO',
            role: '外包商',
            username: 'ＯＯＯ',
        },
        {
            name: 'ＸＸＸ',
            role: '業主',
            username: 'ＸＸＸ',
        },
    ],
};

export default function SiteRoles(props: {
    siteId: keyof typeof Mock_Roles;
    handlePopup: Function;
}) {
    const { handlePopup } = props;

    const rolesData = Mock_Roles[props.siteId];

    const rolesElement = rolesData.map((roleDetails, index) => {
        const { name, role, username } = roleDetails;

        return (
            <Tr key={index}>
                <Td>{name}</Td>
                <Td>{role}</Td>
                <Td>{username}</Td>
                <Td>
                    <Center>
                        <IconButton
                            aria-label="EditRole"
                            icon={<EditIcon />}
                            bg={'none'}
                            onClick={() => {
                                handlePopup('editRole');
                            }}
                        ></IconButton>
                    </Center>
                </Td>
                <Td>
                    <Center>
                        <IconButton
                            aria-label="DeleteRole"
                            icon={<DeleteIcon />}
                            bg={'none'}
                            onClick={() => {
                                handlePopup('deleteRole');
                            }}
                        ></IconButton>
                    </Center>
                </Td>
            </Tr>
        );
    });

    return (
        <TableContainer
            w={'100%'}
            mt={'20px'}
            border={'1px solid #919AA9'}
            borderBottom={'none'}
        >
            <Table variant={'iemgray'}>
                <Thead>
                    <Tr>
                        <Th w={'24.7%'}>
                            <Flex>
                                姓名
                                <Icon as={SortIcon}></Icon>
                            </Flex>
                        </Th>
                        <Th w={'24.7%'}>
                            <Flex>
                                職稱
                                <Icon as={SortIcon}></Icon>
                            </Flex>
                        </Th>
                        <Th w={'24.7%'}>
                            <Flex>
                                帳號
                                <Icon as={SortIcon}></Icon>
                            </Flex>
                        </Th>
                        <Th w={'12.95%'} textAlign={'center'}>
                            編輯
                        </Th>
                        <Th w={'12.95%'} textAlign={'center'}>
                            刪除
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>{rolesElement}</Tbody>
            </Table>
        </TableContainer>
    );
}
