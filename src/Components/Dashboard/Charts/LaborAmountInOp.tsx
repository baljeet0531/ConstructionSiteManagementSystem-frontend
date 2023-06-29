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
import { BarSeriesOption, EChartsOption } from 'echarts';
import {
    Center,
    Flex,
    FlexProps,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
} from '@chakra-ui/react';
import { granularityType } from './Common/ChartLayout';
import { RectangleIcon } from '../../../Icons/Icons';

type TOpCheck =
    | 'fire'
    | 'scafold'
    | 'confined'
    | 'electric'
    | 'cage'
    | 'lift'
    | 'assemble'
    | 'pipe'
    | 'hole'
    | 'chemical';

type TOpCheckZh =
    | '動火'
    | '高架'
    | '侷限空間'
    | '電力'
    | '吊籠'
    | '起重吊掛'
    | '施工架'
    | '管線拆離'
    | '開口'
    | '化學';

type gqlLaborAmountInOp = {
    corpName: string;
} & Record<TOpCheck, number>;

type gqlData = {
    laborAmountInOp: gqlLaborAmountInOp[];
};

const opCheckMap: Record<TOpCheckZh, TOpCheck> = {
    動火: 'fire',
    高架: 'scafold',
    侷限空間: 'confined',
    電力: 'electric',
    吊籠: 'cage',
    起重吊掛: 'lift',
    施工架: 'assemble',
    管線拆離: 'pipe',
    開口: 'hole',
    化學: 'chemical',
};

const initData: { name: TOpCheckZh }[] = [
    { name: '動火' },
    { name: '高架' },
    { name: '侷限空間' },
    { name: '電力' },
    { name: '吊籠' },
    { name: '起重吊掛' },
    { name: '施工架' },
    { name: '管線拆離' },
    { name: '開口' },
    { name: '化學' },
];
const initDimensions: string[] = ['name'];
const initSeries: BarSeriesOption[] = [];
const color = ['#FEAEAE', '#9A89FF', '#A9F4D0', '#D0E8FF'];

const LABOR_AMOUNT_IN_OP = gql`
    query LaborAmountInOp($siteId: String!, $mode: String) {
        laborAmountInOp(siteId: $siteId, mode: $mode) {
            corpName
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

const tableFlexStyle: FlexProps = {
    overflowX: 'auto',
    overflowY: 'hidden',
    h: '30px',
    pt: '5px',
};

export default function LaborAmountInOp(props: {
    siteId: string;
    granularity: granularityType;
}) {
    const { siteId, granularity } = props;
    const [data, setData] = React.useState<gqlLaborAmountInOp[]>([]);
    const [datasetSource, setDatasetSource] = React.useState(initData);
    const [dimensions, setDimensions] = React.useState(initDimensions);
    const [series, setSeries] = React.useState<BarSeriesOption[]>(initSeries);
    const echartsRef = React.useRef<EChartsInstance>(null);

    const { loading } = useQuery<gqlData>(LABOR_AMOUNT_IN_OP, {
        variables: {
            siteId,
            mode: granularity,
        },
        onCompleted: ({ laborAmountInOp }) => {
            const datasetSource = initData.map(({ name }) => ({
                name,
                ...laborAmountInOp.reduce(
                    (acc, { corpName, [opCheckMap[name]]: amount }) => {
                        acc[corpName] = amount;
                        return acc;
                    },
                    {} as { [key: string]: number }
                ),
            }));

            const { dimensions, series } = laborAmountInOp.reduce(
                (acc, { corpName }) => {
                    acc.dimensions.push(corpName);
                    acc.series.push({
                        ...barOptions,
                        type: 'bar',
                        name: corpName,
                    });
                    return acc;
                },
                {
                    dimensions: [...initDimensions],
                    series: [...initSeries],
                }
            );

            setData(laborAmountInOp);
            setDatasetSource(datasetSource);
            setDimensions(dimensions);
            setSeries(series);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const option: EChartsOption = {
        ...basicChartOptions,
        color: color,
        grid: {
            ...basicChartOptions,
            bottom: 1,
        },
        xAxis: {
            type: 'category',
            axisLabel: { ...labelTextStyle, formatter: '' },
            axisTick: {
                length: -5,
            },
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: labelTextStyle,
            },
        ],
        dataset: {
            dimensions: dimensions,
            source: datasetSource,
        },
        series: series,
    };

    return loading ? (
        <CustomLoading />
    ) : series.length === 0 ? (
        <Text>暫無資料</Text>
    ) : (
        <Flex direction={'column'} w={'100%'} h={'100%'} bg={'#E5E5E533'}>
            <ReactECharts
                ref={echartsRef}
                option={option}
                style={{ ...chartStyle, height: '50%' }}
            />
            <TableContainer w={'91%'} h={'50%'} overflowY={'scroll'}>
                <Table variant={'laborAmountInOpChart'}>
                    <Thead position={'sticky'} top={0}>
                        <Tr>
                            <Th w={'11%'}>
                                <Flex {...tableFlexStyle} justify={'center'}>
                                    承商
                                </Flex>
                            </Th>
                            {initData.map(({ name }, index) => (
                                <Th key={index} w={'8.9%'}>
                                    <Flex
                                        {...tableFlexStyle}
                                        justify={'center'}
                                    >
                                        {name}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map(
                            (
                                {
                                    corpName,
                                    fire,
                                    scafold,
                                    confined,
                                    electric,
                                    cage,
                                    lift,
                                    assemble,
                                    pipe,
                                    hole,
                                    chemical,
                                },
                                index
                            ) => (
                                <Tr key={index}>
                                    <Td>
                                        <Flex
                                            {...tableFlexStyle}
                                            color={color[index % color.length]}
                                            justify={'flex-start'}
                                        >
                                            <Center
                                                h={'20px'}
                                                w={'20px'}
                                                flex={'0 0'}
                                            >
                                                <RectangleIcon />
                                            </Center>
                                            <Text>{corpName}</Text>
                                        </Flex>
                                    </Td>
                                    {[
                                        fire,
                                        scafold,
                                        confined,
                                        electric,
                                        cage,
                                        lift,
                                        assemble,
                                        pipe,
                                        hole,
                                        chemical,
                                    ].map((text, index) => (
                                        <Td key={index}>
                                            <Flex
                                                {...tableFlexStyle}
                                                justify={'center'}
                                            >
                                                {text}
                                            </Flex>
                                        </Td>
                                    ))}
                                </Tr>
                            )
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
}
