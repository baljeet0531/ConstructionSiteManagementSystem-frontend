import { IFaultForm } from '../../Interface/FaultForm';
import { FormikProps } from 'formik';

export default class FormFactory {
    formProps: FormikProps<IFaultForm>;

    constructor(formProps: FormikProps<IFaultForm>) {
        this.formProps = formProps;
    }
}
