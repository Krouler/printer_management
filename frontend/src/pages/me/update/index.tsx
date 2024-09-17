import { useDispatch, useSelector } from "react-redux";
import styles from './index.module.css';
import { RootState } from "../../../app/store";
import { Layout } from "../../../components/layout";
import { Card, Form, Input } from "antd";
import { CustomButton } from "../../../components/button";
import { UserUpdateRequest } from "../../../app/services/types";
import { useTokenrefreshMutation, useUserUpdateMutation } from "../../../app/services/auth";
import { useNavigate } from "react-router-dom";
import { getRefreshToken } from "../../../app/services/api";
import { logout } from "../../../features/auth/authSlice";
import { useEffect } from "react";

export const ChangeInfo = () => {

    const {user} = useSelector((state: RootState) => {
        return state.auth
    })

    const [form] = Form.useForm();

    const navigate = useNavigate();

    useEffect(() => {
        form.setFieldsValue(user);
    }, [form, user]);

    const [updateUser, updateUserResult] = useUserUpdateMutation();
    const [refreshToken, refreshTokenResult] = useTokenrefreshMutation();
    const dispatch = useDispatch();

    const update = async (element: UserUpdateRequest) => {
        await updateUser(element);
        if (updateUserResult.isError) {
            await refreshToken({refresh: getRefreshToken()});
            if (refreshTokenResult.isError) {
                dispatch(logout());
                localStorage.clear();
                navigate('/');
            }
        }
        navigate('/me')
    }

    return(
        <Layout>
            <Card className={styles.self_page__container}>
                <Form onFinish={update} className={styles.form__instance} form={form}>
                    <Form.Item label={'Имя'} name={'first_name'}>
                        <Input className={styles.form__input} />
                    </Form.Item>
                    <Form.Item label={'Фамилия'} name={'last_name'}>
                        <Input className={styles.form__input} />
                    </Form.Item>
                    <Form.Item label={'Ваша электропочта'} name={'email'} rules={[{
        required: true,
        type: "email",
        message: "Неверно введен email",
      }]}>
                        <Input className={styles.form__input} />
                    </Form.Item>
                    <CustomButton type="primary" htmlType="submit">Изменить</CustomButton>
                </Form>
            </Card>
        </Layout>
    );
};