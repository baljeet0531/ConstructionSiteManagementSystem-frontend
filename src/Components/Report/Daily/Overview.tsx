import { Center, IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import ReactWindowTable, {
    CheckboxElement,
    IColumnMap,
    ISizes,
    dataCellStyle,
    defaultElement,
    getElementProps,
} from '../../Shared/ReactWindowTable';
import { EditIcon } from '../../../Icons/Icons';
import dayjs from 'dayjs';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import DailyReportModal from './Modal';
import { PageLoading } from '../../Shared/Loading';
import { defaultErrorToast } from '../../../Utils/DefaultToast';
import { DateRange } from 'rsuite/esm/DateRangePicker';

interface IDailyReportOverview {
    dailyId: number;
    date: string;
    total: number;
    todayProgress: string;
    totalProgress: string;
}

interface IDailyReportOverviewIsChecked extends IDailyReportOverview {
    index: number;
    isChecked: boolean;
}
export interface IDailyReportObject {
    [index: number]: IDailyReportOverviewIsChecked;
}

export const QUERY_DAILY_REPORT = gql`
    query DailyReport(
        $siteId: String!
        $dailyId: Int
        $startDate: Date
        $endDate: Date
    ) {
        dailyReport(
            siteId: $siteId
            dailyId: $dailyId
            startDate: $startDate
            endDate: $endDate
        ) {
            dailyId
            date
            total
            todayProgress
            totalProgress
        }
    }
`;

const sizes: ISizes = {
    headerHeight: 36,
    cellHeight: 44,
};

export default function DailyReport(props: {
    siteId: string;
    dailyData: IDailyReportObject;
    setDailyData: React.Dispatch<React.SetStateAction<IDailyReportObject>>;
    dateRange: DateRange | null;
}) {
    const { siteId, dailyData, setDailyData, dateRange } = props;
    const toast = useToast();

    const columnMap: IColumnMap[] = [
        {
            title: '日期',
            width: 175,
            variable: 'date',
            getElement: (props) =>
                defaultElement({
                    ...props,
                    style: { ...props.style, textAlign: 'left' },
                }),
            customHeaderStyle: { justifyContent: 'flex-start' },
        },
        {
            title: '當日出工人數',
            width: 175,
            variable: 'total',
            getElement: defaultElement,
        },
        {
            title: '當日進度（%）',
            width: 175,
            variable: 'todayProgress',
            getElement: defaultElement,
        },
        {
            title: '總完成度（%）',
            width: 175,
            variable: 'totalProgress',
            getElement: defaultElement,
        },
        {
            title: '編輯',
            width: 88,
            variable: 'dailyId',
            getElement: ({ style, info, variable }) => {
                const { onOpen, onClose, isOpen } = useDisclosure();
                return (
                    <Center {...dataCellStyle} paddingTop={'6px'} style={style}>
                        <IconButton
                            aria-label="Search database"
                            icon={<EditIcon />}
                            size={'sm'}
                            bg={'none'}
                            onClick={onOpen}
                        />
                        <DailyReportModal
                            siteId={siteId}
                            dailyId={info[variable]}
                            onClose={onClose}
                            isOpen={isOpen}
                        />
                    </Center>
                );
            },
        },
        {
            title: '全選',
            width: 89,
            variable: 'isChecked',
            getElement: (props: getElementProps) => (
                <CheckboxElement
                    getElementProps={props}
                    setTableData={setDailyData}
                    primaryKey={props.info['dailyId']}
                />
            ),
        },
    ];

    const [filteredPrimaryKeys, setFilteredPrimaryKeys] =
        React.useState<string[]>();

    const { loading } = useQuery(QUERY_DAILY_REPORT, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            dailyReport,
        }: {
            dailyReport: IDailyReportOverview[];
        }) => {
            const formattedData = dailyReport.reduce((acc, value, index) => {
                const { dailyId, todayProgress, totalProgress } = value;
                acc[dailyId] = {
                    ...value,
                    todayProgress: todayProgress ? `${todayProgress}%` : '-',
                    totalProgress: totalProgress ? `${totalProgress}%` : '-',
                    index: index,
                    isChecked: false,
                };
                return acc;
            }, {} as IDailyReportObject);
            setDailyData(formattedData);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });
    const [filterDailyReport, { loading: filterLoading }] = useLazyQuery(
        QUERY_DAILY_REPORT,
        {
            onCompleted: ({
                dailyReport,
            }: {
                dailyReport: IDailyReportOverview[];
            }) => {
                const primaryKeys = dailyReport.map(
                    ({ dailyId }) => `${dailyId}`
                );
                setFilteredPrimaryKeys(primaryKeys);
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            fetchPolicy: 'network-only',
        }
    );

    React.useEffect(() => {
        dateRange
            ? filterDailyReport({
                  variables: {
                      siteId: siteId,
                      startDate: dayjs(dateRange[0]).format('YYYY-MM-DD'),
                      endDate: dayjs(dateRange[1]).format('YYYY-MM-DD'),
                  },
              })
            : setFilteredPrimaryKeys(undefined);
    }, [dateRange]);
    return (
        <>
            <ReactWindowTable
                tableData={dailyData}
                setTableData={setDailyData}
                filteredPrimaryKey={filteredPrimaryKeys}
                columnMap={columnMap}
                sizes={sizes}
                sortReversed
                sortBy={'dailyId'}
            />
            {(loading || filterLoading) && <PageLoading />}
        </>
    );
}
