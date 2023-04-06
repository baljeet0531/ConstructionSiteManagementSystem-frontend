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
    useDisclosure,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
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
    disable = false,
}: {
    title: string;
    signatureName: string;
    state: SignatureStateItem;
    h?: string;
    showTime?: boolean;
    placeHolderText?: string;
    disable?: boolean;
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
    const clearPad = () => sigCanvas.current.clear();
    const removeSignature = () => {
        setSignature(undefined);
    };
    const save = async () => {
        if (sigCanvas.current.isEmpty()) {
            removeSignature();
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
        <>
            {signature?.image && !signature?.no ? (
                <RepeatIcon
                    boxSize={4}
                    mt="4px"
                    ml="4px"
                    onClick={removeSignature}
                    alignSelf="start"
                />
            ) : (
                ''
            )}
            <Box
                w="100%"
                h={signature?.image ? h : '100%'}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                onClick={disable ? () => {} : onOpen}
            >
                {signature?.image ? (
                    <Image
                        src={imageURL}
                        flex="1 1 auto"
                        maxH="75%"
                        fit="contain"
                        onLoad={(e) => {
                            const image = e.target as HTMLImageElement;
                            URL.revokeObjectURL(image.src);
                        }}
                    />
                ) : (
                    <Text color="#66708080">{placeHolderText}</Text>
                )}
                {showTime && (
                    <Text pr="4px" fontSize="1rem" alignSelf="end">
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
                        <Button onClick={clearPad} {...buttonStyle}>
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
        </>
    );
}
