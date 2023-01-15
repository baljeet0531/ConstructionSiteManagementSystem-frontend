import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function Organization() {
    if (!IsPermit('organization')) return <Navigate to="/" replace={true} />;

    return <p>專案人員組織</p>;
}
