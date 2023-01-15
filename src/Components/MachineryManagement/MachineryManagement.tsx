import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function MachineryManagement() {
    if (!IsPermit('ehs_machinery_management')) return <Navigate to="/" replace={true} />;

    return <p>機具檢點管理</p>;
}
