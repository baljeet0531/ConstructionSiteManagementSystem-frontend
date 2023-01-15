import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function PeopleApproval() {
    if (!IsPermit('people_approval')) return <Navigate to="/" replace={true} />;

    return <p>人員資料審核</p>;
}
