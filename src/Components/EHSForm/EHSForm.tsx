import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import { Button, useDisclosure } from '@chakra-ui/react';
import EHSFormModal from './Modal';

export default function EHSForm() {
    if (!IsPermit('ehs_form')) return <Navigate to="/" replace={true} />;
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>Test</Button>
            <EHSFormModal
                siteId={'M522C0008'}
                day={'2023-06-03'}
                normal={true}
                onClose={onClose}
                isOpen={isOpen}
            />
        </>
    );
}
