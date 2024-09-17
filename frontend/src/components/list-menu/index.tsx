import { Button, Card, Flex, Input, Pagination } from 'antd';
import styles from './index.module.css';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

type Props = {
    element?: React.ReactNode;
    itemCount?: number;
    pathLeadsTo?: string;
 }

const ListMenu = ({pathLeadsTo}: Props) => {

    const { user } = useSelector((state: RootState) => {
        return state.auth
    });

    const navigate = useNavigate();

    const navToCreatePage = () => {
        navigate(pathLeadsTo!);
    }

    const is_staff = user !== null? user.is_staff : false;

    return (
        <Card className={styles.list_menu__container}>
            <Flex justify={'space-between'}>
                <Search placeholder="Поиск" className={styles.list_menu__search} />
                {is_staff? <Button type="primary" onClick={navToCreatePage}>Добавить</Button>:null}
            </Flex>
        </Card>
    );
};

const ListMenuBottom = ({itemCount}: Props) => {

    return (
        <Card className={styles.list_menu__container}>
            <Flex justify={'center'}>
                <Pagination defaultCurrent={1} total={itemCount? itemCount : 0} showSizeChanger={false} pageSize={10} />
            </Flex>
        </Card>
    );
}

export const ListMenuPageWrapper: React.FC<PropsWithChildren<Props>> = (element) => {

    return (
        <div className={styles.list__content}>
            <ListMenu pathLeadsTo={element.pathLeadsTo} />
            {element.children}
            <ListMenuBottom itemCount={element.itemCount} />
        </div>
    )
}
