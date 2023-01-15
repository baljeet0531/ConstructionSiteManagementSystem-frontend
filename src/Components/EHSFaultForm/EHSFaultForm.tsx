import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function EHSFaultForm() {
    if (!IsPermit('ehs_fault_form')) return <Navigate to="/" replace={true} />;

    return <p>職安衛管理/工安缺失單</p>;
}
