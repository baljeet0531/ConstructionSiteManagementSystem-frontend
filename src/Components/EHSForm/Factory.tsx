import {
    Checkbox,
    GridItem,
    Input,
    InputProps,
    Text,
    Textarea,
} from '@chakra-ui/react';
import {
    EHSFormName,
    IEHSForm,
    IEHSFormFillItem,
} from '../../Interface/EHSForm/Common';
import { FormikProps } from 'formik';
import {
    baseStyle,
    disabledStyle,
    placeholderStyle,
    tableStyle,
} from './Styles';
import { EHSFormHandler } from '../../Utils/EHSForm/Handler';
import { Fragment } from 'react';
import GridInputItem from '../Shared/GridInputItem';
import { IEHSFormNormal } from '../../Interface/EHSForm/Normal';
import { IEHSFormSpecial } from '../../Interface/EHSForm/Special';

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
                placeholder="請填寫"
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
    getAllItems() {
        let acc = 0;
        const items = [];
        for (let key in this.handler.itemGroups) {
            const group = this.handler.itemGroups[key];
            const subtitle = group.name.split(' ');
            const section = (
                <Fragment>
                    <GridItem
                        rowStart={acc + 3}
                        rowEnd={group.items.length + acc + 3}
                        {...baseStyle}
                        borderTop="0px"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        letterSpacing="0.5em"
                        textAlign="center"
                    >
                        <Text w="60px">{subtitle[0]}</Text>
                        <Text w="40px">{subtitle[1]}</Text>
                    </GridItem>
                    {group.items.map((item, index) =>
                        this.row(group.name, item, index)
                    )}
                </Fragment>
            );

            acc += group.items.length;
            items.push(section);
        }
        return items;
    }
    row(name: string, item: IEHSFormFillItem, index: number) {
        return (
            <Fragment key={`${name}-${index}`}>
                <GridItem {...tableStyle} justifyContent="center">
                    {item.code}
                </GridItem>
                <GridItem {...tableStyle} pl={2}>
                    <Text>{item.content}</Text>
                </GridItem>
                <GridInputItem
                    fieldName={item.normal}
                    inputComponent={this.normalCheckbox(item, true)}
                    style={tableStyle}
                />
                <GridInputItem
                    fieldName={item.normal}
                    inputComponent={this.normalCheckbox(item, false)}
                    style={tableStyle}
                />
                <GridInputItem
                    fieldName={item.misfit}
                    inputComponent={this.misfitCheckbox(item)}
                    style={tableStyle}
                />
                <GridInputItem
                    fieldName={item.ameliorate}
                    inputComponent={this.input({ type: 'text' })}
                    style={tableStyle}
                />
            </Fragment>
        );
    }
    normalCheckbox(item: IEHSFormFillItem, target: boolean) {
        const values = this.formProps.values as IEHSFormNormal &
            IEHSFormSpecial;
        const value =
            values[item.normal as keyof IEHSFormNormal | keyof IEHSFormSpecial];
        return (
            <Checkbox
                isChecked={value === target}
                onChange={(e) => {
                    const checked = e.target.checked;
                    this.formProps.setFieldValue(item.misfit, null);
                    checked === true
                        ? this.formProps.setFieldValue(item.normal, target)
                        : this.formProps.setFieldValue(item.normal, null);
                    target !== true || checked !== true
                        ? this.formProps.setFieldValue(item.ameliorate, '')
                        : '';
                    target === true && checked === true
                        ? this.formProps.setFieldValue(item.ameliorate, '')
                        : '';
                }}
            />
        );
    }
    misfitCheckbox(item: IEHSFormFillItem) {
        const values = this.formProps.values as IEHSFormNormal &
            IEHSFormSpecial;
        const value =
            values[item.misfit as keyof IEHSFormNormal | keyof IEHSFormSpecial];
        return (
            <Checkbox
                isChecked={value as boolean}
                onChange={(e) => {
                    const checked = e.target.checked;
                    this.formProps.setFieldValue(item.misfit, checked);
                    if (checked === true) {
                        this.formProps.setFieldValue(item.normal, null);
                        this.formProps.setFieldValue(item.ameliorate, '');
                    }
                }}
            />
        );
    }
}
