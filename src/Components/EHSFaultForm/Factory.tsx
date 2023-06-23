import {
    Checkbox,
    HStack,
    Input,
    InputProps,
    Textarea,
    Box,
    Image,
    Flex,
    Text,
} from '@chakra-ui/react';
import { IFaultForm } from '../../Interface/FaultForm';
import { FormikProps } from 'formik';
import { disabledStyle, placeholderStyle } from './Styles';
import { AddFileIcon } from '../../Icons/Icons';
import { Uploader } from 'rsuite';
import dayjs from 'dayjs';

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
    unitField(target: boolean, text: string) {
        const enable = this.formProps.values.responsibleUnitStatus === target;
        return (
            <HStack w="100%">
                <Checkbox
                    px={3}
                    w="150px"
                    size="sm"
                    isChecked={enable}
                    variant="grey"
                    onChange={(e) => {
                        const value = e.target.checked;
                        if (value) {
                            this.formProps.setFieldValue(
                                'responsibleUnitStatus',
                                target
                            );
                        }
                        this.formProps.setFieldValue('responsibleTarget', '');
                    }}
                >
                    {text}
                </Checkbox>
                <Input
                    type="text"
                    border="0px"
                    size="sm"
                    isDisabled={!enable}
                    placeholder={enable ? '填寫' : ''}
                    _placeholder={placeholderStyle}
                    value={
                        enable ? this.formProps.values.responsibleTarget : ''
                    }
                    onChange={(e) => {
                        this.formProps.setFieldValue(
                            'responsibleTarget',
                            e.target.value
                        );
                    }}
                />
            </HStack>
        );
    }
    checkBox(name: keyof IFaultForm, text: string, target: boolean = true) {
        const checked = this.formProps.values[name] === target;
        return (
            <Checkbox
                pl={3}
                size="sm"
                variant="grey"
                isChecked={checked}
                onChange={(e) => {
                    this.formProps.setFieldValue(name, e.target.checked);
                }}
            >
                {text}
            </Checkbox>
        );
    }
    validDateCheckBox() {
        const checked = this.formProps.values.promptFix === false;
        return (
            <HStack>
                <Checkbox
                    px={3}
                    w="200px"
                    isChecked={checked}
                    variant="grey"
                    size="sm"
                    onChange={(e) => {
                        const value = e.target.checked;
                        if (value) {
                            this.formProps.setFieldValue('promptFix', false);
                        } else {
                            this.formProps.setFieldValue('promptFix', null);
                        }
                        this.formProps.setFieldValue('fixDeadline', '');
                    }}
                >
                    限期改善完成時間
                </Checkbox>
                {checked && (
                    <Input
                        type="date"
                        size="sm"
                        w="200px"
                        isDisabled={!checked}
                        _disabled={disabledStyle}
                        value={
                            (this.formProps.values.fixDeadline as string) ||
                            (dayjs()
                                .add(1, 'day')
                                .format('YYYY-MM-DD') as string)
                        }
                        onChange={(e) => {
                            this.formProps.setFieldValue(
                                'fixDeadline',
                                e.target.value
                            );
                        }}
                    />
                )}
            </HStack>
        );
    }
    reviewResultGroup() {
        return (
            <HStack w="100%">
                <Checkbox
                    pl={3}
                    size="sm"
                    variant="grey"
                    isChecked={this.formProps.values.reviewResult === true}
                    onChange={(e) => {
                        const value = e.target.checked;
                        if (value) {
                            this.formProps.setFieldValue('reviewResult', true);
                        }
                    }}
                >
                    已完成改正
                </Checkbox>
                <Checkbox
                    pl={3}
                    size="sm"
                    variant="grey"
                    isChecked={this.formProps.values.reviewResult === false}
                    onChange={(e) => {
                        const value = e.target.checked;
                        if (value) {
                            this.formProps.setFieldValue('reviewResult', false);
                        }
                    }}
                >
                    未完成改正（要求改善，再次開立工安缺失紀錄表）
                </Checkbox>
            </HStack>
        );
    }
    imageUploader() {
        return (
            <Flex
                height={'300px'}
                width={'100%'}
                gap={'20px'}
                overflowX={'auto'}
                className={'fault-form-image-uploader'}
            >
                <Uploader
                    listType="picture"
                    fileList={this.formProps.values.uploaderImages}
                    autoUpload={false}
                    removable
                    draggable
                    multiple
                    action="#"
                    accept="image/*"
                    onChange={(fileList) => {
                        this.formProps.setFieldValue('uploaderImages', fileList);
                    }}
                    renderThumbnail={(file, thumbnail: any) => (
                        <Box width={'250px'} height={'250px'} bg={'#919AA91A'}>
                            <Image
                                {...thumbnail.props}
                                boxSize="250px"
                                objectFit="contain"
                            />
                        </Box>
                    )}
                >
                    <Box
                        style={{
                            margin: '0px',
                            height: '250px',
                            width: '250px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: '16px',
                            color: '#667080',
                            background: '#919AA91A',
                            border: '2px dashed #919AA9',
                        }}
                    >
                        <AddFileIcon />
                        <Text>新增相片</Text>
                    </Box>
                </Uploader>
            </Flex>
        );
    }
}
