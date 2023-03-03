import {
    Center,
    ChakraProps,
    ResponsiveValue,
    Spinner,
} from '@chakra-ui/react';
import React from 'react';

export function PageLoading() {
    return (
        <Center
            position={'absolute'}
            top={0}
            left={'20vw'}
            w={'80vw'}
            h={'100vh'}
            bg={'#D9D9D980'}
            zIndex={99}
        >
            <Spinner size={'xl'} />
        </Center>
    );
}

export function FormLoading() {
    return (
        <Center
            position="fixed"
            top={0}
            w="100vw"
            h="100vh"
            bg={'#D9D9D980'}
            zIndex={99}
        >
            <Spinner size={'xl'} />
        </Center>
    );
}

export function CustomLoading(
    chakraProps?: ChakraProps,
    spinnerSize?: ResponsiveValue<
        (string & {}) | 'sm' | 'md' | 'lg' | 'xl' | 'xs'
    >
) {
    const size =
        typeof spinnerSize === 'object' && Object.keys(spinnerSize).length === 0
            ? 'xl'
            : spinnerSize;
    return (
        <Center w={'100%'} h={'100%'} {...chakraProps}>
            <Spinner size={size} />
        </Center>
    );
}
