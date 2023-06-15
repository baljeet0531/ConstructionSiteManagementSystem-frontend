/* eslint-disable no-unused-vars */
import {
    Button,
    Flex,
    Modal,
    ModalBody,
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
import { IFaultFormCheckPrimaryKey } from '../../Interface/FaultForm';
import { QUERY_OUTSOURCE_FAULT_FROM_OVERVIEW } from '../OutsourceFaultForm/Overview';
import { ISignature } from '../../Interface/Signature';

const signatureModalTextStyle: TextProps = {
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: '1.25rem',
    p: '10px 0px',
};

type TUpdate = {
    updateFaultFormCheck: {
        ok: boolean;
        message: string;
    };
};

type TUpdateVar = {
    siteId: string;
    code: string;
    day: string;
    target: string;
    staff?: string;
    engineerDescription?: string;
    engineerSignature?: ISignature;
    engineerStatus?: boolean;
    managerStatus?: boolean;
    outsourcerDescription?: string;
    outsourcerSignature?: ISignature;
    outsourcerStatus?: boolean;
};

export default function AcceptDenySignatureModal(props: {
    siteId: string;
    openingTarget: IFaultFormCheckPrimaryKey;
    accept: boolean;
    updateFunction:
        | (() => void)
        | ((
              options?: MutationFunctionOptions<TUpdate, TUpdateVar> | undefined
          ) => Promise<TUpdate>);
    role: 'outsourcer' | 'engineer';
    isOpen: boolean;
    onClose: () => void;
}) {
    const {
        isOpen,
        onClose,
        accept,
        openingTarget,
        updateFunction,
        role,
        siteId,
    } = props;
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
                            siteId,
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
                <ModalBody>
                    <Flex direction={'column'}>
                        {!accept && (
                            <Flex direction={'column'}>
                                <Text {...signatureModalTextStyle}>
                                    請填寫異議原因並簽名
                                </Text>
                                <Text {...signatureModalTextStyle}>
                                    異議原因
                                </Text>
                                <Textarea
                                    ref={textAreaRef}
                                    border={'1px solid #667080'}
                                    borderColor={'#667080'}
                                    borderRadius={'10px'}
                                    resize={'none'}
                                ></Textarea>
                            </Flex>
                        )}
                        <Flex direction={'column'}>
                            <Text {...signatureModalTextStyle}>
                                {accept ? '接受 - 簽名' : '簽名'}
                            </Text>
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
                        </Flex>
                    </Flex>
                </ModalBody>

                <ModalFooter display={'flex'} justifyContent={'space-around'}>
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
            </ModalContent>
        </Modal>
    );
}
