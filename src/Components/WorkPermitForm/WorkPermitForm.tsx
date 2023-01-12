import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function WorkPermitForm() {
    if (!IsPermit('work_permit_form')) return <Navigate to="/" replace={true} />;

    return <p>工作許可單</p>;
}
