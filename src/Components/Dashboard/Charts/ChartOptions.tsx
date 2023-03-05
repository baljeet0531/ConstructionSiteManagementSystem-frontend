import { EChartsOption } from 'echarts';

export const chartStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E5E533',
};

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

type tooltipTrigger = 'axis' | 'none' | 'item' | undefined;

export const tooltipOptions = {
    trigger: 'axis' as tooltipTrigger,
};

type textAlign = 'left' | 'right' | 'auto' | undefined;

export const legendOptions = {
    textStyle: legendTextStyle,
    align: 'left' as textAlign,
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

type emphasisFocus = 'none' | 'self' | 'series' | undefined;

export const barOptions = {
    type: 'bar' as 'pictorialBar',
    emphasis: {
        focus: 'series' as emphasisFocus,
        itemStyle: {
            color: 'inherit',
        },
    },
};

export const overlappedBarOptions = {
    ...barOptions,
    barGap: '-100%',
};

export const basicChartOptions: EChartsOption = {
    tooltip: tooltipOptions,
    legend: legendOptions,
    grid: gridOptions,
};
