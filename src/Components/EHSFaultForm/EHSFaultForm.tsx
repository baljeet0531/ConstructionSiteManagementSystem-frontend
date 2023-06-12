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
                day={'2023-06-07'}
                responsibleTarget={'帆宣M5'}
                code={'AA01'}
                onClose={onClose}
                isOpen={isOpen}
            />
        </>
    );
}
