import { useState } from 'react';
import { Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { Cookies } from 'react-cookie';
import { useToast } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ISignature, SignatureStateItem } from '../../Interface/Signature';
import { IWorkPermit, SignatureName } from '../../Interface/WorkPermit';
import WorkPermitForm from './Form';

const GQL_WORK_PERMIT = gql`
    mutation uwp(
        $approved: signatureInput
        $applicant: String!
        $applied: Boolean
        $area: String
        $modified: Boolean
        $opAssemble: Boolean
        $opAloft: Boolean
        $opCage: Boolean
        $opChemical: Boolean
        $opConfined: Boolean
        $opDetach: Boolean
        $opElectric: Boolean
        $opElse: String
        $opFire: Boolean
        $opHole: Boolean
        $opLift: Boolean
        $project: String
        $projectName: String
        $review: signatureInput
        $siteId: String!
        $supervisor: String
        $supervisorCorp: String
        $supplier: signatureInput
        $supplierManager: signatureInput
        $supplyDate: Date
        $system: String
        $systemBranch: String
        $tel: String
        $workStart: DateTime!
        $workEnd: DateTime!
        $zone: String
    ) {
        updateWorkPermit(
            applicant: $applicant
            applied: $applied
            approved: $approved
            area: $area
            modified: $modified
            opAloft: $opAloft
            opAssemble: $opAssemble
            opCage: $opCage
            opChemical: $opChemical
            opConfined: $opConfined
            opDetach: $opDetach
            opElectric: $opElectric
            opElse: $opElse
            opFire: $opFire
            opHole: $opHole
            opLift: $opLift
            project: $project
            projectName: $projectName
            review: $review
            siteId: $siteId
            supervisor: $supervisor
            supervisorCorp: $supervisorCorp
            supplier: $supplier
            supplierManager: $supplierManager
            supplyDate: $supplyDate
            system: $system
            systemBranch: $systemBranch
            tel: $tel
            workEnd: $workEnd
            workStart: $workStart
            zone: $zone
        ) {
            ok
            message
        }
    }
`;

export default function WorkPermitFormik() {
    const siteId = localStorage.getItem('siteId') as string;
    const value = JSON.parse(
        localStorage.getItem('singleWorkPermit') as string
    ) as IWorkPermit;
    const username: string = new Cookies().get('username');
    const initialValues: IWorkPermit = value || {
        applicant: username,
        applied: true,
        area: '',
        modified: false,
        number: '',
        opAloft: false,
        opAssemble: false,
        opCage: false,
        opChemical: false,
        opConfined: false,
        opDetach: false,
        opElectric: false,
        opElse: '',
        opFire: false,
        opHole: false,
        opLift: false,
        project: '',
        projectName: localStorage.getItem('siteName') as string,
        siteId: siteId,
        supervisor: '',
        supervisorCorp: '',
        supplyDate: dayjs().format('YYYY-MM-DD'),
        system: '',
        systemBranch: '',
        tel: '',
        workEnd: dayjs()
            .add(1, 'day')
            .hour(17)
            .minute(30)
            .second(0)
            .format('YYYY-MM-DDTHH:mm:ss'),
        workStart: dayjs()
            .add(1, 'day')
            .hour(8)
            .minute(30)
            .second(0)
            .format('YYYY-MM-DDTHH:mm:ss'),
        zone: [],
        approved: undefined,
        review: undefined,
        supplierManager: undefined,
        supplier: undefined,
    };

    const signatures: Record<SignatureName, SignatureStateItem> = {
        approved: useState<ISignature>(initialValues.approved as ISignature),
        review: useState<ISignature>(initialValues.review as ISignature),
        supplier: useState<ISignature>(initialValues.supplier as ISignature),
        supplierManager: useState<ISignature>(
            initialValues.supplierManager as ISignature
        ),
    };

    const toast = useToast();
    const [updateWorkPermit] = useMutation(GQL_WORK_PERMIT, {
        onCompleted: ({ updateWorkPermit }) => {
            if (updateWorkPermit.ok) {
                toast({
                    title: updateWorkPermit.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        },
        onError: (err) => {
            console.log(err);
            toast({
                title: '錯誤',
                description: `${err}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        },
    });

    return (
        <Formik
            initialValues={initialValues}
            validateOnChange={false}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                const submitValues = { ...values }
                if (submitValues.zone instanceof Array) {
                    submitValues['zone'] = submitValues.zone.join(',');
                }
                let key : keyof Record<SignatureName, SignatureStateItem>
                for (key in signatures) {
                    const [signature] = signatures[key]
                    submitValues[key] = {...signature}
                }
                updateWorkPermit({ variables: submitValues });
                actions.setSubmitting(false);
            }}
        >
            {(props) => (
                <WorkPermitForm
                    siteId={siteId}
                    formProps={props}
                    signatures={signatures}
                />
            )}
        </Formik>
    );
}
