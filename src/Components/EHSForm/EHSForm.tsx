import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function EHSForm() {
    if (!IsPermit('ehs_form')) return <Navigate to="/" replace={true} />;

    return <p>工安自主檢查</p>;
}
