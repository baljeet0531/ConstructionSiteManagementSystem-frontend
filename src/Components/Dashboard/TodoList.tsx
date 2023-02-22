import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { WarningIcon } from '../../Icons/Icons';
import { todoListFlexStyle } from './Style';

export default function TodoList() {
    return (
        <Flex direction={'column'}>
            <Text variant={'w700s16'}>待辦事項</Text>
            <Flex {...todoListFlexStyle} mt={'10px'}>
                <WarningIcon />
                <Text variant={'w400s14'}>尚未完成</Text>
                <Text variant={'w400s14'}>工具箱會議及巡檢紀錄</Text>
            </Flex>
            <Flex {...todoListFlexStyle}>
                <WarningIcon />
                <Text variant={'w400s14'}>尚未完成</Text>
                <Text variant={'w400s14'}>
                    特殊作業工安自主檢點表（動火作業）
                </Text>
            </Flex>
            <Flex {...todoListFlexStyle}>
                <WarningIcon />
                <Text variant={'w400s14'}>尚未完成</Text>
                <Text variant={'w400s14'}>
                    特殊作業工安自主檢點表（高架作業）
                </Text>
            </Flex>
            <Flex {...todoListFlexStyle}>
                <WarningIcon />
                <Text variant={'w400s14'}>尚未完成</Text>
                <Text variant={'w400s14'}>
                    特殊作業工安自主檢點表（電力作業）
                </Text>
            </Flex>
        </Flex>
    );
}
