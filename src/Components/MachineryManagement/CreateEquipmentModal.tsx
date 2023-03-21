import { Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';
import BlueBodyModal from '../Shared/BlueBodyModal';

export default function CreateEquipmentModal(props: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { isOpen, onClose } = props;

    return (
        <BlueBodyModal
            title={'新增機具'}
            cancelButton={{
                name: '取消新增',
                handleClick: () => {},
            }}
            confirmButton={{
                name: '確定新增',
                handleClick: () => {},
            }}
            isOpen={isOpen}
            onClose={onClose}
            modalSize={'sm'}
        >
            <Flex direction={'column'} gap={'20px'}>
                <Flex gap={'12px'} align={'center'} justify={'space-between'}>
                    <Text
                        variant={'w400s14'}
                        style={{ textAlignLast: 'justify' }}
                        flex={1}
                    >
                        廠商名稱
                    </Text>
                    <Input variant={'grayOutline'} width={'160px'} />
                </Flex>
                <Flex gap={'12px'} align={'center'} justify={'space-between'}>
                    <Text
                        variant={'w400s14'}
                        style={{ textAlignLast: 'justify' }}
                        flex={1}
                    >
                        主要機具
                    </Text>
                    <Input variant={'grayOutline'} width={'160px'} />
                </Flex>
                <Flex gap={'12px'} align={'center'} justify={'space-between'}>
                    <Text
                        variant={'w400s14'}
                        style={{ textAlignLast: 'justify' }}
                        flex={1}
                    >
                        數量
                    </Text>
                    <Input variant={'grayOutline'} width={'160px'} />
                </Flex>
            </Flex>
        </BlueBodyModal>
    );
}
