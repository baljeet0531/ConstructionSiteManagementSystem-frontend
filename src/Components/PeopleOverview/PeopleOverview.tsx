import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function PeopleOverview() {
    if (!IsPermit('people_overview')) return <Navigate to="/" replace={true} />;

    return <p>人員資料總覽</p>;
}
