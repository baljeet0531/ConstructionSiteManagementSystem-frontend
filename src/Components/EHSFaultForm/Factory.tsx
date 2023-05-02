import {
    Checkbox,
    HStack,
    Input,
    InputProps,
    Textarea,
} from '@chakra-ui/react';
import { IFaultForm } from '../../Interface/FaultForm';
import { FormikProps } from 'formik';
import { disabledStyle, placeholderStyle } from './Styles';
import { useEffect, useState } from 'react';

export default class FormFactory {
    formProps: FormikProps<IFaultForm>;

    constructor(formProps: FormikProps<IFaultForm>) {
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
    unitField(name: keyof IFaultForm, text: string) {
        const [enable, setEnable] = useState(false);
        useEffect(() => {
            if (
                this.formProps.values[name] !== null &&
                this.formProps.values[name] !== ''
            ) {
                setEnable(true);
            } else {
                setEnable(false);
            }
        }, [this.formProps.values]);
        return (
            <HStack w="100%">
                <Checkbox
                    px={3}
                    w="150px"
                    isChecked={enable}
                    variant="grey"
                    onChange={() => {
                        if (enable) {
                            this.formProps.setFieldValue(name, '');
                        }
                        setEnable(!enable);
                    }}
                >
                    {text}
                </Checkbox>
                <Input
                    type="text"
                    border="0px"
                    isDisabled={!enable}
                    placeholder={enable ? '填寫' : ''}
                    _placeholder={placeholderStyle}
                    value={this.formProps.values[name] as string}
                    onChange={(e) => {
                        this.formProps.setFieldValue(name, e.target.value);
                    }}
                />
            </HStack>
        );
    }
    checkBox(name: keyof IFaultForm, text: string) {
        return (
            <Checkbox
                pl={3}
                variant="grey"
                isChecked={this.formProps.values[name] as boolean}
                onChange={this.formProps.handleChange}
            >
                {text}
            </Checkbox>
        );
    }
    validDateCheckBox() {
        const [enable, setEnable] = useState(false);
        useEffect(() => {
            if (enable) {
                setEnable(true);
            } else {
                setEnable(false);
            }
        }, [this.formProps.values]);
        return (
            <HStack>
                <Checkbox
                    px={3}
                    w="200px"
                    isChecked={enable}
                    variant="grey"
                    // onChange={() => {
                    //     if (enable) {
                    //         this.formProps.setFieldValue(name, '');
                    //     }
                    //     setEnable(!enable);
                    // }}
                >
                    限期改善完成時間
                </Checkbox>
                <Input
                    type="date"
                    size="sm"
                    border="0px"
                    w="200px"
                    isDisabled={!enable}
                    _disabled={disabledStyle}
                    // value={enable as string}
                    // onChange={(e) => {
                    //     this.formProps.setFieldValue(name, e.target.value);
                    // }}
                />
            </HStack>
        );
    }
}
