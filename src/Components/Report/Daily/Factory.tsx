import { IDailyReport } from '../../../Interface/DailyReport';
import { FormikProps } from 'formik';
import { Input } from '@chakra-ui/react';
import { placeholderStyle, disabledStyle } from './Styles';

export default class FormFactory {
    formProps: FormikProps<IDailyReport>;

    constructor(formProps: FormikProps<IDailyReport>) {
        this.formProps = formProps;
    }

    input(type: string, disabled: boolean = false) {
        return (
            <Input
                type={type}
                size="sm"
                placeholder="填寫"
                _placeholder={placeholderStyle}
                disabled={disabled}
                _disabled={disabledStyle}
            />
        );
    }
}
