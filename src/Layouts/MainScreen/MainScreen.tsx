/* eslint-disable no-undef */
import React from 'react';
import { Box } from '@chakra-ui/react';

export default function MainScreen(props: {
    children: JSX.Element;
    // siteId: string;
}) {
    // const { children, siteId } = props;
    // const Children = React.cloneElement(children, { siteId: siteId });
    // const Children = props.children
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
