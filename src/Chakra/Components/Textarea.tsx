import { StyleFunctionProps, theme } from '@chakra-ui/react';

const Textarea = {
    baseStyle: {
        fontFamily: 'Inter',
    },
    variants: {
        w400s14: {
            padding: '8px',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            color: '#667080',
        },
        dashboardAdministration: (props: StyleFunctionProps) => {
            const outlineProps =
                theme.components.Textarea.variants?.outline(props);
            return {
                ...outlineProps,
                minH: '44px',
                h: '44px',
                padding: '12px 8px 8px 8px',
                fontSize: '0.75rem',
                lineHeight: '1.25rem',
                resize: 'none',
                textAlign: 'center',
                verticalAlign: 'middle',
                color: '#667080',
                border: 'none',
                borderRadius: '0px',
                bg: '#66708030',
                _disabled: {
                    cursor: 'default',
                    opacity: 1,
                    bg: '#FFFFFF',
                },
            };
        },
    },
};

export default Textarea;
