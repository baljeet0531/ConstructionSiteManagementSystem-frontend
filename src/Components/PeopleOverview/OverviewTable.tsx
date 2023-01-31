import { Box, Center, ChakraProps, Checkbox, TabPanel } from '@chakra-ui/react';
import React from 'react';
import { VariableSizeGrid } from 'react-window';
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
        outline: '1px solid #919AA9',
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
        lineHeight: '20px',
        overflowWrap: 'normal',
        wordBreak: 'keep-all',
        whiteSpace: 'nowrap',
    };

    const errorDataCellStyle: ChakraProps = {
        ...dataCellStyle,
        bg: '#FDFFE3',
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

    const variableSizeHeaderRef = React.useRef<VariableSizeGrid>(null);
    const variableSizeDataRef = React.useRef<VariableSizeGrid>(null);

    const pagePadding = 42;
    const pageRatio = 0.8;
    const tableFigmaWidth = 877;

    const headerHeight = 65;
    const tablePaddingTop = 152 + headerHeight;
    const tablePaddingBottom = 52;

    // const scrollbarWidth = 12;

    const [tableViewWidth, setTableViewWidth] = React.useState(
        window.innerWidth * pageRatio - 2 * pagePadding
    );
    const [tableViewHeight, setTableViewHeight] = React.useState(
        window.innerHeight - tablePaddingTop - tablePaddingBottom
    );

    const getColumnWidth = (index: number) =>
        (Object.values(tabItem)[index]['w'] / tableFigmaWidth) * tableViewWidth;

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
        <TabPanel
            p={0}
            mt={'17px'}
            w={'100%'}
            h={'100%'}
            // style={{ scrollbarWidth: 'none' }}
        >
            {
                <VariableSizeGrid
                    ref={variableSizeHeaderRef}
                    style={{
                        outline: '2px solid #919AA9',
                        background: '#FFFFFF',
                        scrollbarWidth: 'none',
                        // overflowY: 'scroll',
                    }}
                    rowCount={1}
                    columnCount={Object.values(tabItem).length}
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
                        // overflowY: 'scroll',
                    }}
                    rowCount={Object.keys(tableViewData).length}
                    columnCount={Object.values(tabItem).length}
                    height={tableViewHeight}
                    width={tableViewWidth}
                    columnWidth={getColumnWidth}
                    rowHeight={() => 30}
                >
                    {({ columnIndex, rowIndex, style }) => {
                        const header = Object.values(tabItem)[columnIndex][
                            'variable'
                        ] as string;

                        const info = Object.values(tableViewData)[rowIndex];

                        if (header == 'isCheck') {
                            return (
                                <Box style={style} {...dataCellStyle}>
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
                        } else if (
                            info[header as keyof humanTableValues] ==
                                '日期錯誤' ||
                            (header.slice(-6) == 'Status' &&
                                info[header as keyof humanTableValues] != 'OK')
                        ) {
                            return (
                                <Box style={style} {...errorDataCellStyle}>
                                    {info[header as keyof humanTableValues]}
                                </Box>
                            );
                        }
                        return (
                            <Box style={style} {...dataCellStyle}>
                                {info[header as keyof humanTableValues]}
                            </Box>
                        );
                    }}
                </VariableSizeGrid>
            )}
        </TabPanel>
    );
}
