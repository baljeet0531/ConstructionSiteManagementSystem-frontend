import {
    Checkbox,
    Input,
    Textarea,
    HStack,
    VStack,
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
    SignatureListName,
    SignatureName,
} from '../../Interface/Toolbox';
import { ThreeStateIcon } from '../../Icons/Icons';
import SharedFactory from '../Shared/Factory';
import {
    SignatureStateItem,
    MultiSignatureStateItem,
} from '../../Interface/Signature';

export default class FormFactory extends SharedFactory {
    formProps: FormikProps<IToolbox>;
    data: IToolboxData;
    setData: Dispatch<SetStateAction<IToolboxData>>;
    options: IToolboxOptions;
    setOptions: Dispatch<SetStateAction<IToolboxOptions>>;
    signatures: Record<SignatureName, SignatureStateItem>;
    signatureLists: Record<SignatureListName, MultiSignatureStateItem>;
    hintRelation: { [key: string]: string[] };
    otherEnable: Record<
        'otherDisaster' | 'chemicalInclude' | 'gasInclude' | 'ohterPrevention',
        [boolean | null, Dispatch<SetStateAction<boolean | null>>]
    >;

    constructor(
        formProps: FormikProps<IToolbox>,
        data: IToolboxData,
        setData: Dispatch<SetStateAction<IToolboxData>>,
        options: IToolboxOptions,
        setOptions: Dispatch<SetStateAction<IToolboxOptions>>,
        signatures: Record<SignatureName, SignatureStateItem>,
        signatureLists: Record<SignatureListName, MultiSignatureStateItem>
    ) {
        super();
        this.formProps = formProps;
        this.data = data;
        this.setData = setData;
        this.options = options;
        this.setOptions = setOptions;
        this.signatures = signatures;
        this.signatureLists = signatureLists;
        this.hintRelation = {
            physicalFall: ['fall'],
            foreignEnterEye: ['eye'],
            noise: ['ear'],
            eletricDisaster: ['electric'],
            fireDisaster: ['fire'],
            explode: ['fire'],
            hypoxia: ['oxygen'],
        };
        this.otherEnable = {
            otherDisaster: useState<boolean | null>(null),
            chemicalInclude: useState<boolean | null>(null),
            gasInclude: useState<boolean | null>(null),
            ohterPrevention: useState<boolean | null>(null),
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
    threeStateCheckbox(
        name: keyof IToolbox,
        text: string,
        relatedFields?: (keyof IToolbox)[]
    ) {
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
                    if (target === false && relatedFields) {
                        relatedFields.map((n) => {
                            this.formProps.setFieldValue(n, false);
                        });
                    } else if (relatedFields) {
                        relatedFields.map((n) => {
                            this.formProps.setFieldValue(n, null);
                        });
                    }
                    this.handleHint(name, target);
                }}
                variant={hint ? 'hint' : ''}
            >
                {text}
            </Checkbox>
        );
    }
    otherCheckbox(name: keyof typeof this.otherEnable, text: string) {
        const [enable, setEnable] = this.otherEnable[name];
        useEffect(() => {
            this.formProps.values[name] !== null &&
            this.formProps.values[name] !== ''
                ? setEnable(true)
                : this.formProps.values[name] === ''
                ? setEnable(false)
                : setEnable(null);
        }, [this.formProps.values]);
        return (
            <Checkbox
                pl={3}
                icon={<ThreeStateIcon />}
                colorScheme={enable === false ? 'red' : 'blue'}
                isChecked={!!enable}
                isIndeterminate={enable === false}
                onChange={() => {
                    let target = null;
                    enable
                        ? (target = false)
                        : enable === false
                        ? (target = null)
                        : (target = true);
                    if (target === null) {
                        this.formProps.setFieldValue(name, null);
                    } else if (target === false) {
                        this.formProps.setFieldValue(name, '');
                    }
                    setEnable(target);
                }}
            >
                {text}
            </Checkbox>
        );
    }
    otherTextInput(name: keyof typeof this.otherEnable, w: string = '120px') {
        const [enable] = this.otherEnable[name];
        return (
            <Input
                type="text"
                border="0px"
                w={w}
                pl="10px"
                isDisabled={!enable}
                placeholder={enable ? '填寫' : ''}
                _placeholder={placeholderStyle}
                value={this.formProps.values[name] as string}
                onChange={(e) => {
                    this.formProps.setFieldValue(name, e.target.value);
                }}
            />
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
    syncSignatureList(signName: SignatureName) {
        const map = new Map<SignatureName, SignatureListName>([
            ['primeContractStaff', 'primeContractingCorpAppearance'],
            ['minorContractOneStaff', 'viceFirstContractingCorpAppearance'],
            ['minorContractTwoStaff', 'viceSecondContractingCorpAppearance'],
            ['minorContractThreeStaff', 'viceThirdContractingCorpAppearance'],
        ]);

        const listName = map.get(signName);
        if (listName) {
            const sign = this.signatures[signName][0];
            const setSignatureList = this.signatureLists[listName][1];
            setSignatureList((prev) => {
                const next = [...prev];
                if (sign) {
                    next[0] = sign;
                }
                return next;
            });
        }
    }
}
