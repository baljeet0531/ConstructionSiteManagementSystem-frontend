import { Checkbox, GridItem, Input } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import {
    IOpCheck,
    IOpCheckFillItem,
    OpCheckName,
} from '../../Interface/OpCheck/Common';
import { OpCheckHandler } from '../../Utils/OpCheck/Handler';
import { opCheckMap } from '../../Utils/OpCheck/Mapper';
import SharedFactory from '../Shared/Fatory';
import GridInputItem from '../Shared/GridInputItem';
import { placeholderStyle, tableStyle } from './Styles';

export default class FormFactory extends SharedFactory{
    formProps: FormikProps<IOpCheck>;
    type: OpCheckName;
    handler: OpCheckHandler;

    constructor(
        formProps: FormikProps<IOpCheck>,
        type: OpCheckName,
        handler: OpCheckHandler
    ) {
        super();
        this.formProps = formProps;
        this.type = type;
        this.handler = handler;
    }

    textInput(disable: boolean = false) {
        return (
            <Input
                type="text"
                size="sm"
                placeholder={disable ? '' : '填寫'}
                _placeholder={placeholderStyle}
                isDisabled={disable}
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
                    key={type}
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
    getOnRows() {
        const onItems = this.handler.onItems;
        return Object.entries(onItems).map(([key, item]) =>
            this.row(key, item)
        );
    }
    checkbox(id: string, ameliorate: string, target: boolean) {
        const value = this.formProps.values[id as keyof IOpCheck] as unknown;
        return (
            <Checkbox
                isChecked={value === target}
                onChange={(e) => {
                    const checked = e.target.checked;
                    checked === true
                        ? this.formProps.setFieldValue(id, target)
                        : this.formProps.setFieldValue(id, undefined);
                    target !== true || checked !== true
                        ? this.formProps.setFieldValue(ameliorate, '')
                        : '';
                    target === true && checked === true
                        ? this.formProps.setFieldValue(ameliorate, '')
                        : '';
                }}
            />
        );
    }
    row(id: string, item: IOpCheckFillItem) {
        const value = this.formProps.values[id as keyof IOpCheck] as unknown;
        return (
            <>
                <GridItem {...tableStyle} pl={2} justifyContent="center">
                    {id}
                </GridItem>
                <GridItem {...tableStyle} pl={2}>
                    {item.content}
                </GridItem>
                <GridInputItem
                    fieldName={id}
                    inputComponent={this.checkbox(id, item.ameliorate, true)}
                    style={tableStyle}
                />
                <GridInputItem
                    fieldName={id}
                    inputComponent={this.checkbox(id, item.ameliorate, false)}
                    style={tableStyle}
                />
                <GridInputItem
                    fieldName={item.ameliorate}
                    inputComponent={this.textInput(value !== false)}
                    style={tableStyle}
                />
            </>
        );
    }
}
