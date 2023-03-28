import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import PhotoCreatePage from './PhotoCreatePage';
import PhotoOverviewPage from './PhotoOverviewPage';

export default function Photo(props: { siteId: string; siteName: string }) {
    if (!IsPermit('project_photo')) return <Navigate to="/" replace={true} />;

    const { siteId, siteName } = props;
    const { isOpen, onToggle } = useDisclosure();
    return (
        <>
            <PhotoOverviewPage
                siteId={siteId}
                siteName={siteName}
                isOpen={isOpen}
                onToggle={onToggle}
            />
            {isOpen && (
                <PhotoCreatePage
                    siteId={siteId}
                    siteName={siteName}
                    onToggle={onToggle}
                />
            )}
        </>
    );
}
