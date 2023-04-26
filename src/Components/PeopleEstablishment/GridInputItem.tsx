import { GridItem, GridItemProps, ResponsiveValue } from '@chakra-ui/react';
import { FastField, Field } from 'formik';
import React from 'react';
import PEFormControl from './PEFormControl';

export default function GridInputItem(
    props: GridItemProps & {
        gridRange?: [
            ResponsiveValue<number | 'auto'> | undefined,
            ResponsiveValue<number | 'auto'> | undefined,
            ResponsiveValue<number | 'auto'> | undefined,
            ResponsiveValue<number | 'auto'> | undefined
        ];
        fieldName: string;
        formlabel: string;
        inputComponent: React.ReactElement;
        labelAlign?: any;
        helpText?: String;
        handleValidate?: Function;
        independent?: Boolean;
    }
) {
    const {
        gridRange,
        fieldName,
        formlabel,
        inputComponent,
        labelAlign,
        helpText,
        handleValidate,
        independent = true,
        ...restProps
    } = props;

    return (
        <GridItem
            {...restProps}
            {...(gridRange && {
                rowStart: gridRange[0],
                rowEnd: gridRange[1],
                colStart: gridRange[2],
                colEnd: gridRange[3],
            })}
        >
            {independent ? (
                <FastField name={fieldName} validate={handleValidate}>
                    {({ field, form }: { field: any; form: any }) => {
                        return (
                            <PEFormControl
                                field={field}
                                form={form}
                                fieldName={fieldName}
                                formlabel={formlabel}
                                inputComponent={inputComponent}
                                labelAlign={labelAlign}
                                helpText={helpText}
                            ></PEFormControl>
                        );
                    }}
                </FastField>
            ) : (
                <Field name={fieldName} validate={handleValidate}>
                    {({ field, form }: { field: any; form: any }) => {
                        return (
                            <PEFormControl
                                field={field}
                                form={form}
                                fieldName={fieldName}
                                formlabel={formlabel}
                                inputComponent={inputComponent}
                                labelAlign={labelAlign}
                                helpText={helpText}
                            ></PEFormControl>
                        );
                    }}
                </Field>
            )}
        </GridItem>
    );
}
