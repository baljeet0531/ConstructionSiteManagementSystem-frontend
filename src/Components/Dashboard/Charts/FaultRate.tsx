import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { TTimeGranularity } from './Common/ChartLayout';
import { CustomLoading } from '../../Shared/Loading';
import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import { chartStyle } from './Common/ChartOptions';
import { EChartsOption } from 'echarts';
import { Text } from '@chakra-ui/react';

type gqlFaultRate = {
    corpName: string;
    rate: number;
};

type gqlData = {
    faultRate: gqlFaultRate[];
};

type chartData = {
    name: string;
    value: number;
};

const FAULT_RATE = gql`
    query FaultRate($siteId: String!, $mode: String) {
        faultRate(siteId: $siteId, mode: $mode) {
            corpName
            rate
        }
    }
`;

export default function FaultRate(props: {
    siteId: string;
    granularity: TTimeGranularity;
}) {
    const { siteId, granularity } = props;
    const [data, setData] = React.useState<chartData[]>([]);
    const echartsRef = React.useRef<EChartsInstance>(null);
    const { loading } = useQuery<gqlData>(FAULT_RATE, {
        variables: {
            siteId: siteId,
            mode: granularity,
        },
        onCompleted: ({ faultRate }) => {
            setData(
                faultRate.map(({ corpName, rate }) => ({
                    name: corpName,
                    value: Number(rate.toFixed(2)),
                }))
            );
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const option: EChartsOption = {
        color: ['#FEAEAE', '#9A89FF', '#A9F4D0', '#D0E8FF'],
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: data,
                label: {
                    formatter: '{b}\n{c}%',
                    overflow: 'break',
                },
                tooltip: {
                    valueFormatter: (value) => value + '%',
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
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
