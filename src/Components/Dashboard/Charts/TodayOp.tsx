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

export type todayOpKind = '侷限空間' | '起重吊掛';

const todayOpKindMap: Record<todayOpKind, string> = {
    侷限空間: 'confined',
    起重吊掛: 'lift',
};

type gqlTodayOp = {
    corpName: string;
    total: number;
    today: number;
};

type gqlData = {
    todayOp: gqlTodayOp[];
};

type chartData = {
    name: string;
    total: number;
    today: number;
};

const TODAY_OP = gql`
    query TodayOp($siteId: String!, $kind: String!) {
        todayOp(siteId: $siteId, kind: $kind) {
            corpName
            total
            today
        }
    }
`;

export default function TodayOp(props: { siteId: string; kind: todayOpKind }) {
    const { siteId, kind } = props;
    const [data, setData] = React.useState<chartData[]>([]);
    const echartsRef = React.useRef<EChartsInstance>(null);

    const { loading } = useQuery<gqlData>(TODAY_OP, {
        variables: {
            siteId,
            kind: todayOpKindMap[kind],
        },
        onCompleted: ({ todayOp }) => {
            setData(
                todayOp.map(({ corpName, ...rest }) => ({
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
        tooltip: {
            ...basicChartOptions.tooltip,
            position: [0, 0],
        },
        xAxis: {
            type: 'category',
            axisLabel: labelTextStyle,
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: labelTextStyle,
            },
        ],
        dataset: {
            dimensions: ['name', 'today', 'total'],
            source: data,
        },
        series: [
            {
                ...barOptions,
                name: '進場前已完成危害告知人數應',
                color: '#D0E8FF',
            },
            {
                ...barOptions,
                name: `${kind}教育訓練完成人數應`,
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
