import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import SignaturePad, { Signature } from '../Shared/SignaturePad';

export default function WorkPermitForm() {
    if (!IsPermit('eng_work_permit_form'))
        return <Navigate to="/" replace={true} />;

    const [signature, setSignature] = useState<Signature>({
        image: undefined,
        createdTime: new Date(),
    });

    return (
        <>
            <p>工作許可單</p>
            <SignaturePad
                title="測試"
                signatureName="test.png"
                signature={signature}
                setSignature={setSignature}
            />
        </>
    );
}
