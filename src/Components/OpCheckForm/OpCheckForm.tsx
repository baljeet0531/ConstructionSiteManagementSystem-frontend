import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function OpCheckForm() {
    if (!IsPermit('eng_op_check_form')) return <Navigate to="/" replace={true} />;

    return <p>特殊作業自主檢點表</p>;
}
