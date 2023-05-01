import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import { Button, useDisclosure } from '@chakra-ui/react';
import FaultFormModal from './Modal';

export default function EHSFaultForm() {
    if (!IsPermit('ehs_fault_form')) return <Navigate to="/" replace={true} />;
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>Test</Button>
            <FaultFormModal
                siteId={'M522C0008'}
                faultId={1}
                onClose={onClose}
                isOpen={isOpen}
            />
        </>
    );
}
