import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import ReactWindowTable, {
    IColumnMap,
    ISizes,
    ModalOpenButtonElement,
    dataCellStyle,
    defaultElement,
    getElementProps,
} from '../Shared/ReactWindowTable';
import { PageLoading } from '../Shared/Loading';
import {
    IOutsourceFaultFormOverview,
    IFaultFormPrimaryKey,
} from '../../Interface/FaultForm';
import { IExportField } from '../../Interface/IGQL';
import {
    TOverviewChecked,
    TOverviewTable,
    useGQLOverview,
} from '../../Hooks/UseGQLOverview';
import { gql } from '@apollo/client';
import { SIGNATURE_FIELDS } from '../../Utils/GQLFragments';
import { codeContentMap } from '../../Utils/Mapper';
import dayjs from 'dayjs';

const QUERY_OUTSOURCE_FAULT_FROM_OVERVIEW = gql`
    ${SIGNATURE_FIELDS}
    query FaultFormCheck($siteId: String!, $start: Date, $end: Date) {
        faultFormCheck(siteId: $siteId, start: $start, end: $end) {
            siteId
            day
            target
            code
            staff
            outsourcerStatus
            outsourcerDescription
            outsourcerSignature {
                ...gqlSignatureFields
            }
        }
    }
`;

const sizes: ISizes = {
    headerHeight: 44,
    cellHeight: 44,
};

export default function OutsourceFaultOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('outsource_fault_form'))
        return <Navigate to="/" replace={true} />;
    const { siteId, siteName } = props;
    // eslint-disable-next-line no-unused-vars
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
    // eslint-disable-next-line no-unused-vars
    const [openingTarget, setOpeningTarget] =
        React.useState<IFaultFormPrimaryKey>({
            day: '',
            responsibleTarget: '',
            code: '',
        });
    const {
        tableData,
        setTableData,
        filteredPrimaryKey,
        searchFunction,
        loading,
    } = useGQLOverview<
        IOutsourceFaultFormOverview,
        { faultFormCheck: IOutsourceFaultFormOverview[] },
        { exportFaultForm: IExportField }
    >({
        siteId: siteId,
        gqlOverview: QUERY_OUTSOURCE_FAULT_FROM_OVERVIEW,
        handleData: (data) =>
            data['faultFormCheck'].reduce((acc, value, index) => {
                const { day, target, code } = value;
                const primaryKey = JSON.stringify({
                    day,
                    target,
                    code,
                });
                acc[primaryKey] = {
                    ...value,
                    index: index,
                    isChecked: false,
                };
                return acc;
            }, {} as TOverviewTable<IOutsourceFaultFormOverview>),
        gqlFilter: QUERY_OUTSOURCE_FAULT_FROM_OVERVIEW,
        handleFilterKey: (data) =>
            data['faultFormCheck'].map(({ day, target, code }) =>
                JSON.stringify({ day, target, code })
            ),
    });

    const columnMap: IColumnMap<
        TOverviewChecked<IOutsourceFaultFormOverview>
    >[] = [
        {
            title: '日期',
            width: 100,
            variable: 'day',
            getElement: ({
                style,
                info,
                variable,
            }: getElementProps<
                TOverviewChecked<IOutsourceFaultFormOverview>,
                'day'
            >) => (
                <ModalOpenButtonElement
                    style={style}
                    info={info}
                    variable={variable}
                    onClick={() => {
                        const { day, target, code } = info;
                        setOpeningTarget({
                            day,
                            responsibleTarget: target,
                            code,
                        });
                        onOpen();
                    }}
                />
            ),
        },
        {
            title: '巡檢對象',
            width: 100,
            variable: 'target',
            getElement: defaultElement,
        },
        {
            title: '巡檢人員',
            width: 100,
            variable: 'staff',
            getElement: defaultElement,
        },
        {
            title: '代碼',
            width: 100,
            variable: 'code',
            getElement: defaultElement,
        },
        {
            title: '檢點項目',
            width: 327,
            variable: 'code',
            getElement: ({
                style,
                info,
                variable,
            }: getElementProps<
                TOverviewChecked<IOutsourceFaultFormOverview>,
                'code'
            >) => (
                <Box {...dataCellStyle} style={style}>
                    {
                        codeContentMap[
                            info[variable] as keyof typeof codeContentMap
                        ].content
                    }
                </Box>
            ),
        },
        {
            title: '動作',
            width: 133,
            variable: 'outsourcerStatus',
            getElement: ({ style, info }) => {
                const {
                    outsourcerStatus,
                    // eslint-disable-next-line no-unused-vars
                    outsourcerDescription,
                    // eslint-disable-next-line no-unused-vars
                    outsourcerSignature,
                } = info;

                return (
                    <Box {...dataCellStyle} style={style} pt={0} p={0}>
                        {outsourcerStatus === null ? (
                            <Flex
                                h={'44px'}
                                align={'center'}
                                justify={'center'}
                                gap={'10px'}
                            >
                                <Button
                                    variant={'buttonBlueSolid'}
                                    height={'20px'}
                                    width={'36px'}
                                    fontSize={'10px'}
                                    onClick={() => {
                                        // navSingleWorkPermit(info['number'], false);
                                    }}
                                >
                                    申請
                                </Button>
                                <Button
                                    variant={'buttonBlueSolid'}
                                    height={'20px'}
                                    width={'36px'}
                                    fontSize={'10px'}
                                    bg={'#DB504A'}
                                    _hover={{ bg: '#DB504A77' }}
                                    onClick={() => {
                                        // navSingleWorkPermit(info['number'], true);
                                    }}
                                >
                                    異動
                                </Button>

                                {/* <Button>接受</Button>
                                <Button>異議</Button> */}
                            </Flex>
                        ) : outsourcerStatus ? (
                            <Text>接受</Text>
                        ) : (
                            <Text>異議</Text>
                        )}
                    </Box>
                );
            },
        },
    ];

    const handleSearch = (dateRange: DateRange | null) => {
        searchFunction({
            variables: {
                siteId: siteId,
                start: dateRange && dayjs(dateRange[0]).format('YYYY/MM/DD'),
                end: dateRange && dayjs(dateRange[1]).format('YYYY/MM/DD'),
            },
        });
    };

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
            <Text variant={'pageSiteName'}>{siteName}</Text>
            <Text variant={'pageTitle'}>工安缺失單</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
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
            </Flex>
            <ReactWindowTable
                tableData={tableData}
                setTableData={setTableData}
                columnMap={columnMap}
                sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
                sortReversed={true}
            />
            {/* <FaultFormModal
        siteId={siteId}
        {...openingTarget}
        onClose={onClose}
        isOpen={isOpen}
    /> */}
            {loading && <PageLoading />}
        </Flex>
    );
}
