import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { granularityType } from './Common/ChartLayout';
import {
    basicChartOptions,
    chartStyle,
    labelTextStyle,
    overlappedBarOptions,
} from './Common/ChartOptions';
import { Text } from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import dayjs from 'dayjs';
import { EChartsInstance } from 'echarts-for-react/lib/types';
import { CustomLoading } from '../../Shared/Loading';

type gqlProjectProgress = {
    time: string;
    laborAmount: number;
    laborAccumulation: number;
    expectedProgress: number;
    practicalProgress: number;
};

type gqlData = {
    dashboardProjectProgress: gqlProjectProgress[];
};

const PROJECT_PROGRESS = gql`
    query DashboardProjectProgress($siteId: String!, $mode: String!) {
        dashboardProjectProgress(siteId: $siteId, mode: $mode) {
            time
            laborAmount
            laborAccumulation
            expectedProgress
            practicalProgress
        }
    }
`;

export default function ProjectProgress(props: {
    siteId: string;
    granularity: granularityType;
}) {
    const { siteId, granularity } = props;
    const [data, setData] = React.useState<gqlProjectProgress[]>([]);
    const echartsRef = React.useRef<EChartsInstance>(null);
    const { loading } = useQuery<gqlData>(PROJECT_PROGRESS, {
        variables: {
            siteId: siteId,
            mode: granularity,
        },
        onCompleted: ({ dashboardProjectProgress }) => {
            setData(
                dashboardProjectProgress.map(
                    ({ expectedProgress, practicalProgress, ...rest }) => ({
                        ...rest,
                        expectedProgress: Number(expectedProgress.toFixed(2)),
                        practicalProgress: Number(practicalProgress.toFixed(2)),
                    })
                )
            );
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });
    const option: EChartsOption = {
        ...basicChartOptions,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999',
                },
            },
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                ...labelTextStyle,
                formatter: (axisValue: string) =>
                    dayjs(axisValue).format('MM/DD'),
            },
        },
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 100,
                interval: 10,
                axisLabel: {
                    ...labelTextStyle,
                    formatter: (axisValue: number) =>
                        axisValue == 0 ? '%' : axisValue.toString(),
                },
            },
            {
                type: 'value',
                alignTicks: true,
                axisLabel: {
                    ...labelTextStyle,
                    formatter: (axisValue: number) =>
                        axisValue == 0 ? '人' : axisValue.toString(),
                },
            },
        ],
        dataset: {
            dimensions: [
                'time',
                'laborAmount',
                'laborAccumulation',
                'expectedProgress',
                'practicalProgress',
            ],
            source: data,
        },
        series: [
            {
                ...overlappedBarOptions,
                z: 3,
                name: '出工人數',
                color: '#D0E8FF',
                tooltip: {
                    valueFormatter: (value) => value + '人',
                },
                yAxisIndex: 1,
            },
            {
                ...overlappedBarOptions,
                z: 2,
                name: '累計出工人數',
                color: '#FCE382',
                tooltip: {
                    valueFormatter: (value) => value + '人',
                },
                yAxisIndex: 1,
            },
            {
                type: 'line',
                showSymbol: false,
                name: '預估進度',
                color: '#CE2A96',
                tooltip: {
                    valueFormatter: (value) => value + '%',
                },
            },
            {
                type: 'line',
                showSymbol: false,
                name: '實際進度',
                color: '#00BA34',
                tooltip: {
                    valueFormatter: (value) => value + '%',
                },
            },
        ],
    };

    return loading ? (
        <CustomLoading />
    ) : data.length === 0 ? (
        <Text>暫無資料</Text>
    ) : (
        <ReactECharts ref={echartsRef} option={option} style={chartStyle} />
    );
}
