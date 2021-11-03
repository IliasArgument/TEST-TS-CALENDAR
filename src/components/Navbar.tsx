import React, { FC } from 'react';
import { Layout, Row, Menu } from 'antd';
import { useHistory } from 'react-router';
import { RouteNames } from '../router';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';
import { useActions } from '../hooks/useActions';

const Navbar: FC = () => {

    const { logout } = useActions()
    const router = useHistory();
    const { isAuth, user } = useTypedSelector(state => state.auth)

    return (
        <Layout.Header>
            <Row justify="end">
                {
                    isAuth
                        ?
                        <>
                            <div style={{ color: '#fff' }}>{user.username}</div>
                            <Menu theme="dark" mode="horizontal" selectable={false}>
                                <Menu.Item key={1} onClick={logout}>
                                    Выйти
                                </Menu.Item>
                            </Menu>
                        </>
                        :
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item key={1} onClick={() => router.push(RouteNames.LOGIN)}>
                                Login
                            </Menu.Item>
                        </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;