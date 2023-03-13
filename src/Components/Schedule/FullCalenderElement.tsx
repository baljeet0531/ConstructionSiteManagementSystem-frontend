import React from 'react';

import { Flex, IconButton } from '@chakra-ui/react';

import FullCalendar, { EventSourceInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NextIcon, PrevIcon } from '../../Icons/Icons';
import { CustomProvider, DatePicker } from 'rsuite';
import { zhTW } from 'rsuite/esm/locales';
import dayjs from 'dayjs';
import momentPlugin from '@fullcalendar/moment';
import moment from 'moment';
import 'moment/locale/zh-tw'; //must add
moment.locale('zh-tw');

const EVENT_GENERAL_PROPS = {
    textColor: '#667080',
    //extendProps
    border: 'none',
    borderRadius: '2.6px',
    margin: '5px',
    padding: '2px 2.6px',
};

export default function FullCalendarElement(props: {
    event?: {
        serialNo: Number;
        parent: String;
        title: String;
        duration: Number;
        start: Date;
        end: Date;
    }[];
}) {
    const { event } = props;
    const calendarRef = React.useRef<FullCalendar>(null);
    const [date, setDate] = React.useState<Date>(new Date());
    const eventElements =
        event &&
        event.map(({ serialNo, parent, title, start, end }) => {
            if (parent == '') return {};
            let background =
                'linear-gradient(0deg, rgba(0, 133, 255, 0.1), rgba(0, 133, 255, 0.1)),linear-gradient(0deg, #FFFFFF, #FFFFFF)';
            switch (Number(parent) % 5) {
                case 1:
                    background =
                        'linear-gradient(0deg, rgba(0, 186, 52, 0.1), rgba(0, 186, 52, 0.1)), linear-gradient(0deg, #FFFFFF, #FFFFFF)';
                    break;
                case 2:
                    background =
                        'linear-gradient(0deg, rgba(0, 133, 255, 0.1), rgba(0, 133, 255, 0.1)), linear-gradient(0deg, #FFFFFF, #FFFFFF)';
                    break;
                case 3:
                    background =
                        'linear-gradient(0deg, rgba(255, 150, 27, 0.1), rgba(255, 150, 27, 0.1)), linear-gradient(0deg, #FFFFFF, #FFFFFF)';
                    break;
                case 4:
                    background =
                        'linear-gradient(0deg, rgba(255, 59, 59, 0.1), rgba(255, 59, 59, 0.1)), linear-gradient(0deg, #FFFFFF, #FFFFFF)';
                    break;
                case 0:
                    background = '#E8E8E8';
                    break;
            }

            return {
                ...EVENT_GENERAL_PROPS,
                id: serialNo,
                title: title,
                start: start,
                end: end,
                //extendProps
                background: background,
            };
        });

    const handleMonthChange = (newMonth: Date) => {
        setDate(newMonth);
        calendarRef.current?.getApi().gotoDate(newMonth);
    };

    return (
        <>
            <Flex justify={'center'} align={'center'}>
                <CustomProvider locale={zhTW}>
                    <IconButton
                        size={'xs'}
                        aria-label="prevMonth"
                        icon={<PrevIcon />}
                        bg={'none'}
                        onClick={() => {
                            handleMonthChange(
                                dayjs(date).subtract(1, 'month').toDate()
                            );
                        }}
                    ></IconButton>
                    <DatePicker
                        value={date}
                        appearance="subtle"
                        format="MMM, yyyy"
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
                        onChange={(value) => {
                            handleMonthChange(value || dayjs().toDate());
                        }}
                    />
                    <IconButton
                        size={'xs'}
                        aria-label="nextMonth"
                        icon={<NextIcon />}
                        bg={'none'}
                        onClick={() => {
                            handleMonthChange(
                                dayjs(date).add(1, 'month').toDate()
                            );
                        }}
                    ></IconButton>
                </CustomProvider>
            </Flex>
            <FullCalendar
                ref={calendarRef}
                height={'80vh'}
                locale={'zh'}
                plugins={[dayGridPlugin, momentPlugin]}
                headerToolbar={{
                    start: '',
                    center: '',
                    end: '',
                }}
                fixedWeekCount={false}
                dayMaxEvents={3}
                dayHeaderFormat={'dd'}
                dayCellContent={(cell) => moment(cell.date).format('D')}
                viewDidMount={(info) => {
                    info.el.style.background = '#FFFFFF';
                }}
                events={eventElements as EventSourceInput}
                eventDidMount={(info) => {
                    Object.keys(info.event.extendedProps).map((attr: any) => {
                        info.el.style[attr] = info.event.extendedProps[attr];
                    });
                }}
            />
        </>
    );
}
