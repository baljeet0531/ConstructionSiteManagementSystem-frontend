import { GridItem, ResponsiveValue } from '@chakra-ui/react';
import { FastField, FieldInputProps, FormikState } from 'formik';
import React from 'react';

export default function GridInputItem({
    gridRange,
    fieldName,
    inputComponent,
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
    handleValidate: Function;
    style?: object;
    invalidStyle?: object;
}) {
    return (
        <GridItem
            rowStart={gridRange[0]}
            rowEnd={gridRange[1]}
            colStart={gridRange[2]}
            colEnd={gridRange[3]}
        >
            <FastField name={fieldName} validate={handleValidate}>
                {({
                    field,
                    form,
                }: {
                    field: FieldInputProps<any>;
                    form: FormikState<any>;
                }) => {
                    form.errors[fieldName] && form.touched[fieldName] ? (
                        <inputComponent.type
                            {...field}
                            {...style}
                            {...invalidStyle}
                            {...inputComponent.props}
                        />
                    ) : (
                        <inputComponent.type
                            {...field}
                            {...style}
                            {...inputComponent.props}
                        />
                    );
                }}
            </FastField>
        </GridItem>
    );
}
