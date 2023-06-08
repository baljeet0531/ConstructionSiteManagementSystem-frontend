/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import { Button, useDisclosure } from '@chakra-ui/react';
import EHSFormModal from './Modal';
import EHSOverview from './Overview';

export default function EHSForm(props: { siteId: string; siteName: string }) {
    if (!IsPermit('ehs_form')) return <Navigate to="/" replace={true} />;
    const { onOpen, onClose, isOpen } = useDisclosure();
    return (
        <EHSOverview {...props} />
        // <>
        //     <Button onClick={onOpen}>Test</Button>
        //     <EHSFormModal
        //         siteId={'M522C0008'}
        //         day={'2023-06-07'}
        //         type={'normal'}
        //         onClose={onClose}
        //         isOpen={isOpen}
        //     />
        // </>
    );
}
