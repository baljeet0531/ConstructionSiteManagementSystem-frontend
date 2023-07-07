import React from 'react';
import NoContentPageIcon from '../../Images/NoContentPage.svg';
import { Center, Flex, Image, Text } from '@chakra-ui/react';

export default function NoContentPage(props: { label: string }) {
    const { label } = props;
    return (
        <Center w={'100%'} h={'100%'}>
            <Flex
                w={'60%'}
                direction={'column'}
                gap={'35px'}
                justify={'center'}
                align={'center'}
            >
                <Image src={NoContentPageIcon} />
                <Text
                    fontFamily={'Inter'}
                    fontStyle={'normal'}
                    fontWeight={700}
                    fontSize={'1.5rem'}
                    lineHeight={'1.25rem'}
                    color={'#4C7DE7'}
                    textAlign={'center'}
                >
                    {label}
                </Text>
            </Flex>
        </Center>
    );
}
