import { theme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const Radio = {
    variants: {
        grayRadio: (props: StyleFunctionProps) => {
            return {
                ...theme.components.Radio.baseStyle?.(props),
                ...theme.components.Radio.sizes,
                control: {
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: '#667080',
                    background: '#FFFFFF',
                    marginTop: '0.25rem',
                    _checked: {
                        background: '#667080',
                    },
                },
                container: {
                    alignItems: 'flex-start',
                },
            };
        },
    },
};

export default Radio;
