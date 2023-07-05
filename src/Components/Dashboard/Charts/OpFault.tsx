import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { granularityType } from './Common/ChartLayout';
import { CustomLoading } from '../../Shared/Loading';
import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import { chartStyle } from './Common/ChartOptions';
import { EChartsOption } from 'echarts';
import { Text } from '@chakra-ui/react';

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
    granularity: granularityType;
}) {
    const { siteId, granularity } = props;
    const [data, setData] = React.useState<chartData[]>([]);
    const echartsRef = React.useRef<EChartsInstance>(null);
    const { loading } = useQuery<gqlData>(OP_FAULT, {
        variables: {
            siteId: siteId,
            mode: granularity,
        },
        onCompleted: ({ opFault }) => {
            setData(
                opFault.map(
                    ({
                        corpName,
                        corpRate,
                        assemble,
                        cage,
                        chemical,
                        confined,
                        electric,
                        fire,
                        hole,
                        lift,
                        pipe,
                        scafold,
                    }) => ({
                        name: corpName,
                        value: Number(corpRate.toFixed(2)),
                        children: [
                            {
                                name: '動火',
                                value: Number(
                                    ((fire * corpRate) / 100).toFixed(2)
                                ),
                            },
                            {
                                name: '化學',
                                value: Number(chemical.toFixed(2)),
                            },
                            {
                                name: '開口',
                                value: Number(
                                    ((hole * corpRate) / 100).toFixed(2)
                                ),
                            },
                            {
                                name: '管線拆離',
                                value: Number(
                                    ((pipe * corpRate) / 100).toFixed(2)
                                ),
                            },
                            {
                                name: '施工架組裝',
                                value: Number(
                                    ((assemble * corpRate) / 100).toFixed(2)
                                ),
                            },
                            {
                                name: '起重吊掛',
                                value: Number(
                                    ((lift * corpRate) / 100).toFixed(2)
                                ),
                            },
                            {
                                name: '吊籠',
                                value: Number(
                                    ((cage * corpRate) / 100).toFixed(2)
                                ),
                            },
                            {
                                name: '電力',
                                value: Number(
                                    ((electric * corpRate) / 100).toFixed(2)
                                ),
                            },
                            {
                                name: '侷限空間',
                                value: Number(
                                    ((confined * corpRate) / 100).toFixed(2)
                                ),
                            },
                            {
                                name: '高架',
                                value: Number(
                                    ((scafold * corpRate) / 100).toFixed(2)
                                ),
                            },
                        ],
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
