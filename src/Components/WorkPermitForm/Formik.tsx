import { useState } from 'react';
import { Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { Cookies } from 'react-cookie';
import { useToast } from '@chakra-ui/react';
import { ISignature, SignatureStateItem } from '../../Interface/Signature';
import WorkPermitForm from './Form';

export interface IWorkPermit {
    siteId: string;
    number: string;
    applicant: string | undefined;
    applied: boolean;
    modified: boolean;
    supplyDate: string | undefined;
    system: string | undefined;
    systemBranch: string | undefined;
    project: string | undefined;
    area: string | undefined;
    zone: string | undefined;
    workStart: string | undefined;
    workEnd: string | undefined;
    supervisorCorp: string | undefined;
    supervisor: string | undefined;
    tel: string | undefined;
    projectName: string | undefined;
    opFire: boolean | undefined;
    opAloft: boolean | undefined;
    opConfined: boolean | undefined;
    opElectric: boolean | undefined;
    opCage: boolean | undefined;
    opLift: boolean | undefined;
    opAssemble: boolean | undefined;
    opDetach: boolean | undefined;
    opHole: boolean | undefined;
    opChemical: boolean | undefined;
    opElse: string | undefined;
    approved: ISignature | undefined;
    review: ISignature | undefined;
    supplierManager: ISignature | undefined;
    supplier: ISignature | undefined;
}

export type SignatureName = 'approved' | 'review' | 'supplier' | 'supplierManager';

const CREATE_WORK_PERMIT = gql`
    mutation uwp(
        $applicant: String!
        $applied: Boolean
        $approvedImg: Upload
        $approvedTime: DateTime
        $approvedOwner: String
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
        $reviewImg: Upload
        $reviewTime: DateTime
        $reviewOwner: String
        $siteId: String!
        $supervisor: String
        $supervisorCorp: String
        $supplierImg: Upload
        $supplierTime: DateTime
        $supplierOwner: String
        $supplierManagerImg: Upload
        $supplierManagerTime: DateTime
        $supplierManagerOwner: String
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
            approved: {
                time: $approvedTime
                owner: $approvedOwner
                image: $approvedImg
            }
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
            review: {
                time: $reviewTime
                owner: $reviewOwner
                image: $reviewImg
            }
            siteId: $siteId
            supervisor: $supervisor
            supervisorCorp: $supervisorCorp
            supplier: {
                time: $supplierTime
                owner: $supplierOwner
                image: $supplierImg
            }
            supplierManager: {
                time: $supplierManagerTime
                owner: $supplierManagerOwner
                image: $supplierManagerImg
            }
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
        projectName: '',
        siteId: siteId,
        supervisor: '',
        supervisorCorp: '',
        supplyDate: '',
        system: '',
        systemBranch: '',
        tel: '',
        workEnd: '',
        workStart: '',
        zone: '',
        approved: undefined,
        review: undefined,
        supplierManager: undefined,
        supplier: undefined,
    };

    const signatures: Record<SignatureName, SignatureStateItem> = {
        approved: useState<ISignature>(
            initialValues.approved as ISignature
        ),
        review: useState<ISignature>(
            initialValues.review as ISignature
        ),
        supplier: useState<ISignature>(
            initialValues.supplier as ISignature
        ),
        supplierManager: useState<ISignature>(
            initialValues.supplierManager as ISignature
        )
    };

    const toast = useToast();
    const [createWorkPermit] = useMutation(CREATE_WORK_PERMIT, {
        onCompleted: ({ createWorkPermit }) => {
            if (createWorkPermit.ok) {
                toast({
                    title: createWorkPermit.message,
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
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                createWorkPermit({ variables: { ...values } });
                actions.setSubmitting(false);
            }}
        >
            {(props) => <WorkPermitForm formProps={props} signatures={signatures}/>}
        </Formik>
    );
}
