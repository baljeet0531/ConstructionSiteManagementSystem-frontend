import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import MachineryPage from '../MachineryManagement/MachineryPage';

export default function MachineryEstablishment(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('outsource_machinery_establishment'))
        return <Navigate to="/" replace={true} />;

    return (
        <MachineryPage
            {...props}
            title="機具清單建置"
            tableEditable={false}
            entryTableOnly
        />
    );
}
