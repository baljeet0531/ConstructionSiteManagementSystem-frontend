import {
    Center,
    CenterProps,
    ChakraProps,
    ResponsiveValue,
    Spinner,
} from '@chakra-ui/react';
import React from 'react';

export function PageLoading(props: CenterProps) {
    return (
        <Center
            position={'absolute'}
            top={0}
            left={'20vw'}
            w={'80vw'}
            h={'100vh'}
            bg={'#D9D9D980'}
            zIndex={99}
            {...props}
        >
            <Spinner size={'xl'} />
        </Center>
    );
}

export function FormLoading(props: CenterProps) {
    return (
        <Center
            position="fixed"
            top={0}
            w="100vw"
            h="100vh"
            bg={'#D9D9D980'}
            zIndex={99}
            {...props}
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

export function TableLoading() {
    return (
        <CustomLoading
            position={'fixed'}
            width={'100%'}
            height={'100%'}
            top={0}
            left={0}
            opacity={0.5}
            bg={'#D9D9D980'}
            zIndex={9999}
        />
    );
}
