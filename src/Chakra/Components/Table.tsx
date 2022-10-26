// import { theme } from '@chakra-ui/react';
// import { StyleFunctionProps } from '@chakra-ui/react';

const Table = {
    variants: {
        iemgray: {
            table: {
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                tableLayout: 'fixed',
            },
            thead: {
                bg: '#919AA9',
            },
            tbody: {
                color: '667080',
            },
            tr: {
                borderBottom: '1px solid #919AA9',
                color: '#667080',
                h: '44px',
            },
            th: {
                color: '#FFFFFF',
                p: '8px',
                textTransform: 'none',
            },
            td: {
                color: '#667080',
                p: '8px',
            },
        },
    },
    defaultProps: {
        variant: 'iemgray',
    },
};

export default Table;
