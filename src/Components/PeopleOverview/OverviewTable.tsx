import { Box, Center, ChakraProps, Checkbox, TabPanel } from '@chakra-ui/react';
import React from 'react';
import { areEqual, VariableSizeGrid } from 'react-window';
import { humanTableValues, tabMap } from './PeopleOverview';

export type ValueOf<T> = T[keyof T];

export default function OverViewTable(props: {
    tabItem: ValueOf<typeof tabMap>;
    tableValue: { [primaryKey: string]: humanTableValues } | undefined;
    setTableValue: React.Dispatch<
        React.SetStateAction<
            | {
                  [idno: string]: humanTableValues;
              }
            | undefined
        >
    >;
    searchPrimaryKey: string[] | undefined;
    selectAll: boolean;
    setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
    errorOnly: boolean;
}) {
    const {
        tabItem,
        tableValue,
        setTableValue,
        searchPrimaryKey,
        selectAll,
        setSelectAll,
        errorOnly,
    } = props;

    const tableCellStyle: ChakraProps = {
        borderRight: '1px solid #919AA9',
        borderBottom: '1px solid #919AA9',
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
    };

    const dataCellStyle: ChakraProps = {
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
    };

    const warningDataCellStyle: ChakraProps = {
        ...dataCellStyle,
        bg: '#FDFFE3',
    };
    const errorDataCellStyle: ChakraProps = {
        ...dataCellStyle,
        bg: '#DB504A1A',
    };

    const tableViewData: {
        [primaryKey: string]: humanTableValues;
    } =
        tableValue && searchPrimaryKey
            ? searchPrimaryKey.length != 0
                ? Object.assign(
                      {},
                      ...searchPrimaryKey.map((primaryKey) => {
                          return {
                              [primaryKey]: {
                                  ...tableValue[primaryKey],
                              },
                          };
                      })
                  )
                : {}
            : tableValue;
    const primarykeys = tableViewData
        ? Object.keys(tableViewData).sort(
              (a, b) => tableViewData[a].index - tableViewData[b].index
          )
        : [];
    const columnInfo = Object.values(tabItem);
    const memorizedTable = React.memo(
        ({
            columnIndex,
            rowIndex,
            style,
            data,
        }: {
            columnIndex: number;
            rowIndex: number;
            style: React.CSSProperties;
            data: {
                [primaryKey: string]: humanTableValues;
            };
        }) => {
            const header = columnInfo[columnIndex]['variable'] as string;
            const info: humanTableValues = data[primarykeys[rowIndex]];
            const cellValue = info[header as keyof humanTableValues];

            if (header == 'isCheck') {
                return (
                    <Box style={style} {...dataCellStyle} borderRight={'none'}>
                        <Checkbox
                            value={info['idno']}
                            isChecked={info['isCheck']}
                            onChange={(e) => {
                                const primaryKey = errorOnly
                                    ? info['no']
                                    : info['idno'];
                                setTableValue({
                                    ...tableValue,
                                    [primaryKey as string]: {
                                        ...info,
                                        isCheck: e.target.checked,
                                    },
                                });
                                if (!e.target.checked) {
                                    setSelectAll(false);
                                }
                            }}
                        ></Checkbox>
                    </Box>
                );
            } else if (header.slice(-6) == 'Status') {
                const statusValue = cellValue as string;
                const cellStyle = statusValue.startsWith('已過期')
                    ? errorDataCellStyle
                    : statusValue.endsWith('天後過期')
                    ? warningDataCellStyle
                    : dataCellStyle;

                return (
                    <Box style={style} {...cellStyle}>
                        {statusValue.startsWith('無法判斷')
                            ? '無法判斷'
                            : cellValue}
                    </Box>
                );
            } else {
                return (
                    <Box
                        style={style}
                        {...(cellValue == '日期錯誤'
                            ? errorDataCellStyle
                            : dataCellStyle)}
                    >
                        {cellValue}
                    </Box>
                );
            }
        },
        areEqual
    );

    const variableSizeHeaderRef = React.useRef<VariableSizeGrid>(null);
    const variableSizeDataRef = React.useRef<VariableSizeGrid>(null);

    const pagePadding = 42;
    const pageRatio = 0.8;
    const tableFigmaWidth = 877;
    const headerHeight = 65;
    const tablePaddingTop = 207 + headerHeight;
    const tablePaddingBottom = 52;

    const [tableViewWidth, setTableViewWidth] = React.useState(
        window.innerWidth * pageRatio - 2 * pagePadding
    );
    const [tableViewHeight, setTableViewHeight] = React.useState(
        window.innerHeight - tablePaddingTop - tablePaddingBottom
    );

    const getColumnWidth = (index: number) => {
        const offset = index == columnInfo.length - 1 ? -6 : 0;
        return (
            (columnInfo[index]['width'] / tableFigmaWidth) * tableViewWidth +
            offset
        );
    };
    React.useEffect(() => {
        const watchResize = () => {
            setTableViewWidth(window.innerWidth * pageRatio - 2 * pagePadding);
            setTableViewHeight(
                window.innerHeight - tablePaddingTop - tablePaddingBottom
            );
            variableSizeHeaderRef.current &&
                variableSizeHeaderRef.current.resetAfterColumnIndex(0);
            variableSizeDataRef.current &&
                variableSizeDataRef.current.resetAfterColumnIndex(0);
        };
        window.addEventListener('resize', watchResize);
        return () => {
            window.removeEventListener('resize', watchResize);
        };
    }, []);

    return (
        <TabPanel p={0} mt={'17px'} w={'100%'} h={'100%'}>
            {
                <VariableSizeGrid
                    ref={variableSizeHeaderRef}
                    style={{
                        outline: '2px solid #919AA9',
                        background: '#919AA9',
                        scrollbarWidth: 'none',
                    }}
                    rowCount={1}
                    columnCount={columnInfo.length}
                    height={65}
                    width={tableViewWidth}
                    columnWidth={getColumnWidth}
                    rowHeight={() => headerHeight}
                >
                    {({ columnIndex, style }) => {
                        return (
                            <Center style={style} {...headerCellStyle}>
                                {Object.keys(tabItem)[columnIndex] ==
                                'checkBox' ? (
                                    <Checkbox
                                        isChecked={selectAll}
                                        onChange={(e) => {
                                            setSelectAll(e.target.checked);
                                            if (tableValue) {
                                                Object.keys(
                                                    tableViewData
                                                ).forEach(
                                                    (primaryKey) =>
                                                        (tableValue[primaryKey][
                                                            'isCheck'
                                                        ] = e.target.checked)
                                                );
                                                setTableValue({
                                                    ...tableValue,
                                                });
                                            }
                                        }}
                                    ></Checkbox>
                                ) : (
                                    Object.keys(tabItem)[columnIndex]
                                )}
                            </Center>
                        );
                    }}
                </VariableSizeGrid>
            }
            {tableValue && Object.keys(tableValue).length != 0 && (
                <VariableSizeGrid
                    ref={variableSizeDataRef}
                    style={{
                        outline: '2px solid #919AA9',
                        background: '#FFFFFF',
                        scrollbarWidth: 'none',
                    }}
                    rowCount={primarykeys.length}
                    columnCount={columnInfo.length}
                    height={tableViewHeight}
                    width={tableViewWidth}
                    columnWidth={getColumnWidth}
                    rowHeight={() => 30}
                    itemData={tableViewData}
                >
                    {memorizedTable}
                </VariableSizeGrid>
            )}
        </TabPanel>
    );
}
