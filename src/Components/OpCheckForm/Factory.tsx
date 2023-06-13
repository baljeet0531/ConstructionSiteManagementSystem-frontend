import { Checkbox, GridItem, Input, Text, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Field, FieldInputProps, FormikProps } from 'formik';
import { Fragment } from 'react';
import {
    IOpCheck,
    IOpCheckFillItem,
    OpCheckName,
} from '../../Interface/OpCheck/Common';
import { IConfineSpaceOpCheck } from '../../Interface/OpCheck/ConfineSpace';
import { OpCheckHandler } from '../../Utils/OpCheck/Handler';
import { opCheckMap } from '../../Utils/OpCheck/Mapper';
import SharedFactory from '../Shared/Factory';
import GridInputItem from '../Shared/GridInputItem';
import { placeholderStyle, tableStyle } from './Styles';

export default class FormFactory extends SharedFactory {
    formProps: FormikProps<IOpCheck>;
    type: OpCheckName;
    handler: OpCheckHandler;
    extrasComponentMap: Record<string, Record<string, Function>>;

    constructor(
        formProps: FormikProps<IOpCheck>,
        type: OpCheckName,
        handler: OpCheckHandler
    ) {
        super();
        this.formProps = formProps;
        this.type = type;
        this.handler = handler;
        this.extrasComponentMap = {
            confineSpace: {
                BC02: this.hypoxiaOpSupervisorInput,
                BC05: this.peopleCountInput,
                BC06: () =>
                    this.enterTimeInput(
                        this.formProps.values as IConfineSpaceOpCheck
                    ),
            },
        };
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
            <GridItem key={type}>
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
        const value = this.formProps.values[id as keyof IOpCheck] as unknown;
        return (
            <Checkbox
                isChecked={value === target}
                onChange={(e) => {
                    const checked = e.target.checked;
                    checked === true
                        ? this.formProps.setFieldValue(id, target)
                        : this.formProps.setFieldValue(id, null);
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
        const getExtraComponent =
            this.type in this.extrasComponentMap
                ? this.extrasComponentMap[this.type][id]
                : undefined;
        return (
            <Fragment key={id}>
                <GridItem {...tableStyle} justifyContent="center" key={id}>
                    {id}
                </GridItem>
                <GridItem {...tableStyle} pl={2}>
                    <Flex direction="column" w="100%">
                        <Text>{item.content}</Text>
                        {getExtraComponent && getExtraComponent()}
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
    hypoxiaOpSupervisorInput() {
        return (
            <Flex alignItems="center">
                <Text w="100px"> {'(缺氧作業主管:'}</Text>
                <Field name="hypoxiaOpSupervisor">
                    {({ field }: { field: FieldInputProps<any> }) => (
                        <Input
                            {...field}
                            type="text"
                            size="sm"
                            m="2px 0"
                            maxW="200px"
                            h="25px"
                            placeholder="填寫"
                            _placeholder={placeholderStyle}
                        />
                    )}
                </Field>
                <Text>{')'}</Text>
            </Flex>
        );
    }
    peopleCountInput() {
        return (
            <Flex alignItems="center">
                <Text w="100px"> {'(施工/監督人數:'}</Text>
                <Field name="laborNum">
                    {({ field }: { field: FieldInputProps<any> }) => (
                        <Input
                            {...field}
                            type="number"
                            size="sm"
                            m="2px 0"
                            maxW="60px"
                            h="25px"
                            textAlign="center"
                            placeholder="填寫"
                            _placeholder={placeholderStyle}
                        />
                    )}
                </Field>
                <Text>{'/'}</Text>
                <Field name="supervisorNum">
                    {({ field }: { field: FieldInputProps<any> }) => (
                        <Input
                            {...field}
                            type="number"
                            size="sm"
                            m="2px 0"
                            maxW="60px"
                            h="25px"
                            textAlign="center"
                            placeholder="填寫"
                            _placeholder={placeholderStyle}
                        />
                    )}
                </Field>
                <Text>{'人)'}</Text>
            </Flex>
        );
    }
    enterTimeInput(values: IConfineSpaceOpCheck) {
        const format = 'YYYY-MM-DDTHH:mm:ss';
        return (
            <Flex alignItems="center">
                <Text> {'(進入時間:'}</Text>
                <Input
                    type="time"
                    size="sm"
                    m="2px 0"
                    maxW="130px"
                    h="25px"
                    color={values.enterTime ? '#667080' : '#FFFFFF'}
                    value={dayjs(values.enterTime).format('HH:mm')}
                    onClick={() => {
                        !values.enterTime &&
                            this.formProps.setFieldValue(
                                'enterTime',
                                dayjs().format(format)
                            );
                    }}
                    onChange={(e) => {
                        const [hour, min] = e.target.value.split(':');
                        const newTime = dayjs(values.enterTime)
                            .hour(Number(hour))
                            .minute(Number(min))
                            .format(format);
                        this.formProps.setFieldValue('enterTime', newTime);
                    }}
                />
                <Text>{'；離開時間:'}</Text>
                <Input
                    type="time"
                    size="sm"
                    m="2px 0"
                    maxW="130px"
                    h="25px"
                    color={values.outTime ? '#667080' : '#FFFFFF'}
                    value={dayjs(values.outTime).format('HH:mm')}
                    onClick={() => {
                        !values.outTime &&
                            this.formProps.setFieldValue(
                                'outTime',
                                dayjs().format(format)
                            );
                    }}
                    onChange={(e) => {
                        const [hour, min] = e.target.value.split(':');
                        const newTime = dayjs(values.outTime)
                            .hour(Number(hour))
                            .minute(Number(min))
                            .format(format);
                        this.formProps.setFieldValue('outTime', newTime);
                    }}
                />
                <Text>{')'}</Text>
            </Flex>
        );
    }
}
