import React from 'react';
import { Navigate } from "react-router-dom";
import { IsPermit } from '../../Mockdata/Mockdata';

export default function Schedule() {

    if (!IsPermit("schedule"))
        return <Navigate to="/" replace={true} />

    return (
        <p>Schedule</p>
    )
}