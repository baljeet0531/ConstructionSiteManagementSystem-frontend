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
import { useEffect, useState } from 'react';
import { AddFileIcon } from '../../Icons/Icons';
import { Uploader } from 'rsuite';

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
        // TODO: Need to fix this
        useEffect(() => {
            if (
                this.formProps.values[name] !== null &&
                this.formProps.values[name] !== ''
            ) {
                setEnable(true);
            } else {
                setEnable(false);
            }
        }, [this.formProps.values[name]]);
        return (
            <HStack w="100%">
                <Checkbox
                    px={3}
                    w="150px"
                    size="sm"
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
                size="sm"
                variant="grey"
                isChecked={this.formProps.values[name] as boolean}
                onChange={(e) => {
                    this.formProps.setFieldValue(name, e.target.checked);
                }}
            >
                {text}
            </Checkbox>
        );
    }
    validDateCheckBox() {
        const [enable, setEnable] = useState(false);
        // TODO: Need to fix this
        useEffect(() => {
            if (enable) {
                setEnable(true);
            } else {
                setEnable(false);
            }
        }, [this.formProps.values['validDate']]);
        return (
            <HStack>
                <Checkbox
                    px={3}
                    w="200px"
                    isChecked={enable}
                    variant="grey"
                    size="sm"
                    onChange={() => {
                        if (enable) {
                            this.formProps.setFieldValue('validDate', '');
                        }
                        setEnable(!enable);
                    }}
                >
                    限期改善完成時間
                </Checkbox>
                <Input
                    type="date"
                    size="sm"
                    w="200px"
                    isDisabled={!enable}
                    _disabled={disabledStyle}
                    value={this.formProps.values['validDate'] as string}
                    onChange={(e) => {
                        this.formProps.setFieldValue(
                            'validDate',
                            e.target.value
                        );
                    }}
                />
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
                    isChecked={this.formProps.values['checked'] as boolean}
                    onChange={(e) => {
                        this.formProps.setFieldValue(
                            'checked',
                            e.target.checked
                        );
                    }}
                >
                    已完成改正
                </Checkbox>
                <Checkbox
                    pl={3}
                    size="sm"
                    variant="grey"
                    isChecked={!this.formProps.values['checked'] as boolean}
                    onChange={(e) => {
                        this.formProps.setFieldValue(
                            'checked',
                            !e.target.checked
                        );
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
                    fileList={this.formProps.values.photos}
                    autoUpload={false}
                    removable
                    draggable
                    multiple
                    action="#"
                    accept="image/*"
                    onChange={(fileList) => {
                        this.formProps.setFieldValue('photos', fileList);
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
