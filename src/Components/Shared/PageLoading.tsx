import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

export default function PageLoading() {
    return (
        <Center
            position={'absolute'}
            top={0}
            left={'20vw'}
            w={'80vw'}
            h={'100vh'}
            bg={'#D9D9D980'}
            zIndex={2}
        >
            <Spinner size={'xl'} />
        </Center>
    );
}
