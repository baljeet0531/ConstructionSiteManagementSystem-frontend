import { Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { Cookies } from 'react-cookie';
import { useToast } from '@chakra-ui/react';
import { ISignature } from '../../Interface/Signature';
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
    approvedRef: ISignature | undefined;
    reviewRef: ISignature | undefined;
    supplierManagerRef: ISignature | undefined;
    supplierRef: ISignature | undefined;
}

const CREATE_WORK_PERMIT = gql`
    mutation createWorkPermit(
        $applicant: String
        $applied: Boolean
        $area: String
        $modified: Boolean
        $opAloft: Boolean
        $opAssemble: Boolean
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
        $siteId: String
        $supervisor: String
        $supervisorCorp: String
        $supplyDate: String
        $system: String
        $systemBranch: String
        $tel: String
        $workEnd: String
        $workStart: String
        $zone: String
    ) {
        createWorkPermit(
            applicant: $applicant
            applied: $applied
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
            siteId: $siteId
            supervisor: $supervisor
            supervisorCorp: $supervisorCorp
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
    // const { siteId, value }: { siteId: string, value?: IWorkPermit; } = state;
    const siteId = localStorage.getItem('siteId') as string;
    const value = undefined;
    const username: string = new Cookies().get('username');
    console.log(siteId);
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
        approvedRef: undefined,
        reviewRef: undefined,
        supplierManagerRef: undefined,
        supplierRef: undefined,
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
            {(props) => <WorkPermitForm formProps={props} />}
        </Formik>
    );
}
