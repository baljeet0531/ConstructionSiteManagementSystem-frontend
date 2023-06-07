import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import MachineryPage from './MachineryPage';

export default function MachineryManagement(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('ehs_machinery_management'))
        return <Navigate to="/" replace={true} />;

    return <MachineryPage {...props} title="機具檢點管理" />;
}
