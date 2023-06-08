import { Checkbox, GridItem, Input, Text, Flex } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
import {
    IEnvSecurityForm,
    IEnvSecurityItem,
} from '../../Interface/EnvSecurityForm';
import { EnvSecurityFormHandler } from '../../Utils/EnvSecurityFormHandler';
import SharedFactory from '../Shared/Factory';
import GridInputItem from '../Shared/GridInputItem';
import { placeholderStyle, tableStyle } from '../OpCheckForm/Styles';

export default class FormFactory extends SharedFactory {
    formProps: FormikProps<IEnvSecurityForm>;
    handler: EnvSecurityFormHandler;

    constructor(
        formProps: FormikProps<IEnvSecurityForm>,
        handler: EnvSecurityFormHandler
    ) {
        super();
        this.formProps = formProps;
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

    getOnRows() {
        const onItems = this.handler.onItems;
        return Object.entries(onItems).map(([key, item]) =>
            this.row(key, item)
        );
    }
    getOffRows() {
        const onItems = this.handler.offItems;
        return Object.entries(onItems).map(([key, item]) =>
            this.row(key, item)
        );
    }
    checkbox(id: string, ameliorate: string, target: boolean) {
        const value = this.formProps.values[
            id as keyof IEnvSecurityForm
        ] as unknown;
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
    row(id: string, item: IEnvSecurityItem) {
        const value = this.formProps.values[
            id as keyof IEnvSecurityForm
        ] as unknown;
        return (
            <Fragment key={id}>
                <GridItem {...tableStyle} justifyContent="center" key={id}>
                    {id}
                </GridItem>
                <GridItem {...tableStyle} pl={2}>
                    <Flex direction="column" w="100%">
                        <Text>{item.content}</Text>
                    </Flex>
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
            </Fragment>
        );
    }
}
