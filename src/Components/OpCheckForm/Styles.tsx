export const baseStyle = {
    border: '1px',
    borderColor: '#919AA9',
    display: 'flex',
    alignItems: 'center',
};

export const unboxStyle = {
    ...baseStyle,
    border: '0px',
    letterSpacing: '0.05em',
};

export const tableStyle = {
    ...baseStyle,
    borderTop: '0px',
    borderLeft: '0px',
};

export const filledStyle = {
    ...baseStyle,
    background: '#919AA9',
    color: '#FFFFFF',
    justifyContent: 'center',
};

export const placeholderStyle = {
    color: '#667080',
    opacity: 0.5,
};
