import { theme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const Button = {
    variants: {
        buttonBlueSolid: (props: StyleFunctionProps) => {
            const solidProps = theme.components.Button.variants?.solid(props);
            return {
                ...solidProps,
                bg: '#4C7DE7',
                color: '#FFFFFF',
                _hover: {
                    bg: '#4C7DE7',
                },
            };
        },
        buttonGrayOutline: (props: StyleFunctionProps) => {
            const outlineProps =
                theme.components.Button.variants?.outline(props);
            return {
                ...outlineProps,
                bg: 'rgba(102, 112, 128, 0.1)',
                color: '#667080',
                border: '2px solid',
                borderColor: '#919AA9',
                w: 'fit-content',
            };
        },
    },
};

export default Button;
