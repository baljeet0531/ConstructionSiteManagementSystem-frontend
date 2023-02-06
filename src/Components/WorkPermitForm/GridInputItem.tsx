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
    fieldName: string;
    inputComponent: React.ReactElement;
    gridRange?: [
        ResponsiveValue<number | 'auto'>,
        ResponsiveValue<number | 'auto'>,
        ResponsiveValue<number | 'auto'>,
        ResponsiveValue<number | 'auto'>
    ];
    inputRightComponent?: React.ReactElement;
    handleValidate?: Function;
    style?: object;
    invalidStyle?: object;
}) {
    const grid = gridRange || ['auto', 'auto', 'auto', 'auto'];
    return (
        <GridItem
            rowStart={grid[0]}
            rowEnd={grid[1]}
            colStart={grid[2]}
            colEnd={grid[3]}
            paddingTop="5px"
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
                        <InputGroup w="100%" h="100%">
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
