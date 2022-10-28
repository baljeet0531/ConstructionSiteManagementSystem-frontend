import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function Photo() {
    if (!IsPermit('photo')) return <Navigate to="/" replace={true} />;

    return <p>Photo</p>;
}
