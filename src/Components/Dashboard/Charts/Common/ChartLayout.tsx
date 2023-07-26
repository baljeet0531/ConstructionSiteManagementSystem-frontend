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

export type TTimeGranularity = '日' | '週' | '月' | '季' | '年';
type chartTitle =
    | '專案進度'
    | '申請作業類別與缺失數'
    | '危害告知訓練'
    | '特殊作業'
    | '今日施工作業'
    | '當日申請作業類別施工人數'
    | '各承商缺失率百分比'
    | '各項作業缺失率';

export const TimeGranularity: TTimeGranularity[] = [
    '日',
    '週',
    '月',
    '季',
    '年',
];

export default function ChartLayout(props: {
    children: JSX.Element;
    siteId: string;
    title: chartTitle;
    tabsName?: string[];
}) {
    const { children, title, tabsName = [] } = props;

    const tabElement = tabsName.map((name, index) => (
        <Tab key={index}>{name}</Tab>
    ));
    const tabPanelElement = tabsName.length
        ? tabsName.map((name, index) => (
              <TabPanel key={index} padding={0} width={'100%'} height={'100%'}>
                  <Center width={'100%'} h={'100%'}>
                      <children.type {...children.props} granularity={name} />
                  </Center>
              </TabPanel>
          ))
        : children;

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
                <TabList>{tabElement}</TabList>
            </Flex>
            <TabPanels width={'100%'} flexGrow={1}>
                {tabPanelElement}
            </TabPanels>
        </Tabs>
    );
}
