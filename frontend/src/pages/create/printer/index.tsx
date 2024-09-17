import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTokenrefreshMutation } from "../../../app/services/auth";
import { usePrinterPostMutation, useCabinetListQuery, useCartridgeListQuery } from "../../../app/services/printer";
import { TPrinterPOST } from "../../../app/services/types";
import { logout } from "../../../features/auth/authSlice";
import { Paths } from "../../../paths";
import { RootState } from "../../../app/store";
import { Card, Select, Form } from "antd";
import { HomePageWrapper } from "../../../components/HomePage";
import { CustomButton } from "../../../components/button";
import { CustomInput } from "../../../components/input";


export const CreatePrinter = () => {

    const [createPrinter, createPrinterResult] = usePrinterPostMutation();
    const [refreshToken, refreshTokenResult] = useTokenrefreshMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();   

    const { user } = useSelector((state: RootState) => {
        return state.auth
    });

    useEffect(() => {
        if (user === null || !user.is_staff){
            navigate(Paths.printer_list);
        }
    },[user, navigate]);

    const cabinet = useCabinetListQuery();
    const cartridge = useCartridgeListQuery();

    const performCreate = async (data: TPrinterPOST) => {
        if (user !== null){
            if (user.is_staff){
                await createPrinter(data).unwrap();
                if (createPrinterResult.isError){
                    const refresh = localStorage.getItem('refresh') +'';
                    await refreshToken({refresh});
                    if (refreshTokenResult.isError) {
                        dispatch(logout());
                        localStorage.clear();
                    } else {
                        await createPrinter(data).unwrap();
                    }
                }
                navigate(Paths.printer_list);
            }
        }
    }

    const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return(
        <HomePageWrapper>
            <Card>
                <Form onFinish={performCreate}>
                    <Form.Item name={'cabinet_id'} label={'Кабинет'}>
                        <Select showSearch placeholder={'Введите кабинет'} filterOption={filterOption} options={cabinet.data?.results.map((e) => {return {value: e!.id+'', label: `${e!.floor} этаж - ${e?.number} ${e!.local_name}`}})} />
                    </Form.Item>
                    <Form.Item label={'Компания-производитель'}>
                        <CustomInput type="text" name={'manufacturer'} placeholder="Введите компанию-производителя" />
                    </Form.Item>
                    <Form.Item label={'Модель'}>
                        <CustomInput type="text" name={'model'} placeholder="Введите наименование модели" />
                    </Form.Item>
                    <Form.Item label={'Локальное имя принтера'}>
                        <CustomInput type="text" name={'local_name'} placeholder="Введите локальное имя принтера" />
                    </Form.Item>
                    <Form.Item label={'IP адрес'}>
                        <CustomInput type="text" name={'ip_address'} placeholder="Введите IP адрес принтера" />
                    </Form.Item>
                    <Form.Item name={'cartridges_add'} label={'Картриджи'}>
                        <Select filterOption={filterOption} placeholder='Выберите картриджи' allowClear mode="multiple" options={cartridge.data?.results.map((data) => {return {value: data!.id + '', label: `${data!.original? 'Оригинальный':'Неоригинальный'} ${data!.model} ${data!.count}шт.`}})} />
                    </Form.Item>
                    <Form.Item>
                        <CustomButton type="primary" htmlType="submit" loading={createPrinterResult.isLoading}>Создать</CustomButton>
                    </Form.Item>
                </Form>
            </Card>
        </HomePageWrapper>
    );
};