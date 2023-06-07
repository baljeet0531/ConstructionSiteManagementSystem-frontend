import { Input, InputProps, Textarea } from '@chakra-ui/react';
import { EHSFormName, IEHSForm } from '../../Interface/EHSForm/Common';
import { FormikProps } from 'formik';
import { disabledStyle, placeholderStyle } from './Styles';
import { EHSFormHandler } from '../../Utils/EHSForm/Handler';

export default class FormFactory {
    formProps: FormikProps<IEHSForm>;
    type: EHSFormName;
    handler: EHSFormHandler;

    constructor(
        formProps: FormikProps<IEHSForm>,
        type: EHSFormName,
        handler: EHSFormHandler
    ) {
        this.formProps = formProps;
        this.type = type;
        this.handler = handler;
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
