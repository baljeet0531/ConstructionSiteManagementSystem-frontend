import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function EngFaultForm() {
    if (!IsPermit('eng_fault_form')) return <Navigate to="/" replace={true} />;

    return <p>工程管理/工安缺失單</p>;
}
