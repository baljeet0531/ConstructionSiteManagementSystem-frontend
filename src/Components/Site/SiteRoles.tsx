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
    IconButton,
    Center,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '../../Icons/Icons';

import EditRole from './SitePopup/EditRole';
import DeleteRole from './SitePopup/DeleteRole';
import { TUserRole } from '../../Types/Auth';

export const QUERY_SITE_ROLES = gql`
    query siteRoles($siteId: String!) {
        role(siteId: $siteId) {
            username
            role
            accountRef {
                name
                tel
            }
        }
    }
`;

export const rolesList: TUserRole[] = [
    '專案經理',
    '專案秘書',
    '工地經理',
    '專案工程師',
    '系統工程師',
    '職安衛人員',
    '承攬商',
    '業主',
];

type gqlData = {
    role: {
        username: string;
        role: string;
        accountRef: {
            name: string;
            tel: string;
        };
    }[];
};

type TSiteRole = {
    name: string;
    tel: string;
    role: string;
    username: string;
};

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

    const [roles, setRoles] = React.useState<TSiteRole[]>([]);
    const { refetch } = useQuery<gqlData>(QUERY_SITE_ROLES, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ role }) => {
            setRoles(
                role.map(({ accountRef, ...rest }) => ({
                    ...accountRef,
                    ...rest,
                }))
            );
        },
    });

    React.useEffect(() => {
        refetch();
    }, [rerender]);

    const rolesElement = roles.map((roleDetails, index) => {
        const { name, tel, role, username } = roleDetails;
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
                                            name,
                                            tel,
                                            role,
                                            username,
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
                        <Th w={'24.7%'}>姓名</Th>
                        <Th w={'24.7%'}>職稱</Th>
                        <Th w={'24.7%'}>帳號</Th>
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
