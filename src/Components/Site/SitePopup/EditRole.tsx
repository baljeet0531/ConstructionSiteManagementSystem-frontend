import React from 'react';

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
} from '@chakra-ui/react';

import { ShowPasswordIcon } from '../../../Icons/Icons';
import { rolesList } from '../SiteRoles';
import { gql, useMutation } from '@apollo/client';

const UPDATE_SITE_ROLE = gql`
    mutation updateSiteRole(
        $siteId: String!
        $name: String!
        $role: String!
        $username: String!
        $password: String
    ) {
        updateSiteRole(
            siteId: $siteId
            name: $name
            role: $role
            username: $username
            password: $password
        ) {
            siteRole {
                username
            }
        }
    }
`;

export default function EditRole(props: {
    siteId: string;
    siteName: string;
    roleDetails: {
        name: string;
        role: string;
        username: string;
    };
    setShowPopup: Function;
    setRerender: Function;
}) {
    const { siteId, siteName, roleDetails, setShowPopup, setRerender } = props;
    const { username } = roleDetails;

    const toast = useToast();
    // const nameInput = React.useRef<HTMLInputElement>(null);
    const password = React.useRef<HTMLInputElement>(null);
    const passwordAgain = React.useRef<HTMLInputElement>(null);

    const [name, setName] = React.useState<string>(roleDetails.name);
    const [role, setRole] = React.useState<string>(roleDetails.role);
    const [show, setShow] = React.useState(false);
    const [showAgain, setShowAgain] = React.useState(false);

    const [updateSiteRole] = useMutation(UPDATE_SITE_ROLE, {
        onCompleted: () => {
            setShowPopup(false);
            setRerender((rerender: Boolean) => !rerender);
        },
        onError: (error) => {
            console.log(error);
        },
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
                w={'32%'}
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
                        編輯人員
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
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                姓名
                            </Text>
                            <Input
                                defaultValue={name}
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                onBlur={(e) => {
                                    setName(e.target.value.trim());
                                }}
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
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
                                defaultValue={role}
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
                        <Flex justify={'space-between'} h="36px">
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
                                defaultValue={username}
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
                                disabled
                            ></Input>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
                            <Text
                                width={'35%'}
                                fontWeight={'400'}
                                fontSize={'14px'}
                                lineHeight={'20px'}
                                p="8px 12px"
                            >
                                新密碼
                            </Text>
                            <InputGroup width={'60%'}>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    variant="outline"
                                    bg={'#FFFFFF'}
                                    ref={password}
                                    onBlur={(e) => {
                                        e.target.value = e.target.value.trim();
                                    }}
                                ></Input>
                                <InputRightElement>
                                    <IconButton
                                        aria-label="Show Password"
                                        icon={<ShowPasswordIcon />}
                                        onClick={showPassword}
                                        background="transparent"
                                        _active={{ background: 'transparent' }}
                                        _focus={{ background: 'transparent' }}
                                    ></IconButton>
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                        <Flex justify={'space-between'} h="36px">
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
                                    type={showAgain ? 'text' : 'password'}
                                    variant="outline"
                                    bg={'#FFFFFF'}
                                    ref={passwordAgain}
                                    onBlur={(e) => {
                                        e.target.value = e.target.value.trim();
                                    }}
                                ></Input>
                                <InputRightElement>
                                    <IconButton
                                        aria-label="Show Password"
                                        icon={<ShowPasswordIcon />}
                                        onClick={showPasswordAgain}
                                        background="transparent"
                                        _active={{ background: 'transparent' }}
                                        _focus={{ background: 'transparent' }}
                                    ></IconButton>
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                    </Flex>
                    <Flex justify={'space-between'} h="36px" mt={'20px'}>
                        <Button
                            onClick={() => {
                                setShowPopup(false);
                            }}
                        >
                            取消修改
                        </Button>
                        <Button
                            onClick={() => {
                                if (!name) {
                                    toast({
                                        title: '錯誤',
                                        description: '姓名不能為空',
                                        status: 'error',
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                } else if (!password.current?.value) {
                                    updateSiteRole({
                                        variables: {
                                            siteId: siteId,
                                            name: name,
                                            role: role,
                                            username: username,
                                        },
                                    });
                                } else if (
                                    password.current?.value !==
                                    passwordAgain.current?.value
                                ) {
                                    toast({
                                        title: '錯誤',
                                        description: '再輸入與新密碼不合',
                                        status: 'error',
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                } else {
                                    updateSiteRole({
                                        variables: {
                                            siteId: siteId,
                                            name: name,
                                            role: role,
                                            username: username,
                                            password: password.current.value,
                                        },
                                    });
                                }
                            }}
                        >
                            確定修改
                        </Button>
                    </Flex>
                </Flex>
            </Center>
        </Center>
    );
}
