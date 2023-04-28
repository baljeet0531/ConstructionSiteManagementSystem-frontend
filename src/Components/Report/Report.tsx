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

export default function Report(props: { siteId: string; siteName: string }) {
    if (!IsPermit('project_report')) return <Navigate to="/" replace={true} />;
    const { siteId, siteName } = props;
    const username = new Cookies().get('username');
    const toast = useToast();

    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const [fileLoading, setFileLoading] = React.useState<boolean>(false);
    const [dailyData, setDailyData] = React.useState<IDailyReportObject>({});
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

    const exportFunctionArray = [handleDailyExport];

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
                </TabPanels>
            </Tabs>
            {(fileLoading || exportDailyLoading) && <PageLoading />}
        </Flex>
    );
}
