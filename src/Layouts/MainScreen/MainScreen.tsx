import React from 'react';
import { Box, FlexProps } from '@chakra-ui/react';

export const tableViewContainerStyle: FlexProps = {
    direction: 'column',
    h: '100vh',
    w: '100%',
    pl: '42px',
    pr: '42px',
    pt: '47px',
    pb: '24px',
    gap: '11px',
};

export default function MainScreen(props: { children: JSX.Element }) {
    return (
        <Box
            h={'100%'}
            w={'80vw'}
            borderLeft={'1px solid #000000'}
            overflowY={'auto'}
        >
            {props.children}
        </Box>
    );
}
