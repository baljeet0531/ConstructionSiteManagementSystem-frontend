import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { TTimeGranularity } from './Common/ChartLayout';
import { CustomLoading } from '../../Shared/Loading';
import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import { chartStyle } from './Common/ChartOptions';
import { EChartsOption } from 'echarts';
import { Text } from '@chakra-ui/react';
import { opCheckNameMap, opCheckArray } from '../../../Constants/OpCheck';

type gqlOpFault = {
    corpName: string;
    corpRate: number;
    assemble: number;
    cage: number;
    chemical: number;
    confined: number;
    electric: number;
    fire: number;
    hole: number;
    lift: number;
    pipe: number;
    scafold: number;
};

type gqlData = {
    opFault: gqlOpFault[];
};

type chartData = {
    name: string;
    value: number;
    children?: chartData[];
};

const OP_FAULT = gql`
    query OpFault($siteId: String!, $mode: String) {
        opFault(siteId: $siteId, mode: $mode) {
            corpName
            corpRate
            assemble
            cage
            chemical
            confined
            electric
            fire
            hole
            lift
            pipe
            scafold
        }
    }
`;

export default function OpFault(props: {
    siteId: string;
    granularity: TTimeGranularity;
}) {
    const { siteId, granularity } = props;
    const [data, setData] = React.useState<chartData[]>([]);
    const echartsRef = React.useRef<EChartsInstance>(null);

    const childrenRate = (val: number, corpRate: number) =>
        Number(((val * corpRate) / 100).toFixed(2));

    const { loading } = useQuery<gqlData>(OP_FAULT, {
        variables: {
            siteId: siteId,
            mode: granularity,
        },
        onCompleted: ({ opFault }) => {
            setData(
                opFault.map((data) => ({
                    name: data.corpName,
                    value: Number(data.corpRate.toFixed(2)),
                    children: opCheckArray.map((opName) => ({
                        name: opName,
                        value: childrenRate(
                            data[opCheckNameMap[opName]],
                            data.corpRate
                        ),
                    })),
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
                type: 'sunburst',
                data: data,
                radius: [24, '70%'],
                label: {
                    fontSize: 10,
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
                nodeClick: false,
                levels: [
                    {},
                    {
                        label: {
                            rotate: 0,
                            overflow: 'break',
                            formatter: '{b}\n{c}%',
                        },
                    },
                    {
                        label: {
                            formatter: '{b} {c}%',
                            position: 'outside',
                        },
                    },
                ],
            },
        ],
    };

    return loading ? (
        <CustomLoading />
    ) : data.length === 0 ? (
        <Text>暫無資料</Text>
    ) : (
        <ReactECharts
            ref={echartsRef}
            option={option}
            style={chartStyle}
            opts={{ renderer: 'svg' }}
        />
    );
}
