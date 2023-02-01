/* eslint-disable no-unused-vars */
import {
    Text,
    Flex,
    GridItem,
    ResponsiveValue,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    useDisclosure,
} from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

import { Field, FormikProps } from 'formik';
import React from 'react';
import { formValues } from './PeopleEstablishment';

export default function GridInputItem(props: {
    gridRange: [
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined
    ];
    fieldName: string;
    formlabel: string;
    labelAlign?: any;
    helpText?: String;
    handleValidate?: Function;
    searchResult:
        | {
              idno: string;
              name: string;
          }[]
        | undefined;
    setSearchResult: React.Dispatch<
        React.SetStateAction<
            | {
                  idno: string;
                  name: string;
              }[]
            | undefined
        >
    >;
    formProps: FormikProps<formValues>;
    handleDebounceSearch: Function;
    setHumanToBeUpdated: React.Dispatch<
        React.SetStateAction<
            | {
                  no: string;
                  idno: string;
              }
            | undefined
        >
    >;
}) {
    const {
        gridRange,
        fieldName,
        formlabel,
        labelAlign,
        helpText,
        handleValidate,
        searchResult,
        formProps,
        handleDebounceSearch,
        setHumanToBeUpdated,
    } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialFocusRef = React.useRef(null);

    return (
        <GridItem
            rowStart={gridRange[0]}
            rowEnd={gridRange[1]}
            colStart={gridRange[2]}
            colEnd={gridRange[3]}
        >
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
                                <Text variant={'formlabel'} mr={'8px'}>
                                    {formlabel}
                                </Text>
                                <AutoComplete openOnFocus>
                                    <AutoCompleteInput
                                        {...field}
                                        type={'text'}
                                        variant={'formOutline'}
                                        onChange={(e) => {
                                            formProps.handleChange(e);
                                            handleDebounceSearch(
                                                e.target.value
                                            );
                                        }}
                                    />
                                    <AutoCompleteList
                                        border={'2px solid'}
                                        borderColor={'gray.200'}
                                        pt={'0.5rem'}
                                        pb={'0.5rem'}
                                    >
                                        {searchResult &&
                                            searchResult.map(
                                                ({ idno, name }, index) => (
                                                    <AutoCompleteItem
                                                        key={index}
                                                        value={idno}
                                                        onClick={() => {
                                                            setHumanToBeUpdated(
                                                                {
                                                                    no: '',
                                                                    idno: idno,
                                                                }
                                                            );
                                                        }}
                                                        p={'0.5rem'}
                                                    >
                                                        <Flex
                                                            direction={'column'}
                                                        >
                                                            <Text
                                                                variant={
                                                                    'searchResult'
                                                                }
                                                            >
                                                                {idno}
                                                            </Text>
                                                            <Text
                                                                variant={
                                                                    'searchResult'
                                                                }
                                                                color={
                                                                    'rgba(102, 112, 128, 0.5)'
                                                                }
                                                            >
                                                                {name}
                                                            </Text>
                                                        </Flex>
                                                    </AutoCompleteItem>
                                                )
                                            )}
                                    </AutoCompleteList>
                                </AutoComplete>
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
        </GridItem>
    );
}
