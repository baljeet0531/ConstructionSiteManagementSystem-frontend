import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { granularityType } from './Common/ChartLayout';
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

type gqlSpecialOperation = {
    name: string;
    finish: number;
    unfinish: number;
};

const SPECIAL_OPERATION = gql`
    query DashboardSpecialOperation($siteId: String!, $mode: String!) {
        dashboardSpecialOperation(siteId: $siteId, mode: $mode) {
            name
            finish
            unfinish
        }
    }
`;

export default function SpecialOperation(props: {
    siteId: string;
    granularity: granularityType;
}) {
    const { siteId, granularity } = props;
    const [data, setData] = React.useState<gqlSpecialOperation[]>([]);
    const echartsRef = React.useRef<EChartsInstance>(null);

    const { loading } = useQuery(SPECIAL_OPERATION, {
        variables: {
            siteId: siteId,
            mode: granularity,
        },
        onCompleted: ({
            dashboardSpecialOperation,
        }: {
            dashboardSpecialOperation: gqlSpecialOperation[];
        }) => {
            setData(dashboardSpecialOperation);
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
            axisLabel: labelTextStyle,
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: labelTextStyle,
            },
        ],
        dataset: {
            dimensions: ['name', 'finish', 'unfinish'],
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
