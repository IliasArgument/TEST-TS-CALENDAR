import React, { FC } from 'react';
import { Calendar, Layout } from 'antd';
import { IEvent } from '../models/IEvent';
import { formdDate } from '../utils/date';
import { Moment } from 'moment';

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    function dateCellRender(value: Moment) {
        const formatedDate = formdDate(value.toDate());
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate);
        return (
            <div>
                {currentDayEvents.map((ev, index) => (
                    <div key={index}>{ev.description}</div>
                ))}
            </div>
        );
    }
    return (
        <Layout>
            <Calendar dateCellRender={dateCellRender} />
        </Layout>
    );
};

export default EventCalendar;