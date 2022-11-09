import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import momentPlugin from '@fullcalendar/moment';
import moment from 'moment';
import 'moment/locale/zh-tw'; //must add
// import interactionPlugin from '@fullcalendar/interaction';
moment.locale('zh-tw');

const EVENT_GENERAL_PROPS = {
    textColor: '#667080',
    //extendProps
    border: 'none',
    borderRadius: '2.6px',
    margin: '5px',
    padding: '2px 2.6px',
};

const EVENTS = [
    {
        ...EVENT_GENERAL_PROPS,
        id: '1',
        title: '第一階段使照發行',
        start: '2022-11-01',
        end: '2022-11-13',
        //extendProps
        background:
            'linear-gradient(0deg, rgba(0, 186, 52, 0.1), rgba(0, 186, 52, 0.1)), #FFFFFF',
    },
    {
        ...EVENT_GENERAL_PROPS,
        id: '2',
        title: '管架施工',
        start: '2022-11-08',
        end: '2022-11-20',
        //extendProps
        background:
            'linear-gradient(0deg, rgba(0, 133, 255, 0.1), rgba(0, 133, 255, 0.1)),linear-gradient(0deg, #FFFFFF, #FFFFFF)',
    },
    {
        ...EVENT_GENERAL_PROPS,
        id: '3',
        title: '空調系統',
        start: '2022-11-08',
        end: '2022-11-11',
        //extendProps
        background:
            'linear-gradient(0deg, rgba(255, 150, 27, 0.1), rgba(255, 150, 27, 0.1)),linear-gradient(0deg, #FFFFFF, #FFFFFF)',
    },
    {
        ...EVENT_GENERAL_PROPS,
        id: '4',
        title: 'MEP系統',
        start: '2022-11-16',
        end: '2022-11-28',
        //extendProps
        background:
            'linear-gradient(0deg, rgba(255, 59, 59, 0.1), rgba(255, 59, 59, 0.1)),linear-gradient(0deg, #FFFFFF, #FFFFFF)',
    },
    {
        ...EVENT_GENERAL_PROPS,
        id: '5',
        title: '第二階段消檢掛件',
        start: '2022-11-21',
        end: '2022-11-27',
        //extendProps
        background: '#E8E8E8',
    },
    {
        ...EVENT_GENERAL_PROPS,
        id: '6',
        title: '管路焊接',
        start: '2022-11-24',
        end: '2022-12-01',
        //extendProps
        background:
            'linear-gradient(0deg, rgba(0, 133, 255, 0.1), rgba(0, 133, 255, 0.1)),linear-gradient(0deg, #FFFFFF, #FFFFFF)',
    },
];

export default function Schedule() {
    if (!IsPermit('schedule')) return <Navigate to="/" replace={true} />;

    return (
        <FullCalendar
            height={'100%'}
            locale={'zh'}
            plugins={[dayGridPlugin, momentPlugin]}
            headerToolbar={{
                start: '',
                center: 'prev title next',
                end: '',
            }}
            fixedWeekCount={false}
            titleFormat={'MMM, YYYY'}
            dayHeaderFormat={'dd'}
            dayCellContent={(cell) => moment(cell.date).format('D')}
            viewDidMount={(info) => {
                info.el.style.background = '#FFFFFF';
            }}
            events={EVENTS}
            eventDidMount={(info) => {
                Object.keys(info.event.extendedProps).map((attr: any) => {
                    info.el.style[attr] = info.event.extendedProps[attr];
                });
            }}
        />
    );
}

// eslint-disable-next-line no-unused-vars
function renderEventContent(eventInfo: any) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}
