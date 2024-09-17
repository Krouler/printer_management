import { useEffect, useState } from "react"
import { Card, Form, Row, Space, Typography } from "antd"
import { CustomInput } from "../../components/input"
import { PasswordInput } from "../../components/password-input"
import { CustomButton } from "../../components/button"
import { Layout } from '../../components/layout';
import style from './index.module.css';
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { UserLoginRequest } from "../../app/services/types";
import { useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message"
import { RootState } from "../../app/store"
import { useSelector } from "react-redux"

export const Login = () => {

    const { isAuthenticated } = useSelector((state: RootState) => {
        return state.auth
    });

    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    const [loginUser, loginUserResult] = useLoginMutation();
    const [error, setError] = useState('');

    const login = async (data: UserLoginRequest) => {
        try {
            await loginUser(data).unwrap();
            navigate('/');
        } catch (err) {
            const maybeErr = isErrorWithMessage(err);
            if (maybeErr) {
                setError(err.data.details);
            } else {
                setError('Неизвестная ошибка');
            };
        }
    }

    return (
        <Layout>
            <Row align='middle' justify='center'>
                <Card className={style.login__card} title='Войдите'>
                    <Form onFinish={login}>
                        <label htmlFor="username">Логин</label>
                        <CustomInput type="username" name="username" placeholder="Пользователь" />
                        <label htmlFor="password">Пароль</label>
                        <PasswordInput name='password' placeholder='Пароль' logininput />
                        <CustomButton type="primary" htmlType="submit" loading={loginUserResult.isLoading ? true : false} >Войти</CustomButton>
                    </Form>
                    <Space style={{ marginTop: '30px' }} direction='vertical' size='large'>
                        <Typography.Text>
                            Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
                        </Typography.Text>
                        <ErrorMessage details={error} />
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}