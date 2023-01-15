import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    GridItem,
    ResponsiveValue,
    Text,
} from '@chakra-ui/react';
import { FastField, Field } from 'formik';
import React from 'react';

export default function FormGridInputItem(props: {
    gridRange?: [
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined
    ];
    colSpan?: ResponsiveValue<number | 'auto'> | undefined;
    height?: any;
    fieldName?: string;
    handleValidate?: Function;
    formlabel?: string;
    labelAlign?: any;
    inputComponent?: React.ReactElement;
    helpText?: String;
    title?: string;
    independent?: Boolean;
}) {
    const {
        gridRange,
        colSpan,
        height,
        fieldName,
        handleValidate,
        formlabel,
        labelAlign,
        inputComponent,
        helpText,
        title,
        independent = true,
    } = props;

    return (
        <GridItem
            colSpan={colSpan}
            h={height}
            rowStart={gridRange && gridRange[0]}
            rowEnd={gridRange && gridRange[1]}
            colStart={gridRange && gridRange[2]}
            colEnd={gridRange && gridRange[3]}
        >
            {title && <Text variant={'formpartTitle'}>{title}</Text>}

            {fieldName &&
                inputComponent &&
                formlabel &&
                (independent ? (
                    <FastField name={fieldName} validate={handleValidate}>
                        {({ field, form }: { field: any; form: any }) => {
                            return (
                                <FormControl
                                    isInvalid={
                                        form.errors[fieldName] &&
                                        form.touched[fieldName]
                                    }
                                >
                                    <Flex align={labelAlign || 'center'}>
                                        <Text variant={'formlabel'}>
                                            {formlabel}
                                        </Text>
                                        {
                                            <inputComponent.type
                                                {...field}
                                                {...inputComponent.props} //put this below {...field} to overwrite onChange event
                                                ml={'8px'}
                                                variant={'formOutline'}
                                            />
                                        }
                                    </Flex>
                                    {form.errors[fieldName] &&
                                    form.touched[fieldName] ? (
                                        <FormErrorMessage
                                            fontSize={'0.625rem'}
                                            m={0}
                                            ml={'85px'}
                                        >
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
                        }}
                    </FastField>
                ) : (
                    <Field name={fieldName} validate={handleValidate}>
                        {({ field, form }: { field: any; form: any }) => {
                            return (
                                <FormControl
                                    isInvalid={
                                        form.errors[fieldName] &&
                                        form.touched[fieldName]
                                    }
                                >
                                    <Flex align={labelAlign || 'center'}>
                                        <Text variant={'formlabel'}>
                                            {formlabel}
                                        </Text>
                                        {
                                            <inputComponent.type
                                                {...field}
                                                {...inputComponent.props} //put this below {...field} to overwrite onChange event
                                                ml={'8px'}
                                                variant={'formOutline'}
                                            />
                                        }
                                    </Flex>
                                    {form.errors[fieldName] &&
                                    form.touched[fieldName] ? (
                                        <FormErrorMessage
                                            fontSize={'0.625rem'}
                                            m={0}
                                            ml={'85px'}
                                        >
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
                        }}
                    </Field>
                ))}
        </GridItem>
    );
}
