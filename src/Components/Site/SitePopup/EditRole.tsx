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
} from '@chakra-ui/react';

import { ShowPasswordIcon } from '../../../Icons/Icons';

export default function EditRole(props: { setShowPopup: Function }) {
    const { setShowPopup } = props;

    const password = React.useRef<HTMLInputElement>(null);
    const passwordAgain = React.useRef<HTMLInputElement>(null);

    const [show, setShow] = React.useState(false);
    const [showAgain, setShowAgain] = React.useState(false);
    function showPassword() {
        setShow(!show);
    }
    function showPasswordAgain() {
        setShowAgain(!showAgain);
    }

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
                    <Flex
                        direction={'column'}
                        mt={'20px'}
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
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
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
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                            >
                                <option value="">系統管理員</option>
                                <option value="">專案經理</option>
                                <option value="">工地經理</option>
                                <option value="">專案工程師</option>
                                <option value="">系統工程師</option>
                                <option value="">工安人員</option>
                                <option value="">外包商</option>
                                <option value="">業主</option>
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
                                width={'60%'}
                                variant="outline"
                                bg={'#FFFFFF'}
                                type={'text'}
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
                            取消新增
                        </Button>
                        <Button
                            onClick={() => {
                                setShowPopup(false);
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
