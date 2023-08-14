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
import { TItem } from '../../../Types/SpecialEducationTraining';

const todayOpKindMap: Record<TItem, string> = {
    缺氧作業: 'oxygen',
    有機溶劑: 'organic',
    高空車作業: 'aloft',
    電銲作業: 'weld',
};

type gqlTodayOp = {
    corpName: string;
    total: number;
    finish: number;
};

type gqlData = {
    todayOp: gqlTodayOp[];
};

type chartData = {
    name: string;
    total: number;
    finish: number;
};

const TODAY_OP = gql`
    query TodayOp($siteId: String!, $kind: String!) {
        todayOp(siteId: $siteId, kind: $kind) {
            corpName
            total
            finish
        }
    }
`;

export default function TodayOp(props: { siteId: string; granularity: TItem }) {
    const { siteId, granularity } = props;
    const [data, setData] = React.useState<chartData[]>([]);
    const echartsRef = React.useRef<EChartsInstance>(null);

    const { loading } = useQuery<gqlData>(TODAY_OP, {
        variables: {
            siteId,
            kind: todayOpKindMap[granularity],
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
            dimensions: ['name', 'total', 'finish'],
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
                name: `${granularity}教育訓練完成人數應`,
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
