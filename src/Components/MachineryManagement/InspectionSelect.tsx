import { Box, Select } from '@chakra-ui/react';
import React from 'react';
import { dataCellStyle, getElementProps } from '../Shared/ReactWindowTable';

export default function InspectionSelect(props: getElementProps) {
    const { style, info, variable } = props;

    const [value, setValue] = React.useState<'合格' | '不合格' | '未選'>(
        info[variable] === true
            ? '合格'
            : info[variable] === false
            ? '不合格'
            : '未選'
    );

    return (
        <Box
            {...dataCellStyle}
            style={{
                ...style,
                padding: '0px',
            }}
        >
            <Select
                defaultValue={value}
                style={{ textAlignLast: 'center' }}
                height={'29px'}
                borderRadius={'0px'}
                fontFamily={'Inter'}
                fontStyle={'normal'}
                fontWeight={400}
                fontSize={'0.875rem'}
                lineHeight={'1.25rem'}
                {...(value === '未選' && { color: '#66708080' })}
                {...(value === '不合格' && { bg: '#FDFFE3' })}
                onChange={(e) => {
                    const changedValue = e.target.value;
                    if (
                        changedValue === '合格' ||
                        changedValue === '不合格' ||
                        changedValue === '未選'
                    ) {
                        setValue(changedValue);
                    }
                }}
            >
                <option value={'未選'}>未選</option>
                <option value={'合格'}>合格</option>
                <option value={'不合格'}>不合格</option>
            </Select>
        </Box>
    );
}
