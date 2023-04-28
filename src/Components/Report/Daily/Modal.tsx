import React from 'react';
import {
    Text,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from '@chakra-ui/react';

export default function DailyReportModal({
    siteId,
    dailyId,
    onClose,
    isOpen,
}: {
    siteId: string;
    dailyId: number;
    onClose: () => void;
    isOpen: boolean;
}) {
    return (
        <Modal onClose={onClose} isOpen={isOpen} size="full">
            <ModalOverlay />
            <ModalContent color="#667080">
                <ModalCloseButton position="fixed" top="12px" right="15px" />
                <ModalBody>
                    <Text>siteId: {siteId}</Text>
                    <Text>dailyId: {dailyId}</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
