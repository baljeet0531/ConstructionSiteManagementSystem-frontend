import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import BuildFormik from './BuildFormik';

export default function People() {
    if (!IsPermit('humanResource')) return <Navigate to="/" replace={true} />;

    return <BuildFormik></BuildFormik>;
}
