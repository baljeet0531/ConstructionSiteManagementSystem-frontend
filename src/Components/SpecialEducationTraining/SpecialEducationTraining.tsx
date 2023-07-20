import {
    Button,
    Flex,
    Input,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import React from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { PageLoading } from '../Shared/Loading';
import ReactWindowTable, {
    IColumnMap,
    ISizes,
    defaultElement,
} from '../Shared/ReactWindowTable';
import { gql } from '@apollo/client';
import { TOverviewTable } from '../../Types/TableOverview';
import { defaultSuccessToast } from '../../Utils/DefaultToast';
import dayjs from 'dayjs';
import { handleDebounceSearch } from '../../Utils/Web';
import { AddIcon } from '../../Icons/Icons';
import CreateSETModal from './CreateSETModal';
import { useGQLOverview } from '../../Hooks/UseGQLOverview';
import {
    ISpecialEducationalTraining,
    IQuerySpecialEducationalTraining,
    IQuerySpecialEducationalTrainingVar,
    IUpdateSpecialEducationalTraining,
    IUpdateSpecialEducationalTrainingVar,
} from '../../Interface/SpecialEducationTraining';
import SETDatePickerElement from './SETDatePickerElement';

export const QUERY_SPECIAL_EDUCATION_TRAINING = gql`
    query SpecialEducationalTraining(
        $keyWord: String
        $startDay: Date
        $endDay: Date
    ) {
        specialEducationalTraining(
            keyWord: $keyWord
            startDay: $startDay
            endDay: $endDay
        ) {
            item
            date
            corp
            name
            idno
            viceCorp
        }
    }
`;
export const UPDATE_SPECIAL_EDUCATION_TRAINING = gql`
    mutation UpdateSpecialEducationalTraining(
        $date: Date
        $idno: String!
        $item: String!
    ) {
        updateSpecialEducationalTraining(
            date: $date
            idno: $idno
            item: $item
        ) {
            ok
            message
        }
    }
`;

const sizes: ISizes = {
    headerHeight: 44,
    cellHeight: 44,
};

export type TItem = '缺氧作業' | '有機溶劑' | '高空車作業' | '電銲作業';
export const Items: TItem[] = [
    '缺氧作業',
    '有機溶劑',
    '高空車作業',
    '電銲作業',
];
export const ItemsOptions = Items.map((item, index) => (
    <option key={index} value={item}>
        {item}
    </option>
));

export default function SpecialEducationTraining() {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const toast = useToast();
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
    const {
        tableData,
        setTableData,
        filteredPrimaryKey,
        setFilteredPrimaryKey,
        filterResult: [filterFunction],
        updateResult,
        loading,
    } = useGQLOverview<
        ISpecialEducationalTraining,
        IQuerySpecialEducationalTraining,
        IQuerySpecialEducationalTrainingVar,
        IUpdateSpecialEducationalTraining,
        IUpdateSpecialEducationalTrainingVar
    >({
        gqlOverview: QUERY_SPECIAL_EDUCATION_TRAINING,
        handleData: (data) =>
            data['specialEducationalTraining'].reduce((acc, value, index) => {
                const { item, idno } = value;
                const primaryKey = JSON.stringify({
                    item,
                    idno,
                });

                acc[primaryKey] = { ...value, index: index + 1 };
                return acc;
            }, {} as TOverviewTable<ISpecialEducationalTraining & { index: number }>),
        gqlFilter: QUERY_SPECIAL_EDUCATION_TRAINING,
        handleFilterKey: (data) =>
            data['specialEducationalTraining'].map(({ item, idno }) =>
                JSON.stringify({ item, idno })
            ),
        gqlUpdate: UPDATE_SPECIAL_EDUCATION_TRAINING,
        handleUpdate: ({
            updateSpecialEducationalTraining: { ok, message },
        }) => {
            ok && defaultSuccessToast(toast, message);
        },
        updateOptions: {
            refetchQueries: [QUERY_SPECIAL_EDUCATION_TRAINING],
            awaitRefetchQueries: true,
        },
    });

    const timeout = React.useRef();
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const handleInput = () => {
        handleDebounceSearch(timeout, () => handleSearch(dateRange), 300, {
            resetCondition: !searchInputRef.current?.value.trim() && !dateRange,
            resetFunction: () => setFilteredPrimaryKey(undefined),
        });
    };

    const handleSearch = (dateRange: DateRange | null) => {
        filterFunction({
            variables: {
                keyWord: searchInputRef.current?.value,
                startDay: dateRange && dayjs(dateRange[0]).format('YYYY/MM/DD'),
                endDay: dateRange && dayjs(dateRange[1]).format('YYYY/MM/DD'),
            },
        });
    };

    const columnMap: IColumnMap<
        ISpecialEducationalTraining & { index: number }
    >[] = [
        {
            title: '編號',
            width: 50,
            variable: 'index',
            getElement: defaultElement,
        },
        {
            title: '項次',
            width: 147,
            variable: 'item',
            getElement: defaultElement,
        },
        {
            title: '日期',
            width: 160,
            variable: 'date',
            getElement: (props) => (
                <SETDatePickerElement {...props} updateResult={updateResult} />
            ),
        },
        {
            title: '承商名稱',
            width: 130,
            variable: 'corp',
            getElement: defaultElement,
        },
        {
            title: '姓名',
            width: 130,
            variable: 'name',
            getElement: defaultElement,
        },
        {
            title: '身分證字號',
            width: 130,
            variable: 'idno',
            getElement: defaultElement,
        },
        {
            title: '次承商名稱',
            width: 130,
            variable: 'viceCorp',
            getElement: defaultElement,
        },
    ];

    return (
        <Flex
            direction={'column'}
            h={'100vh'}
            w={'100%'}
            pl={'42px'}
            pr={'42px'}
            pt={'47px'}
            pb={'24px'}
            gap={'11px'}
        >
            <Text variant={'pageTitle'}>特殊教育訓練</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <Input
                        ref={searchInputRef}
                        variant={'search'}
                        placeholder={'搜尋姓名或承商'}
                        onChange={handleInput}
                        height={'40px'}
                    />
                    <DateRangePicker
                        value={dateRange}
                        style={{
                            border: '2px solid #919AA9',
                            borderRadius: '6px',
                        }}
                        onChange={(value) => {
                            handleSearch(value);
                            setDateRange(value);
                        }}
                    />
                </Flex>
                <Flex gap={'10px'} align={'center'}>
                    <Button
                        variant={'buttonBlueSolid'}
                        leftIcon={<AddIcon />}
                        onClick={onOpen}
                    >
                        新增教育訓練
                    </Button>
                </Flex>
            </Flex>
            <ReactWindowTable
                tableData={tableData}
                setTableData={setTableData}
                columnMap={columnMap}
                sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
                sortReversed={true}
            />
            <CreateSETModal
                onClose={onClose}
                isOpen={isOpen}
                updateResult={updateResult}
                filterFunction={filterFunction}
            />
            {loading && <PageLoading />}
        </Flex>
    );
}
