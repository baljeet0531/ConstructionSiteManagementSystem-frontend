import React from 'react';
import { Navigate } from "react-router-dom";
import { IsPermit } from '../../Mockdata/Mockdata';

export default function Place() {

    if (!IsPermit("place"))
        return <Navigate to="/" replace={true} />

    return (
        <p>Place</p>
    )
}