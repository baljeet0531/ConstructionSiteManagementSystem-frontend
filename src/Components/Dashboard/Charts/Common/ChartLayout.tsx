import {
    Text,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Flex,
    Center,
} from '@chakra-ui/react';
import React from 'react';
import ProjectProgress from '../ProjectProgress';
import SpecialOperation from '../SpecialOperation';
import AppliedAndFaultAmount from '../AppliedAndFaultAmount';
import FaultRate from '../FaultRate';
import Opfault from '../OpFault';
import HazardNotify from '../HazardNotify';
import TodayOp from '../TodayOp';
import LaborAmountInOp from '../LaborAmountInOp';
import { TItem } from '../../../../Types/SpecialEducationTraining';

export type granularityType<T = '專案進度'> = T extends '今日施工作業'
    ? TItem
    : '日' | '週' | '月' | '季' | '年';

type chartTitle =
    | '專案進度'
    | '申請作業類別與缺失數'
    | '危害告知訓練'
    | '特殊作業'
    | '今日施工作業'
    | '當日申請作業類別施工人數'
    | '各承商缺失率百分比'
    | '各項作業缺失率';
type chartMapType = Record<chartTitle, Function>;

const chartMap: chartMapType = {
    專案進度: (siteId: string, granularity: granularityType) => (
        <ProjectProgress siteId={siteId} granularity={granularity} />
    ),
    申請作業類別與缺失數: (siteId: string, granularity: granularityType) => (
        <AppliedAndFaultAmount siteId={siteId} granularity={granularity} />
    ),
    危害告知訓練: (siteId: string) => <HazardNotify siteId={siteId} />,
    特殊作業: (siteId: string, granularity: granularityType) => (
        <SpecialOperation siteId={siteId} granularity={granularity} />
    ),
    今日施工作業: (siteId: string, kind: granularityType<'今日施工作業'>) => (
        <TodayOp siteId={siteId} kind={kind} />
    ),
    當日申請作業類別施工人數: (
        siteId: string,
        granularity: granularityType
    ) => <LaborAmountInOp siteId={siteId} granularity={granularity} />,
    各承商缺失率百分比: (siteId: string, granularity: granularityType) => (
        <FaultRate siteId={siteId} granularity={granularity} />
    ),
    各項作業缺失率: (siteId: string, granularity: granularityType) => (
        <Opfault siteId={siteId} granularity={granularity} />
    ),
};

export default function ChartLayout(props: {
    siteId: string;
    title: chartTitle;
}) {
    const { siteId, title } = props;

    const granularity: granularityType<typeof title>[] =
        title === '今日施工作業'
            ? ['缺氧作業', '有機溶劑', '高空車作業', '電銲作業']
            : ['日', '週', '月', '季', '年'];
    const tabElement = granularity.map((element, index) => (
        <Tab key={index}>{element}</Tab>
    ));
    const tabPanelElement = granularity.map((element, index) => (
        <TabPanel key={index} padding={0} width={'100%'} height={'100%'}>
            <Center width={'100%'} h={'100%'}>
                {chartMap[title](siteId, element)}
            </Center>
        </TabPanel>
    ));

    return (
        <Tabs
            variant="blueLineTabs"
            h={'100%'}
            isLazy
            display={'flex'}
            flexDirection={'column'}
        >
            <Flex align={'center'} justify={'space-between'}>
                <Text variant={'w700s16'}>{title}</Text>
                {title !== '危害告知訓練' && <TabList>{tabElement}</TabList>}
            </Flex>
            <TabPanels width={'100%'} flexGrow={1}>
                {title === '危害告知訓練' ? (
                    <TabPanel padding={0} width={'100%'} height={'100%'}>
                        <Center width={'100%'} h={'100%'}>
                            {chartMap[title](siteId)}
                        </Center>
                    </TabPanel>
                ) : (
                    tabPanelElement
                )}
            </TabPanels>
        </Tabs>
    );
}
