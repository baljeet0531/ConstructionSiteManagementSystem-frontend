import { Checkbox, Input, Text } from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteCreatable,
    AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { FormikProps } from 'formik';
import { placeholderStyle } from './Styles';
import { SystemConstants } from '../../Constants/System';
import { SetStateAction, Dispatch } from 'react';
import {
    IWorkPermit,
    IWorkPermitData,
    IWorkPermitOptions,
} from '../../Interface/WorkPermit';

export default class FormFactory {
    formProps: FormikProps<IWorkPermit>;
    data: IWorkPermitData;
    setData: Dispatch<SetStateAction<IWorkPermitData>>;
    options: IWorkPermitOptions;
    setOptions: Dispatch<SetStateAction<IWorkPermitOptions>>;

    constructor(
        formProps: FormikProps<IWorkPermit>,
        data: IWorkPermitData,
        setData: Dispatch<SetStateAction<IWorkPermitData>>,
        options: IWorkPermitOptions,
        setOptions: Dispatch<SetStateAction<IWorkPermitOptions>>
    ) {
        this.formProps = formProps;
        this.data = data;
        this.setData = setData;
        this.options = options;
        this.setOptions = setOptions;
    }

    opCheckBox(name: keyof IWorkPermit, text: string) {
        return (
            <Checkbox
                w="100%"
                h="100%"
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

    selectAreaInput() {
        const areas = this.data.siteAreas
            ?.map((v) => v.name)
            .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i);
        return (
            <AutoComplete
                openOnFocus
                creatable
                listAllValuesOnFocus
                onChange={(value: string) => {
                    const before = this.formProps.values.area;
                    if (before !== '' && before !== value) {
                        this.formProps.setFieldValue('zone', []);
                    }
                    this.formProps.setFieldValue('area', value);

                    this.setOptions({
                        ...this.options,
                        zones: this.getZones(value),
                    });
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    value={this.formProps.values.area}
                    onChange={(e) =>
                        this.formProps.setFieldValue('area', e.target.value)
                    }
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

    getZones(area: string) {
        return this.data.siteAreas
            .filter((v) => v.name == area)
            .map((v) => v.zone)
            .filter((v) => v !== ' ');
    }

    selectZoneInput() {
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
                >
                    {({ tags }) =>
                        tags.map((tag, tid) => (
                            <AutoCompleteTag
                                size="md"
                                color="#667080"
                                key={tid}
                                label={tag.label}
                                onRemove={tag.onRemove}
                            />
                        ))
                    }
                </AutoCompleteInput>
                <AutoCompleteList>
                    {this.options.zones.map((zone: string, cid: number) => (
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
                    if (before !== '' && before !== value) {
                        this.formProps.setFieldValue('systemBranch', '');
                        this.formProps.setFieldValue('project', '');
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
                    onChange={(e) =>
                        this.formProps.setFieldValue('system', e.target.value)
                    }
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

    getSystemBranches() {
        return this.data.workContents
            .map((i) => i.system.systemBranch.name)
            .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i);
    }

    selectSystemBranchInput() {
        const systemBranches = this.getSystemBranches();
        return (
            <AutoComplete
                openOnFocus
                creatable
                listAllValuesOnFocus
                onChange={(value: string) => {
                    const before = this.formProps.values.systemBranch;
                    if (before !== '' && before !== value) {
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
                    onChange={(e) =>
                        this.formProps.setFieldValue(
                            'systemBranch',
                            e.target.value
                        )
                    }
                />
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

    getProjects() {
        let l: string[] = [];
        this.data.workContents.map(
            (i) => (l = [...l, ...i.system.systemBranch.project])
        );
        return l.filter(
            (v: string, i: number, a: string[]) => a.indexOf(v) === i
        );
    }

    selectProjectInput() {
        const projects = this.getProjects();
        return (
            <AutoComplete
                openOnFocus
                creatable
                listAllValuesOnFocus
                value={this.formProps.values.project}
                onChange={(value: string) => {
                    this.formProps.setFieldValue('project', value);
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    value={this.formProps.values.project}
                    onChange={(e) =>
                        this.formProps.setFieldValue('project', e.target.value)
                    }
                ></AutoCompleteInput>
                <AutoCompleteList>
                    {projects.map((project: string, cid: number) => (
                        <AutoCompleteItem key={`option-${cid}`} value={project}>
                            {project}
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
