import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function MachineryEstablishment() {
    if (!IsPermit('outsource_machinery_establishment')) return <Navigate to="/" replace={true} />;

    return <p>機具檢點建置</p>;
}
