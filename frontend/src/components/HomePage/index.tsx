import { PropsWithChildren } from "react";
import { Layout } from "../layout"
import { Card, Typography } from 'antd';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../components/button';
import { Paths } from '../../paths';

type Props = {
   element?: React.ReactNode;
}

export const HomeNav = () => {
    
    return (
            <Card className={styles.navigation__container}>
                <nav className={styles.navigation}>
                    <ul className={styles.navigation__list}>
                        <li className="navigation__item">
                            <Link to={Paths.address_list}>
                                <CustomButton className={styles.item__button} ghost={true}>
                                    <Typography.Text>
                                        Список адресов
                                    </Typography.Text>
                                </CustomButton>
                            </Link>
                        </li>
                        <li className="navigation__item">
                            <Link to={Paths.cabinet_list}>
                                <CustomButton className={styles.item__button} ghost={true}>
                                    <Typography.Text>
                                        Список кабинетов
                                    </Typography.Text>
                                </CustomButton>
                            </Link>
                        </li>
                        <li className="navigation__item">
                            <Link to={Paths.printer_list}>
                                <CustomButton className={styles.item__button} ghost={true}>
                                    <Typography.Text>
                                        Список принтеров
                                    </Typography.Text>
                                </CustomButton>
                            </Link>
                        </li>
                        <li className="navigation__item">
                            <Link to={Paths.cartridge_list}>
                                <CustomButton className={styles.item__button} ghost={true}>
                                    <Typography.Text>
                                        Список картриджей
                                    </Typography.Text>
                                </CustomButton>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Card>
    )
}

export const HomePageWrapper: React.FC<PropsWithChildren<Props>> = (element) => {

    return (
        <Layout>
            <HomeNav />
            {element.children}
        </Layout>
    )
}
