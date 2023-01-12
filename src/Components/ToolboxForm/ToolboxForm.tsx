import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function ToolboxForm() {
    if (!IsPermit('toolbox_form')) return <Navigate to="/" replace={true} />;

    return <p>工具箱會議</p>;
}
