import { Checkbox, GridItem, Input } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import { IOpCheck, OpCheckName } from '../../Interface/OpCheck/Common';
import { OpCheckHandler } from '../../Utils/OpCheck/Handler';
import { opCheckMap } from '../../Utils/OpCheck/Mapper';
import { placeholderStyle } from './Style';

export default class FormFactory {
    formProps: FormikProps<IOpCheck>;
    type: OpCheckName;
    handler: OpCheckHandler;

    constructor(
        formProps: FormikProps<IOpCheck>,
        type: OpCheckName,
        handler: OpCheckHandler
    ) {
        this.formProps = formProps;
        this.type = type;
        this.handler = handler;
    }

    textInput() {
        return (
            <Input
                type="text"
                size="sm"
                placeholder="填寫"
                _placeholder={placeholderStyle}
            />
        );
    }
    typeCheckBox(type: OpCheckName, label: string) {
        return (
            <GridItem>
                <Checkbox
                    w="100%"
                    h="100%"
                    spacing="0.5rem"
                    size="sm"
                    isChecked={type === this.type}
                    disabled
                >
                    {label}
                </Checkbox>
            </GridItem>
        );
    }
    allTypeCheckBoxes() {
        return Object.entries(opCheckMap).map(([key, item]) =>
            this.typeCheckBox(key as OpCheckName, item.name)
        );
    }
}
