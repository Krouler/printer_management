import { Card } from "antd";
import { HomePageWrapper } from "../../components/HomePage";
import styles from './index.module.css';
import { Typography } from "antd";

export const HomePage = () => {

    return (
        <HomePageWrapper>
            <Card className={styles.home__body__container}>
                <Typography.Text>
                    Домашняя страница
                </Typography.Text>
            </Card>
        </HomePageWrapper>
    )
}