import React, { useState, useRef, useEffect } from 'react';
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
    Image,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import { Cookies } from 'react-cookie';
import SignatureCanvas from 'react-signature-canvas';
import { SignatureStateItem } from '../../Interface/Signature';
import dayjs from 'dayjs';

export default function SignaturePad({
    title,
    signatureName,
    state,
    h = '100%',
    showTime = true,
    placeHolderText = '請簽核',
    Disable = false,
}: {
    title: string;
    signatureName: string;
    state: SignatureStateItem;
    h?: string;
    showTime?: boolean;
    placeHolderText?: string;
    Disable?: boolean;
}) {
    const [signature, setSignature] = state;
    const sigCanvas = useRef() as React.MutableRefObject<SignatureCanvas>;
    const [imageURL, setImageURL] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const fillBackground = (srcCanvas: HTMLCanvasElement) => {
        const destinationCanvas = document.createElement('canvas');
        destinationCanvas.width = srcCanvas.width;
        destinationCanvas.height = srcCanvas.height;
        const destCtx = destinationCanvas.getContext('2d');

        if (destCtx) {
            //create a rectangle with the desired color
            destCtx.fillStyle = '#FFFFFF';
            destCtx.fillRect(0, 0, srcCanvas.width, srcCanvas.height);

            //draw the original canvas onto the destination canvas
            destCtx.drawImage(srcCanvas, 0, 0);
            return destinationCanvas;
        } else {
            return srcCanvas;
        }
    };
    const clear = () => sigCanvas.current.clear();
    const save = async () => {
        if (sigCanvas.current.isEmpty()) {
            setSignature({
                no: undefined,
                image: undefined,
                time: undefined,
                owner: undefined,
            });
            onClose();
            return;
        }
        const canvas = sigCanvas.current.getTrimmedCanvas();
        const base64string = fillBackground(canvas).toDataURL();
        const blob = await fetch(base64string).then((res) => res.blob());
        setSignature({
            no: undefined,
            image: new File([blob], signatureName),
            time: dayjs(),
            owner: new Cookies().get('username'),
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
        if (signature && signature.image) {
            setImageURL(URL.createObjectURL(signature.image as File));
        }
    }, [signature]);

    return (
        <VStack w="100%" h="100%">
            <Box
                w="100%"
                h={h}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                onClick={Disable ? () => {} : onOpen}
            >
                {signature?.image ? (
                    <Image
                        src={imageURL}
                        minHeight="80%"
                        maxWidth="100%"
                        maxHeight="80%"
                        fit="contain"
                    />
                ) : (
                    <Text color="#66708080">{placeHolderText}</Text>
                )}
                {showTime && (
                    <Text pr="4px" w="100%" fontSize="1rem" align="right">
                        {signature?.time
                            ? signature.time.format('YYYY-MM-DD HH:mm')
                            : ''}
                    </Text>
                )}
            </Box>
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
