import React, {
    useState,
    useRef,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Text,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import SignatureCanvas from 'react-signature-canvas';

export interface Signature {
    image: File | undefined;
    createdTime: Date | undefined;
}

export default function SignaturePad({
    title,
    signatureName,
    signature,
    setSignature,
    Disable = false,
}: {
    title: string;
    signatureName: string;
    signature: Signature;
    setSignature: Dispatch<SetStateAction<Signature>>;
    Disable?: boolean;
}) {
    const sigCanvas = useRef() as React.MutableRefObject<SignatureCanvas>;
    const [imageURL, setImageURL] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const clear = () => sigCanvas.current.clear();
    const save = async () => {
        const base64string = sigCanvas.current
            .getTrimmedCanvas()
            .toDataURL('image/png');
        const blob = await fetch(base64string).then((res) => res.blob());
        setSignature({
            image: new File([blob], signatureName),
            createdTime: undefined,
        });
        onClose();
    };
    const buttonStyle = {
        border: '2px solid #919AA9',
        backgroundColor: 'white',
        color: '#667080',
        size: 'sm',
    };

    useEffect(() => {
        if (signature.image) {
            setImageURL(URL.createObjectURL(signature.image));
        }
    }, [signature]);

    return (
        <VStack border={'1px'} borderColor={'#919AA9'}>
            <Box
                backgroundImage={imageURL || 'none'}
                backgroundSize={'contain'}
                backgroundRepeat={'no-repeat'}
                w={'fill-available'}
                h={'fill-available'}
                onClick={Disable ? () => {} : onOpen}
            />
            <Text
                w={'fill-available'}
                pr={1}
                fontSize={'0.8vw'}
                align={'right'}
            >
                {signature.createdTime
                    ? signature.createdTime.toLocaleString()
                    : null}
            </Text>
            <Modal size={'lg'} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'#667080'}>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        ml={'22px'}
                        mr={'22px'}
                        p={'0'}
                        border={'1px'}
                        borderRadius={'10px'}
                        borderColor={'#667080'}
                    >
                        <SignatureCanvas
                            ref={sigCanvas}
                            canvasProps={{
                                className: 'signatureCanvas',
                                width: 465,
                                height: 205,
                            }}
                        />
                    </ModalBody>

                    <ModalFooter
                        display={'flex'}
                        justifyContent={'space-around'}
                    >
                        <Button onClick={onClose} {...buttonStyle}>
                            取消新增
                        </Button>
                        <Button onClick={clear} {...buttonStyle}>
                            清除
                        </Button>
                        <Button
                            onClick={save}
                            {...buttonStyle}
                            backgroundColor={'rgba(102, 112, 128, 0.1)'}
                        >
                            確定新增
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
}
