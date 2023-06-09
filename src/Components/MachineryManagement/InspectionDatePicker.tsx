import { Box } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { DatePicker } from 'rsuite';
import {
    dataCellStyle,
    defaultElement,
    getElementProps,
} from '../Shared/ReactWindowTable';
import { useUpdateMachinery } from '../../Hooks/GQLMutation';
import { TableLoading } from '../Shared/Loading';

export default function InspectionDatePicker(
    props: getElementProps & { editable: boolean }
) {
    const { editable, ...restProps } = props;
    const { style, info, variable } = restProps;

    const [updateMachinery, { loading }] = useUpdateMachinery(info['siteId']);
    const [date, setDate] = React.useState<Date | null>(
        info[variable] ? dayjs(info[variable]).toDate() : null
    );

    return editable ? (
        <Box
            {...dataCellStyle}
            style={{
                ...style,
                padding: '0px',
            }}
            className="inspection-date-picker"
        >
            <DatePicker
                style={{
                    height: '29px',
                    width: '100%',
                    padding: '0px',
                    border: '0px',
                    textAlignLast: 'center',
                }}
                editable={false}
                disabled={!editable}
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
                    setDate(value);
                    const newDate = value
                        ? dayjs(value).format('YYYY-MM-DD')
                        : null;
                    updateMachinery({
                        variables: {
                            checkId: info['inspectionNo'],
                            siteId: info['siteId'],
                            ...(variable === 'entryInspectionDate' && {
                                outerDate: newDate,
                            }),
                            ...(variable === 'onSiteInspectionDate' && {
                                innerDate: newDate,
                            }),
                        },
                    });
                }}
            />
            {loading && <TableLoading />}
        </Box>
    ) : (
        defaultElement({ ...restProps })
    );
}
