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

export type granularityType = '日' | '週' | '月' | '季' | '年';

type chartTitle =
    | '專案進度'
    | '特殊作業'
    | '申請作業類別與缺失數'
    | '各承商缺失率百分比';
type chartMapType = Record<chartTitle, Function>;

const chartMap: chartMapType = {
    專案進度: (siteId: string, granularity: granularityType) => (
        <ProjectProgress siteId={siteId} granularity={granularity} />
    ),
    特殊作業: (siteId: string, granularity: granularityType) => (
        <SpecialOperation siteId={siteId} granularity={granularity} />
    ),
    申請作業類別與缺失數: (siteId: string, granularity: granularityType) => (
        <AppliedAndFaultAmount siteId={siteId} granularity={granularity} />
    ),
    各承商缺失率百分比: (siteId: string, granularity: granularityType) => (
        <FaultRate siteId={siteId} granularity={granularity} />
    ),
};

export default function ChartLayout(props: {
    siteId: string;
    title: chartTitle;
}) {
    const { siteId, title } = props;
    const granularity: granularityType[] = ['日', '週', '月', '季', '年'];
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
        <Tabs variant="blueLineTabs" h={'100%'} isLazy>
            <Flex align={'center'} justify={'space-between'}>
                <Text variant={'w700s16'}>{title}</Text>
                <TabList>{tabElement}</TabList>
            </Flex>
            <TabPanels width={'100%'} height={'300px'}>
                {tabPanelElement}
            </TabPanels>
        </Tabs>
    );
}
