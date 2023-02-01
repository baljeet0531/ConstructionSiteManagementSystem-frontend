import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { IsPermit } from '../../Mockdata/Mockdata';

export default function WorkPermitFormOverview({ siteId }: { siteId: string }) {
    if (!IsPermit('eng_work_permit_form'))
        return <Navigate to="/" replace={true} />;

    const navSingleWorkPermit = () => {
        const url = `${window.location.origin}/form/work-permit`;
        localStorage.setItem('siteId', siteId);
        // TODO: Save the workPermit item in localStorage
        // localStorage.setItem('singleWorkPermit', JSON.stringify(valueList[e.currentTarget.id]))
        window.open(url, '_blank');
    };

    return (
        <>
            <p>工作許可單</p>
            <Button onClick={navSingleWorkPermit}>新增</Button>
        </>
    );
}
