import React, { useState, useRef, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image,
    Button,
    Box,
    Text,
    useDisclosure,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { Cookies } from 'react-cookie';
import SignatureCanvas from 'react-signature-canvas';
import dayjs from 'dayjs';
import { RepeatIcon } from '@chakra-ui/icons';
import { SignatureHandler } from '../../Utils/Signature/Abstract';

const buttonStyle = {
    border: '2px solid #919AA9',
    backgroundColor: 'white',
    color: '#667080',
    size: 'sm',
};

export default function SignaturePad({
    title,
    signatureName,
    handler,
    index = undefined,
    h = '100%',
    showTime = true,
    leftBottomComponent = <></>,
    placeHolderText = '請簽核',
    disable = false,
}: {
    title: string;
    signatureName: string;
    handler: SignatureHandler<any>;
    index?: number | string | undefined;
    h?: string;
    showTime?: boolean;
    leftBottomComponent?: React.ReactNode;
    placeHolderText?: string;
    disable?: boolean;
}) {
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
            handler.removeSignature(index);
            onClose();
            return;
        }
        const canvas = sigCanvas.current.getTrimmedCanvas();
        const base64string = fillBackground(canvas).toDataURL();
        const blob = await fetch(base64string).then((res) => res.blob());
        const new_item = {
            no: undefined,
            image: new File([blob], signatureName),
            time: dayjs(),
            owner: new Cookies().get('username'),
        };
        handler.setSignature(index, new_item);
        onClose();
    };

    useEffect(() => {
        const sign = handler.getSignature(index);
        if (sign && sign.image) {
            setImageURL(URL.createObjectURL(sign.image as File));
        }
    }, [handler.getSignature(index)]);

    const getDatetimeString = () => {
        if (handler.getSignature(index)) {
            const dt = handler.getSignature(index)?.time as dayjs.Dayjs;
            return dt.format('YYYY-MM-DD HH:mm');
        } else {
            return '';
        }
    };

    return (
        <>
            {handler.canDelete(index) ? (
                <RepeatIcon
                    boxSize={4}
                    mt="4px"
                    ml="4px"
                    onClick={() => handler.removeSignature(index)}
                    alignSelf="start"
                />
            ) : (
                ''
            )}
            <Box
                w="100%"
                h={h}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                onClick={disable ? () => {} : onOpen}
            >
                {handler.hasImage(index) ? (
                    <Image
                        src={imageURL}
                        flex="1 1 auto"
                        h="75%"
                        fit="contain"
                    />
                ) : (
                    <Text color="#66708080">{placeHolderText}</Text>
                )}
                <Grid w="100%" templateColumns={'1fr 1fr'}>
                    <GridItem>
                        {handler.hasImage(index) && leftBottomComponent}
                    </GridItem>
                    <GridItem>
                        {showTime && (
                            <Text
                                pr="4px"
                                w="100%"
                                fontSize="0.75rem"
                                align="right"
                            >
                                {getDatetimeString()}
                            </Text>
                        )}
                    </GridItem>
                </Grid>
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
        </>
    );
}
