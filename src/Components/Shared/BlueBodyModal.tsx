import React from 'react';
import {
    Button,
    Flex,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ChakraProps,
} from '@chakra-ui/react';

interface IModalButton {
    name: string;
    handleClick: Function;
}

export default function PurpleBodyModal(props: {
    title: string;
    cancelButton: IModalButton;
    confirmButton: IModalButton;
    isOpen: boolean;
    onClose: () => void;
    bodyElement: () => JSX.Element;
    modalSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    contentStyle?: ChakraProps;
    bodyStyle?: ChakraProps;
}) {
    const {
        title,
        cancelButton,
        confirmButton,
        isOpen,
        onClose,
        modalSize,
        bodyElement,
        contentStyle,
        bodyStyle,
    } = props;
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={modalSize}
            isCentered
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent padding={'30px 45px 30px 45px'} {...contentStyle}>
                <ModalHeader padding={0}>
                    <Text
                        fontStyle={'normal'}
                        fontWeight={700}
                        fontSize={'20px'}
                        lineHeight={'20px'}
                    >
                        {title}
                    </Text>
                </ModalHeader>
                <ModalBody
                    bg={'#E3ECFF'}
                    mt={'20px'}
                    padding={'41px 30px'}
                    borderRadius={'10px'}
                    maxHeight={'300px'}
                    minHeight={'118px'}
                    {...bodyStyle}
                >
                    {bodyElement()}
                </ModalBody>

                <ModalFooter padding={0} mt={'20px'}>
                    <Flex justify={'space-between'} width={'100%'}>
                        <Button
                            variant={'buttonGrayOutline'}
                            size={'xs'}
                            height={'28px'}
                            mr={3}
                            onClick={() => {
                                cancelButton.handleClick();
                                onClose();
                            }}
                        >
                            {cancelButton.name}
                        </Button>
                        <Button
                            variant={'buttonGrayOutline'}
                            size={'xs'}
                            height={'28px'}
                            onClick={() => {
                                confirmButton.handleClick();
                                onClose();
                            }}
                        >
                            {confirmButton.name}
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
