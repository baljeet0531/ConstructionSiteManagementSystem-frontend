import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import { Button, useDisclosure } from '@chakra-ui/react';
import EnvSecurityFormModal from './Modal';

export default function EnvSecurityForm() {
    if (!IsPermit('eng_fault_form')) return <Navigate to="/" replace={true} />;
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>Test</Button>
            <EnvSecurityFormModal
                siteId={'M522C0008'}
                number={'230308-01'}
                onClose={onClose}
                isOpen={isOpen}
            />
        </>
    );
}
