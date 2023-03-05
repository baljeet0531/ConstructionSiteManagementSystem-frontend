import { Input } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import { IOpCheck } from '../../Interface/OpCheck/Common';
import { OpCheckHandler } from '../../Utils/OpCheck/Handler';
import { placeholderStyle } from './Style';

export default class FormFactory {
    formProps: FormikProps<IOpCheck>;
    handler: OpCheckHandler;

    constructor(formProps: FormikProps<IOpCheck>, handler: OpCheckHandler) {
        this.formProps = formProps;
        this.handler = handler;
    }

    textInput() {
        return (
            <Input
                type="text"
                border="0px"
                placeholder="填寫"
                _placeholder={placeholderStyle}
            />
        );
    }
}
