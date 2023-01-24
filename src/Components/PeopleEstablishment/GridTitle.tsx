import { Text, GridItem, ResponsiveValue } from '@chakra-ui/react';
import React from 'react';

export default function GridTitle(props: {
    title: string;
    gridRange: [
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined,
        ResponsiveValue<number | 'auto'> | undefined
    ];
}) {
    const { title, gridRange } = props;
    return (
        <GridItem
            rowStart={gridRange[0]}
            rowEnd={gridRange[1]}
            colStart={gridRange[2]}
            colEnd={gridRange[3]}
        >
            <Text variant={'formpartTitle'}>{title}</Text>;
        </GridItem>
    );
}
