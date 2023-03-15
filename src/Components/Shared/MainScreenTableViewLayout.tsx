import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { tableViewContainerStyle } from '../../Interface/MainScreenLayout';
export default function MainScreenTableViewLayout(props: {
    children: JSX.Element;
    siteName: string;
}) {
    const { children, siteName } = props;
    return (
        <Flex {...tableViewContainerStyle}>
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Text variant={'pageTitle'}>機具檢點管理</Text>;{children}
        </Flex>
    );
}
