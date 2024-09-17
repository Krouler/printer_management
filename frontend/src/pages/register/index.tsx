import { Layout } from '../../components/layout';
import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from '../../components/input';
import { PasswordInput } from '../../components/password-input';
import { CustomButton } from '../../components/button';
import style from './index.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { UserRegisterRequest } from '../../app/services/types';
import { useLoginMutation, useRegisterMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { ErrorMessage } from '../../components/error-message';

export const Registration = () => {
    
    const { isAuthenticated } = useSelector((state: RootState) => {
        return state.auth
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const [registerUser] = useRegisterMutation();
    const [loginUser] = useLoginMutation();
    const [errorMsg, setErrorMsg] = useState('');

    const performRegister = async (element: UserRegisterRequest) => {
        try {
            await registerUser(element).unwrap();
            const { username, password } = element;
            await loginUser({username, password}).unwrap();
            navigate('/');
        } catch (err) {
            const maybeErr = isErrorWithMessage(err);
            if (maybeErr) {
                if (err.data.username![0] === 'A user with that username already exists.') {
                    setErrorMsg('Пользователь с таким логином уже существует.')
                }
            } else {
                setErrorMsg('Неизвестная ошибка');
            };
        }

        
    }

    return (
        <Layout>
        <Row align='middle' justify='center'>
            <Card className={ style.register__card } title='Регистрация'>
                <Form onFinish={performRegister}>
                    <label htmlFor="username">Логин</label>
                    <CustomInput type="username" name="username" placeholder="Логин для входа" />
                    <label htmlFor="first_name">Имя</label>
                    <CustomInput type="first_name" name="first_name" placeholder="Имя пользователя" />
                    <label htmlFor="last_name">Фамилия</label>
                    <CustomInput type="last_name" name="last_name" placeholder="Фамилия пользователя" />
                    <label htmlFor="username">Ваша почта</label>
                    <CustomInput type="email" name="email" placeholder="Email" />
                    <label htmlFor="password">Пароль</label>
                    <PasswordInput name='password' placeholder='Пароль' />
                    <label htmlFor="confirmPassword">Подтвердите пароль</label>
                    <PasswordInput name='confirmPassword' placeholder='Подтвердите пароль' logininput />
                    <CustomButton type="primary" htmlType="submit" >Войти</CustomButton>
                </Form>
                <Space style={{marginTop: '30px'}} direction='vertical' size='large'>
                    <Typography.Text>
                        Уже зарегистрированы? <Link to={Paths.login}>Войдите</Link>
                    </Typography.Text>
                    <ErrorMessage details={errorMsg} />
                </Space>
            </Card>
        </Row>
    </Layout>
    )
}