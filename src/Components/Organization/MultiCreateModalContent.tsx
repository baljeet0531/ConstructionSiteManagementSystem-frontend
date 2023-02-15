/* eslint-disable no-unused-vars */
import React from 'react';
import {
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Flex,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { tableData } from './CreateLaborModal';

export default function MultiCreateModalContent(props: {
    tableData: tableData;
    header: string;
    contentElement: JSX.Element;
    handleLeftButtonClick: Function;
    handleRightButtonClick: Function;
    leftButtonText: string;
    rightButtonText: string;
}) {
    const {
        tableData,
        header,
        contentElement,
        handleLeftButtonClick,
        handleRightButtonClick,
        leftButtonText,
        rightButtonText,
    } = props;

    return (
        <ModalContent
            maxWidth={'380px'}
            maxHeight={'466px'}
            minHeight={'394px'}
            padding={'30px 45px 22px 45px'}
        >
            <ModalHeader padding={0}>
                <Flex direction={'column'} width={'100%'}>
                    <Text
                        fontStyle={'normal'}
                        fontWeight={700}
                        fontSize={'20px'}
                        lineHeight={'20px'}
                    >
                        {header}
                    </Text>
                    <Text
                        textAlign={'end'}
                        fontStyle={'normal'}
                        fontWeight={500}
                        fontSize={'12px'}
                        lineHeight={'20px'}
                    >
                        穩懋南科路竹廠機電一期新建工程
                    </Text>
                </Flex>
            </ModalHeader>
            <ModalBody
                bg={'#E3ECFF'}
                padding={'40px 30px'}
                borderRadius={'10px'}
            >
                {contentElement}
            </ModalBody>
            <ModalFooter padding={0}>
                <Flex mt={'20px'} justify={'space-between'} width={'100%'}>
                    <Button
                        variant={'buttonGrayOutline'}
                        size={'sm'}
                        mr={3}
                        onClick={() => {
                            handleLeftButtonClick();
                        }}
                    >
                        {leftButtonText}
                    </Button>
                    <Button
                        variant={'buttonGrayOutline'}
                        size={'sm'}
                        onClick={() => {
                            handleRightButtonClick();
                        }}
                    >
                        {rightButtonText}
                    </Button>
                </Flex>
            </ModalFooter>
        </ModalContent>
    );
}
