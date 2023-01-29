import {
    GridItem,
    ResponsiveValue,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { Field, FieldInputProps, FormikProps } from 'formik';
import React from 'react';

export default function GridInputItem({
    gridRange,
    fieldName,
    inputComponent,
    inputRightComponent,
    handleValidate,
    style,
    invalidStyle,
}: {
    gridRange: [
        ResponsiveValue<number | 'auto'>,
        ResponsiveValue<number | 'auto'>,
        ResponsiveValue<number | 'auto'>,
        ResponsiveValue<number | 'auto'>
    ];
    fieldName: string;
    inputComponent: React.ReactElement;
    inputRightComponent?: React.ReactElement;
    handleValidate?: Function;
    style?: object;
    invalidStyle?: object;
}) {
    return (
        <GridItem
            rowStart={gridRange[0]}
            rowEnd={gridRange[1]}
            colStart={gridRange[2]}
            colEnd={gridRange[3]}
            {...style}
        >
            <Field name={fieldName} validate={handleValidate}>
                {({
                    field,
                    form,
                }: {
                    field: FieldInputProps<any>;
                    form: FormikProps<any>;
                }) => {
                    return (
                        <InputGroup w='100%' h='100%'>
                            {form.errors[fieldName] &&
                            form.touched[fieldName] ? (
                                <inputComponent.type
                                    {...field}
                                    {...inputComponent.props}
                                />
                            ) : (
                                <inputComponent.type
                                    {...field}
                                    {...inputComponent.props}
                                    {...invalidStyle}
                                />
                            )}
                            {inputRightComponent && (
                                <InputRightElement pointerEvents="none">
                                    <inputRightComponent.type
                                        {...inputRightComponent.props}
                                    />
                                </InputRightElement>
                            )}
                        </InputGroup>
                    );
                }}
            </Field>
        </GridItem>
    );
}
