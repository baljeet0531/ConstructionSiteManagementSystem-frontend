import React from 'react';
import { dataCellStyle, getElementProps } from '../Shared/ReactWindowTable';
import { TEmptyResult } from '../../Hooks/UseGQLOverview';
import { MutationTuple } from '@apollo/client';
import {
    ISpecialEducationalTraining,
    IUpdateSpecialEducationalTraining,
    IUpdateSpecialEducationalTrainingVar,
} from '../../Interface/SpecialEducationTraining';
import { Box } from '@chakra-ui/react';
import { DatePicker } from 'rsuite';
import dayjs from 'dayjs';

export default function SETDatePickerElement(
    props: getElementProps<ISpecialEducationalTraining & { index: number }> & {
        updateResult:
            | TEmptyResult
            | MutationTuple<
                  IUpdateSpecialEducationalTraining,
                  IUpdateSpecialEducationalTrainingVar
              >;
    }
) {
    const {
        updateResult: [updateFunction],
        style,
        info,
    } = props;
    const { idno, item } = info;

    const [date, setDate] = React.useState<Date>(dayjs(info['date']).toDate());

    return (
        <Box
            {...dataCellStyle}
            style={{
                ...style,
                padding: '0px',
            }}
            border={'1px solid #FFFFFF'}
            borderBottom={'1px solid #919AA9'}
            _hover={{
                border: '1px solid #3498FF',
            }}
            className="special-education-date-picker"
        >
            <DatePicker
                style={{
                    height: '44px',
                    width: '100%',
                    padding: '0px',
                    border: '0px',
                    textAlignLast: 'center',
                }}
                placement="auto"
                cleanable={false}
                editable={false}
                oneTap
                ranges={[
                    {
                        label: 'today',
                        value: dayjs().toDate(),
                        closeOverlay: true,
                    },
                ]}
                value={date}
                onChange={(value) => {
                    if (value) {
                        setDate(value);
                        updateFunction({
                            variables: {
                                date: dayjs(value).format('YYYY-MM-DD'),
                                idno,
                                item,
                            },
                        });
                    }
                }}
            />
        </Box>
    );
}
