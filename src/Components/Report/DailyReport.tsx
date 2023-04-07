import { Center, IconButton } from '@chakra-ui/react';
import React from 'react';
import ReactWindowTable, {
    CheckboxElement,
    IColumnMap,
    ISizes,
    dataCellStyle,
    defaultElement,
    getElementProps,
} from '../Shared/ReactWindowTable';
import { EditIcon } from '../../Icons/Icons';
import dayjs from 'dayjs';

interface IDailyReportValue {
    index: number;
    isChecked: boolean;
    date: string;
    dailyWorkerCount: number;
    dailyProgress: string;
    overallProgress: string;
}
interface IDailyReportObject {
    [index: number]: IDailyReportValue;
}

function createMockData(length: number): IDailyReportObject {
    const obj: IDailyReportObject = {};

    const getRandomArbitrary = (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    };

    const getRandomInt = (min: number, max: number): number => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };

    for (let i = 0; i < length; i++) {
        const dailyProgress = getRandomArbitrary(0, 0.2);
        const overallProgressNum =
            dailyProgress +
            (i === 0 ? 0 : Number(obj[i - 1].overallProgress.slice(0, -1)));
        const overallProgress =
            overallProgressNum >= 100
                ? '100%'
                : `${overallProgressNum.toFixed(2)}%`;
        obj[i] = {
            index: i,
            isChecked: false,
            date: dayjs('2023/04/01').add(i, 'day').format('YYYY/MM/DD'),
            dailyWorkerCount: getRandomInt(0, 101),
            dailyProgress: `${dailyProgress.toFixed(2)}%`,
            overallProgress: overallProgress,
        };
        if (overallProgressNum >= 100) {
            break;
        }
    }

    return obj;
}

const sizes: ISizes = {
    tableFigmaWidth: 877,
    headerHeight: 36,
    cellHeight: 44,
};

export default function DailyReport() {
    const mockData = createMockData(1200);

    const [tableData, setTableData] =
        React.useState<IDailyReportObject>(mockData);

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
            variable: 'dailyWorkerCount',
            getElement: defaultElement,
        },
        {
            title: '當日進度（%）',
            width: 175,
            variable: 'dailyProgress',
            getElement: defaultElement,
        },
        {
            title: '總完成度（%）',
            width: 175,
            variable: 'overallProgress',
            getElement: defaultElement,
        },
        {
            title: '編輯',
            width: 88,
            variable: 'date',
            getElement: ({ style }) => (
                <Center {...dataCellStyle} paddingTop={'6px'} style={style}>
                    <IconButton
                        aria-label="Search database"
                        icon={<EditIcon />}
                        size={'sm'}
                        bg={'none'}
                    />
                </Center>
            ),
        },
        {
            title: '全選',
            width: 89,
            variable: 'isChecked',
            getElement: (props: getElementProps) => (
                <CheckboxElement
                    getElementProps={props}
                    setTableData={setTableData}
                    primaryKey={props.info['index']}
                />
            ),
        },
    ];
    return (
        <ReactWindowTable
            tableData={tableData}
            columnMap={columnMap}
            sizes={sizes}
        />
    );
}
