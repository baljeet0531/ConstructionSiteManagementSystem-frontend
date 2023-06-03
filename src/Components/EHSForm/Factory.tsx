import {
    Input,
    InputProps,
    Textarea,
} from '@chakra-ui/react';
import { IEHSForm } from '../../Interface/EHSForm';
import { FormikProps } from 'formik';
import { disabledStyle, placeholderStyle } from './Styles';

export default class FormFactory {
    formProps: FormikProps<IEHSForm>;

    constructor(formProps: FormikProps<IEHSForm>) {
        this.formProps = formProps;
    }
    input(props: InputProps) {
        return (
            <Input
                size="sm"
                placeholder="填寫"
                _placeholder={placeholderStyle}
                isDisabled={false}
                _disabled={disabledStyle}
                {...props}
            />
        );
    }
    textArea() {
        return (
            <Textarea
                h="100%"
                border="0px"
                placeholder="填寫"
                _placeholder={placeholderStyle}
                resize="none"
            />
        );
    }
}
