import { theme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const Button = {
    variants: {
        buttonBlueOutline: (props: StyleFunctionProps) => {
            const outlineProps =
                theme.components.Button.variants?.outline(props);
            return {
                ...outlineProps,
                bg: '#4C7DE7',
                color: '#FFFFFF',
                _hover: {
                    bg: '#4C7DE7',
                },
            };
        },
    },
};

export default Button;
