import {
    Checkbox,
    Input,
    Textarea,
    HStack,
    VStack,
    Center,
} from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { FormikProps } from 'formik';
import { filledPlaceholderStyle, placeholderStyle } from './Styles';
import { SetStateAction, Dispatch, useState, useEffect } from 'react';
import {
    IToolbox,
    IToolboxData,
    IToolboxOptions,
} from '../../Interface/Toolbox';
import { ThreeStateIcon } from '../../Icons/Icons';
import SharedFactory from '../Shared/Factory';

export default class FormFactory extends SharedFactory {
    formProps: FormikProps<IToolbox>;
    data: IToolboxData;
    setData: Dispatch<SetStateAction<IToolboxData>>;
    options: IToolboxOptions;
    setOptions: Dispatch<SetStateAction<IToolboxOptions>>;
    hintRelation: { [key: string]: string[] };

    constructor(
        formProps: FormikProps<IToolbox>,
        data: IToolboxData,
        setData: Dispatch<SetStateAction<IToolboxData>>,
        options: IToolboxOptions,
        setOptions: Dispatch<SetStateAction<IToolboxOptions>>
    ) {
        super();
        this.formProps = formProps;
        this.data = data;
        this.setData = setData;
        this.options = options;
        this.setOptions = setOptions;
        this.hintRelation = {
            physicalFall: ['fall'],
            foreignEnterEye: ['eye'],
            noise: ['ear'],
            eletricDisaster: ['electric'],
            fireDisaster: ['fire'],
            explode: ['fire'],
            hypoxia: ['oxygen'],
        };
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
    handleHint(name: keyof IToolbox, current: boolean | null) {
        if (this.data.toolboxHint[name] || !(name in this.hintRelation)) return;
        let update = {};
        const relation = this.hintRelation[name];
        relation.map((n) => {
            update = { ...update, [n]: current };
        });
        this.setOptions({
            toolboxHint: {
                ...this.options.toolboxHint,
                ...update,
            },
        });
    }
    updateAllHint() {
        let update = {};
        for (let r in this.hintRelation) {
            const relation = this.hintRelation[r];
            const value = this.formProps.values[r as keyof IToolbox];
            if (value) {
                relation.map((n) => {
                    update = { ...update, [n]: true };
                });
            }
        }
        this.setOptions({
            toolboxHint: {
                ...this.data.toolboxHint,
                ...update,
            },
        });
    }
    threeStateCheckbox(name: keyof IToolbox, text: string) {
        const value = this.formProps.values[name] as boolean;
        const key = name as keyof IToolboxOptions['toolboxHint'];
        const hint = this.options.toolboxHint[key];
        return (
            <Checkbox
                pl={3}
                icon={<ThreeStateIcon />}
                colorScheme={value === false ? 'red' : 'blue'}
                isChecked={value ? true : false}
                isIndeterminate={value === false ? true : false}
                onChange={() => {
                    let target = null;
                    value
                        ? (target = false)
                        : value === false
                        ? (target = null)
                        : (target = true);
                    this.formProps.setFieldValue(name, target);
                    this.handleHint(name, target);
                }}
                variant={hint ? 'hint' : ''}
            >
                {text}
            </Checkbox>
        );
    }
    othersField(name: keyof IToolbox, text: string, w: string = '120px') {
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
    checkBox(name: keyof IToolbox, disable: boolean = false) {
        return (
            <Checkbox
                isChecked={this.formProps.values[name] as boolean}
                onChange={this.formProps.handleChange}
                isDisabled={disable}
            />
        );
    }
    abnormalRecord() {
        return (
            <VStack w="100%" h="100%">
                <HStack w="100%" spacing={4} pl={2} pt={2}>
                    <Checkbox
                        isChecked={!this.formProps.values.abnormal}
                        onChange={(e) => {
                            const value: boolean = e.target.checked;
                            if (value) {
                                this.formProps.setFieldValue('abnormal', false);
                                this.formProps.setFieldValue(
                                    'abnormalRecord',
                                    ''
                                );
                            }
                        }}
                    >
                        NA (無異常及改善情形)
                    </Checkbox>
                    <Checkbox
                        isChecked={this.formProps.values.abnormal}
                        onChange={(e) => {
                            const value: boolean = e.target.checked;
                            if (value) {
                                this.formProps.setFieldValue('abnormal', true);
                            }
                        }}
                    >
                        異常及改善情形說明
                    </Checkbox>
                </HStack>
                <Textarea
                    h="100%"
                    disabled={!this.formProps.values.abnormal}
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
    selectContractingCorpInput(fieldName: keyof IToolbox) {
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
                    value={this.formProps.values[fieldName] as string}
                    onChange={(e) => {
                        const target = e.target.value;
                        this.formProps.setFieldValue(fieldName, target);
                    }}
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
    forbidSignOverlay() {
        return (
            <Center
                w="100%"
                h="100%"
                p={4}
                textAlign="center"
                color="#66708080"
                backgroundColor="#919AA922"
            >
                勾選所有檢查項目後才能簽名
            </Center>
        );
    }
    forbidOverlay() {
        return <Center w="100%" h="100%" backgroundColor="#919AA922" />;
    }
    validSignBeforeWork() {
        return (
            this.formProps.values.contentConformBeforeWork &&
            this.formProps.values.safetyMeasureBeforeWork &&
            this.formProps.values.staffStateBeforeWork &&
            this.formProps.values.principleOnSiteBeforeWork
        );
    }
    validSignDuringWork() {
        return (
            this.formProps.values.contentConformDuringWork &&
            this.formProps.values.safetyMeasureDuringWork &&
            this.formProps.values.staffStateDuringWork &&
            this.formProps.values.principleOnSiteDuringWork
        );
    }
    validSignKnockOff() {
        return (
            this.formProps.values.safetyMeasureKnockOff &&
            this.formProps.values.staffStateKnockOff &&
            this.formProps.values.principleOnSiteKnockOff &&
            this.formProps.values.restorationKnockOff
        );
    }
    validSignSupervisor() {
        return (
            this.formProps.values.contentConformSupervisor &&
            this.formProps.values.principleOnSiteSupervisor &&
            this.formProps.values.restorationSupervisor &&
            this.formProps.values.safetyMeasureSupervisor &&
            this.formProps.values.staffStateSupervisor
        );
    }
}
