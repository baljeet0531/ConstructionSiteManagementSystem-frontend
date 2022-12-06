import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

import EditRole from './SitePopup/EditRole';
import DeleteRole from './SitePopup/DeleteRole';

export const QUERY_SITE_ROLES = gql`
    query siteRoles($siteId: String!) {
        role(siteId: $siteId) {
            username
            role
            accountRef {
                name
            }
        }
    }
`;

export const rolesList = [
    '專案經理',
    '工地經理',
    '專案工程師',
    '系統工程師',
    '工安人員',
    '外包商',
    '業主',
];

export default function SiteRoles(props: {
    siteId: string;
    siteName: string;
    setPopupComponent: Function;
    setShowPopup: Function;
    rerender: Boolean;
    setRerender: Function;
}) {
    const {
        siteId,
        siteName,
        setPopupComponent,
        setShowPopup,
        rerender,
        setRerender,
    } = props;
    const { data, error, refetch } = useQuery(QUERY_SITE_ROLES, {
        variables: {
            siteId: siteId,
        },
    });

    if (error) console.log(error);

    React.useEffect(() => {
        refetch();
    }, [rerender]);
    let rolesElement: any = <></>;
    if (data) {
        const rolesData: {
            accountRef: {
                name: string;
            };
            role: string;
            username: string;
        }[] = data.role;

        rolesElement = rolesData.map((roleDetails, index) => {
            const { accountRef, role, username } = roleDetails;
            const { name } = accountRef;
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
                                    setPopupComponent(
                                        <EditRole
                                            siteId={siteId}
                                            siteName={siteName}
                                            roleDetails={{
                                                name: name,
                                                role: role,
                                                username: username,
                                            }}
                                            setShowPopup={setShowPopup}
                                            setRerender={setRerender}
                                        ></EditRole>
                                    );
                                    setShowPopup(true);
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
                                    setPopupComponent(
                                        <DeleteRole
                                            siteId={siteId}
                                            siteName={siteName}
                                            name={name}
                                            username={username}
                                            setShowPopup={setShowPopup}
                                        ></DeleteRole>
                                    );
                                    setShowPopup(true);
                                }}
                            ></IconButton>
                        </Center>
                    </Td>
                </Tr>
            );
        });
    }
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
