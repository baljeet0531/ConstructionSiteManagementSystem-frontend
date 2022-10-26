import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function Report() {
    if (!IsPermit('report')) return <Navigate to="/" replace={true} />;

    return <p>Report</p>;
}
