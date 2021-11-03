import React, { FC, useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Row, Select } from 'antd';
import { rules } from '../utils/rules';
import { IUser } from '../models/IUser';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import { formdDate } from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {

    const { user } = useTypedSelector(state => state.auth)

    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({ ...event, date: formdDate(date.toDate()) })
        }
    }
    const submitForm = () => {
        props.submit({ ...event, author: user.username })
    }
    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Описания события"
                name="description"
                rules={[rules.required()]}
            >
                <Input value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                rules={[rules.required(), rules.isDateAfter('Нельзя создать событие в прошлом')]}
            >
                <DatePicker onChange={(date) => selectDate(date)} />
            </Form.Item>
            <Form.Item
                label="Выберите гостя"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
                    {props.guests.map(guest => (
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Создать
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;