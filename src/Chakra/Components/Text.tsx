// import { theme } from '@chakra-ui/react';

const Text = {
    baseStyle: {
        fontFamily: 'Inter',
    },
    variants: {
        formlabel: {
            p: 0,
            minW: '77px',
            maxW: '77px',
            fontSize: '0.875rem',
            lineHeight: '100%',
            fontStyle: 'normal',
            fontWeight: '400',
            color: '#667080',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
        },
        formpartTitle: {
            p: 0,
            fontSize: '0.875rem',
            lineHeight: '20px',
            fontStyle: 'normal',
            fontWeight: '600',
            color: '#667080',
        },
        pageTitle: {
            p: 0,
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '2.25rem',
            lineHeight: '2.75rem',
            color: '#667080',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
        },
        searchResult: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            color: '#667080',
        },
        pageSiteName: {
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            position: 'absolute',
            top: '20px',
            right: '42px',
        },
    },
};

export default Text;
