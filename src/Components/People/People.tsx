import React from 'react';
import { Navigate } from "react-router-dom";
import { IsPermit } from '../../Mockdata/Mockdata';

export default function People() {

    if (!IsPermit("people"))
        return <Navigate to="/" replace={true} />

    return (
        <p>People</p>
    )
}