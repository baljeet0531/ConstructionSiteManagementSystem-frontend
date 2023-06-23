import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Flex,
    Text,
    Button,
    Input,
} from '@chakra-ui/react';

export default function UploadModal(props: {
    isOpen: boolean;
    onClose: () => void;
    file: File | undefined;
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
    handleUpload: Function;
    accept?: string;
}) {
    const { isOpen, onClose, file, setFile, handleUpload, accept } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            closeOnOverlayClick={false}
            size={'md'}
        >
            <ModalOverlay />
            <ModalContent borderRadius={'10px'} bg={'#FFFFFF'} p={'30px 45px'}>
                <ModalHeader p={0}>
                    <Text>匯入機具資料</Text>
                </ModalHeader>
                <ModalBody p={0}>
                    <Flex
                        direction={'column'}
                        justify={'center'}
                        align={'center'}
                        border={'1px dashed #667080'}
                        borderRadius={'10px'}
                        gap={'10px'}
                        mt={'17px'}
                        p={'41px 20px'}
                    >
                        <Text variant={'w400s14'} textAlign={'center'}>
                            請將資料拖拉到這裡上傳
                        </Text>
                        <Text variant={'w400s14'} textAlign={'center'}>
                            或
                        </Text>
                        <Button
                            variant={'blueOutline'}
                            fontWeight={400}
                            fontSize={'12px'}
                            lineHeight={'20px'}
                        >
                            {file ? file.name : '選取檔案'}
                        </Button>
                        <Text variant={'w400s14'} textAlign={'center'}>
                            上傳檔案格式:{accept}
                        </Text>
                        <Input
                            type={'file'}
                            accept={accept}
                            pos={'absolute'}
                            h={'100%'}
                            w={'100%'}
                            opacity={0}
                            onChange={(e) => {
                                if (e.target.files) {
                                    setFile(e.target.files[0]);
                                } else {
                                    setFile(undefined);
                                }
                            }}
                        ></Input>
                    </Flex>
                </ModalBody>

                <ModalFooter
                    h={'40px'}
                    mt={'17px'}
                    p={0}
                    justifyContent={'space-between'}
                >
                    <Button
                        variant={'buttonGraySolid'}
                        height={'40px'}
                        borderRadius={'var(--chakra-radii-md)'}
                        onClick={() => {
                            onClose();
                            setFile(undefined);
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        variant={'buttonBlueSolid'}
                        onClick={() => handleUpload()}
                    >
                        確認
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
