/* eslint-disable no-unused-vars */
import React from 'react';
import {
    Box,
    Button,
    ButtonProps,
    Center,
    ChakraProps,
    Checkbox,
    Flex,
    Text,
    TextProps,
} from '@chakra-ui/react';
import { areEqual, VariableSizeGrid } from 'react-window';
import { IGQLSignature } from '../../Interface/Signature';
import Pin from './Pin';
import dayjs from 'dayjs';
import { codeContentMap } from '../../Utils/Mapper';
import { IFaultFormOverview } from '../../Interface/FaultForm';

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

const modalOpenButtonStyle: ButtonProps = {
    variant: 'ghost',
    height: '44px',
    width: '100%',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#667080',
    textDecor: 'underline',
};

export const setTextHeight = (style: React.CSSProperties): TextProps => ({
    h: `${style.height}px`,
    lineHeight: `${style.height}px`,
});

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
        <Text color={'#FFFFFF'}>
            {`${fieldLabel}：`}
            <br />
            {signature.owner}
            <br />
            {dayjs(signature.time).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
    ) : (
        `${fieldLabel}：`
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

export const ModalOpenButtonElement = ({
    style,
    info,
    variable,
    onClick,
}: getElementProps & {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
    return (
        <Box {...dataCellStyle} style={style} pt={0} p={0}>
            <Button {...modalOpenButtonStyle} onClick={onClick}>
                {info[variable]}
            </Button>
        </Box>
    );
};

export const faultCodeMapElement = <T extends IFaultFormOverview>({
    style,
    info,
    variable,
}: getElementProps<T, 'code'>) => (
    <Box {...dataCellStyle} style={style}>
        {codeContentMap[info[variable] as keyof typeof codeContentMap].content}
    </Box>
);

export const AcceptDenyElement = (
    props: getElementProps & {
        handleAccept: () => void;
        handleDeny: () => void;
        acceptText?: string;
        denyText?: string;
        openModal?: boolean;
    }
) => {
    const {
        style,
        info,
        variable,
        handleAccept,
        handleDeny,
        acceptText = '接受',
        denyText = '異議',
        openModal = false,
    } = props;
    const status = info[variable];

    const buttonStyle: ButtonProps = {
        variant: 'buttonBlueSolid',
        height: '20px',
        width: '36px',
        fontSize: '10px',
    };

    return (
        <Box {...dataCellStyle} style={style} pt={0} p={0}>
            {status === null ? (
                <Flex
                    h={'44px'}
                    align={'center'}
                    justify={'center'}
                    gap={'10px'}
                >
                    <Button {...buttonStyle} onClick={handleAccept}>
                        {acceptText}
                    </Button>
                    <Button
                        {...buttonStyle}
                        bg={'#DB504A'}
                        _hover={{ bg: '#DB504A77' }}
                        onClick={handleDeny}
                    >
                        {denyText}
                    </Button>
                </Flex>
            ) : status ? (
                openModal ? (
                    <Button
                        {...modalOpenButtonStyle}
                        color={'#4C7DE7'}
                        onClick={handleAccept}
                    >
                        {acceptText}
                    </Button>
                ) : (
                    <Text {...setTextHeight(style)}>{acceptText}</Text>
                )
            ) : openModal ? (
                <Button
                    {...modalOpenButtonStyle}
                    color={'#4C7DE7'}
                    onClick={handleDeny}
                >
                    {denyText}
                </Button>
            ) : (
                <Text {...setTextHeight(style)} color={'#4C7DE7'}>
                    {denyText}
                </Text>
            )}
        </Box>
    );
};

export interface getElementProps<TData = any, TVariable = any> {
    style: React.CSSProperties;
    info: TData;
    variable: TVariable;
}
export interface IColumnMap<TData = any> {
    title: string;
    width: number;
    variable: string;
    getElement: (props: getElementProps<TData>) => JSX.Element;
    customHeaderStyle?: ChakraProps;
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
    sizes?: ISizes;
    filteredPrimaryKey?: string[];
    sortReversed?: boolean;
    sortBy?: string;
    sortFormatter?: Function;
    columnBordered?: boolean;
}) {
    const {
        tableData,
        setTableData,
        columnMap,
        sizes,
        filteredPrimaryKey,
        sortReversed = false,
        sortBy = 'index',
        sortFormatter = (a: string | number) => a,
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
    } = sizes || {};

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
        const diff =
            sortFormatter(displayTableData[a][sortBy]) -
            sortFormatter(displayTableData[b][sortBy]);
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
                    const customHeaderStyle =
                        columnMap[columnIndex]['customHeaderStyle'];
                    if (title == '全選') {
                        const checkedItems = Object.values(tableData);

                        const allChecked = checkedItems.every(
                            (info) => info['isChecked']
                        );
                        const isIndeterminate =
                            checkedItems.some((info) => info['isChecked']) &&
                            !allChecked;
                        return (
                            <Center
                                style={style}
                                {...headerCellStyle}
                                {...customHeaderStyle}
                            >
                                <Checkbox
                                    isChecked={allChecked}
                                    isIndeterminate={isIndeterminate}
                                    onChange={() => {
                                        const firstFilteredRowIsChecked = //get the "isChecked" value of first row in filtered data
                                            primaryKeys.length !== 0 &&
                                            tableData[primaryKeys[0]].isChecked;
                                        primaryKeys.forEach((primaryKey) => {
                                            const info = tableData[primaryKey];
                                            tableData[primaryKey] = {
                                                ...info,
                                                isChecked:
                                                    !firstFilteredRowIsChecked, //use "firstFilteredRowIsChecked"(filtered data dependent) but not "isIndeterminate"(all data dependent)
                                            };
                                        });
                                        setTableData({ ...tableData });
                                    }}
                                ></Checkbox>
                            </Center>
                        );
                    }
                    return (
                        <Center
                            style={style}
                            {...headerCellStyle}
                            {...customHeaderStyle}
                        >
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
