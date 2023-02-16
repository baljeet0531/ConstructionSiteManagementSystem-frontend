import {
    Box,
    Center,
    ChakraProps,
    Flex,
    Text,
    Button,
    Tooltip,
    Checkbox,
    Link,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { VariableSizeGrid, areEqual } from 'react-window';
import { workPermit, workPermitChecked } from './Overview';

const columnMap = {
    日期: {
        width: 99,
        variable: 'supplyDate',
    },
    單號: {
        width: 83,
        variable: 'number',
    },
    系統: {
        width: 100,
        variable: 'system',
    },
    系統分類: {
        width: 100,
        variable: 'systemBranch',
    },
    施工項目: {
        width: 100,
        variable: 'project',
    },
    施工廠區: {
        width: 95,
        variable: 'area',
    },
    簽核狀態: {
        width: 180,
        variable: 'signStatus',
    },
    '申請/異動': {
        width: 70,
        variable: 'appliedOrModified',
    },
    全選: {
        width: 50,
        variable: 'isCheck',
    },
};

const pagePadding = 42;
const pageRatio = 0.8;
const tableFigmaWidth = 877;

const headerHeight = 44;
const cellHeight = 44;

const tablePaddingTop = 150 + headerHeight;
const tablePaddingBottom = 24;

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
    border: 'none',
    borderBottom: '1px solid #919AA9',
    pt: '12px',
};

// eslint-disable-next-line no-unused-vars
const errorDataCellStyle: ChakraProps = {
    ...dataCellStyle,
    bg: '#FDFFE3',
};

export default function WPOverViewTable(props: {
    overviewTableData: { [primaryKey: string]: workPermitChecked };
    setOverviewTableData: React.Dispatch<
        React.SetStateAction<{
            [primaryKey: string]: workPermitChecked;
        }>
    >;
    navSingleWorkPermit: Function;
    searchResultNumber?: string[];
}) {
    const {
        overviewTableData,
        setOverviewTableData,
        navSingleWorkPermit,
        searchResultNumber,
    } = props;

    const displayTableData: {
        [primaryKey: string]: workPermitChecked;
    } =
        overviewTableData && searchResultNumber
            ? searchResultNumber.length != 0
                ? Object.assign(
                      {},
                      ...searchResultNumber.map((primaryKey) => {
                          return {
                              [primaryKey]: {
                                  ...overviewTableData[primaryKey],
                              },
                          };
                      })
                  )
                : {}
            : overviewTableData;
    const primarykeys = Object.keys(displayTableData);

    const [allChecked, setAllChecked] = React.useState<boolean>(false);

    const variableSizeHeaderRef = React.useRef<VariableSizeGrid>(null);
    const variableSizeDataRef = React.useRef<VariableSizeGrid>(null);

    const [tableViewWidth, setTableViewWidth] = React.useState(
        window.innerWidth * pageRatio - 2 * pagePadding
    );
    const [tableViewHeight, setTableViewHeight] = React.useState(
        window.innerHeight - tablePaddingTop - tablePaddingBottom
    );

    const columnTitle = Object.keys(columnMap);
    const columnInfo = Object.values(columnMap);
    const getColumnWidth = (index: number) => {
        const offset = index == columnInfo.length - 1 ? -6 : 0;
        return (
            (columnInfo[index]['width'] / tableFigmaWidth) * tableViewWidth +
            offset
        );
    };

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
                [primaryKey: string]: workPermitChecked;
            };
        }) => {
            const info: workPermitChecked = data[primarykeys[rowIndex]];
            const variable = columnInfo[columnIndex]['variable'];
            if (variable == 'number') {
                return (
                    <Box style={style} {...dataCellStyle}>
                        <Link
                            onClick={() => {
                                navSingleWorkPermit(info['number'], false);
                            }}
                        >
                            {info['number']}
                        </Link>
                    </Box>
                );
            } else if (variable == 'signStatus') {
                if (!info['applied'] && !info['modified']) {
                    return (
                        <Box style={style} {...dataCellStyle}>
                            尚未申請
                        </Box>
                    );
                }

                type fieldType =
                    | 'approved'
                    | 'review'
                    | 'supplierManager'
                    | 'supplier';
                const fieldArray: {
                    field: fieldType;
                    fieldLabel: string;
                }[] = [
                    { field: 'approved', fieldLabel: '核准' },
                    { field: 'review', fieldLabel: '審核' },
                    {
                        field: 'supplierManager',
                        fieldLabel: '申請單位主管',
                    },
                    { field: 'supplier', fieldLabel: '申請人' },
                ];
                const signStatusMap = fieldArray.map((fieldElement, index) => {
                    const { field, fieldLabel } = fieldElement;
                    const sign = info[field];
                    const label = sign ? (
                        <Text>
                            {`${fieldLabel}：`}
                            <br />
                            {info[`${field}Ref`].owner}
                            <br />
                            {dayjs(info[`${field}Ref`].time).format(
                                'YYYY-MM-DD HH:mm:ss'
                            )}
                        </Text>
                    ) : (
                        ''
                    );
                    return (
                        <Tooltip label={label} key={index}>
                            <Button
                                key={index}
                                w={'40px'}
                                h={'10px'}
                                bg={
                                    sign
                                        ? '#9CE3DE'
                                        : 'rgba(102, 112, 128, 0.1)'
                                }
                                borderRadius={'4px'}
                            ></Button>
                        </Tooltip>
                    );
                });

                return (
                    <Flex
                        style={style}
                        {...dataCellStyle}
                        gap={'2px'}
                        w={'170px'}
                        align={'center'}
                        justify={'center'}
                        height={'20px'}
                    >
                        {signStatusMap}
                    </Flex>
                );
            } else if (variable == 'appliedOrModified') {
                const now = dayjs();
                const workEnd = dayjs(info['workEnd'].split('T')[0]);
                const diff = now.diff(workEnd, 'day');
                return (
                    <Box style={style} {...dataCellStyle}>
                        {info['modified'] ? (
                            '異動單'
                        ) : diff > 0 ? (
                            ''
                        ) : info['applied'] ? (
                            <Button
                                variant={'buttonBlueSolid'}
                                height={'20px'}
                                width={'36px'}
                                fontSize={'10px'}
                                bg={'#DB504A'}
                                _hover={{ bg: '#DB504A77' }}
                                onClick={() => {
                                    navSingleWorkPermit(info['number'], true);
                                }}
                            >
                                異動
                            </Button>
                        ) : (
                            <Button
                                variant={'buttonBlueSolid'}
                                height={'20px'}
                                width={'36px'}
                                fontSize={'10px'}
                                onClick={() => {
                                    navSingleWorkPermit(info['number'], false);
                                }}
                            >
                                申請
                            </Button>
                        )}
                    </Box>
                );
            } else if (variable == 'isCheck') {
                return (
                    <Box style={style} {...dataCellStyle}>
                        <Checkbox
                            isChecked={info['isChecked']}
                            onChange={(e) => {
                                setOverviewTableData((prevState) => ({
                                    ...prevState,
                                    [primarykeys[rowIndex]]: {
                                        ...info,
                                        isChecked: e.target.checked,
                                    },
                                }));
                            }}
                        ></Checkbox>
                    </Box>
                );
            }

            return (
                <Box style={style} {...dataCellStyle}>
                    {info[variable as keyof workPermit]}
                </Box>
            );
        },
        areEqual
    );

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
        <Flex direction={'column'}>
            <VariableSizeGrid
                ref={variableSizeHeaderRef}
                style={{
                    outline: '2px solid #919AA9',
                    background: '#919AA9',
                }}
                columnCount={columnTitle.length}
                columnWidth={getColumnWidth}
                height={headerHeight}
                rowCount={1}
                rowHeight={() => headerHeight}
                width={tableViewWidth}
            >
                {({ columnIndex, style }) => {
                    const title = columnTitle[columnIndex];
                    if (title == '全選') {
                        return (
                            <Center style={style} {...headerCellStyle}>
                                <Checkbox
                                    isChecked={allChecked}
                                    onChange={(e) => {
                                        setAllChecked(e.target.checked);
                                        primarykeys.forEach(
                                            (primaryKey) =>
                                                (displayTableData[primaryKey][
                                                    'isChecked'
                                                ] = e.target.checked)
                                        );
                                        setOverviewTableData((prevState) => ({
                                            ...prevState,
                                            ...displayTableData,
                                        }));
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
            {primarykeys.length != 0 && (
                <VariableSizeGrid
                    ref={variableSizeDataRef}
                    style={{
                        outline: '2px solid #919AA9',
                        background: '#FFFFFF',
                    }}
                    columnCount={columnTitle.length}
                    columnWidth={getColumnWidth}
                    height={
                        tableViewHeight < primarykeys.length * cellHeight
                            ? tableViewHeight
                            : primarykeys.length * cellHeight
                    }
                    rowCount={primarykeys.length}
                    rowHeight={() => cellHeight}
                    width={tableViewWidth}
                    itemData={displayTableData}
                >
                    {memorizedTable}
                </VariableSizeGrid>
            )}
        </Flex>
    );
}
