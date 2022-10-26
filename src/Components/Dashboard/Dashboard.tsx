import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function Dashboard() {
    if (!IsPermit('dashboard')) return <Navigate to="/" replace={true} />;

    return <p>Dashboard</p>;
}
