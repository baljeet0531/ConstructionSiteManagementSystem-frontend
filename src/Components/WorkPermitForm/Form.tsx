import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FormikProps } from 'formik';
import { IsPermit } from '../../Mockdata/Mockdata';
import { IWorkPermit } from './Formik';
import SignaturePad, { Signature } from '../Shared/SignaturePad';

export default function WorkPermitForm({
    formProps,
}: {
    formProps: FormikProps<IWorkPermit>;
}) {
    if (!IsPermit('eng_work_permit_form'))
        return <Navigate to="/" replace={true} />;

    const [signature, setSignature] = useState<Signature>({
        image: undefined,
        createdTime: new Date(),
    });

    console.log(formProps);

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
