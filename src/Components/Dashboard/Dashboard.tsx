import React from 'react';
import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import { dashboardGridItemStyle } from './Style';
import InstantInfo from './InstantInfo';
import TodoList from './TodoList';
import PublicAwarenessInfo from './PublicAwarenessInfo';
import ChartLayout from './Charts/Common/ChartLayout';
import WeatherTime from './WeatherTime';
import ProjectProgress from './Charts/ProjectProgress';
import AppliedAndFaultAmount from './Charts/AppliedAndFaultAmount';
import HazardNotify from './Charts/HazardNotify';
import SpecialOperation from './Charts/SpecialOperation';
import TodayOp from './Charts/TodayOp';
import LaborAmountInOp from './Charts/LaborAmountInOp';
import FaultRate from './Charts/FaultRate';
import OpFault from './Charts/OpFault';
import { Items } from '../../Constants/SpecialEducationTraining';
import { TimeGranularity } from '../../Constants/Dashboard';

export default function Dashboard(props: { siteId: string; siteName: string }) {
    if (!IsPermit('dashboard')) return <Navigate to="/" replace={true} />;
    const { siteId, siteName } = props;

    return (
        <Flex direction={'column'} w={'100%'} h={'100%'}>
            <Flex
                minH={'97px'}
                w={'100%'}
                padding={'5px 42px'}
                gap={'11px'}
                direction={'column'}
                align={'flex-end'}
                justify={'flex-end'}
            >
                <Text variant={'w500s14'}>{siteName}</Text>
                <Flex justify={'space-between'} w={'100%'}>
                    <Text variant={'pageTitle'}>總覽</Text>
                    <WeatherTime siteId={siteId} />
                </Flex>
            </Flex>
            <Grid
                flexGrow={1}
                padding={'15px 42px 32px 42px'}
                gridTemplateRows={'253px 599px repeat(5,387px) 750px'}
                gridTemplateColumns={'1fr 1fr'}
                gap={'20px 17px'}
                borderTop={'1px solid #667080'}
            >
                <GridItem {...dashboardGridItemStyle} rowSpan={2}>
                    <InstantInfo siteId={siteId} />
                </GridItem>
                <GridItem {...dashboardGridItemStyle}>
                    <TodoList siteId={siteId} />
                </GridItem>
                <GridItem {...dashboardGridItemStyle}>
                    <PublicAwarenessInfo siteId={siteId} />
                </GridItem>
                <GridItem {...dashboardGridItemStyle} colSpan={2}>
                    <ChartLayout title={'專案進度'} tabsName={TimeGranularity}>
                        <ProjectProgress siteId={siteId} granularity={'日'} />
                    </ChartLayout>
                </GridItem>
                <GridItem {...dashboardGridItemStyle}>
                    <ChartLayout
                        title={'申請作業類別與缺失數'}
                        tabsName={TimeGranularity}
                    >
                        <AppliedAndFaultAmount
                            siteId={siteId}
                            granularity={'日'}
                        />
                    </ChartLayout>
                </GridItem>
                <GridItem {...dashboardGridItemStyle}>
                    <ChartLayout title={'危害告知訓練'}>
                        <HazardNotify siteId={siteId} />
                    </ChartLayout>
                </GridItem>
                <GridItem {...dashboardGridItemStyle}>
                    <ChartLayout title={'特殊作業'} tabsName={TimeGranularity}>
                        <SpecialOperation siteId={siteId} granularity={'日'} />
                    </ChartLayout>
                </GridItem>
                <GridItem {...dashboardGridItemStyle}>
                    <ChartLayout title={'今日施工作業'} tabsName={Items}>
                        <TodayOp siteId={siteId} granularity={'缺氧作業'} />
                    </ChartLayout>
                </GridItem>
                <GridItem {...dashboardGridItemStyle} colSpan={2}>
                    <ChartLayout
                        title={'當日申請作業類別施工人數'}
                        tabsName={TimeGranularity}
                    >
                        <LaborAmountInOp siteId={siteId} granularity={'日'} />
                    </ChartLayout>
                </GridItem>
                <GridItem {...dashboardGridItemStyle} colSpan={2}>
                    <ChartLayout
                        title={'各承商缺失率百分比'}
                        tabsName={TimeGranularity}
                    >
                        <FaultRate siteId={siteId} granularity={'日'} />
                    </ChartLayout>
                </GridItem>
                <GridItem {...dashboardGridItemStyle} colSpan={2}>
                    <ChartLayout
                        title={'各項作業缺失率'}
                        tabsName={TimeGranularity}
                    >
                        <OpFault siteId={siteId} granularity={'日'} />
                    </ChartLayout>
                </GridItem>
            </Grid>
        </Flex>
    );
}
