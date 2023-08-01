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
import { TChartTitle } from '../../../../Types/Dashboard';

export default function ChartLayout(props: {
    children: JSX.Element;
    title: TChartTitle;
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
