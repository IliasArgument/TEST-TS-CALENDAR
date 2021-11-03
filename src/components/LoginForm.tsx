import React, { FC, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { rules } from '../utils/rules';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';


const LoginForm: FC = () => {

    const { login } = useActions()

    const { error, isLoading } = useTypedSelector(state => state.auth);

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        login(userName, password)
    }
    return (
        <Form
            onFinish={submit}
            className="form"
        >
            {error && <div style={{ color: 'red' }}>
                {error}
            </div>}
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required('Пожалуйста ввидетие имя пользователя!')]}
            >
                <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required('Пожалуйста введите ваш пароль')]}
            >
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type={"password"} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;