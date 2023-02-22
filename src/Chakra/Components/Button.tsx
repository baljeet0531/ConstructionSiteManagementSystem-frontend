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
                    bg: '#4C7DE777',
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
        buttonGraySolid: (props: StyleFunctionProps) => {
            const solidProps = theme.components.Button.variants?.solid(props);
            return {
                ...solidProps,
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                height: '28px',
                borderRadius: '0px',
                color: '#667080',
            };
        },
        whiteOutline: (props: StyleFunctionProps) => {
            const outlineProps =
                theme.components.Button.variants?.outline(props);
            return {
                ...outlineProps,
                bg: '#FFFFFF',
                color: '#667080',
                border: '2px solid',
                borderColor: '#919AA9',
            };
        },
    },
};

export default Button;
