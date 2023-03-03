import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { granularityType } from './ChartLayout';
import {
    basicChartOptions,
    chartStyle,
    labelTextStyle,
    overlappedBarOptions,
} from './ChartOptions';
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
};

const PROJECT_PROGRESS = gql`
    query DashboardProjectProgress($siteId: String!, $mode: String!) {
        dashboardProjectProgress(siteId: $siteId, mode: $mode) {
            time
            laborAmount
            laborAccumulation
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
    const { loading } = useQuery(PROJECT_PROGRESS, {
        variables: {
            siteId: siteId,
            mode: granularity,
        },
        onCompleted: ({
            dashboardProjectProgress,
        }: {
            dashboardProjectProgress: gqlProjectProgress[];
        }) => {
            setData(dashboardProjectProgress);
            echartsRef.current.getEchartsInstance().setOption({
                ...option,
                dataset: { ...option.dataset, source: data },
            });
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });
    const option: EChartsOption = {
        ...basicChartOptions,
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
                position: 'right',
                axisLabel: {
                    ...labelTextStyle,
                    formatter: (axisValue: number) =>
                        axisValue == 0 ? '人' : axisValue.toString(),
                },
            },
        ],
        dataset: {
            dimensions: ['time', 'laborAmount', 'laborAccumulation'],
            source: data,
        },
        series: [
            {
                ...overlappedBarOptions,
                z: 3,
                name: '出工人數',
                color: '#D0E8FF',
            },
            {
                ...overlappedBarOptions,
                z: 2,
                name: '累計出工人數',
                color: '#FCE382',
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
