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
    useToast,
} from '@chakra-ui/react';
import { tableViewContainerStyle } from '../../Layouts/MainScreen/MainScreen';
import { DateRangePicker } from 'rsuite';
import { LaunchIcon } from '../../Icons/Icons';
import DailyReport, { IDailyReportObject } from './Daily/Overview';
import WeeklyReport, { IWeeklyReportObject } from './Weekly/Overview';
import MonthlyReport from './Monthly/Overview';
import { gql, useMutation } from '@apollo/client';
import { Cookies } from 'react-cookie';
import { exportFile } from '../../Utils/Resources';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { PageLoading } from '../Shared/Loading';
import { DateRange } from 'rsuite/esm/DateRangePicker';

const EXPORT_DAILY_REPORT = gql`
    mutation ExportDailyReport(
        $dailyIds: [Int]!
        $siteId: String!
        $username: String!
    ) {
        exportDailyReport(
            dailyIds: $dailyIds
            siteId: $siteId
            username: $username
        ) {
            ok
            message
            path
        }
    }
`;
const EXPORT_WEEKLY_REPORT = gql`
    mutation ExportWeeklyReport(
        $endDay: [Date]!
        $siteId: String!
        $startDay: [Date]!
        $username: String!
    ) {
        exportWeeklyReport(
            endDay: $endDay
            siteId: $siteId
            startDay: $startDay
            username: $username
        ) {
            ok
            message
            path
        }
    }
`;

export default function Report(props: { siteId: string; siteName: string }) {
    if (!IsPermit('project_report')) return <Navigate to="/" replace={true} />;
    const { siteId, siteName } = props;
    const username = new Cookies().get('username');
    const toast = useToast();

    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const [fileLoading, setFileLoading] = React.useState<boolean>(false);
    const [dailyData, setDailyData] = React.useState<IDailyReportObject>({});
    const [weeklyData, setWeeklyData] = React.useState<IWeeklyReportObject>({});
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);

    const [exportDailyReport, { loading: exportDailyLoading }] = useMutation(
        EXPORT_DAILY_REPORT,
        {
            onCompleted: ({ exportDailyReport }) => {
                const { ok, message, path } = exportDailyReport;
                if (ok) {
                    setFileLoading(true);
                    exportFile(path, message, toast).then(() => {
                        setFileLoading(false);
                    });
                }
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            fetchPolicy: 'network-only',
        }
    );
    const [exportWeeklyReport, { loading: exportWeeklyLoading }] = useMutation(
        EXPORT_WEEKLY_REPORT,
        {
            onCompleted: ({ exportWeeklyReport }) => {
                const { ok, message, path } = exportWeeklyReport;
                if (ok) {
                    setFileLoading(true);
                    exportFile(path, message, toast).then(() => {
                        setFileLoading(false);
                    });
                }
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            fetchPolicy: 'network-only',
        }
    );

    const handleDailyExport = () => {
        const dailyIds = Object.values(dailyData).flatMap((value) =>
            value.isChecked ? value.dailyId : []
        );
        dailyIds.length > 0 &&
            exportDailyReport({
                variables: {
                    dailyIds: dailyIds,
                    siteId: siteId,
                    username: username,
                },
            });
    };
    const handleWeeklyExport = () => {
        const weeklyDays = Object.values(weeklyData).reduce(
            (acc, { isChecked, start, end }) => {
                if (isChecked) {
                    acc.startDay.push(start);
                    acc.endDay.push(end);
                }
                return acc;
            },
            { startDay: [], endDay: [] } as {
                startDay: string[];
                endDay: string[];
            }
        );
        weeklyDays.startDay.length > 0 &&
            exportWeeklyReport({
                variables: {
                    ...weeklyDays,
                    siteId: siteId,
                    username: username,
                },
            });
    };

    const exportFunctionArray = [handleDailyExport, handleWeeklyExport];

    return (
        <Flex {...tableViewContainerStyle} gap={'10px'}>
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Text variant={'pageTitle'}>進度報表</Text>
            <Tabs
                isLazy
                variant={'blueRounded'}
                onChange={(index) => setTabIndex(index)}
            >
                <Flex gap={'10px'} justify={'space-between'} height={'40px'}>
                    <TabList
                        bg={'#FFFFFF'}
                        border={'2px solid #919AA9'}
                        borderRadius={'6px'}
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
                                onClick={exportFunctionArray[tabIndex]}
                            >
                                輸出
                            </Button>
                            <DateRangePicker
                                value={dateRange}
                                style={{
                                    border: '2px solid #919AA9',
                                    borderRadius: '6px',
                                }}
                                onChange={(value) => {
                                    setDateRange(value);
                                }}
                                placement="auto"
                            />
                        </Flex>
                    )}
                </Flex>
                <TabPanels>
                    <TabPanel>
                        <DailyReport
                            siteId={siteId}
                            dailyData={dailyData}
                            setDailyData={setDailyData}
                            dateRange={dateRange}
                        />
                    </TabPanel>
                    <TabPanel>
                        <WeeklyReport
                            siteId={siteId}
                            weeklyData={weeklyData}
                            setWeeklyData={setWeeklyData}
                            dateRange={dateRange}
                        />
                    </TabPanel>
                    <TabPanel>
                        <MonthlyReport />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {(fileLoading || exportDailyLoading || exportWeeklyLoading) && (
                <PageLoading />
            )}
        </Flex>
    );
}
