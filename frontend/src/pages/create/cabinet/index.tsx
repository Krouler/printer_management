import { Card, Form, Select } from "antd"
import { HomePageWrapper } from "../../../components/HomePage"
import { TCabinetPOST } from "../../../app/services/types";
import { useAddressListQuery, useCabinetPostMutation } from "../../../app/services/printer";
import { useTokenrefreshMutation } from "../../../app/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { Paths } from "../../../paths";
import { RootState } from "../../../app/store";
import { CustomButton } from "../../../components/button";
import { CustomInput } from "../../../components/input";
import { useEffect } from "react";

export const CreateCabinet = () => {

    const [createCabinet, createCabinetResult] = useCabinetPostMutation();
    const [refreshToken, refreshTokenResult] = useTokenrefreshMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();   

    const { user } = useSelector((state: RootState) => {
        return state.auth
    });

    useEffect(() => {
        if (user === null || !user.is_staff){
            navigate(Paths.cabinet_list);
        }
    },[user, navigate]);

    const address = useAddressListQuery();

    const performCreate = async (data: TCabinetPOST) => {
        if (user !== null){
            if (user.is_staff){
                await createCabinet(data).unwrap();
                if (createCabinetResult.isError){
                    const refresh = localStorage.getItem('refresh') +'';
                    await refreshToken({refresh});
                    if (refreshTokenResult.isError) {
                        dispatch(logout());
                        localStorage.clear();
                    } else {
                        await createCabinet(data).unwrap();
                    }
                }
                navigate(Paths.cabinet_list);
            }
        }
    }

    const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <HomePageWrapper>
            <Card>
                <Form onFinish={performCreate}>
                    <Form.Item name={'address_id'} label={'Адрес'}>
                        <Select showSearch placeholder={'Введите адрес'} filterOption={filterOption} options={address.data?.results.map((e) => {return {value: e!.id+'', label: e!.address}})} />
                    </Form.Item>
                    <Form.Item label={'Номер кабинета'}>
                        <CustomInput type="text" name={'number'} placeholder="Введите номер кабинета" />
                    </Form.Item>
                    <Form.Item label={'Этаж'}>
                        <CustomInput type="text" name={'floor'} placeholder="Введите этаж где находится кабинет" />
                    </Form.Item>
                    <Form.Item label={'Локальное имя помещения'}>
                        <CustomInput type="text" name={'local_name'} placeholder="Введите локальное наименование кабинета" />
                    </Form.Item>
                    <Form.Item>
                        <CustomButton type="primary" htmlType="submit" loading={createCabinetResult.isLoading || createCabinetResult.isError}>Создать</CustomButton>
                    </Form.Item>
                </Form>
            </Card>
        </HomePageWrapper>
    )
}