import {
    Checkbox,
    Input,
    Text,
    Flex,
    Textarea,
    HStack,
    VStack,
} from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteCreatable,
    AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { Field, FormikProps } from 'formik';
import { filledPlaceholderStyle, placeholderStyle } from './Styles';
import { SetStateAction, Dispatch, useState, useRef, useEffect } from 'react';
import { IToolbox, IToolboxData } from '../../Interface/Toolbox';
import { ThreeStateIcon } from '../../Icons/Icons';
import { SignatureStateItem } from '../../Interface/Signature';
import dayjs from 'dayjs';

export default class FormFactory {
    formProps: FormikProps<IToolbox>;
    data: IToolboxData;
    setData: Dispatch<SetStateAction<IToolboxData>>;

    constructor(
        formProps: FormikProps<IToolbox>,
        data: IToolboxData,
        setData: Dispatch<SetStateAction<IToolboxData>>
    ) {
        this.formProps = formProps;
        this.data = data;
        this.setData = setData;
    }

    filledDateInput() {
        return <Input pl="5.5rem" type="date" border="0px" />;
    }
    filledTimeInput() {
        return <Input pl="5.5rem" type="time" border="0px" />;
    }
    filledTextInput() {
        return (
            <Input
                pl="5.5rem"
                type="text"
                border="0px"
                placeholder="填寫"
                _placeholder={filledPlaceholderStyle}
            />
        );
    }
    contractStaffInput() {
        return (
            <Input
                type="text"
                border="0px"
                placeholder="承商監工或工安"
                textAlign="center"
                _placeholder={placeholderStyle}
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
    threeStateCheckbox(name: keyof IToolbox, text: string) {
        const value = this.formProps.values[name];
        return (
            <Checkbox
                pl={3}
                icon={<ThreeStateIcon />}
                colorScheme={value === false ? 'red' : 'blue'}
                isChecked={value ? true : false}
                isIndeterminate={value === false ? true : false}
                onChange={() => {
                    value
                        ? this.formProps.setFieldValue(name, false)
                        : value === false
                        ? this.formProps.setFieldValue(name, undefined)
                        : this.formProps.setFieldValue(name, true);
                }}
            >
                {text}
            </Checkbox>
        );
    }
    othersField(name: keyof IToolbox, text: string, w: string = '120px') {
        const [enable, setEnable] = useState(
            this.formProps.values[name] ? true : false
        );
        return (
            <>
                <Checkbox
                    pl={3}
                    isChecked={enable}
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
                    w={w}
                    isDisabled={!enable}
                    placeholder={enable ? '填寫' : ''}
                    _placeholder={placeholderStyle}
                    value={this.formProps.values[name] as string}
                    onChange={(e) => {
                        this.formProps.setFieldValue(name, e.target.value);
                    }}
                />
            </>
        );
    }
    checkBox(name: keyof IToolbox) {
        return (
            <Checkbox
                isChecked={this.formProps.values[name] as boolean}
                onChange={this.formProps.handleChange}
            />
        );
    }
    checkTimeInput(state: SignatureStateItem) {
        const [signature, setSignature] = state;
        return (
            <Input
                size="sm"
                type="time"
                border="0px"
                minW="100px"
                textAlign="center"
                p="0px"
                value={signature?.time ? signature.time.format('HH:mm') : ''}
                onChange={(e) => {
                    const [hour, min] = e.target.value.split(':');
                    const newDate = dayjs(signature.time)
                        .hour(Number(hour))
                        .minute(Number(min));
                    setSignature({ ...signature, time: newDate });
                }}
            />
        );
    }
    abnormalRecord() {
        const [enable, setEnable] = useState(
            this.formProps.values.abnormalRecord ? true : false
        );
        useEffect(() => {
            if (!enable) {
                this.formProps.setFieldValue('abnormalRecord', '');
            }
            if (enable) {
                this.formProps.setFieldValue('abnormal', false);
            }
        }, [enable]);

        return (
            <VStack w="100%" h="100%">
                <HStack w="100%" spacing={4} pl={2} pt={2}>
                    <Checkbox
                        isChecked={this.formProps.values.abnormal}
                        onChange={(e) => {
                            const value: boolean = e.target.checked;
                            this.formProps.setFieldValue('abnormal', value);
                            if (value) {
                                setEnable(false);
                            }
                        }}
                    >
                        NA (無異常及改善情形)
                    </Checkbox>
                    <Checkbox
                        isChecked={enable}
                        onChange={() => {
                            setEnable(!enable);
                        }}
                    >
                        異常及改善情形說明
                    </Checkbox>
                </HStack>
                <Textarea
                    h='100%'
                    disabled={!enable}
                    value={this.formProps.values.abnormalRecord}
                    _placeholder={placeholderStyle}
                    placeholder="請填寫"
                    resize="none"
                    onChange={(e) => {
                        this.formProps.setFieldValue(
                            'abnormalRecord',
                            e.target.value
                        );
                    }}
                />
            </VStack>
        );
    }
    selectContractingCorpInput(fieldName: string) {
        return (
            <AutoComplete
                openOnFocus
                listAllValuesOnFocus
                onChange={(value: string) => {
                    this.formProps.setFieldValue(fieldName, value);
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="請選擇"
                    textAlign="center"
                    _placeholder={placeholderStyle}
                />
                <AutoCompleteList>
                    {this.data.contractingCorpName?.map(
                        (corp: string, cid: number) => (
                            <AutoCompleteItem
                                key={`option-${cid}`}
                                value={corp}
                                textTransform="capitalize"
                            >
                                {corp}
                            </AutoCompleteItem>
                        )
                    )}
                </AutoCompleteList>
            </AutoComplete>
        );
    }
}
