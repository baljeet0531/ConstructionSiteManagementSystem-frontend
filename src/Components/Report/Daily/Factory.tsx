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
                supervisor: { fieldName: 'supervisorIem' },
                labor: { fieldName: 'laborIem' },
                night: { fieldName: 'nightIem' },
                total: { fieldName: 'totalIem' },
            },
            空調: {
                supervisor: { fieldName: 'supervisorConditioner' },
                labor: { fieldName: 'laborConditioner' },
                night: { fieldName: 'nightConditioner' },
                total: { fieldName: 'totalConditioner' },
            },
            消防: {
                supervisor: { fieldName: 'supervisorFire' },
                labor: { fieldName: 'laborFire' },
                night: { fieldName: 'nightFire' },
                total: { fieldName: 'totalFire' },
            },
            給排水: {
                supervisor: { fieldName: 'supervisorDrain' },
                labor: { fieldName: 'laborDrain' },
                night: { fieldName: 'nightDrain' },
                total: { fieldName: 'totalDrain' },
            },
            天然氣及柴油: {
                supervisor: { fieldName: 'supervisorGas' },
                labor: { fieldName: 'laborGas' },
                night: { fieldName: 'nightGas' },
                total: { fieldName: 'totalGas' },
            },
            電力: {
                supervisor: { fieldName: 'supervisorElectric' },
                labor: { fieldName: 'laborElectric' },
                night: { fieldName: 'nightElectric' },
                total: { fieldName: 'totalElectric' },
            },
            儀控: {
                supervisor: { fieldName: 'supervisorControl' },
                labor: { fieldName: 'laborControl' },
                night: { fieldName: 'nightControl' },
                total: { fieldName: 'totalControl' },
            },
            弱電: {
                supervisor: { fieldName: 'supervisorWeakElectric' },
                labor: { fieldName: 'laborWeakElectric' },
                night: { fieldName: 'nightWeakElectric' },
                total: { fieldName: 'totalWeakElectric' },
            },
            其他: {
                supervisor: { fieldName: 'supervisorOther' },
                labor: { fieldName: 'laborOther' },
                night: { fieldName: 'nightOther' },
                total: { fieldName: 'totalOther' },
            },
            合計: {
                total: { fieldName: 'total' },
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
                        gridRange={[2, 3, idx + 2, idx + 3]}
                        fieldName={item.supervisor.fieldName}
                        inputComponent={this.input({
                            type: 'number',
                            h: '100%',
                            textAlign: 'center',
                            border: '0px',
                            onBlur: (e) => this.onWorkNumberChange(e, name),
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
                        gridRange={[3, 4, idx + 2, idx + 3]}
                        fieldName={item.labor.fieldName}
                        inputComponent={this.input({
                            type: 'number',
                            h: '100%',
                            textAlign: 'center',
                            border: '0px',
                            onBlur: (e) => this.onWorkNumberChange(e, name),
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
                        gridRange={[4, 5, idx + 2, idx + 3]}
                        fieldName={item.night.fieldName}
                        inputComponent={this.input({
                            type: 'number',
                            h: '100%',
                            textAlign: 'center',
                            border: '0px',
                            onBlur: (e) => this.onWorkNumberChange(e, name),
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
                    gridRange={[5, 6, idx + 2, idx + 3]}
                    fieldName={item.total.fieldName}
                    inputComponent={this.input({
                        type: 'number',
                        h: '100%',
                        textAlign: 'center',
                        border: '0px',
                        isDisabled: true,
                    })}
                    style={contentStyle}
                />
            </Fragment>
        );
    }
    onWorkNumberChange(e: ChangeEvent<HTMLInputElement>, category: TCategory) {
        this.formProps.handleChange(e);
        const { supervisor, labor, night, total } = this.category[category];
        const sum = [
            supervisor
                ? (this.formProps.values[supervisor.fieldName] as number)
                : 0,
            labor ? (this.formProps.values[labor.fieldName] as number) : 0,
            night ? (this.formProps.values[night.fieldName] as number) : 0,
        ].reduce((s, value: number) => s + value, 0);
        this.formProps.setFieldValue(total.fieldName, sum);
    }
    onSubTotalChange() {
        const subcategory = Object.keys(this.category)
            .filter((t) => t !== '合計')
            .map((t) => this.category[t as TCategory].total.fieldName);
        const list = subcategory.map((t) => this.formProps.values[t] as number);
        const newSum = list.reduce((s, value) => s + value, 0);
        this.formProps.setFieldValue('total', newSum);
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
        const fieldName = `workItem.${row_idx}.${type}.${i}`;
        const target = update[row_idx][type];
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                this.formProps.setFieldValue('workItem', update);
            }
            this.formProps.handleChange(e);
        };
        const handleDelete = () => {
            target.splice(i, 1);
            this.formProps.setFieldValue('workItem', update);
        };
        return (
            <Fragment key={`work-item-${i}`}>
                <GridInputItem
                    gridRange={[2 * i + 2, 2 * i + 3, 1, 2]}
                    fieldName={`${fieldName}.projectName`}
                    inputComponent={this.input({
                        type: 'text',
                        h: '100%',
                        border: '0px',
                        onChange: handleChange,
                    })}
                    style={tableContentStyle}
                />
                <GridInputItem
                    gridRange={[2 * i + 2, 2 * i + 3, 2, 3]}
                    fieldName={`${fieldName}.location`}
                    inputComponent={this.input({
                        type: 'text',
                        h: '100%',
                        border: '0px',
                        textAlign: 'center',
                        onChange: handleChange,
                    })}
                    style={{ ...tableContentStyle, borderLeft: '0px' }}
                />
                {isTodayItem(v) ? (
                    <GridInputItem
                        gridRange={[2 * i + 2, 2 * i + 3, 3, 4]}
                        fieldName={`${fieldName}.completeness`}
                        inputComponent={this.input({
                            type: 'number',
                            h: '100%',
                            border: '0px',
                            textAlign: 'right',
                            pr: '15px',
                            onChange: handleChange,
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
                    gridRange={[2 * i + 3, 2 * i + 4, 1, 5]}
                    fieldName={`${fieldName}.description`}
                    inputComponent={this.input({
                        type: 'text',
                        placeholder: '說明',
                        h: '100%',
                        border: '0px',
                        onChange: handleChange,
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
