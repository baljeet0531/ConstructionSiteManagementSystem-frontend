/* eslint-disable no-unused-vars */
import {
    Button,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    TextProps,
    Textarea,
} from '@chakra-ui/react';
import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Cookies } from 'react-cookie';
import { MutationFunctionOptions } from '@apollo/client';
import dayjs from 'dayjs';
import {
    IFaultFormCheckOverviewExtend,
    IUpdateFaultFormCheck,
    IUpdateFaultFormCheckVar,
} from '../../Interface/FaultForm';
import { QUERY_OUTSOURCE_FAULT_FROM_OVERVIEW } from '../OutsourceFaultForm/Overview';
import { getImage } from '../../Utils/Resources';
import { CustomLoading } from './Loading';

const signatureModalTextStyle: TextProps = {
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: '1.25rem',
    p: '10px 0px',
};

export type TRole = 'outsourcer' | 'engineer';

export default function AcceptDenySignatureModal(props: {
    siteId: string;
    openingTarget: IFaultFormCheckOverviewExtend;
    accept: boolean;
    editable: boolean;
    updateFunction:
        | (() => void)
        | ((
              options?:
                  | MutationFunctionOptions<
                        IUpdateFaultFormCheck,
                        IUpdateFaultFormCheckVar
                    >
                  | undefined
          ) => Promise<IUpdateFaultFormCheck>);
    role: TRole;
    isOpen: boolean;
    onClose: () => void;
}) {
    const {
        isOpen,
        onClose,
        accept,
        editable,
        openingTarget,
        updateFunction,
        role,
        siteId,
    } = props;

    const [imageSrc, setImageSrc] = React.useState<string>('');
    const [signTime, setTime] = React.useState<string>('');
    React.useEffect(() => {
        const image = openingTarget[`${role}Signature`];
        if (image && !editable) {
            getImage(image.path).then((blob) => {
                if (blob) {
                    setImageSrc(URL.createObjectURL(blob));
                    setTime(dayjs(image.time).format('YYYY-MM-DD HH:mm'));
                } else {
                    setImageSrc('');
                    setTime('');
                }
            });
        }
    }, [openingTarget[`${role}Signature`]?.path]);

    const sigCanvas = React.useRef<SignatureCanvas>(null);
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const clear = () => sigCanvas.current?.clear();
    const handleComplete = () => {
        if (sigCanvas.current?.isEmpty()) {
            onClose();
            return;
        }
        const base64string = sigCanvas.current?.getTrimmedCanvas().toDataURL();
        base64string &&
            fetch(base64string)
                .then((res) => res.blob())
                .then((blob) => {
                    const now = dayjs();
                    updateFunction({
                        variables: {
                            ...openingTarget,
                            outsourcerSignature: null,
                            engineerSignature: null,
                            [`${role}Signature`]: {
                                no: undefined,
                                image: new File([blob], `${role}-sign.png`),
                                time: now,
                                owner: new Cookies().get('username'),
                            },
                            [`${role}Description`]:
                                textAreaRef.current?.value ?? '',
                            [`${role}Status`]: accept,
                        },
                        refetchQueries: [
                            {
                                query: QUERY_OUTSOURCE_FAULT_FROM_OVERVIEW,
                                variables: { siteId },
                            },
                        ],
                    });
                });
    };
    return (
        <Modal size={'lg'} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                {!editable && <ModalCloseButton />}
                <ModalBody>
                    <Flex direction={'column'}>
                        {!accept && (
                            <Flex direction={'column'}>
                                {editable && (
                                    <Text {...signatureModalTextStyle}>
                                        請填寫異議原因並簽名
                                    </Text>
                                )}
                                <Text {...signatureModalTextStyle}>
                                    異議原因
                                </Text>
                                <Textarea
                                    ref={textAreaRef}
                                    border={'1px solid #667080'}
                                    borderColor={'#667080'}
                                    borderRadius={'10px'}
                                    resize={'none'}
                                    {...(!editable && {
                                        value:
                                            openingTarget[
                                                `${role}Description`
                                            ] ?? '',
                                        disabled: true,
                                    })}
                                ></Textarea>
                            </Flex>
                        )}
                        <Flex direction={'column'}>
                            <Text {...signatureModalTextStyle}>
                                {accept ? '接受 - 簽名' : '簽名'}
                            </Text>
                            {editable ? (
                                <SignatureCanvas
                                    ref={sigCanvas}
                                    canvasProps={{
                                        className: 'signatureCanvas',
                                        width: 465,
                                        height: 205,
                                        style: {
                                            border: '1px solid #667080',
                                            borderRadius: '10px',
                                        },
                                    }}
                                />
                            ) : (
                                <Flex
                                    width={'465px'}
                                    height={'205px'}
                                    direction={'column'}
                                    align={'flex-end'}
                                >
                                    {imageSrc ? (
                                        <Image
                                            width={'100%'}
                                            height={'90%'}
                                            objectFit={'contain'}
                                            src={imageSrc}
                                        />
                                    ) : (
                                        <CustomLoading />
                                    )}
                                    <Text
                                        fontSize={'0.625rem'}
                                        lineHeight={'1.25rem'}
                                        fontWeight={400}
                                    >
                                        {signTime}
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </ModalBody>

                {editable && (
                    <ModalFooter
                        display={'flex'}
                        justifyContent={'space-around'}
                    >
                        <Button
                            onClick={() => {
                                clear();
                                onClose();
                            }}
                            variant={'whiteOutline'}
                            size={'sm'}
                        >
                            取消
                        </Button>
                        <Button
                            onClick={clear}
                            variant={'whiteOutline'}
                            size={'sm'}
                        >
                            清除
                        </Button>
                        <Button
                            onClick={handleComplete}
                            variant={'buttonGrayOutline'}
                            size={'sm'}
                        >
                            完成
                        </Button>
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
}
