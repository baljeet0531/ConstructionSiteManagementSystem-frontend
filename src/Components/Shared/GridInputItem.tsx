import {
    GridItem,
    ResponsiveValue,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react';
import { Field, FieldInputProps, FormikProps } from 'formik';
import React from 'react';

export default function GridInputItem({
    gridRange,
    fieldName,
    inputComponent,
    inputLeftComponent,
    inputLeftStyle,
    inputRightComponent,
    inputRightStyle,
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
    inputLeftComponent?: React.ReactElement;
    inputLeftStyle?: object;
    inputRightComponent?: React.ReactElement;
    inputRightStyle?: object;
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
                        <InputGroup w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
                            {inputLeftComponent && (
                                <InputLeftElement
                                    h="100%"
                                    pointerEvents="none"
                                    children={inputLeftComponent}
                                    {...inputLeftStyle}
                                />
                            )}
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
                                <InputRightElement
                                    h="100%"
                                    pointerEvents="none"
                                    children={inputRightComponent}
                                    {...inputRightStyle}
                                />
                            )}
                        </InputGroup>
                    );
                }}
            </Field>
        </GridItem>
    );
}
