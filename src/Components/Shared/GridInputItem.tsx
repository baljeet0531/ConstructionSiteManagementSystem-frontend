import { WarningIcon } from '@chakra-ui/icons';
import {
    GridItem,
    ResponsiveValue,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    GridItemProps,
} from '@chakra-ui/react';
import { FastField, Field, FieldInputProps, FormikProps } from 'formik';
import { ReactElement } from 'react';
import Pin from './Pin';

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
    // invalidMsg = 'Invalid',
    fast=false,
    ...rest
}: GridItemProps & {
    fieldName: string;
    inputComponent: ReactElement;
    gridRange?: [
        ResponsiveValue<number | 'auto'>,
        ResponsiveValue<number | 'auto'>,
        ResponsiveValue<number | 'auto'>,
        ResponsiveValue<number | 'auto'>
    ];
    inputLeftComponent?: ReactElement;
    inputLeftStyle?: object;
    inputRightComponent?: ReactElement;
    inputRightStyle?: object;
    handleValidate?: Function;
    style?: GridItemProps;
    invalidStyle?: object;
    fast?: boolean;
    // invalidMsg?: string;
}) {
    const field = fast ? <FastField /> : <Field />;
    return (
        <GridItem
            {...(gridRange && {
                rowStart: gridRange[0],
                rowEnd: gridRange[1],
                colStart: gridRange[2],
                colEnd: gridRange[3],
            })}
            {...rest}
            {...style}
        >
            <field.type name={fieldName} validate={handleValidate}>
                {({
                    field,
                    form,
                }: {
                    field: FieldInputProps<any>;
                    form: FormikProps<any>;
                }) => {
                    return (
                        <InputGroup
                            w="100%"
                            h="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {inputLeftComponent && (
                                <InputLeftElement
                                    h="100%"
                                    pointerEvents="none"
                                    children={inputLeftComponent}
                                    {...inputLeftStyle}
                                />
                            )}
                            {form.errors[fieldName] ? (
                                <inputComponent.type
                                    {...field}
                                    {...inputComponent.props}
                                    {...invalidStyle}
                                />
                            ) : (
                                <inputComponent.type
                                    {...field}
                                    {...inputComponent.props}
                                />
                            )}
                            {inputRightComponent && !form.errors[fieldName] && (
                                <InputRightElement
                                    h="100%"
                                    pointerEvents="none"
                                    children={inputRightComponent}
                                    {...inputRightStyle}
                                />
                            )}
                            {form.errors[fieldName] && (
                                <InputRightElement h="100%" w="16px" mx="10px">
                                    <Pin msg={form.errors[fieldName] as string}>
                                        <WarningIcon color="red.default" />
                                    </Pin>
                                </InputRightElement>
                            )}
                        </InputGroup>
                    );
                }}
            </field.type>
        </GridItem>
    );
}
