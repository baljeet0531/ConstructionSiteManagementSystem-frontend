import { Button, Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { DeleteIcon, LaunchIcon, PublishIcon } from '../../Icons/Icons';
import { tableViewContainerStyle } from '../../Layouts/MainScreen/MainScreen';

export default function PhotoMainPage(props: {
    siteName: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const { isOpen, onToggle, siteName } = props;
    return (
        <Flex {...tableViewContainerStyle} display={isOpen ? 'none' : 'flex'}>
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Text variant={'pageTitle'}>相片管理</Text>
                <Flex align={'center'} justify={'flex-end'} gap={'10px'}>
                    <IconButton
                        variant={'blueOutline'}
                        aria-label="export photos"
                        icon={<LaunchIcon />}
                    />
                    <IconButton
                        variant={'blueOutline'}
                        aria-label="delete photos"
                        icon={<DeleteIcon />}
                    />
                    <Button
                        variant={'buttonBlueSolid'}
                        leftIcon={<PublishIcon />}
                        onClick={onToggle}
                    >
                        新增相片
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
