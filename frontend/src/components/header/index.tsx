import { Layout, Space, Spin, Typography } from 'antd'
import styles from './index.module.css'
import { HomeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { CustomButton } from '../button'
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useEffect, useState } from 'react';
import { RootState, store } from '../../app/store';
import { logout } from '../../features/auth/authSlice';
import { MeButton } from './meButton';
import { useSelector } from 'react-redux';

export const Header = () => {

    const {isAuthenticated, mayHaveUser} = useSelector((state: RootState) => {
        return state.auth
    });

    const [isAuthed, setIsAuthed] = useState(isAuthenticated);
    const [isLoading, setIsLoading] = useState(mayHaveUser);
    const [reRender, triggerReRender] = useState(true);

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    useEffect(() => {
        if (isLoading){
            const waitForLogin = async () => {
                await timeout(500);
                setIsAuthed(isAuthenticated);
                setIsLoading(mayHaveUser);
                triggerReRender(!reRender);
            };
            waitForLogin();
        }
    }, [isLoading, reRender, isAuthenticated, mayHaveUser]);

    const navigate = useNavigate();

    const performLogout = () => {
        store.dispatch(logout());
        localStorage.clear();
        setIsAuthed(store.getState().auth.isAuthenticated);
        navigate('/');
    }

    const login_component = (
        <Space className={styles.space__header + ' ' + styles.space_header__right}>
            <Space className={styles.space__header}>
                <Link to={Paths.register}>
                    <CustomButton ghost={true}>
                        <Typography.Text style={{ color: 'white' }}>
                            Регистрация
                        </Typography.Text>
                    </CustomButton>
                </Link>
            </Space>
            <Space className={styles.space__header}>
                <Link to={Paths.login}>
                    <CustomButton ghost={true}>
                        <Typography.Text style={{ color: 'white' }}>
                            <LoginOutlined className={styles.teamIcon} />
                        </Typography.Text>
                    </CustomButton>
                </Link>
            </Space>
        </Space>
    )

    const authed_component = (
        <Space className={styles.space__header + ' ' + styles.space_header__right}>
            <MeButton />
            <Space className={styles.space__header}>
                <CustomButton onClick={performLogout} ghost={true}>
                    <Typography.Text style={{ color: 'white' }}>
                        <LogoutOutlined className={styles.teamIcon} />
                    </Typography.Text>
                </CustomButton>
            </Space>
        </Space>
    )

    const auth_component = (
        <div className='wait_or_load'>
            {isAuthed ? authed_component : login_component}
        </div>
    )

    return (
        <Layout.Header className={styles.header}>
            <Space className={styles.space__header}>
                <Link to={Paths.home}>
                    <CustomButton ghost={true}>
                        <Typography.Text style={{ color: 'white' }}>
                            <HomeOutlined className={styles.teamIcon} />
                        </Typography.Text>
                    </CustomButton>
                </Link>
            </Space>
            {isLoading? <Spin /> : auth_component }
        </Layout.Header>
    )
}