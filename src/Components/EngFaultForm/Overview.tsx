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
    dataCellStyle,
    defaultElement,
    faultCodeMapElement,
    getElementProps,
} from '../Shared/ReactWindowTable';
import { PageLoading } from '../Shared/Loading';
import {
    IFaultFormCheckOverview,
    IFaultFormCheckOverviewExtend,
    IQueryFaultFormCheck,
    IQueryFaultFormCheckVar,
    IUpdateFaultFormCheck,
    IUpdateFaultFormCheckVar,
} from '../../Interface/FaultForm';
import { useGQLOverview } from '../../Hooks/UseGQLOverview';
import { gql } from '@apollo/client';
import { SIGNATURE_FIELDS } from '../../Utils/GQLFragments';
import dayjs from 'dayjs';
import AcceptDenySignatureModal, {
    TRole,
} from '../Shared/AcceptDenySignatureModal';
import { defaultSuccessToast } from '../../Utils/DefaultToast';
import ManagerAcceptDenyModal from './ManagerAcceptDenyModal';
import { TOverviewTable } from '../../Types/TableOverview';

const QUERY_ENG_FAULT_FROM_OVERVIEW = gql`
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
            engineerStatus
            engineerDescription
            engineerSignature {
                ...gqlSignatureFields
            }
            managerStatus
        }
    }
`;

const UPDATE_ENG_FAULT_FORM_OVERVIEW = gql`
    mutation UpdateEngFaultFormCheck(
        $code: String!
        $day: Date!
        $engineerDescription: String
        $engineerSignature: signatureInput
        $engineerStatus: Boolean
        $managerStatus: Boolean
        $outsourcerStatus: Boolean
        $siteId: String!
        $staff: String
        $target: String!
    ) {
        updateFaultFormCheck(
            code: $code
            day: $day
            engineerDescription: $engineerDescription
            engineerSignature: $engineerSignature
            engineerStatus: $engineerStatus
            managerStatus: $managerStatus
            outsourcerStatus: $outsourcerStatus
            siteId: $siteId
            staff: $staff
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

export default function EngFaultOverview(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('eng_fault_form')) return <Navigate to="/" replace={true} />;

    const { siteId, siteName } = props;
    const toast = useToast();
    const signatureDisclosure = useDisclosure();
    const managerDisclosure = useDisclosure();
    const [accept, setAccept] = React.useState<boolean>(true);
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
    const [openingTarget, setOpeningTarget] = React.useState(
        {} as IFaultFormCheckOverviewExtend
    );
    const [role, setRole] = React.useState<TRole>('outsourcer');
    const {
        tableData,
        setTableData,
        filteredPrimaryKey,
        filterResult: [filterFunction],
        updateResult: [updateFunction],
        loading,
    } = useGQLOverview<
        IFaultFormCheckOverview,
        IQueryFaultFormCheck,
        IQueryFaultFormCheckVar,
        IUpdateFaultFormCheck,
        IUpdateFaultFormCheckVar
    >({
        gqlOverview: QUERY_ENG_FAULT_FROM_OVERVIEW,
        handleData: (data) =>
            data['faultFormCheck'].reduce((acc, value, index) => {
                const { day, target, code } = value;
                const primaryKey = JSON.stringify({
                    day,
                    target,
                    code,
                });

                acc[primaryKey] = { ...value, index };
                return acc;
            }, {} as TOverviewTable<IFaultFormCheckOverviewExtend>),
        overviewOptions: {
            variables: {
                siteId,
            },
        },
        gqlFilter: QUERY_ENG_FAULT_FROM_OVERVIEW,
        handleFilterKey: (data) =>
            data['faultFormCheck'].map(({ day, target, code }) =>
                JSON.stringify({ day, target, code })
            ),
        gqlUpdate: UPDATE_ENG_FAULT_FORM_OVERVIEW,
        handleUpdate: ({ updateFaultFormCheck: { ok, message } }) => {
            ok && defaultSuccessToast(toast, message);
            signatureDisclosure.onClose();
        },
    });

    const columnMap: IColumnMap<IFaultFormCheckOverviewExtend>[] = [
        {
            title: '日期',
            width: 100,
            variable: 'day',
            getElement: defaultElement,
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
            width: 79,
            variable: 'code',
            getElement: defaultElement,
        },
        {
            title: '檢點項目',
            width: 198,
            variable: 'code',
            getElement: faultCodeMapElement<IFaultFormCheckOverviewExtend>,
        },
        {
            title: '承商意見',
            width: 100,
            variable: 'outsourcerStatus',
            getElement: (
                props: getElementProps<
                    IFaultFormCheckOverviewExtend,
                    'outsourcerStatus'
                >
            ) => {
                const { style, info, variable } = props;
                const status = info[variable];
                const handleClick = () => {
                    setRole('outsourcer');
                    setOpeningTarget(info);
                    signatureDisclosure.onOpen();
                };
                return status === null ? (
                    <Box {...dataCellStyle} style={style}>
                        待確認
                    </Box>
                ) : (
                    <AcceptDenyElement
                        {...props}
                        openModal
                        handleAccept={() => {
                            setAccept(true);
                            handleClick();
                        }}
                        handleDeny={() => {
                            setAccept(false);
                            handleClick();
                        }}
                    />
                );
            },
        },
        {
            title: '工程師意見',
            width: 100,
            variable: 'engineerStatus',
            getElement: (props) => {
                const handleClick = () => {
                    setRole('engineer');
                    setOpeningTarget(props.info);
                    signatureDisclosure.onOpen();
                };
                return props.info.outsourcerStatus === null ? (
                    defaultElement(props)
                ) : (
                    <AcceptDenyElement
                        {...props}
                        openModal
                        handleAccept={() => {
                            setAccept(true);
                            handleClick();
                        }}
                        handleDeny={() => {
                            setAccept(false);
                            handleClick();
                        }}
                    />
                );
            },
        },
        {
            title: '工地經理意見',
            width: 100,
            variable: 'managerStatus',
            getElement: (props) => {
                return props.info.engineerStatus === null ? (
                    defaultElement(props)
                ) : (
                    <AcceptDenyElement
                        {...props}
                        denyText="駁回"
                        handleAccept={() => {
                            setAccept(true);
                            setOpeningTarget(props.info);
                            managerDisclosure.onOpen();
                        }}
                        handleDeny={() => {
                            setAccept(false);
                            setOpeningTarget(props.info);
                            managerDisclosure.onOpen();
                        }}
                    />
                );
            },
        },
    ];

    const handleSearch = (dateRange: DateRange | null) => {
        filterFunction({
            variables: {
                siteId: siteId,
                start: dateRange && dayjs(dateRange[0]).format('YYYY/MM/DD'),
                end: dateRange && dayjs(dateRange[1]).format('YYYY/MM/DD'),
            },
        });
    };

    const modalKey = {
        day: openingTarget.day,
        target: openingTarget.target,
        code: openingTarget.code,
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
            <AcceptDenySignatureModal
                key={JSON.stringify(modalKey)}
                siteId={siteId}
                openingTarget={openingTarget}
                accept={accept}
                editable={openingTarget[`${role}Status`] === null}
                updateFunction={updateFunction}
                role={role}
                isOpen={signatureDisclosure.isOpen}
                onClose={signatureDisclosure.onClose}
            />
            <ManagerAcceptDenyModal
                siteId={siteId}
                openingTarget={openingTarget}
                accept={accept}
                updateFunction={updateFunction}
                isOpen={managerDisclosure.isOpen}
                onClose={managerDisclosure.onClose}
            />
            {loading && <PageLoading />}
        </Flex>
    );
}
