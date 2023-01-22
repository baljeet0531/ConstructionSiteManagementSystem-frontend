import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import BuildFormik from './BuildFormik';

export default function PeopleEstablishment() {
    if (!IsPermit('people_establishment'))
        return <Navigate to="/" replace={true} />;

    const { state } = useLocation();

    return (
        <BuildFormik {...(state && { initialIdno: state.idno })}></BuildFormik>
    );
}
