import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import {
    ISignature,
    SignatureStateItem,
    convertSignature,
} from '../../Interface/Signature';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { opCheckMap } from '../../Utils/OpCheck/Mapper';
import {
    IOpCheck,
    OpCheckName,
    SignatureName,
} from '../../Interface/OpCheck/Common';
import OpCheckForm from './Form';

export default function OpCheckFormik() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const siteId = localStorage.getItem('siteId') as string;
    const { number, type } = JSON.parse(
        localStorage.getItem('singleOpCheckObject') as string
    );
    const signatures: Record<SignatureName, SignatureStateItem> = {
        staffAfter: useState<ISignature>(),
        supervisorAfter: useState<ISignature>(),
        staffBefore: useState<ISignature>(),
        supervisorBefore: useState<ISignature>(),
    };
    const handler = new opCheckMap[type as OpCheckName].handler(
        siteId,
        number,
        signatures
    );

    const [updateOpCheck] = useMutation(handler.mutation, {
        onCompleted: (d) => {
            const response = d[handler.mutationName];
            if (response.ok) {
                toast({
                    title: response.message,
                    description: '視窗將於 3 秒後關閉',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    onCloseComplete: () => {
                        window.close();
                    },
                });
            }
        },
        onError: (err) => {
            console.error(err);
            defaultErrorToast(toast);
            throw new Error();
        },
    });

    const handleSignatures = (submit: IOpCheck) => {
        let key: keyof Record<SignatureName, SignatureStateItem>;
        for (key in signatures) {
            const [signature] = signatures[key];
            submit[key] = convertSignature(signature) as ISignature;
        }
    };

    useEffect(() => {
        onOpen();
    }, []);

    return (
        <>
            <Formik
                initialValues={handler.getInitialValues()}
                validateOnChange={false}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    const submitValues = { ...values };
                    handleSignatures(submitValues);
                    handler.marshal(submitValues);
                    console.log(submitValues);
                    updateOpCheck({ variables: submitValues }).catch(() =>
                        actions.setSubmitting(false)
                    );
                }}
            >
                {(props) => (
                    <OpCheckForm
                        formProps={props}
                        type={type}
                        handler={handler}
                    />
                )}
            </Formik>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent color="#667080">
                    <ModalHeader>簽核時間注意事項</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Box w="100%">
                                依規定，特殊作業工安自主檢點表建議簽核時間如下：
                            </Box>
                            <Box w="100%">施工前 08:30~10:30</Box>
                            <Box w="100%">收工前 16:30~17:30</Box>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="buttonBlueSolid" onClick={onClose}>
                            了解
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
