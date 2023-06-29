import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { CustomLoading } from '../../Shared/Loading';
import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import {
    barOptions,
    basicChartOptions,
    chartStyle,
    labelTextStyle,
} from './Common/ChartOptions';
import { EChartsOption } from 'echarts';
import { Text } from '@chakra-ui/react';

type gqlHazardNotify = {
    corpName: string;
    finished: number;
    unfinished: number;
};

type gqlData = {
    hazardNotify: gqlHazardNotify[];
};

type chartData = {
    name: string;
    finished: number;
    unfinished: number;
};

const HAZARD_NOTIFY = gql`
    query HazardNotify($siteId: String!) {
        hazardNotify(siteId: $siteId) {
            corpName
            finished
            unfinished
        }
    }
`;

export default function HazardNotify(props: { siteId: string }) {
    const { siteId } = props;
    const [data, setData] = React.useState<chartData[]>([]);
    const echartsRef = React.useRef<EChartsInstance>(null);

    const { loading } = useQuery<gqlData>(HAZARD_NOTIFY, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ hazardNotify }) => {
            setData(
                hazardNotify.map(({ corpName, ...rest }) => ({
                    ...rest,
                    name: corpName,
                }))
            );
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
                interval: 0,
                rotate: -45,
                verticalAlign: 'top',
                margin: 4,
            },
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: labelTextStyle,
            },
        ],
        dataset: {
            dimensions: ['name', 'finished', 'unfinished'],
            source: data,
        },
        series: [
            {
                ...barOptions,
                stack: 'amount',
                name: '已完成',
                color: '#D0E8FF',
            },
            {
                ...barOptions,
                stack: 'amount',
                name: '未完成',
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
