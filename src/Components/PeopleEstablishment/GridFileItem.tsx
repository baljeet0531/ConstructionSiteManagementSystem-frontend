import {
    Flex,
    FormControl,
    FormHelperText,
    GridItem,
    ResponsiveValue,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import { formFiles } from './PeopleEstablishment';
import FileInput from './FileInput';

export default function GridFileItem(props: {
    gridRange?: [
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined
    ];
    colSpan?: ResponsiveValue<number | 'auto'> | undefined;
    height?: any;
    fieldName: keyof formFiles;
    formlabel: string;
    helpText?: String;
    fileStates: formFiles;
    setFileStates: React.Dispatch<React.SetStateAction<formFiles>>;
    imgLoading: boolean;
    index?: number;
}) {
    const {
        gridRange,
        colSpan,
        height,
        fieldName,
        formlabel,
        helpText,
        imgLoading,
        fileStates,
        setFileStates,
        index = 0,
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
            {
                <FormControl>
                    <Flex align={'flex-start'}>
                        <Text variant={'formlabel'}>{formlabel}</Text>
                        <FileInput
                            height={height}
                            setFileStates={setFileStates}
                            imgLoading={imgLoading}
                            file={
                                fieldName == 'HImgs'
                                    ? fileStates[fieldName][index]
                                    : fileStates[fieldName]
                            }
                            fieldName={fieldName}
                            index={index}
                        ></FileInput>
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
            }
        </GridItem>
    );
}
