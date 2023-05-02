/* eslint-disable no-unused-vars */
import React from 'react';
import ReactWindowTable, {
    CheckboxElement,
    IColumnMap,
    ISizes,
    defaultElement,
} from '../../Shared/ReactWindowTable';
import { PageLoading } from '../../Shared/Loading';
import { gql, useQuery } from '@apollo/client';
import { DateRange } from 'rsuite/esm/DateRangePicker';

interface IWeeklyReportOverview {
    start: string;
    end: string;
    weekLabor: number;
    cumulateLabor: number;
    expectProgress: string;
    practicalProgress: string;
}

interface IWeeklyReportOverviewIsChecked extends IWeeklyReportOverview {
    index: number;
    isChecked: boolean;
    weekPeriod: string;
}
export interface IWeeklyReportObject {
    [weekPeriod: string]: IWeeklyReportOverviewIsChecked;
}

const sizes: ISizes = {
    headerHeight: 36,
    cellHeight: 44,
};

export const QUERY_WEEKLY_REPORT = gql`
    query WeeklyReport($siteId: String!, $startDate: Date, $endDate: Date) {
        weeklyReport(
            siteId: $siteId
            startDate: $startDate
            endDate: $endDate
        ) {
            start
            end
            weekLabor
            cumulateLabor
            expectProgress
            practicalProgress
        }
    }
`;

export default function WeeklyReport(props: {
    siteId: string;
    weeklyData: IWeeklyReportObject;
    setWeeklyData: React.Dispatch<React.SetStateAction<IWeeklyReportObject>>;
    dateRange: DateRange | null;
}) {
    const { siteId, weeklyData, setWeeklyData } = props;

    const columnMap: IColumnMap[] = [
        {
            title: '週次',
            width: 180,
            variable: 'weekPeriod',
            getElement: (props) =>
                defaultElement({
                    ...props,
                    style: { ...props.style, textAlign: 'left' },
                }),
            customHeaderStyle: { justifyContent: 'flex-start' },
        },
        {
            title: '當週出工人數',
            width: 155,
            variable: 'weekLabor',
            getElement: defaultElement,
        },
        {
            title: '累計出工人數',
            width: 155,
            variable: 'cumulateLabor',
            getElement: defaultElement,
        },
        {
            title: '預期進度（%）',
            width: 155,
            variable: 'expectProgress',
            getElement: defaultElement,
        },
        {
            title: '實際進度（%）',
            width: 155,
            variable: 'practicalProgress',
            getElement: defaultElement,
        },
        {
            title: '全選',
            width: 77,
            variable: 'isChecked',
            getElement: (props) => (
                <CheckboxElement
                    getElementProps={props}
                    setTableData={setWeeklyData}
                    primaryKey={props.info['weekPeriod']}
                />
            ),
        },
    ];

    const { loading } = useQuery(QUERY_WEEKLY_REPORT, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            weeklyReport,
        }: {
            weeklyReport: IWeeklyReportOverview[];
        }) => {
            const formattedData = weeklyReport.reduce((acc, val, index) => {
                const { start, end, expectProgress, practicalProgress } = val;
                const weekPeriod = `${start}~${end}`;
                acc[weekPeriod] = {
                    ...val,
                    expectProgress: `${expectProgress}%`,
                    practicalProgress: `${practicalProgress}%`,
                    index: index,
                    isChecked: false,
                    weekPeriod: weekPeriod,
                };
                return acc;
            }, {} as IWeeklyReportObject);
            setWeeklyData(formattedData);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    return (
        <>
            <ReactWindowTable
                tableData={weeklyData}
                setTableData={setWeeklyData}
                // filteredPrimaryKey={filteredPrimaryKeys}
                columnMap={columnMap}
                sizes={sizes}
                sortReversed
            />
            {loading && <PageLoading />}
            {/* {(loading || filterLoading) && <PageLoading />} */}
        </>
    );
}
