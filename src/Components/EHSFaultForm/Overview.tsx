import {
    Box,
    Button,
    Flex,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import React from 'react';
import { DateRangePicker } from 'rsuite';
import { LaunchIcon } from '../../Icons/Icons';
import ReactWindowTable, {
    CheckboxElement,
    IColumnMap,
    ISizes,
    ModalOpenButtonElement,
    dataCellStyle,
    defaultElement,
    getElementProps,
} from '../Shared/ReactWindowTable';
import FaultFormModal from './Modal';
import { PageLoading } from '../Shared/Loading';
import { useFileExport } from '../../Hooks/UseFileExport';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { Cookies } from 'react-cookie';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import dayjs from 'dayjs';
import { codeContentMap } from '../../Utils/Mapper';

export interface IEHSFaultFormOverview {
    day: string;
    responsibleTarget: string;
    code: string;
    staff: string;
    area: string;
}

export interface IEHSFaultFormOverviewChecked extends IEHSFaultFormOverview {
    index: number;
    isChecked: boolean;
}

export interface IEHSFaultFormOverviewTable {
    [key: string]: IEHSFaultFormOverviewChecked;
}

export interface IFaultFormPrimaryKey {
    day: string;
    responsibleTarget: string;
    code: string;
}

const QUERY_FAULT_FROM_OVERVIEW = gql`
    query EHSFaultFormOverview($siteId: String!, $start: Date, $end: Date) {
        faultForm(siteId: $siteId, start: $start, end: $end) {
            day
            responsibleTarget
            code
            staff
            area
        }
    }
`;

const EXPORT_FAULT_FORM = gql`
    mutation ExportFaultForm(
        $infos: [gqlFaultFormExportArgument]!
        $siteId: String!
        $username: String!
    ) {
        exportFaultForm(infos: $infos, siteId: $siteId, username: $username) {
            ok
            message
            path
        }
    }
`;

const sizes: ISizes = {
    headerHeight: 44,
    cellHeight: 44,
};

export default function EHSFaultOverview(props: {
    siteId: string;
    siteName: string;
}) {
    const { siteId, siteName } = props;

    const toast = useToast();
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { fileLoading, exportFile } = useFileExport();
    const username = new Cookies().get('username');

    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
    const [tableData, setTableData] =
        React.useState<IEHSFaultFormOverviewTable>({});
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();

    const [openingTarget, setOpeningTarget] =
        React.useState<IFaultFormPrimaryKey>({
            day: '',
            responsibleTarget: '',
            code: '',
        });

    const columnMap: IColumnMap<IEHSFaultFormOverviewChecked>[] = [
        {
            title: '日期',
            width: 100,
            variable: 'day',
            getElement: ({
                style,
                info,
                variable,
            }: getElementProps<IEHSFaultFormOverviewChecked, 'day'>) => (
                <ModalOpenButtonElement
                    style={style}
                    info={info}
                    variable={variable}
                    onClick={() => {
                        const { day, responsibleTarget, code } = info;
                        setOpeningTarget({ day, responsibleTarget, code });
                        onOpen();
                    }}
                />
            ),
        },
        {
            title: '巡檢對象',
            width: 100,
            variable: 'responsibleTarget',
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
            }: getElementProps<IEHSFaultFormOverviewChecked, 'code'>) => (
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
            title: '地點',
            width: 100,
            variable: 'area ',
            getElement: defaultElement,
        },
        {
            title: '全選',
            width: 50,
            variable: 'isChecked',
            getElement: (props) => {
                const { day, responsibleTarget, code } = props.info;
                return (
                    <CheckboxElement
                        getElementProps={props}
                        setTableData={setTableData}
                        primaryKey={JSON.stringify({
                            day,
                            responsibleTarget,
                            code,
                        })}
                    />
                );
            },
        },
    ];

    const { loading } = useQuery(QUERY_FAULT_FROM_OVERVIEW, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            faultForm,
        }: {
            faultForm: IEHSFaultFormOverview[];
        }) => {
            const formattedData = faultForm.reduce((acc, value, index) => {
                const { day, responsibleTarget, code } = value;
                const primaryKey = JSON.stringify({
                    day,
                    responsibleTarget,
                    code,
                });
                acc[primaryKey] = {
                    ...value,
                    index: index,
                    isChecked: false,
                };
                return acc;
            }, {} as IEHSFaultFormOverviewTable);
            setTableData(formattedData);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [searchEHSFault, { loading: searchLoading }] = useLazyQuery(
        QUERY_FAULT_FROM_OVERVIEW,
        {
            onCompleted: ({
                faultForm,
            }: {
                faultForm: IEHSFaultFormOverview[];
            }) => {
                setFilteredPrimaryKey(
                    faultForm.map(({ day, responsibleTarget, code }) =>
                        JSON.stringify({ day, responsibleTarget, code })
                    )
                );
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            fetchPolicy: 'network-only',
        }
    );

    const [exportEHSFault, { loading: exportLoading }] = useMutation(
        EXPORT_FAULT_FORM,
        {
            onCompleted: ({ exportFaultForm }) => {
                exportFile(exportFaultForm);
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            fetchPolicy: 'network-only',
        }
    );

    const handleSearch = (dateRange: DateRange | null) => {
        searchEHSFault({
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
            <Text variant={'pageTitle'}>環安衛自主檢點表</Text>
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
                <Button
                    leftIcon={<LaunchIcon />}
                    variant={'buttonGrayOutline'}
                    onClick={() => {
                        const checked = Object.values(tableData).flatMap(
                            ({ day, responsibleTarget, code, isChecked }) =>
                                isChecked
                                    ? { day, responsibleTarget, code }
                                    : []
                        );
                        checked.length &&
                            exportEHSFault({
                                variables: {
                                    infos: checked,
                                    siteId: siteId,
                                    username: username,
                                },
                            });
                    }}
                >
                    輸出
                </Button>
            </Flex>
            <ReactWindowTable
                tableData={tableData}
                setTableData={setTableData}
                columnMap={columnMap}
                sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
                sortReversed={true}
            />
            <FaultFormModal
                siteId={siteId}
                {...openingTarget}
                onClose={onClose}
                isOpen={isOpen}
            />
            {(loading || searchLoading || exportLoading || fileLoading) && (
                <PageLoading />
            )}
        </Flex>
    );
}
