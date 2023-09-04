import {
    Text,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react';
import React from 'react';

export default function PEFormControl(props: {
    field: any;
    form: any;
    fieldName: string;
    formlabel: string;
    inputComponent: React.ReactElement;
    labelAlign?: any;
    helpText?: String;
}) {
    const {
        field,
        form,
        fieldName,
        formlabel,
        labelAlign,
        inputComponent,
        helpText,
    } = props;

    return (
        <FormControl isInvalid={form.errors[fieldName]}>
            <Flex align={labelAlign || 'center'}>
                <Text variant={'formlabel'} textAlign={'center'}>
                    {formlabel}
                </Text>
                <inputComponent.type
                    {...field}
                    {...inputComponent.props} //put this below {...field} to overwrite onChange event
                    ml={'4px'}
                    variant={'formOutline'}
                />
            </Flex>
            {form.errors[fieldName] ? (
                <FormErrorMessage fontSize={'0.625rem'} m={0} ml={'85px'}>
                    {form.errors[fieldName]}
                </FormErrorMessage>
            ) : (
                <FormHelperText
                    fontSize={'0.625rem'}
                    m={0}
                    ml={'85px'}
                    opacity={helpText ? 1 : 0}
                >
                    {helpText || '_'}
                </FormHelperText>
            )}
        </FormControl>
    );
}
