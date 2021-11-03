import React, { FC } from 'react';
import { Card, Layout, Row, message, Button } from 'antd';
import LoginForm from '../components/LoginForm';

const Login: FC = () => {
    const success = () => {
        message.success('1. USERNAME: user, PASSWORD: 123, 2. USERNAME: ilia, PASSWORD: 123, 3. USERNAME: admin, PASSWORD: 123', 10);
    };

    return (
        <Layout>
            <Row justify="center" align="middle" className="h50">
                <Button type="primary" onClick={success}>Посмотреть тестовые данные</Button>
            </Row>
            <Row justify="center" align="middle" className="h100">
                <Card>
                    <LoginForm />
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;