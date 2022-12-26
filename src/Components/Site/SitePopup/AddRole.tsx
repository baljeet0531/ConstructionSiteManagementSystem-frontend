import React from 'react';
import { useMutation, useLazyQuery, gql } from '@apollo/client';
import { Cookies } from 'react-cookie';

import {
    Center,
    Flex,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Select,
    IconButton,
    useToast,
    Box,
} from '@chakra-ui/react';

import { ShowPasswordIcon } from '../../../Icons/Icons';
import { QUERY_SITE_ROLES } from '../SiteRoles';

import { rolesList } from '../SiteRoles';
import { QUERY_ACCOUNT_SITES } from '../../../Layouts/Layout';

const QUERY_ACCOUNT_LIST = gql`
    query AccountList($name: String!) {
        account(name: $name) {
            name
            username
        }
    }
`;
const QUERY_ACCOUNT_EXIST = gql`
    query AccountExists($name: String!, $username: String!) {
        accountExists(name: $name, username: $username)
    }
`;

const CREATE_ACCOUNT = gql`
    mutation CreateAccount(
        $name: String!
        $password: String!
        $superuser: Boolean = false
        $username: String!
    ) {
        createAccount(
            name: $name
            password: $password
            superuser: $superuser
            username: $username
        ) {
            ok
            message
        }
    }
`;

const ADD_SITE_ROLE = gql`
    mutation CreateSiteRole(
        $role: String!
        $siteId: String!
        $username: String!
    ) {
        createSiteRole(role: $role, siteId: $siteId, username: $username) {
            siteRole {
                username
                role
            }
        }
    }
`;

export default function AddRole(props: {
    setShowPopup: Function;
    siteId: string;
    siteName: string;
}) {
    const { setShowPopup, siteId, siteName } = props;
    const toast = useToast();

    const [step, setStep] = React.useState<
        'checkAccountExist' | 'addAccountToSite' | 'createAccount'
    >('checkAccountExist');

    const [name, setName] = React.useState<string>('');
    const [role, setRole] = React.useState<string>('專案經理');
    const [account, setAccount] = React.useState<string>('');

    const nameRef = React.useRef<HTMLInputElement>(null);
    const password = React.useRef<HTMLInputElement>(null);
    const passwordAgain = React.useRef<HTMLInputElement>(null);
    const [show, setShow] = React.useState(false);
    const [showAgain, setShowAgain] = React.useState(false);

    const [accountList, setAccountList] = React.useState<
        { name: string; username: string }[]
    >([]);

    const [getAccountlist] = useLazyQuery(QUERY_ACCOUNT_LIST, {
        onCompleted: (data) => {
            setAccountList(data.account);
        },
        onError: (error) => {
            console.log(error);
        },
        fetchPolicy: 'cache-and-network',
    });

    const [accountExists] = useLazyQuery(QUERY_ACCOUNT_EXIST, {
        onCompleted: ({ accountExists }) => {
            accountExists
                ? setStep('addAccountToSite')
                : setStep('createAccount');
        },
        onError: ({ graphQLErrors }) => {
            for (let i = 0; i < graphQLErrors.length; i++) {
                toast({
                    title: '錯誤',
                    description: graphQLErrors[i].message,
                    status: 'error',
                    duration: null,
                    isClosable: true,
                });
            }
        },
        fetchPolicy: 'cache-and-network',
    });

    const [createAccount] = useMutation(CREATE_ACCOUNT, {
        onCompleted: ({ createAccount }) => {
            if (createAccount.ok) {
                toast({
                    title: createAccount.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                addSiteRole({
                    variables: {
                        role: role,
                        siteId: siteId,
                        username: account,
                    },
                });
            }
        },
        onError: ({ graphQLErrors }) => {
            for (let i = 0; i < graphQLErrors.length; i++) {
                toast({
                    title: '錯誤',
                    description: graphQLErrors[i].message,
                    status: 'error',
                    duration: null,
                    isClosable: true,
                });
            }
        },
    });

    const [addSiteRole] = useMutation(ADD_SITE_ROLE, {
        onCompleted: () => {
            setShowPopup(false);
        },
        onError: ({ graphQLErrors }) => {
            for (let i = 0; i < graphQLErrors.length; i++) {
                toast({
                    title: '錯誤',
                    description: graphQLErrors[i].message,
                    status: 'error',
                    duration: null,
                    isClosable: true,
                });
            }
        },
        refetchQueries: [
            { query: QUERY_SITE_ROLES, variables: { siteId: siteId } },
            {
                query: QUERY_ACCOUNT_SITES,
                variables: {
                    username: new Cookies().get('username'),
                },
            },
        ],
    });

    const accountListElements =
        accountList &&
        accountList.map((element, index) => {
            const { name, username } = element;

            return (
                <Box
                    key={index}
                    tabIndex={0}
                    margin={'8px'}
                    onClick={() => {
                        setName(name);
                        setAccount(username);
                        setAccountList([]);
                    }}
                >
                    <Text
                        textAlign={'left'}
                        fontSize={'14px'}
                        lineHeight={'20px'}
                    >{`${name} ${username}`}</Text>
                </Box>
            );
        });

    function showPassword() {
        setShow(!show);
    }
    function showPasswordAgain() {
        setShowAgain(!showAgain);
    }

    const roleOptions = rolesList.map((role, index) => {
        return (
            <option key={index} value={role}>
                {role}
            </option>
        );
    });

    if (step == 'checkAccountExist') {
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
                    w={'380px'}
                    borderRadius={'10px'}
                    bg={'#FFFFFF'}
                    p={'30px 45px'}
                >
                    <Flex
                        h={'100%'}
                        w={'100%'}
                        direction={'column'}
                        color={'#667080'}
                    >
                        <Text
                            fontWeight={700}
                            fontSize={'20px'}
                            lineHeight={'20px'}
                        >
                            新增人員
                        </Text>
                        <Text
                            fontWeight={500}
                            fontSize={'12px'}
                            lineHeight={'20px'}
                            textAlign={'end'}
                        >
                            {siteName}
                        </Text>
                        <Flex
                            direction={'column'}
                            rowGap={'20px'}
                            bg={'#E3ECFF'}
                            borderRadius={'10px'}
                            p={'41px 20px'}
                        >
                            <Flex justify={'flex-start'} h="36px">
                                <Text
                                    width={'35%'}
                                    fontWeight={'400'}
                                    fontSize={'14px'}
                                    lineHeight={'20px'}
                                    p="8px 12px"
                                >
                                    姓名
                                </Text>
                                <Flex
                                    w={'60%'}
                                    direction={'column'}
                                    h={'150px'}
                                    gap={'5px'}
                                    onBlur={(e) => {
                                        if (
                                            !e.currentTarget.contains(
                                                e.relatedTarget
                                            )
                                        ) {
                                            setAccountList([]);
                                            setName(name.trim());
                                        }
                                    }}
                                >
                                    <Input
                                        value={name}
                                        h={'36px'}
                                        ref={nameRef}
                                        variant="outline"
                                        bg={'#FFFFFF'}
                                        type={'text'}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (e.target.value) {
                                                getAccountlist({
                                                    variables: {
                                                        name: e.target.value,
                                                    },
                                                });
                                            } else {
                                                setAccountList([]);
                                            }
                                        }}
                                    ></Input>
                                    {accountList && accountList.length != 0 && (
                                        <Flex
                                            maxH={'100px'}
                                            overflowY={'auto'}
                                            mt={'2px'}
                                            direction={'column'}
                                            bg={'#FFFFFF'}
                                            border={'1px solid #919AA9'}
                                            borderRadius={'4px'}
                                            zIndex={1}
                                        >
                                            {accountListElements}
                                        </Flex>
                                    )}
                                </Flex>
                            </Flex>
                            <Flex justify={'flex-start'} h="36px">
                                <Text
                                    width={'35%'}
                                    fontWeight={'400'}
                                    fontSize={'14px'}
                                    lineHeight={'20px'}
                                    p="8px 12px"
                                >
                                    職稱
                                </Text>
                                <Select
                                    value={role}
                                    width={'60%'}
                                    variant="outline"
                                    bg={'#FFFFFF'}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                    }}
                                >
                                    {roleOptions}
                                </Select>
                            </Flex>
                            <Flex justify={'flex-start'} h="36px">
                                <Text
                                    width={'35%'}
                                    fontWeight={'400'}
                                    fontSize={'14px'}
                                    lineHeight={'20px'}
                                    p="8px 12px"
                                >
                                    帳號
                                </Text>
                                <Input
                                    value={account}
                                    width={'60%'}
                                    variant="outline"
                                    bg={'#FFFFFF'}
                                    type={'text'}
                                    onChange={(e) => {
                                        setAccount(e.target.value);
                                    }}
                                    onBlur={() => {
                                        setAccount(account.trim());
                                    }}
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
                                    name && account
                                        ? accountExists({
                                              variables: {
                                                  name: name,
                                                  username: account,
                                              },
                                          })
                                        : toast({
                                              title: '錯誤',
                                              description: '姓名或帳號不能為空',
                                              status: 'error',
                                              duration: 3000,
                                              isClosable: true,
                                          });
                                }}
                            >
                                下一步
                            </Button>
                        </Flex>
                    </Flex>
                </Center>
            </Center>
        );
    } else {
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
                    w={'380px'}
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
                            新增人員
                        </Text>
                        <Text
                            fontWeight={500}
                            fontSize={'12px'}
                            lineHeight={'20px'}
                            textAlign={'end'}
                        >
                            {siteName}
                        </Text>
                        {step == 'addAccountToSite' ? (
                            <Flex
                                direction={'column'}
                                rowGap={'20px'}
                                bg={'#E3ECFF'}
                                borderRadius={'10px'}
                                p={'41px 20px'}
                            >
                                <Text>
                                    確定要將{' '}
                                    <b>
                                        {name}({account})
                                    </b>{' '}
                                    以 <b>{role}</b> 身份新增至{' '}
                                    <b>{siteName}</b> 嗎？
                                </Text>
                            </Flex>
                        ) : (
                            <Flex
                                direction={'column'}
                                rowGap={'20px'}
                                bg={'#E3ECFF'}
                                borderRadius={'10px'}
                                p={'41px 20px'}
                            >
                                <Flex justify={'flex-start'} h={'fit-content'}>
                                    <Text
                                        textAlign={'left'}
                                        fontWeight={'400'}
                                        fontSize={'14px'}
                                        lineHeight={'20px'}
                                        p="8px 12px"
                                    >
                                        <b>
                                            {name}({account})
                                        </b>
                                        帳號尚未創建，
                                        <br />
                                        請設定密碼，完成註冊流程：
                                    </Text>
                                </Flex>
                                <Flex justify={'flex-start'} h="36px">
                                    <Text
                                        width={'35%'}
                                        fontWeight={'400'}
                                        fontSize={'14px'}
                                        lineHeight={'20px'}
                                        p="8px 12px"
                                    >
                                        密碼
                                    </Text>
                                    <InputGroup width={'60%'}>
                                        <Input
                                            type={show ? 'text' : 'password'}
                                            variant="outline"
                                            bg={'#FFFFFF'}
                                            ref={password}
                                        ></Input>
                                        <InputRightElement>
                                            <IconButton
                                                aria-label="Show Password"
                                                icon={<ShowPasswordIcon />}
                                                onClick={showPassword}
                                                background="transparent"
                                                _active={{
                                                    background: 'transparent',
                                                }}
                                                _focus={{
                                                    background: 'transparent',
                                                }}
                                            ></IconButton>
                                        </InputRightElement>
                                    </InputGroup>
                                </Flex>
                                <Flex justify={'flex-start'} h="36px">
                                    <Text
                                        width={'35%'}
                                        fontWeight={'400'}
                                        fontSize={'14px'}
                                        lineHeight={'20px'}
                                        p="8px 12px"
                                    >
                                        再輸入
                                    </Text>
                                    <InputGroup width={'60%'}>
                                        <Input
                                            type={
                                                showAgain ? 'text' : 'password'
                                            }
                                            variant="outline"
                                            bg={'#FFFFFF'}
                                            ref={passwordAgain}
                                        ></Input>
                                        <InputRightElement>
                                            <IconButton
                                                aria-label="Show Password"
                                                icon={<ShowPasswordIcon />}
                                                onClick={showPasswordAgain}
                                                background="transparent"
                                                _active={{
                                                    background: 'transparent',
                                                }}
                                                _focus={{
                                                    background: 'transparent',
                                                }}
                                            ></IconButton>
                                        </InputRightElement>
                                    </InputGroup>
                                </Flex>
                            </Flex>
                        )}
                        <Flex justify={'space-between'} h="36px" mt={'20px'}>
                            <Button
                                onClick={() => {
                                    setStep('checkAccountExist');
                                }}
                            >
                                上一步
                            </Button>
                            <Button
                                onClick={() => {
                                    if (step == 'addAccountToSite') {
                                        addSiteRole({
                                            variables: {
                                                role: role,
                                                siteId: siteId,
                                                username: account,
                                            },
                                        });
                                    } else if (step == 'createAccount') {
                                        if (!password.current?.value) {
                                            toast({
                                                title: '錯誤',
                                                description: '密碼不能為空',
                                                status: 'error',
                                                duration: 3000,
                                                isClosable: true,
                                            });
                                        } else if (
                                            password.current?.value !==
                                            passwordAgain.current?.value
                                        ) {
                                            toast({
                                                title: '錯誤',
                                                description: '再輸入與密碼不合',
                                                status: 'error',
                                                duration: 3000,
                                                isClosable: true,
                                            });
                                        } else {
                                            createAccount({
                                                variables: {
                                                    name: name,
                                                    password:
                                                        password.current?.value,
                                                    username: account,
                                                },
                                            });
                                        }
                                    }
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
}
