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
import { ISiteArea } from '../../Interface/Site';

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
                    this.formProps.setFieldValue('area', value);
                }}
                value={this.formProps.values.area}
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
                onChange={(value: string) => {
                    this.formProps.setFieldValue('zone', value);
                }}
                value={this.formProps.values.zone}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                />
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
}
