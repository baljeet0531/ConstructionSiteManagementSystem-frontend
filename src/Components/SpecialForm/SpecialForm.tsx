/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Flex, Select, Text } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker/types';
import { LaunchIcon } from '../../Icons/Icons';
import { IsPermit } from '../../Mockdata/Mockdata';
import { IGQLSignature } from '../../Interface/Signature';
import ReactWindowTable, {
    CheckboxElement,
    defaultElement,
    getElementProps,
    IColumnMap,
    ISizes,
    SignatureStatusElement,
} from '../Shared/ReactWindowTable';

export interface IOperationOverview {
    day: string;
    number: string;
    type: operationType;
    area: string;
    department: string;
    supervisorBeforeRef: IGQLSignature | null;
    staffBeforeRef: IGQLSignature | null;
    supervisorAfterRef: IGQLSignature | null;
    staffAfterRef: IGQLSignature | null;
}

export interface IOperationOverviewChecked extends IOperationOverview {
    index: number;
    isChecked: boolean;
}

export type operationType =
    | '全部'
    | '動火作業'
    | '高架作業'
    | '侷限空間作業'
    | '電力作業'
    | '吊籠作業'
    | '起重吊掛作業'
    | '施工架組裝作業'
    | '管線拆離作業'
    | '開口作業'
    | '化學作業';

const operationOptions: operationType[] = [
    '全部',
    '動火作業',
    '高架作業',
    '侷限空間作業',
    '電力作業',
    '吊籠作業',
    '起重吊掛作業',
    '施工架組裝作業',
    '管線拆離作業',
    '開口作業',
    '化學作業',
];

const operationOptionsElements = operationOptions.map((type, index) => (
    <option key={index} value={type}>
        {type}
    </option>
));

const sizes: ISizes = {
    tableFigmaWidth: 877,
    headerHeight: 44,
    cellHeight: 44,
};

export default function SpecialForm(props: {
    siteId: string;
    siteName: string;
}) {
    if (!IsPermit('eng_special_form'))
        return <Navigate to="/" replace={true} />;
    const { siteId, siteName } = props;
    const [dateRange, setDateRange] = React.useState<DateRange | null>(null);

    const columnMap: IColumnMap[] = [
        {
            title: '日期',
            width: 120,
            variable: 'day',
            getElement: defaultElement,
        },
        {
            title: '單號',
            width: 120,
            variable: 'number',
            getElement: defaultElement,
        },
        {
            title: '作業名稱',
            width: 120,
            variable: 'type',
            getElement: defaultElement,
        },
        {
            title: '施工地點',
            width: 120,
            variable: 'area',
            getElement: defaultElement,
        },
        {
            title: '作業單位',
            width: 120,
            variable: 'department',
            getElement: defaultElement,
        },
        {
            title: '簽核狀態',
            width: 227,
            variable: 'signatureStatus',
            getElement: (props: getElementProps) => {
                const {
                    supervisorBeforeRef,
                    staffBeforeRef,
                    supervisorAfterRef,
                    staffAfterRef,
                } = props.info as IOperationOverviewChecked;
                const signatureFieldList = [
                    {
                        signature: supervisorBeforeRef,
                        fieldLabel: '監工(施工前)',
                    },
                    {
                        signature: staffBeforeRef,
                        fieldLabel: '作業人員(施工前)',
                    },
                    {
                        signature: supervisorAfterRef,
                        fieldLabel: '監工(收工前)',
                    },
                    {
                        signature: staffAfterRef,
                        fieldLabel: '作業人員(收工前)',
                    },
                ];

                return (
                    <SignatureStatusElement
                        getElementProps={props}
                        signatureFieldList={signatureFieldList}
                    ></SignatureStatusElement>
                );
            },
        },
        {
            title: '全選',
            width: 50,
            variable: 'isChecked',
            getElement: (props: getElementProps) => (
                <CheckboxElement
                    getElementProps={props}
                    setTableData={setTableData}
                    primaryKey={'number'}
                ></CheckboxElement>
            ),
        },
    ];

    const [tableData, setTableData] = React.useState<{
        [number: string]: IOperationOverviewChecked;
    }>({});
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();

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
            <Text variant={'pageTitle'}>特殊作業自主檢點表</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <DateRangePicker
                        value={dateRange}
                        style={{
                            border: '2px solid #919AA9',
                            borderRadius: '6px',
                        }}
                        onChange={(value) => {
                            // handleSearch(value);
                            setDateRange(value);
                        }}
                    />
                    <Select variant={'formOutline'}>
                        {operationOptionsElements}
                    </Select>
                </Flex>
                <Button
                    leftIcon={<LaunchIcon />}
                    variant={'buttonGrayOutline'}
                    onClick={() => {
                        // const username = new Cookies().get('username');
                        // const numbers = Object.values(tableData).flatMap(
                        //     (info) => (info.isChecked ? info.number : [])
                        // );
                        // exportToolbox({
                        //     variables: {
                        //         number: numbers,
                        //         siteId: siteId,
                        //         username: username,
                        //     },
                        // });
                    }}
                >
                    輸出
                </Button>
            </Flex>
            <ReactWindowTable
                tableData={tableData}
                columnMap={columnMap}
                sizes={sizes}
                filteredPrimaryKey={filteredPrimaryKey}
            />
        </Flex>
    );
}
