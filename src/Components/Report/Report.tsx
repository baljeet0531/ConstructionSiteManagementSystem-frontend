import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import {
    Button,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { tableViewContainerStyle } from '../../Layouts/MainScreen/MainScreen';
import { DateRangePicker } from 'rsuite';
import { LaunchIcon } from '../../Icons/Icons';
import DailyReport from './DailyReport';

export default function Report(props: { siteId: string; siteName: string }) {
    if (!IsPermit('project_report')) return <Navigate to="/" replace={true} />;
    const { siteName } = props;

    const [tabIndex, setTabIndex] = React.useState<number>(0);

    return (
        <Flex {...tableViewContainerStyle} gap={'10px'}>
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Text variant={'pageTitle'}>進度報表</Text>
            <Tabs
                variant={'blueRounded'}
                onChange={(index) => setTabIndex(index)}
            >
                <Flex gap={'10px'} justify={'space-between'} height={'40px'}>
                    <TabList
                        bg={'#FFFFFF'}
                        border={'1px solid #919AA9'}
                        borderRadius={'5px'}
                    >
                        <Tab>日報表</Tab>
                        <Tab>週報表</Tab>
                        <Tab>月報表</Tab>
                    </TabList>
                    {tabIndex !== 2 && (
                        <Flex gap={'10px'} align={'center'}>
                            <Button
                                leftIcon={<LaunchIcon />}
                                variant={'buttonGrayOutline'}
                                h={'36px'}
                            >
                                輸出
                            </Button>
                            <DateRangePicker placement="auto" />
                        </Flex>
                    )}
                </Flex>
                <TabPanels>
                    <TabPanel>
                        <DailyReport />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
}
