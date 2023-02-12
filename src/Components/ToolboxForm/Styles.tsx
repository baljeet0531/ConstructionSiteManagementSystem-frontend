export const filledStyle = {
    border: '1px',
    borderColor: '#919AA9',
    borderRightColor: '#FFFFFF',
    background: '#919AA9',
    color: '#FFFFFF',
    paddingLeft: '4px',
};

export const titleStyle = {
    border: '1px',
    borderColor: '#919AA9',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4px',
};

export const contentStyle = {
    ...titleStyle,
    borderTop: '0px',
    borderRight: '0px',
    paddingLeft: '12px',
};

export const centerStyle = {
    ...titleStyle,
    paddingLeft: '0px',
    borderTop: '0px',
    borderRight: '0px',
    justifyContent: 'center',
};

export const placeholderStyle = {
    color: '#667080',
    opacity: 0.5,
};

export const filledPlaceholderStyle = {
    color: '#FFFFFF',
    opacity: 0.5,
};

export const inputStyle = {
    ...centerStyle,
    paddingTop: '3px',
};

