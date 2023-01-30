import {
    Text,
    Flex,
    FormControl,
    GridItem,
    ResponsiveValue,
    Popover,
    FormErrorMessage,
    FormHelperText,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    useDisclosure,
    Input,
} from '@chakra-ui/react';
import { Field, FormikProps } from 'formik';
import React from 'react';
import { formValues } from './BuildFormik';

export default function GridInputItem(props: {
    gridRange: [
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined
    ];
    fieldName: string;
    formlabel: string;
    // inputComponent: React.ReactElement;
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
                                <Text variant={'formlabel'}>{formlabel}</Text>
                                <Popover
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    placement="bottom"
                                    closeOnBlur={true}
                                    initialFocusRef={initialFocusRef}
                                    returnFocusOnClose={false}
                                >
                                    <PopoverTrigger>
                                        <Input
                                            ref={initialFocusRef}
                                            {...field}
                                            type={'text'}
                                            ml={'8px'}
                                            variant={'formOutline'}
                                            onChange={(e) => {
                                                formProps.handleChange(e);
                                                handleDebounceSearch(
                                                    e.target.value
                                                );
                                                onOpen();
                                            }}
                                            onBlur={(e) => {
                                                formProps.handleBlur(e);
                                                onClose();
                                            }}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverBody>
                                            <Flex
                                                overflowX={'auto'}
                                                maxH={'104px'}
                                                direction={'column'}
                                            >
                                                {searchResult &&
                                                    searchResult.map(
                                                        (
                                                            { idno, name },
                                                            index
                                                        ) => {
                                                            return (
                                                                <Flex
                                                                    key={index}
                                                                    direction={
                                                                        'column'
                                                                    }
                                                                    p={'0.5rem'}
                                                                    onClick={() => {
                                                                        setHumanToBeUpdated(
                                                                            {
                                                                                no: '',
                                                                                idno: idno,
                                                                            }
                                                                        );
                                                                        onClose();
                                                                    }}
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
                                                            );
                                                        }
                                                    )}
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
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
