import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function Security() {
    if (!IsPermit('security')) return <Navigate to="/" replace={true} />;

    return <p>Security</p>;
}
