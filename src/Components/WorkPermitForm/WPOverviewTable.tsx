import { Box, Center, ChakraProps, Flex } from '@chakra-ui/react';
import React from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars';
import { VariableSizeGrid } from 'react-window';

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

export default function WPOverViewTable() {
    const variableSizeHeaderRef = React.useRef<VariableSizeGrid>(null);
    const variableSizeDataRef = React.useRef<VariableSizeGrid>(null);

    const [tableViewWidth, setTableViewWidth] = React.useState(
        window.innerWidth * pageRatio - 2 * pagePadding
    );
    const [tableViewHeight, setTableViewHeight] = React.useState(
        window.innerHeight - tablePaddingTop - tablePaddingBottom
    );

    const getColumnWidth = (index: number) =>
        (Object.values(columnMap)[index]['width'] / tableFigmaWidth) *
        tableViewWidth;

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

    const CustomScrollbars = (props: any) => {
        const { onScroll, forwardedRef, style, children } = props;
        const refSetter = React.useCallback((scrollbarsRef: any) => {
            if (scrollbarsRef) {
                forwardedRef(scrollbarsRef.view);
            } else {
                forwardedRef(null);
            }
        }, []);

        return (
            <Scrollbars
                ref={refSetter}
                style={{ ...style, overflow: 'hidden' }}
                onScroll={onScroll}
            >
                {children}
            </Scrollbars>
        );
    };

    const CustomScrollbarsVirtualList = React.forwardRef<
        Scrollbars,
        ScrollbarProps
    >((props, ref) => <CustomScrollbars {...props} forwardedRef={ref} />);

    return (
        <Flex direction={'column'}>
            <VariableSizeGrid
                ref={variableSizeHeaderRef}
                style={{
                    outline: '2px solid #919AA9',
                    background: '#FFFFFF',
                }}
                columnCount={9}
                columnWidth={getColumnWidth}
                height={headerHeight}
                rowCount={1}
                rowHeight={() => headerHeight}
                width={tableViewWidth}
            >
                {({ columnIndex, style }) => {
                    const tableHeader = Object.keys(columnMap);
                    return (
                        <Center style={style} {...headerCellStyle}>
                            {tableHeader[columnIndex]}
                        </Center>
                    );
                }}
            </VariableSizeGrid>
            <VariableSizeGrid
                outerElementType={CustomScrollbarsVirtualList}
                ref={variableSizeDataRef}
                style={{
                    outline: '2px solid #919AA9',
                    background: '#FFFFFF',
                }}
                columnCount={9}
                columnWidth={getColumnWidth}
                height={tableViewHeight}
                rowCount={1000}
                rowHeight={() => cellHeight}
                width={tableViewWidth}
            >
                {({ columnIndex, rowIndex, style }) => (
                    <Box style={style} {...dataCellStyle}>
                        Item {rowIndex},{columnIndex}
                    </Box>
                )}
            </VariableSizeGrid>
        </Flex>
    );
}
