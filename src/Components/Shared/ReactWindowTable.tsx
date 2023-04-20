import React from 'react';
import {
    Box,
    Button,
    Center,
    ChakraProps,
    Checkbox,
    Flex,
    Text,
} from '@chakra-ui/react';
import { areEqual, VariableSizeGrid } from 'react-window';
import { IGQLSignature } from '../../Interface/Signature';
import Pin from './Pin';
import dayjs from 'dayjs';

const tableCellStyle: ChakraProps = {
    border: '1px solid #919AA9',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
};

const headerCellStyle: ChakraProps = {
    ...tableCellStyle,
    color: '#FFFFFF',
    bg: '#919AA9',
    p: '0px 5px 0px 5px',
    h: 'fit-content',
    overflow: 'hidden',
    textAlign: 'center',
    whiteSpace: 'pre-line',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
    border: 'none',
    borderBottom: '1px solid #919AA9',
};

export const dataCellStyle: ChakraProps = {
    ...tableCellStyle,
    color: '#667080',
    bg: '#FFFFFF',
    p: '5px',
    overflowX: 'auto',
    overflowY: 'hidden',
    lineHeight: '20px',
    overflowWrap: 'normal',
    wordBreak: 'keep-all',
    whiteSpace: 'nowrap',
    border: 'none',
    borderBottom: '1px solid #919AA9',
    pt: '12px',
};

export const borderedStyle: React.CSSProperties = {
    paddingTop: '5px',
    borderRight: '1px solid #919AA9',
    borderBottom: '1px solid #919AA9',
};

export const defaultElement = ({ style, info, variable }: getElementProps) => (
    <Box {...dataCellStyle} style={style}>
        {info[variable]}
    </Box>
);

export const CheckboxElement = (props: {
    getElementProps: getElementProps;
    setTableData: React.Dispatch<
        React.SetStateAction<{
            [primaryKey: string]: any;
        }>
    >;
    primaryKey: string;
}) => {
    const { setTableData, getElementProps, primaryKey } = props;
    const { style, info, variable } = getElementProps;
    return (
        <Box
            {...dataCellStyle}
            style={{
                paddingTop: '14px',
                borderBottom: '1px solid #919AA9',
                ...style,
            }}
        >
            <Checkbox
                isChecked={info[variable]}
                onChange={(e) => {
                    setTableData((prevState) => ({
                        ...prevState,
                        [primaryKey]: {
                            ...info,
                            isChecked: e.target.checked,
                        },
                    }));
                }}
            ></Checkbox>
        </Box>
    );
};

export const SignatureTooltip = (props: {
    field: { signature: IGQLSignature | null; fieldLabel: string };
}) => {
    const { signature, fieldLabel } = props.field;
    const label = signature ? (
        <Text>
            {`${fieldLabel}：`}
            <br />
            {signature.owner}
            <br />
            {dayjs(signature.time).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
    ) : (
        ''
    );
    return (
        <Pin msg={label}>
            <Button
                w={'40px'}
                h={'10px'}
                bg={signature ? '#9CE3DE' : 'rgba(102, 112, 128, 0.1)'}
                borderRadius={'4px'}
            ></Button>
        </Pin>
    );
};

export const SignatureStatusElement = (props: {
    getElementProps: getElementProps;
    signatureFieldList: {
        signature: IGQLSignature | null;
        fieldLabel: string;
    }[];
}) => {
    const { getElementProps, signatureFieldList } = props;
    const signatureStatusMap = signatureFieldList.map((field, index) => (
        <SignatureTooltip key={index} field={field}></SignatureTooltip>
    ));

    return (
        <Flex
            style={getElementProps.style}
            {...dataCellStyle}
            gap={'2px'}
            w={'170px'}
            align={'center'}
            justify={'center'}
            height={'20px'}
        >
            {signatureStatusMap}
        </Flex>
    );
};

export interface getElementProps {
    style: React.CSSProperties;
    info: any;
    variable: string;
}

export interface IColumnMap {
    title: string;
    width: number;
    variable: string;
    // eslint-disable-next-line no-unused-vars
    getElement: (props: getElementProps) => JSX.Element;
}

export interface ISizes {
    tableFigmaWidth?: number;
    headerHeight?: number;
    cellHeight?: number;
    fixedWidth?: number;
    fixedHeight?: number;
    padding?: {
        topPadding?: number;
        bottomPadding?: number;
        pagePadding?: number;
    };
    pageRatio?: number;
}

export default function ReactWindowTable(props: {
    tableData: {
        [primaryKey: string]: any;
    };
    setTableData: React.Dispatch<
        React.SetStateAction<{
            [primaryKey: string]: any;
        }>
    >;
    columnMap: IColumnMap[];
    sizes: ISizes;
    filteredPrimaryKey?: string[];
    sortReversed?: boolean;
    columnBordered?: boolean;
}) {
    const {
        tableData,
        setTableData,
        columnMap,
        sizes,
        filteredPrimaryKey,
        sortReversed = false,
        columnBordered = false,
    } = props;

    const {
        tableFigmaWidth = 877,
        headerHeight = 65,
        cellHeight = 30,
        pageRatio = 0.8,
        padding,
        fixedWidth,
        fixedHeight,
    } = sizes;

    const {
        topPadding = 148,
        bottomPadding = 52,
        pagePadding = 42,
    } = padding || {};

    const displayTableData: {
        [primaryKey: string]: any;
    } =
        tableData &&
        (!filteredPrimaryKey
            ? tableData
            : filteredPrimaryKey.length == 0
            ? {}
            : Object.assign(
                  {},
                  ...filteredPrimaryKey.map((primaryKey) => ({
                      [primaryKey]: {
                          ...tableData[primaryKey as keyof typeof tableData],
                      },
                  }))
              ));

    const sortingFunction = (a: string, b: string) => {
        const diff = displayTableData[a].index - displayTableData[b].index;
        return sortReversed ? -diff : diff;
    };
    const primaryKeys = Object.keys(displayTableData).sort(sortingFunction);

    const variableSizeHeaderRef = React.useRef<VariableSizeGrid>(null);
    const variableSizeDataRef = React.useRef<VariableSizeGrid>(null);

    const [tableWidth, setTableWidth] = React.useState(
        fixedWidth || window.innerWidth * pageRatio - 2 * pagePadding
    );
    const [tableHeight, setTableHeight] = React.useState(
        fixedHeight ||
            window.innerHeight - topPadding - headerHeight - bottomPadding
    );

    const getColumnWidth = (index: number) => {
        const offset = index == columnMap.length - 1 ? -6 : 0;
        const width =
            (columnMap[index]['width'] / tableFigmaWidth) * tableWidth + offset;
        return width;
    };

    React.useEffect(() => {
        const watchResize = () => {
            !fixedWidth &&
                setTableWidth(window.innerWidth * pageRatio - 2 * pagePadding);
            !fixedHeight &&
                setTableHeight(
                    window.innerHeight -
                        topPadding -
                        headerHeight -
                        bottomPadding
                );
            variableSizeHeaderRef.current &&
                variableSizeHeaderRef.current.resetAfterColumnIndex(0);
            variableSizeDataRef.current &&
                variableSizeDataRef.current.resetAfterColumnIndex(0);
        };
        window.addEventListener('resize', watchResize);
        window.addEventListener('orientationchange', watchResize);
        return () => {
            window.removeEventListener('resize', watchResize);
            window.removeEventListener('orientationchange', watchResize);
        };
    }, []);

    const memorizedTable = React.memo(
        (props: {
            columnIndex: number;
            rowIndex: number;
            style: React.CSSProperties;
            data: {
                [primaryKey: string]: any;
            };
        }) => {
            const { columnIndex, rowIndex, style, data } = props;
            const info = data[primaryKeys[rowIndex]];
            const columnInfo = columnMap[columnIndex];
            const element = columnInfo.getElement({
                style:
                    columnBordered && columnIndex !== columnMap.length - 1
                        ? { ...style, ...borderedStyle }
                        : style,
                info: info,
                variable: columnInfo.variable,
            });
            return element;
        },
        areEqual
    );

    return (
        <Flex direction={'column'}>
            <VariableSizeGrid
                ref={variableSizeHeaderRef}
                style={{
                    outline: '2px solid #919AA9',
                    background: '#919AA9',
                }}
                columnCount={columnMap.length}
                columnWidth={getColumnWidth}
                height={headerHeight}
                rowCount={1}
                rowHeight={() => headerHeight}
                width={tableWidth}
            >
                {({ columnIndex, style }) => {
                    const title = columnMap[columnIndex]['title'];
                    if (title == '全選') {
                        const checkedItems = Object.values(tableData);

                        const allChecked = checkedItems.every(
                            (info) => info['isChecked']
                        );
                        const isIndeterminate =
                            checkedItems.some((info) => info['isChecked']) &&
                            !allChecked;
                        return (
                            <Center style={style} {...headerCellStyle}>
                                <Checkbox
                                    isChecked={allChecked}
                                    isIndeterminate={isIndeterminate}
                                    onChange={() => {
                                        const nextCheckedState =
                                            primaryKeys.length !== 0 &&
                                            !tableData[primaryKeys[0]]
                                                .isChecked;
                                        primaryKeys.forEach((primaryKey) => {
                                            const info = tableData[primaryKey];
                                            tableData[primaryKey] = {
                                                ...info,
                                                isChecked: nextCheckedState,
                                            };
                                        });
                                        setTableData({ ...tableData });
                                    }}
                                ></Checkbox>
                            </Center>
                        );
                    }
                    return (
                        <Center style={style} {...headerCellStyle}>
                            {title}
                        </Center>
                    );
                }}
            </VariableSizeGrid>
            <VariableSizeGrid
                ref={variableSizeDataRef}
                style={{
                    outline: '2px solid #919AA9',
                    background: '#FFFFFF',
                }}
                columnCount={columnMap.length}
                columnWidth={getColumnWidth}
                height={tableHeight}
                rowCount={primaryKeys.length}
                rowHeight={() => cellHeight}
                width={tableWidth}
                itemData={displayTableData}
            >
                {memorizedTable}
            </VariableSizeGrid>
        </Flex>
    );
}
