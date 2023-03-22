import { IDailyReport } from '../../../Interface/DailyReport';
import { FormikProps } from 'formik';

export default class FormFactory {
    formProps: FormikProps<IDailyReport>;

    constructor(formProps: FormikProps<IDailyReport>) {
        this.formProps = formProps;
    }
}
