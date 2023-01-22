import { Box, Center, ChakraProps, Checkbox, TabPanel } from '@chakra-ui/react';
import React from 'react';
import { VariableSizeGrid } from 'react-window';
import { humanTableValues, tabMap } from './PeopleOverview';

export type ValueOf<T> = T[keyof T];

export default function OverViewTable(props: {
    tabItem: ValueOf<typeof tabMap>;
    tableValue: { [idno: string]: humanTableValues } | undefined;
    setTableValue: React.Dispatch<
        React.SetStateAction<
            | {
                  [idno: string]: humanTableValues;
              }
            | undefined
        >
    >;
    searchIdno: string[] | undefined;
    selectAll: boolean;
    setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const {
        tabItem,
        tableValue,
        setTableValue,
        searchIdno,
        selectAll,
        setSelectAll,
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

    const expiredDataCellStyle: ChakraProps = {
        ...dataCellStyle,
        bg: '#FDFFE3',
    };
    const headerHeight = 65;

    const pagePadding = 42;
    const pageRatio = 0.8;
    const tableWidth = 877;

    const tablePaddingTop = 152 + headerHeight;
    const tablePaddingBottom = 52;

    // const scrollbarWidth = 12;

    const tableViewData: {
        [idno: string]: humanTableValues;
    } =
        tableValue && searchIdno && searchIdno.length != 0
            ? Object.assign(
                  {},
                  ...searchIdno.map((idno: string) => {
                      return {
                          [idno]: {
                              ...tableValue[idno],
                          },
                      };
                  })
              )
            : tableValue;
    return (
        <TabPanel
            p={0}
            mt={'17px'}
            w={'100%'}
            h={'100%'}
            // style={{ scrollbarWidth: 'none' }}
        >
            <VariableSizeGrid
                style={{
                    outline: '2px solid #919AA9',
                    background: '#FFFFFF',
                    scrollbarWidth: 'none',
                    // overflowY: 'scroll',
                }}
                rowCount={1}
                columnCount={Object.values(tabItem).length}
                height={65}
                width={window.innerWidth * pageRatio - 2 * pagePadding}
                columnWidth={(index) => {
                    const tableViewWidth =
                        window.innerWidth * pageRatio - 2 * pagePadding; //12 is scroll bar size
                    const columnRatio =
                        Object.values(tabItem)[index]['w'] / tableWidth;
                    return tableViewWidth * columnRatio;
                }}
                rowHeight={() => 65}
            >
                {({ columnIndex, style }) => {
                    return (
                        <Center style={style} {...headerCellStyle}>
                            {Object.keys(tabItem)[columnIndex] == 'checkBox' ? (
                                <Checkbox
                                    isChecked={selectAll}
                                    onChange={(e) => {
                                        setSelectAll(e.target.checked);
                                        if (tableValue) {
                                            Object.keys(tableViewData).forEach(
                                                (idno) =>
                                                    (tableValue[idno][
                                                        'isCheck'
                                                    ] = e.target.checked)
                                            );
                                            setTableValue(tableValue);
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
            {tableValue && Object.keys(tableValue).length != 0 && (
                <VariableSizeGrid
                    style={{
                        outline: '2px solid #919AA9',
                        background: '#FFFFFF',
                        scrollbarWidth: 'none',
                        // overflowY: 'scroll',
                    }}
                    rowCount={Object.keys(tableViewData).length}
                    columnCount={Object.values(tabItem).length}
                    height={
                        window.innerHeight -
                        tablePaddingTop -
                        tablePaddingBottom
                    }
                    width={window.innerWidth * pageRatio - 2 * pagePadding}
                    columnWidth={(index) => {
                        const tableViewWidth =
                            window.innerWidth * pageRatio - 2 * pagePadding;
                        const columnRatio =
                            Object.values(tabItem)[index]['w'] / tableWidth;
                        return tableViewWidth * columnRatio;
                    }}
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
                                            setTableValue({
                                                ...tableValue,
                                                [info['idno'] as string]: {
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
                            header.slice(-6) == 'Status' &&
                            info[header as keyof humanTableValues] != 'OK'
                        ) {
                            return (
                                <Box style={style} {...expiredDataCellStyle}>
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
