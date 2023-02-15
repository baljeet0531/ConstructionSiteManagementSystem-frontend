import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function ToolboxFormOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('eng_toolbox_form'))
        return <Navigate to="/" replace={true} />;
    const { siteId } = props;
    localStorage.setItem('siteId', siteId);

    return <p>工具箱會議</p>;
}
