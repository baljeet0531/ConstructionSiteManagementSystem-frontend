import { Checkbox, Input, Text } from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteCreatable,
} from '@choc-ui/chakra-autocomplete';
import { FormikProps } from 'formik';
import { IWorkPermit } from './Formik';
import { placeholderStyle } from './Styles';
import { ISiteArea, IWorkContent } from '../../Interface/Site';
import { SystemConstants } from '../../Constants/System';

export default class FormFactory {
    formProps: FormikProps<IWorkPermit>;

    constructor(formProps: FormikProps<IWorkPermit>) {
        this.formProps = formProps;
    }

    opCheckBox(name: keyof IWorkPermit, text: string) {
        return (
            <Checkbox
                w="100%"
                spacing="2rem"
                isChecked={this.formProps.values[name] as boolean}
                onChange={this.formProps.handleChange}
            >
                {text}
            </Checkbox>
        );
    }

    textInput() {
        return (
            <Input
                type="text"
                border="0px"
                placeholder="填寫"
                _placeholder={placeholderStyle}
            />
        );
    }

    selectAreaInput(siteareas: ISiteArea[]) {
        const areas = siteareas
            ?.map((v) => v.name)
            .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i);
        return (
            <AutoComplete
                openOnFocus
                creatable
                listAllValuesOnFocus
                onChange={(value: string) => {
                    const before = this.formProps.values.area;
                    if (before !== value) {
                        this.formProps.setFieldValue('zone', []);
                        this.formProps.setFieldValue('system', '');
                        this.formProps.setFieldValue('systemBranch', '');
                    }
                    this.formProps.setFieldValue('area', value);
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                />
                <AutoCompleteList>
                    {areas.map((area: string, cid: number) => (
                        <AutoCompleteItem
                            key={`option-${cid}`}
                            value={area}
                            textTransform="capitalize"
                        >
                            {area}
                        </AutoCompleteItem>
                    ))}
                    <AutoCompleteCreatable>
                        {({ value }) => <Text>新增 "{value}"</Text>}
                    </AutoCompleteCreatable>
                </AutoCompleteList>
            </AutoComplete>
        );
    }

    getZones(area: string, siteareas: ISiteArea[]) {
        return siteareas.filter((v) => v.name == area).map((v) => v.zone);
    }

    selectZoneInput(zones: string[]) {
        return (
            <AutoComplete
                multiple
                openOnFocus
                creatable
                listAllValuesOnFocus
                value={this.formProps.values.zone}
                onChange={(value: string[]) => {
                    this.formProps.setFieldValue('zone', value);
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    value={this.formProps.values.zone}
                ></AutoCompleteInput>
                <AutoCompleteList>
                    {zones.map((zone: string, cid: number) => (
                        <AutoCompleteItem key={`option-${cid}`} value={zone}>
                            {zone}
                        </AutoCompleteItem>
                    ))}
                    <AutoCompleteCreatable>
                        {({ value }) => <Text>新增 "{value}"</Text>}
                    </AutoCompleteCreatable>
                </AutoCompleteList>
            </AutoComplete>
        );
    }

    selectSystemInput() {
        return (
            <AutoComplete
                openOnFocus
                listAllValuesOnFocus
                onChange={(value: string) => {
                    const before = this.formProps.values.system;
                    if (before !== value) {
                        this.formProps.setFieldValue('systemBranch', '');
                    }
                    this.formProps.setFieldValue('system', value);
                }}
                value={this.formProps.values.system}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    value={this.formProps.values.system}
                />
                <AutoCompleteList>
                    {SystemConstants.map((system: string, cid: number) => (
                        <AutoCompleteItem
                            key={`option-${cid}`}
                            value={system}
                            textTransform="capitalize"
                        >
                            {system}
                        </AutoCompleteItem>
                    ))}
                </AutoCompleteList>
            </AutoComplete>
        );
    }

    getSystemBranches(
        target: string,
        workContents: IWorkContent[],
        area?: string
    ) {
        const isValid = (i: IWorkContent) =>
            i.name === area && i.system.name === target;
        const isValidWithoutArea = (i: IWorkContent) =>
            i.system.name === target;
        const filterFn = area ? isValid : isValidWithoutArea;
        return workContents
            .filter(filterFn)
            .map((i) => i.system.systemBranch.name);
    }

    selectSystemBranchInput(systemBranches: string[]) {
        return (
            <AutoComplete
                openOnFocus
                creatable
                listAllValuesOnFocus
                value={this.formProps.values.systemBranch}
                onChange={(value: string) => {
                    const before = this.formProps.values.systemBranch;
                    if (before !== value) {
                        this.formProps.setFieldValue('project', '');
                    }
                    this.formProps.setFieldValue('systemBranch', value);
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    value={this.formProps.values.systemBranch}
                ></AutoCompleteInput>
                <AutoCompleteList>
                    {systemBranches.map((system: string, cid: number) => (
                        <AutoCompleteItem key={`option-${cid}`} value={system}>
                            {system}
                        </AutoCompleteItem>
                    ))}
                    <AutoCompleteCreatable>
                        {({ value }) => <Text>新增 "{value}"</Text>}
                    </AutoCompleteCreatable>
                </AutoCompleteList>
            </AutoComplete>
        );
    }
}
