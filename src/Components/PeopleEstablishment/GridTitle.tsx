import {
    Text,
    GridItem,
    ResponsiveValue,
    GridItemProps,
} from '@chakra-ui/react';
import React from 'react';

export default function GridTitle(
    props: GridItemProps & {
        title: string;
        gridRange?: [
            ResponsiveValue<number | 'auto'> | undefined,
            ResponsiveValue<number | 'auto'> | undefined,
            ResponsiveValue<number | 'auto'> | undefined,
            ResponsiveValue<number | 'auto'> | undefined
        ];
    }
) {
    const { title, gridRange, ...restProps } = props;

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
            <Text variant={'formpartTitle'}>{title}</Text>
        </GridItem>
    );
}
