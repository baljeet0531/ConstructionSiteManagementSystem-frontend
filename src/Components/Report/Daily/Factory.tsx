import {
    IDailyReport,
    IWorkNumber,
    TCategory,
} from '../../../Interface/DailyReport';
import { FormikProps } from 'formik';
import { GridItem, Input, Text, Flex, InputProps } from '@chakra-ui/react';
import {
    placeholderStyle,
    disabledStyle,
    tableTitleStyle,
    tableContentStyle,
} from './Styles';
import { Fragment } from 'react';
import GridInputItem from '../../Shared/GridInputItem';

export default class FormFactory {
    formProps: FormikProps<IDailyReport>;
    category: Record<TCategory, IWorkNumber>;

    constructor(formProps: FormikProps<IDailyReport>) {
        this.formProps = formProps;
        this.category = {
            帆宣: {
                supervisor: { fieldName: '' },
                worker: { fieldName: '' },
                overtime: { fieldName: '' },
                sum: { fieldName: '' },
            },
            空調: {
                supervisor: { fieldName: '' },
                worker: { fieldName: '' },
                overtime: { fieldName: '' },
                sum: { fieldName: '' },
            },
            消防: {
                supervisor: { fieldName: '' },
                worker: { fieldName: '' },
                overtime: { fieldName: '' },
                sum: { fieldName: '' },
            },
            給排水: {
                supervisor: { fieldName: '' },
                worker: { fieldName: '' },
                overtime: { fieldName: '' },
                sum: { fieldName: '' },
            },
            天然氣及柴油: {
                supervisor: { fieldName: '' },
                worker: { fieldName: '' },
                overtime: { fieldName: '' },
                sum: { fieldName: '' },
            },
            電力: {
                supervisor: { fieldName: '' },
                worker: { fieldName: '' },
                overtime: { fieldName: '' },
                sum: { fieldName: '' },
            },
            儀控: {
                supervisor: { fieldName: '' },
                worker: { fieldName: '' },
                overtime: { fieldName: '' },
                sum: { fieldName: '' },
            },
            弱電: {
                supervisor: { fieldName: '' },
                worker: { fieldName: '' },
                overtime: { fieldName: '' },
                sum: { fieldName: '' },
            },
            其他: {
                supervisor: { fieldName: '' },
                worker: { fieldName: '' },
                overtime: { fieldName: '' },
                sum: { fieldName: '' },
            },
            合計: {
                sum: { fieldName: '' },
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
    workTitle(name: string): JSX.Element {
        if (name.length <= 4) {
            return <Text>{name}</Text>;
        }
        const strArr = name.match(/.{1,4}/g) || [];
        return (
            <Flex direction="column" align="center">
                {strArr.map((v, i) => (
                    <Text key={i}>{v}</Text>
                ))}
            </Flex>
        );
    }
    workNumberColumn(name: TCategory, idx: number, last: boolean = false) {
        const item = this.category[name];
        const contentStyle = last
            ? { ...tableContentStyle, borderRight: '#919AA9 solid 1px' }
            : tableContentStyle;
        return (
            <Fragment key={`work-number-${idx}`}>
                <GridItem {...tableTitleStyle} colStart={idx + 2} rowStart={1}>
                    {this.workTitle(name)}
                </GridItem>
                {item.supervisor ? (
                    <GridInputItem
                        gridRange={[2, 2, idx + 2, idx + 2]}
                        fieldName={item.supervisor.fieldName}
                        inputComponent={this.input({
                            type: 'number',
                            h: '100%',
                            textAlign: 'center',
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
                {item.worker ? (
                    <GridInputItem
                        gridRange={[3, 3, idx + 2, idx + 2]}
                        fieldName={item.worker.fieldName}
                        inputComponent={this.input({
                            type: 'number',
                            h: '100%',
                            textAlign: 'center',
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
                {item.overtime ? (
                    <GridInputItem
                        gridRange={[4, 4, idx + 2, idx + 2]}
                        fieldName={item.overtime.fieldName}
                        inputComponent={this.input({
                            type: 'number',
                            h: '100%',
                            textAlign: 'center',
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
                    fieldName={item.sum.fieldName}
                    inputComponent={this.input({
                        type: 'number',
                        h: '100%',
                        textAlign: 'center',
                    })}
                    style={contentStyle}
                />
            </Fragment>
        );
    }
}
