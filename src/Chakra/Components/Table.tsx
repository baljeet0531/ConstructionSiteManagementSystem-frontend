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
        iemGraySchedule: {
            table: {
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                tableLayout: 'fixed',
            },
            thead: {
                bg: '#919AA9',
                borderBottom: '2px solid #919AA9',
            },
            tbody: {
                color: '667080',
            },
            tr: {
                color: '#667080',
                h: '30px',
            },
            th: {
                color: '#FFFFFF',
                p: '8px',
                textTransform: 'none',
            },
            td: {
                color: '#667080',
                p: '8px',
                borderWidth: '0px 1px 1px 0px',
                borderStyle: 'solid',
                borderColor: '#919AA9',
            },
        },
        dashboardBlue: {
            table: {
                fontWeight: 400,
                fontSize: '0.75rem',
                lineHeight: '1.25rem',
                border: '1px solid #919AA9',
                tableLayout: 'fixed',
            },
            thead: {
                bg: '#4C7DE7',
                color: '#FFFFFF',
            },
            tbody: {
                color: '#667080',
            },
            th: {
                h: '36px',
                p: '8px',
                textAlign: 'center',
                borderBottom: '2px solid #919AA9',
                textTransform: 'none',
            },
            td: {
                h: '44px',
                p: '8px',
                textAlign: 'center',
                borderWidth: '0px 1px 1px 0px',
                borderStyle: 'solid',
                borderColor: '#919AA9',
            },
        },
    },
    defaultProps: {
        variant: 'iemgray',
    },
};

export default Table;
