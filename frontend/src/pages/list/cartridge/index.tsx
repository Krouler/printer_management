import { Card, List } from "antd"
import { HomePageWrapper } from "../../../components/HomePage"
import styles from './index.module.css';
import { ListMenuPageWrapper } from "../../../components/list-menu";
import { useCartridgeListQuery } from "../../../app/services/printer";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Paths } from "../../../paths";

export const CartridgeList = () => {

    const data = useCartridgeListQuery();

    const { cartridge } = useSelector((state: RootState) => {
        return state.printer
    })

    return (
        <HomePageWrapper>
            <ListMenuPageWrapper pathLeadsTo={Paths.cartridge_create}>
                <Card className={styles.cartridge_list__container}>
                <List
                        size="large"
                        header={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}><h1>Список картриджей</h1></div>}
                        bordered
                        loading={data.isLoading}
                        dataSource={cartridge?.results}
                        renderItem={(item) => <List.Item>{`${item?.original? 'Оригинальный' : 'Неоригинальный' } картридж - ${item?.model} ${item?.type}, ${item?.count} шт.`}</List.Item>}
                    />
                </Card>
            </ListMenuPageWrapper>
        </HomePageWrapper>
    )
}