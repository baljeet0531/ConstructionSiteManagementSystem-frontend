import { theme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const Input = {
    variants: {
        formOutline: (props: StyleFunctionProps) => {
            const { field, ...rest } = theme.components.Input.variants?.outline(
                props
            ) as any;
            return {
                field: {
                    ...field,
                    p: '8px',
                    border: '2px solid',
                    borderColor: '#919AA9',
                    height: '36px',
                    bg: '#FFFFFF',
                    _placeholder: {
                        color: '#66708080',
                    },
                },
                rest,
            };
        },
        grayOutline: (props: StyleFunctionProps) => {
            const { field, ...rest } = theme.components.Input.variants?.outline(
                props
            ) as any;
            return {
                field: {
                    ...field,
                    border: '2px solid',
                    borderColor: '#919AA9',
                    height: '36px',
                    bg: '#FFFFFF',
                    _placeholder: {
                        color: '#66708080',
                    },
                },
                rest,
            };
        },
    },
};

export default Input;
