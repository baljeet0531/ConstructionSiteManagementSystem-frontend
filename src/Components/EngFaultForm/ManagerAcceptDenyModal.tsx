/* eslint-disable no-unused-vars */
import {
    Button,
    Flex,
    Mark,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { IFaultFormCheckPrimaryKey } from '../../Interface/FaultForm';
import { MutationFunctionOptions } from '@apollo/client';
import {
    TUpdateFaultFormCheck,
    TUpdateFaultFormCheckVar,
} from '../Shared/AcceptDenySignatureModal';
import { QUERY_OUTSOURCE_FAULT_FROM_OVERVIEW } from '../OutsourceFaultForm/Overview';

export default function ManagerAcceptDenyModal(props: {
    siteId: string;
    openingTarget: IFaultFormCheckPrimaryKey;
    updateFunction:
        | (() => void)
        | ((
              options?:
                  | MutationFunctionOptions<
                        TUpdateFaultFormCheck,
                        TUpdateFaultFormCheckVar
                    >
                  | undefined
          ) => Promise<TUpdateFaultFormCheck>);
    accept: boolean;
    isOpen: boolean;
    onClose: () => void;
}) {
    const { isOpen, onClose, accept, updateFunction, openingTarget, siteId } =
        props;

    console.log(openingTarget);
    return (
        <Modal size={'lg'} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={'#667080'}>
                    確定要
                    <Mark color={'#DB504A'}>{accept ? '接受' : '駁回'}</Mark>
                    此檢點項目嗎？
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    確定駁回後
                    <Mark color={'#DB504A'}>{accept ? '將會' : '將不會'}</Mark>
                    產生工安缺失紀錄表。
                </ModalBody>
                <ModalFooter>
                    <Flex
                        align={'center'}
                        justify={'flex-end'}
                        gap={'16px'}
                        width={'100%'}
                    >
                        <Button variant={'whiteOutline'} onClick={onClose}>
                            取消
                        </Button>
                        <Button
                            variant={'buttonBlueSolid'}
                            onClick={() => {
                                updateFunction({
                                    variables: {
                                        ...openingTarget,
                                        siteId,
                                        managerStatus: accept,
                                        engineerSignature: null,
                                        outsourcerSignature: null,
                                    },
                                    refetchQueries: [
                                        {
                                            query: QUERY_OUTSOURCE_FAULT_FROM_OVERVIEW,
                                            variables: { siteId },
                                        },
                                    ],
                                });
                                onClose();
                            }}
                        >
                            完成
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
