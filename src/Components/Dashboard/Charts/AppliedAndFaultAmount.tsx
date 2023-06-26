import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { granularityType } from './Common/ChartLayout';
import { CustomLoading } from '../../Shared/Loading';
import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import { basicChartOptions, chartStyle } from './Common/ChartOptions';
import { EChartsOption } from 'echarts';

type gqlAppliedAndFaultAmount = {
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
    assembleFault: number;
    cageFault: number;
    chemicalFault: number;
    confinedFault: number;
    electricFault: number;
    fireFault: number;
    holeFault: number;
    liftFault: number;
    pipeFault: number;
    scafoldFault: number;
};

type gqlData = {
    appliedAndFaultAmount: gqlAppliedAndFaultAmount;
};

const APPLIED_AND_FAULT_AMOUNT = gql`
    query AppliedAndFaultAmount($siteId: String!, $mode: String) {
        appliedAndFaultAmount(siteId: $siteId, mode: $mode) {
            fire
            chemical
            hole
            pipe
            assemble
            lift
            cage
            electric
            confined
            scafold
            fireFault
            chemicalFault
            holeFault
            pipeFault
            assembleFault
            liftFault
            cageFault
            electricFault
            confinedFault
            scafoldFault
        }
    }
`;

export default function AppliedAndFaultAmount(props: {
    siteId: string;
    granularity: granularityType;
}) {
    const { siteId, granularity } = props;
    const [applied, setApplied] = React.useState<number[]>([]);
    const [fault, setFault] = React.useState<number[]>([]);
    const [max, setMax] = React.useState<number>(10);
    const echartsRef = React.useRef<EChartsInstance>(null);
    const { loading } = useQuery<gqlData>(APPLIED_AND_FAULT_AMOUNT, {
        variables: {
            siteId: siteId,
            mode: granularity,
        },
        onCompleted: ({
            appliedAndFaultAmount: {
                fire,
                chemical,
                hole,
                pipe,
                assemble,
                lift,
                cage,
                electric,
                confined,
                scafold,
                fireFault,
                chemicalFault,
                holeFault,
                pipeFault,
                assembleFault,
                liftFault,
                cageFault,
                electricFault,
                confinedFault,
                scafoldFault,
            },
        }) => {
            const applied = [
                fire,
                chemical,
                hole,
                pipe,
                assemble,
                lift,
                cage,
                electric,
                confined,
                scafold,
            ];
            const fault = [
                fireFault,
                chemicalFault,
                holeFault,
                pipeFault,
                assembleFault,
                liftFault,
                cageFault,
                electricFault,
                confinedFault,
                scafoldFault,
            ];
            const max = Math.max(...applied);

            setApplied(applied);
            setFault(fault);
            setMax(max);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const option: EChartsOption = {
        ...basicChartOptions,
        tooltip: {
            position: [0, 0],
        },
        color: ['#FCE382', '#DB504A'],
        radar: {
            indicator: [
                { name: '動火', max },
                { name: '化學', max },
                { name: '開口', max },
                { name: '管線拆離', max },
                { name: '施工架組裝', max },
                { name: '起重吊掛', max },
                { name: '吊籠', max },
                { name: '電力', max },
                { name: '侷限空間', max },
                { name: '高架', max },
            ],
            axisName: {
                color: '#667080',
            },
            splitLine: {
                lineStyle: {
                    color: '#B0B0B0',
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#B0B0B0',
                },
            },
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: applied,
                        name: '申請次數',
                    },
                    {
                        value: fault,
                        name: '累積缺失次數',
                    },
                ],
            },
        ],
    };

    return loading ? (
        <CustomLoading />
    ) : (
        <ReactECharts ref={echartsRef} option={option} style={chartStyle} />
    );
}
