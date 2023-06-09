import { theme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const Select = {
    variants: {
        formOutline: (props: StyleFunctionProps) => {
            const { field, ...rest } =
                theme.components.Select.variants?.outline(props) as any;
            return {
                field: {
                    ...field,
                    border: '2px solid',
                    borderColor: '#919AA9',
                    height: '36px',
                    bg: '#FFFFFF',
                    color: '#667080',
                },
                rest,
            };
        },
        grayOutline: (props: StyleFunctionProps) => {
            const { field, ...rest } =
                theme.components.Select.variants?.outline(props) as any;
            return {
                field: {
                    ...field,
                    border: '2px solid',
                    borderColor: '#919AA9',
                    borderRadius: '4px',
                    bg: '#FFFFFF',
                    color: '#667080',
                },
                rest,
            };
        },
    },
};

export default Select;
