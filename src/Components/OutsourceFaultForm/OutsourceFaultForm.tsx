import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function OutsourceFaultForm() {
    if (!IsPermit('outsource_fault_form')) return <Navigate to="/" replace={true} />;

    return <p>承商管理/工安缺失單確認</p>;
}
