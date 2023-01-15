import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function PeopleEstablishment() {
    if (!IsPermit('people_establishment')) return <Navigate to="/" replace={true} />;

    return <p>人員資料建置</p>;
}
