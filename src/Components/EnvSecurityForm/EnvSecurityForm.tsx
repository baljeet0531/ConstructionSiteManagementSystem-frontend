import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function EnvSecurityForm() {
    if (!IsPermit('eng_fault_form')) return <Navigate to="/" replace={true} />;

    return <p>環安衛自主檢查</p>;
}
