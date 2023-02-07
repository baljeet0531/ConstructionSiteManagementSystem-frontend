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
                    p: 0,
                    border: '2px solid',
                    borderColor: '#919AA9',
                    height: '36px',
                },
                rest,
            };
        },
    },
};

export default Select;
