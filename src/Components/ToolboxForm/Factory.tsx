import { Checkbox, Input, Text, Flex } from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteCreatable,
    AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { FormikProps } from 'formik';
import { filledPlaceholderStyle, placeholderStyle } from './Styles';
import { SetStateAction, Dispatch } from 'react';
import { IToolbox, IToolboxData } from '../../Interface/Toolbox';

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
                    {this.data.contractingCorpName?.map((corp: string, cid: number) => (
                        <AutoCompleteItem
                            key={`option-${cid}`}
                            value={corp}
                            textTransform="capitalize"
                        >
                            {corp}
                        </AutoCompleteItem>
                    ))}
                </AutoCompleteList>
            </AutoComplete>
        )
    }
}
