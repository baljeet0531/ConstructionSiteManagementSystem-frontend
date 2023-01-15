import {
    Flex,
    FormControl,
    FormHelperText,
    GridItem,
    ResponsiveValue,
    Text,
} from '@chakra-ui/react';
import React from 'react';

export default function GridFileItem(props: {
    gridRange?: [
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined
    ];
    colSpan?: ResponsiveValue<number | 'auto'> | undefined;
    height?: any;
    fieldName?: string;
    formlabel?: string;
    inputComponent?: React.ReactElement;
    helpText?: String;
}) {
    const {
        gridRange,
        colSpan,
        height,
        fieldName,
        formlabel,
        inputComponent,
        helpText,
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
            {fieldName && inputComponent && formlabel && (
                <FormControl>
                    <Flex align={'flex-start'}>
                        <Text variant={'formlabel'}>{formlabel}</Text>
                        {
                            <inputComponent.type
                                {...inputComponent.props}
                                ml={'8px'}
                                variant={'formOutline'}
                            />
                        }
                    </Flex>
                    <FormHelperText
                        fontSize={'0.625rem'}
                        m={0}
                        ml={'85px'}
                        opacity={helpText ? 1 : 0}
                    >
                        {helpText || '_'}
                    </FormHelperText>
                </FormControl>
            )}
        </GridItem>
    );
}
