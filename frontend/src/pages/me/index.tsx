import { Card, Typography } from "antd"
import { Layout } from "../../components/layout"
import styles from './index.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { CustomButton } from "../../components/button";
import { useNavigate } from "react-router-dom";

export const SelfPage = () => {

    const { user } = useSelector((state: RootState) => {
        return state.auth
    })

    const navigate = useNavigate();

    const toUpdate = () => {
        navigate('/me/update');
    }

    return(
        <Layout>
            <Card className={styles.self_page__container}>
                <div>
                    <h2>Добро пожаловать, {`${user?.first_name} ${user?.last_name}!`}</h2>
                    <br/>
                    <p>Ваш логин: {user?.username}</p>
                    <p>Ваша почта: {user?.email}</p>
                    {user?.is_staff? <p><b>У Вас есть права на добавление, изменение и удаление!</b></p> : null }
                </div>
                <CustomButton onClick={toUpdate} ghost={false} className={styles.profile__change}>
                        <Typography.Text style={{ color: 'white' }}>
                            Изменить профиль
                        </Typography.Text>
                    </CustomButton>
            </Card>
        </Layout>
    );
};