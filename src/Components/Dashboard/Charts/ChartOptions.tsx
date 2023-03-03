export const labelTextStyle = {
    fontFamily: 'Inter',
    fontStyle: 'normal' as 'italic' | 'normal' | 'oblique',
    fontWeight: 400,
    fontSize: '8px',
    color: '#667080',
};

export const legendTextStyle = {
    ...labelTextStyle,
    fontSize: '10px',
};

export const legendOptions = {
    textStyle: legendTextStyle,
    align: 'left' as 'left' | 'right' | 'auto' | undefined,
    top: 0,
    right: 0,
    itemWidth: 5,
    itemHeight: 5,
};
export const gridOptions = {
    top: '15%',
    left: '5%',
    right: '5%',
    bottom: '10%',
};
export const barOptions = {
    type: 'bar' as 'pictorialBar',
    barWidth: '80%',
    emphasis: {
        focus: 'series' as 'none' | 'self' | 'series',
        itemStyle: {
            color: 'inherit',
        },
    },
};

export const overlappedBarOptions = {
    ...barOptions,
    barGap: '-100%',
};
