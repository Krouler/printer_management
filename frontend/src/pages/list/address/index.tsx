import { Card, List } from "antd";
import { HomePageWrapper } from "../../../components/HomePage";
import styles from './index.module.css';
import { ListMenuPageWrapper } from "../../../components/list-menu";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useAddressListQuery } from "../../../app/services/printer";
import { Paths } from "../../../paths";

export const AddressList = () => {

    const data = useAddressListQuery();

    const { address } = useSelector((state: RootState) => {
        return state.printer
    })

    return (
        <HomePageWrapper>
            <ListMenuPageWrapper itemCount={address?.count} pathLeadsTo={Paths.address_create}>
                <Card className={styles.address_list__container}>
                    <List
                        size="large"
                        header={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}><h1>Список добавленных адресов</h1></div>}
                        bordered
                        loading={data.isLoading}
                        dataSource={address?.results}
                        renderItem={(item) => <List.Item>{item?.address}</List.Item>}
                    />
                </Card>
            </ListMenuPageWrapper>
        </HomePageWrapper>
    );
};