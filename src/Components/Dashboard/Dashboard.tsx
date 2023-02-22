import React from 'react';
import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import { dashboardGridItemStyle } from './Style';
import InstantInfo from './InstantInfo';
import TodoList from './TodoList';

export default function Dashboard(props: { siteId: string; siteName: string }) {
    if (!IsPermit('dashboard')) return <Navigate to="/" replace={true} />;
    const { siteName } = props;
    return (
        <Flex direction={'column'} w={'100%'} h={'100%'}>
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Flex
                minH={'97px'}
                w={'100%'}
                padding={'5px 42px'}
                align={'flex-end'}
                justify={'space-between'}
            >
                <Text variant={'pageTitle'}>總覽</Text>
                <Flex gap={'10px'}>
                    {/* {weather} */}
                    <Text variant={'pageTitle'}>
                        {dayjs().format('YYYY/MM/DD')}
                    </Text>
                </Flex>
            </Flex>
            <Grid
                flexGrow={1}
                padding={'15px 42px 32px 42px'}
                gridTemplateRows={'253px 599px repeat(5,287px)'}
                gridTemplateColumns={'1fr 1fr'}
                gap={'20px 17px'}
                borderTop={'1px solid #667080'}
            >
                <GridItem {...dashboardGridItemStyle} rowSpan={2}>
                    <InstantInfo />
                </GridItem>
                <GridItem {...dashboardGridItemStyle}>
                    <TodoList />
                </GridItem>
            </Grid>
        </Flex>
    );
}
