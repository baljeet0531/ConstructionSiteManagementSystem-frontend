import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import { Box, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import ReactWindowTable, {
    AcceptDenyElement,
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
    IOutsourceFaultFormOverviewExtend,
} from '../../Interface/FaultForm';
import { TOverviewTable, useGQLOverview } from '../../Hooks/UseGQLOverview';
import { gql } from '@apollo/client';
import { SIGNATURE_FIELDS } from '../../Utils/GQLFragments';
import { codeContentMap } from '../../Utils/Mapper';
import dayjs from 'dayjs';

import { defaultSuccessToast } from '../../Utils/DefaultToast';
import AcceptDenySignatureModal, {
    TUpdateFaultFormCheck,
} from '../Shared/AcceptDenySignatureModal';

export const QUERY_OUTSOURCE_FAULT_FROM_OVERVIEW = gql`
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

const UPDATE_OUTSOURCE_FAULT_FORM_OVERVIEW = gql`
    mutation UpdateOutsourceFaultFormCheck(
        $code: String!
        $day: Date!
        $outsourcerDescription: String
        $outsourcerSignature: signatureInput
        $outsourcerStatus: Boolean
        $siteId: String!
        $target: String!
    ) {
        updateFaultFormCheck(
            code: $code
            day: $day
            outsourcerDescription: $outsourcerDescription
            outsourcerSignature: $outsourcerSignature
            outsourcerStatus: $outsourcerStatus
            siteId: $siteId
            target: $target
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

export default function OutsourceFaultOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('outsource_fault_form'))
        return <Navigate to="/" replace={true} />;
    const toast = useToast();
    const { siteId, siteName } = props;

    const faultFormDisclosure = useDisclosure();
    const signatureDisclosure = useDisclosure();
    const [accept, setAccept] = React.useState<boolean>(true);
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
    const [openingTarget, setOpeningTarget] = React.useState(
        {} as IOutsourceFaultFormOverviewExtend
    );

    const {
        tableData,
        setTableData,
        filteredPrimaryKey,
        searchFunction,
        updateFunction,
        loading,
    } = useGQLOverview<
        IOutsourceFaultFormOverview,
        { faultFormCheck: IOutsourceFaultFormOverview[] },
        {},
        TUpdateFaultFormCheck
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
                acc[primaryKey] = { ...value, index: index };
                return acc;
            }, {} as TOverviewTable<IOutsourceFaultFormOverviewExtend>),
        gqlFilter: QUERY_OUTSOURCE_FAULT_FROM_OVERVIEW,
        handleFilterKey: (data) =>
            data['faultFormCheck'].map(({ day, target, code }) =>
                JSON.stringify({ day, target, code })
            ),
        gqlUpdate: UPDATE_OUTSOURCE_FAULT_FORM_OVERVIEW,
        handleUpdate: ({ updateFaultFormCheck: { ok, message } }) => {
            ok && defaultSuccessToast(toast, message);
            signatureDisclosure.onClose();
        },
    });

    const columnMap: IColumnMap<IOutsourceFaultFormOverviewExtend>[] = [
        {
            title: '日期',
            width: 100,
            variable: 'day',
            getElement: ({
                style,
                info,
                variable,
            }: getElementProps<IOutsourceFaultFormOverviewExtend, 'day'>) => (
                <ModalOpenButtonElement
                    style={style}
                    info={info}
                    variable={variable}
                    onClick={() => {
                        setOpeningTarget(info);
                        faultFormDisclosure.onOpen();
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
            width: 344,
            variable: 'code',
            getElement: ({
                style,
                info,
                variable,
            }: getElementProps<IOutsourceFaultFormOverviewExtend, 'code'>) => (
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
            getElement: (props) => {
                return (
                    <AcceptDenyElement
                        {...props}
                        handleAccept={() => {
                            setAccept(true);
                            setOpeningTarget(props.info);
                            signatureDisclosure.onOpen();
                        }}
                        handleDeny={() => {
                            setAccept(false);
                            setOpeningTarget(props.info);
                            signatureDisclosure.onOpen();
                        }}
                    />
                );
            },
        },
    ];

    const handleSearch = (dateRange: DateRange | null) => {
        searchFunction({
            variables: {
                siteId: siteId,
                start: dateRange && dayjs(dateRange[0]).format('YYYY-MM-DD'),
                end: dateRange && dayjs(dateRange[1]).format('YYYY-MM-DD'),
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
        {...openingTarget}
        siteId={siteId}
        onClose={faultFormDisclosure.onClose}
        isOpen={faultFormDisclosure.isOpen}
    /> */}
            <AcceptDenySignatureModal
                siteId={siteId}
                openingTarget={openingTarget}
                accept={accept}
                updateFunction={updateFunction}
                role={'outsourcer'}
                isOpen={signatureDisclosure.isOpen}
                onClose={signatureDisclosure.onClose}
            />
            {loading && <PageLoading />}
        </Flex>
    );
}
