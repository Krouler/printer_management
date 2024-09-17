import { Card, List } from "antd"
import { HomePageWrapper } from "../../../components/HomePage"
import styles from './index.module.css';
import { ListMenuPageWrapper } from "../../../components/list-menu";
import { useCabinetListQuery, usePrinterListQuery } from "../../../app/services/printer";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Paths } from "../../../paths";

export const PrinterList = () => {

    const data = usePrinterListQuery();

    const cabinetData = useCabinetListQuery();

    const { printer } = useSelector((state: RootState) => {
        return state.printer
    })

    const getCabinetById = (id: number): string => {
        let cab = '';
        cabinetData.data?.results.forEach((cabinet) => {
            if (cabinet?.id === id) {
                cab = `кабинет: ${cabinet.floor} этаж, ${cabinet.local_name}`
            }
        })
        return cab
    }

    return (
        <HomePageWrapper>
            <ListMenuPageWrapper pathLeadsTo={Paths.printer_create}>
                <Card className={styles.printer_list__container}>
                <List
                        size="large"
                        header={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}><h1>Список принтеров</h1></div>}
                        bordered
                        loading={data.isLoading}
                        dataSource={printer?.results}
                        renderItem={(item) => <List.Item>{`${item?.manufacturer} ${item?.model}, ${getCabinetById(item!.cabinet_id)}; ${item?.local_name}`}</List.Item>}
                    />
                </Card>
            </ListMenuPageWrapper>
        </HomePageWrapper>
    )
}
