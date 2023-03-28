import {
    IDailyReport,
    ITodayItem,
    ITomorrowItem,
    IWorkNumber,
    TCategory,
    isTodayItem,
    isTodayList,
} from '../../../Interface/DailyReport';
import { FormikProps } from 'formik';
import {
    Grid,
    GridItem,
    IconButton,
    Input,
    InputProps,
    Text,
} from '@chakra-ui/react';
import {
    placeholderStyle,
    disabledStyle,
    tableTitleStyle,
    tableContentStyle,
} from './Styles';
import { ChangeEvent, Fragment } from 'react';
import GridInputItem from '../../Shared/GridInputItem';
import { CloseIcon } from '../../../Icons/Icons';

export default class FormFactory {
    formProps: FormikProps<IDailyReport>;
    category: Record<TCategory, IWorkNumber>;

    constructor(formProps: FormikProps<IDailyReport>) {
        this.formProps = formProps;
        this.category = {
            帆宣: {
                supervisor: { fieldName: '' },
                labor: { fieldName: '' },
                night: { fieldName: '' },
                total: { fieldName: '' },
            },
            空調: {
                supervisor: { fieldName: '' },
                labor: { fieldName: '' },
                night: { fieldName: '' },
                total: { fieldName: '' },
            },
            消防: {
                supervisor: { fieldName: '' },
                labor: { fieldName: '' },
                night: { fieldName: '' },
                total: { fieldName: '' },
            },
            給排水: {
                supervisor: { fieldName: '' },
                labor: { fieldName: '' },
                night: { fieldName: '' },
                total: { fieldName: '' },
            },
            天然氣及柴油: {
                supervisor: { fieldName: '' },
                labor: { fieldName: '' },
                night: { fieldName: '' },
                total: { fieldName: '' },
            },
            電力: {
                supervisor: { fieldName: '' },
                labor: { fieldName: '' },
                night: { fieldName: '' },
                total: { fieldName: '' },
            },
            儀控: {
                supervisor: { fieldName: '' },
                labor: { fieldName: '' },
                night: { fieldName: '' },
                total: { fieldName: '' },
            },
            弱電: {
                supervisor: { fieldName: '' },
                labor: { fieldName: '' },
                night: { fieldName: '' },
                total: { fieldName: '' },
            },
            其他: {
                supervisor: { fieldName: '' },
                labor: { fieldName: '' },
                night: { fieldName: '' },
                total: { fieldName: '' },
            },
            合計: {
                total: { fieldName: '' },
            },
        };
    }
    input(props: InputProps) {
        return (
            <Input
                size="sm"
                placeholder="填寫"
                _placeholder={placeholderStyle}
                isDisabled={false}
                _disabled={disabledStyle}
                {...props}
            />
        );
    }
    workNumberColumn(name: TCategory, idx: number) {
        const item = this.category[name];
        const contentStyle =
            Object.keys(this.category).length - 1 === idx
                ? { ...tableContentStyle, borderRight: '#919AA9 solid 1px' }
                : tableContentStyle;
        return (
            <Fragment key={`work-number-${idx}`}>
                <GridItem
                    {...tableTitleStyle}
                    colStart={idx + 2}
                    rowStart={1}
                    textAlign="center"
                >
                    {name}
                </GridItem>
                {item.supervisor ? (
                    <GridInputItem
                        gridRange={[2, 2, idx + 2, idx + 2]}
                        fieldName={item.supervisor.fieldName}
                        inputComponent={this.input({
                            type: 'number',
                            h: '100%',
                            textAlign: 'center',
                            border: '0px',
                        })}
                        style={contentStyle}
                    />
                ) : (
                    <GridItem
                        {...contentStyle}
                        colStart={idx + 2}
                        rowStart={2}
                    />
                )}
                {item.labor ? (
                    <GridInputItem
                        gridRange={[3, 3, idx + 2, idx + 2]}
                        fieldName={item.labor.fieldName}
                        inputComponent={this.input({
                            type: 'number',
                            h: '100%',
                            textAlign: 'center',
                            border: '0px',
                        })}
                        style={contentStyle}
                    />
                ) : (
                    <GridItem
                        {...contentStyle}
                        colStart={idx + 2}
                        rowStart={3}
                    />
                )}
                {item.night ? (
                    <GridInputItem
                        gridRange={[4, 4, idx + 2, idx + 2]}
                        fieldName={item.night.fieldName}
                        inputComponent={this.input({
                            type: 'number',
                            h: '100%',
                            textAlign: 'center',
                            border: '0px',
                        })}
                        style={contentStyle}
                    />
                ) : (
                    <GridItem
                        {...contentStyle}
                        colStart={idx + 2}
                        rowStart={4}
                    />
                )}
                <GridInputItem
                    gridRange={[5, 5, idx + 2, idx + 2]}
                    fieldName={item.total.fieldName}
                    inputComponent={this.input({
                        type: 'number',
                        h: '100%',
                        textAlign: 'center',
                        border: '0px',
                    })}
                    style={contentStyle}
                />
            </Fragment>
        );
    }
    todayWorkList(area: string, idx: number, items: ITodayItem[]) {
        if (!items) {
            return <></>;
        }
        return (
            <Grid
                templateColumns="3fr repeat(3, 1fr)"
                templateRows={`repeat(${1 + items.length * 2}, 1fr)`}
                h={`${(1 + items.length * 2) * 40}px`}
            >
                <GridItem {...tableTitleStyle} fontWeight="600" colStart={1}>
                    {area}
                </GridItem>
                <GridItem {...tableTitleStyle} colStart={2}>
                    位置
                </GridItem>
                <GridItem {...tableTitleStyle} colStart={3}>
                    本日完成度
                </GridItem>
                <GridItem {...tableTitleStyle} colStart={4}>
                    刪除
                </GridItem>
                {items.map((v, i) => this.workItem(idx, v, i))}
            </Grid>
        );
    }
    tomorrowWorkList(area: string, idx: number, items: ITomorrowItem[]) {
        if (!items) {
            return <></>;
        }
        return (
            <Grid
                templateColumns="2fr repeat(2, 1fr)"
                templateRows={`repeat(${1 + items.length * 2}, 1fr)`}
                h={`${(1 + items.length * 2) * 40}px`}
            >
                <GridItem {...tableTitleStyle} fontWeight="600" colStart={1}>
                    {area}
                </GridItem>
                <GridItem {...tableTitleStyle} colStart={2}>
                    位置
                </GridItem>
                <GridItem {...tableTitleStyle} colStart={3}>
                    刪除
                </GridItem>
                {items.map((v, i) => this.workItem(idx, v, i))}
            </Grid>
        );
    }
    workItem(row_idx: number, v: ITodayItem | ITomorrowItem, i: number) {
        const update = [...this.formProps.values.workItem];
        const type = isTodayItem(v) ? 'today' : 'tomorrow';
        const target = update[row_idx][type];
        const handleChange = (
            e: ChangeEvent<HTMLInputElement>,
            field: keyof ITodayItem | keyof ITomorrowItem
        ) => {
            field !== 'completeness'
                ? (v[field] = e.target.value)
                : isTodayItem(v) && (v[field] = Number(e.target.value));
            target[i] = v;
            if (i === target.length - 1) {
                isTodayList(target)
                    ? target.push({
                          projectName: '',
                          location: '',
                          description: '',
                          completeness: 0,
                      })
                    : target.push({
                          projectName: '',
                          location: '',
                          description: '',
                      });
            }
            this.formProps.setFieldValue('workItem', update);
        };
        const handleDelete = () => {
            target.splice(i, 1)
            this.formProps.setFieldValue('workItem', update);
        }
        return (
            <Fragment key={`work-item-${i}`}>
                <GridInputItem
                    gridRange={[2 * i + 2, 2 * i + 2, 1, 1]}
                    fieldName=""
                    inputComponent={this.input({
                        type: 'text',
                        value: v.projectName,
                        h: '100%',
                        border: '0px',
                        onChange: (e) => {
                            handleChange(e, 'projectName');
                        },
                    })}
                    style={tableContentStyle}
                />
                <GridInputItem
                    gridRange={[2 * i + 2, 2 * i + 2, 2, 2]}
                    fieldName=""
                    inputComponent={this.input({
                        type: 'text',
                        value: v.location,
                        h: '100%',
                        border: '0px',
                        textAlign: 'center',
                        onChange: (e) => {
                            handleChange(e, 'location');
                        },
                    })}
                    style={{ ...tableContentStyle, borderLeft: '0px' }}
                />
                {isTodayItem(v) ? (
                    <GridInputItem
                        gridRange={[2 * i + 2, 2 * i + 2, 3, 3]}
                        fieldName=""
                        inputComponent={this.input({
                            type: 'number',
                            value: v.completeness,
                            h: '100%',
                            border: '0px',
                            textAlign: 'right',
                            onChange: (e) => {
                                handleChange(e, 'completeness');
                            },
                            pr: '15px',
                        })}
                        inputRightComponent={<Text fontSize="10px">%</Text>}
                        inputRightStyle={{ w: '10px' }}
                        style={{ ...tableContentStyle, borderLeft: '0px' }}
                    />
                ) : (
                    <></>
                )}
                <GridItem
                    colStart={isTodayItem(v) ? 4 : 3}
                    {...tableContentStyle}
                    borderLeft="0px"
                    borderRight="#919AA9 solid 1px"
                >
                    {target.length !== i + 1 && (
                        <IconButton
                            size={'xs'}
                            aria-label="DeleteWorkItem"
                            icon={<CloseIcon />}
                            bg={'none'}
                            color={'#667080'}
                            onClick={handleDelete}
                        />
                    )}
                </GridItem>
                <GridInputItem
                    gridRange={[2 * i + 3, 2 * i + 3, 1, 5]}
                    fieldName=""
                    inputComponent={this.input({
                        type: 'text',
                        value: v.description,
                        placeholder: '說明',
                        h: '100%',
                        border: '0px',
                        onChange: (e) => {
                            handleChange(e, 'description');
                        },
                    })}
                    style={{
                        ...tableContentStyle,
                        borderRight: '#919AA9 solid 1px',
                    }}
                />
            </Fragment>
        );
    }
}
