import { Card, List } from "antd"
import { HomePageWrapper } from "../../../components/HomePage"
import styles from './index.module.css';
import { ListMenuPageWrapper } from "../../../components/list-menu";
import { useCabinetListQuery } from "../../../app/services/printer";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Paths } from "../../../paths";

export const CabinetList = () => {

    const data = useCabinetListQuery();

    const { cabinet } = useSelector((state: RootState) => {
        return state.printer
    })

    return (
        <HomePageWrapper>
            <ListMenuPageWrapper pathLeadsTo={Paths.cabinets_create}>
                <Card className={styles.cabinet_list__container}>
                <List
                        size="large"
                        header={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}><h1>Список кабинетов</h1></div>}
                        bordered
                        loading={data.isLoading}
                        dataSource={cabinet?.results}
                        renderItem={(item) => <List.Item>{`${item?.floor} этаж, ${item?.number}: ${item?.local_name}`}</List.Item>}
                    />
                </Card>
            </ListMenuPageWrapper>
        </HomePageWrapper>
    )
}