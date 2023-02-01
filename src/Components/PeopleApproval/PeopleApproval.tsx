import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import PeopleOverview from '../PeopleOverview/PeopleOverview';

export default function PeopleApproval() {
    if (!IsPermit('people_approval')) return <Navigate to="/" replace={true} />;

    return <PeopleOverview errorOnly={true}></PeopleOverview>;
}
