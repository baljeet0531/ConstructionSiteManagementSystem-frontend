import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import { Formik } from 'formik';
import FormPage from './FormPage';
import {
    ApolloError,
    MutationHookOptions,
    useLazyQuery,
    useMutation,
} from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import {
    ALL_HUMAN_RESOURCE,
    SEARCH_HUMAN,
} from '../PeopleOverview/PeopleOverview';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import { formFiles, formValues } from '../../Interface/PeopleManagement';
import { CREATE_HUMAN_RESOURCE, UPDATE_HUMAN_RESOURCE } from './GQL';
import { ActionsContext } from '../../Context/Context';
import NoContentPage from '../Shared/NoContentPage';

const filesInitialValues: formFiles = { HImgs: [undefined] };

export default function PeopleEstablishment() {
    if (!IsPermit('people_establishment'))
        return <Navigate to="/" replace={true} />;

    const { state } = useLocation();

    const [humanToBeUpdated, setHumanToBeUpdated] = React.useState<
        { no: string; idno: string } | undefined
    >(state && state.human);

    const initialValues: formValues = {
        idno: '',
        name: '',
        gender: '男',
        birthday: '',
        bloodType: 'A',
        tel: '',
        liaison: '',
        emergencyTel: '',
        address: '',
        hazardNotifyDate: '',
        supplierIndustrialSafetyNumber: '',

        safetyHealthyEducationIssue: '',
        safetyHealthyEducationWithdraw: '',
        sixStatus: '',

        laborInsuranceApplyDate: '',
        laborAssociationDate: '',

        certificationName: '',

        accidentInsuranceStartOne: '',
        accidentInsuranceEndOne: '',
        accidentInsuranceAmountOne: '',
        accidentInsuranceSignDateOne: '',
        accidentInsuranceCompanyNameOne: '',

        accidentInsuranceStartTwo: '',
        accidentInsuranceEndTwo: '',
        accidentInsuranceAmountTwo: '',
        accidentInsuranceSignDateTwo: '',
        accidentInsuranceCompanyNameTwo: '',

        accidentInsuranceStartThree: '',
        accidentInsuranceEndThree: '',
        accidentInsuranceAmountThree: '',
        accidentInsuranceSignDateThree: '',
        accidentInsuranceCompanyNameThree: '',

        contractingCompanyName: '',
        viceContractingCompanyName: '',

        aCertificationDate: '',
        boshCertificationDate: '',
        aosCertificationDate: '',
        aohCertificationDate: '',
        frCertificationDate: '',
        o2CertificationDate: '',
        osCertificationDate: '',
        saCertificationDate: '',
        sCertificationDate: '',
        ssaCertificationDate: '',
        maCertificationDate: '',
        rCertificationDate: '',
        fsCertificationDate: '',
        peCertificationDate: '',
        rsCertificationDate: '',
        dwCertificationDate: '',
        aWithdrawDate: '',
        boshWithdrawDate: '',
        aosWithdrawDate: '',
        aohWithdrawDate: '',
        frWithdrawDate: '',
        o2WithdrawDate: '',
        osWithdrawDate: '',
        saWithdrawDate: '',
        sWithdrawDate: '',
        maWithdrawDate: '',
        rWithdrawDate: '',
        ssaWithdrawDate: '',
        fsWithdrawDate: '',
        peWithdrawDate: '',
        rsWithdrawDate: '',
        dwWithdrawDate: '',

        aStatus: '',
        boshStatus: '',
        aosStatus: '',
        aohStatus: '',
        frStatus: '',
        o2Status: '',
        osStatus: '',
        saStatus: '',
        sStatus: '',
        maStatus: '',
        rStatus: '',
        ssaStatus: '',
        fsStatus: '',
        peStatus: '',
        rsStatus: '',
        dwStatus: '',
    };

    const [fileStates, setFileStates] =
        React.useState<formFiles>(filesInitialValues);

    const toast = useToast();
    const [createHumanResource, { loading: createLoading }] = useMutation(
        CREATE_HUMAN_RESOURCE
    );

    const [updateHumanResource, { loading: updateLoading }] = useMutation(
        UPDATE_HUMAN_RESOURCE
    );

    const [searchHuman] = useLazyQuery(SEARCH_HUMAN);

    const authActions = React.useContext(ActionsContext);

    return authActions.C ? (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                let filteredValues: any = {};
                for (let props in values) {
                    if (
                        values[props as keyof formValues] != '' &&
                        props.slice(-6, 0) != 'Status'
                    ) {
                        filteredValues[props] =
                            values[props as keyof formValues];
                    }
                }
                const { HImgs, ...rest } = fileStates;

                const handleCompeleted = (message: string) => {
                    defaultSuccessToast(toast, message);
                    setFileStates(filesInitialValues);
                    setHumanToBeUpdated(undefined);
                    actions.resetForm();
                };
                const handleErr = (err: ApolloError) => {
                    console.log(err);
                    defaultErrorToast(toast);
                };

                const mutationOptions = (
                    field: string
                ): MutationHookOptions => ({
                    variables: {
                        ...filteredValues,
                        ...rest,
                        HImgs: HImgs.slice(0, -1),
                    },
                    onCompleted: (data) => {
                        data[field].ok && handleCompeleted(data[field].message);
                    },
                    onError: handleErr,
                    refetchQueries: [
                        {
                            query: ALL_HUMAN_RESOURCE,
                            variables: { errlist: true },
                            fetchPolicy: 'network-only',
                        },
                        {
                            query: ALL_HUMAN_RESOURCE,
                            variables: { errlist: false },
                            fetchPolicy: 'network-only',
                        },
                    ],
                });

                searchHuman({
                    variables: { context: filteredValues.idno },
                    onCompleted: ({ searchHuman }) => {
                        searchHuman.length == 0
                            ? createHumanResource(
                                  mutationOptions('createHumanResource')
                              )
                            : authActions.U
                            ? updateHumanResource(
                                  mutationOptions('updateHumanResource')
                              )
                            : defaultErrorToast(toast, '無更新權限');
                    },
                    onError: (err) => {
                        console.log(err);
                        defaultErrorToast(toast);
                    },
                    fetchPolicy: 'network-only',
                });
                actions.setSubmitting(false);
            }}
        >
            {(props) => {
                return (
                    <FormPage
                        formProps={props}
                        fileStates={fileStates}
                        setFileStates={setFileStates}
                        humanToBeUpdated={humanToBeUpdated}
                        setHumanToBeUpdated={setHumanToBeUpdated}
                        submitLoading={createLoading || updateLoading}
                    ></FormPage>
                );
            }}
        </Formik>
    ) : (
        <NoContentPage label="您沒有訪問權限" />
    );
}
