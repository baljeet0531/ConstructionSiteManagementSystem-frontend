import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import DailyReportModal from './Daily/Modal';

export default function Report() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    if (!IsPermit('project_report')) return <Navigate to="/" replace={true} />;

    return (
        <>
            <p>Report</p>
            <Button
                onClick={() => {
                    onOpen();
                }}
            >
                test
            </Button>
            <DailyReportModal
                siteId={'M123'}
                serialNumber={'123'}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
}
