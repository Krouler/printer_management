import { Card, Col, Form, InputNumber, Radio, RadioChangeEvent, Row, Select, Slider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTokenrefreshMutation } from "../../../app/services/auth";
import { useCartridgePostMutation, usePrinterListQuery } from "../../../app/services/printer";
import { TCartridgePOST } from "../../../app/services/types";
import { HomePageWrapper } from "../../../components/HomePage";
import { CustomButton } from "../../../components/button";
import { CustomInput } from "../../../components/input";
import { logout } from "../../../features/auth/authSlice";
import { Paths } from "../../../paths";
import { RootState } from "../../../app/store";


export const CreateCartridge = () => {
    const [createCartridge, createCartridgeResult] = useCartridgePostMutation();
    const [refreshToken] = useTokenrefreshMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [radioValue, setRadioValue] = useState(true); 
    const [cartridgeCount, setCartridgeCount] = useState(0);

    const { user } = useSelector((state: RootState) => {
        return state.auth
    });

    useEffect(() => {
        if (user === null || !user.is_staff){
            navigate(Paths.cartridge_list);
        }
    },[user, navigate]);

    const printer = usePrinterListQuery();

    const performCreate = async (data: TCartridgePOST) => {
        if (user !== null){
            if (user.is_staff){
                try {
                    await createCartridge(data).unwrap();
                    navigate(Paths.cartridge_list);
                } catch (e) {
                    console.log(e)
                    const refresh = localStorage.getItem('refresh') +'';
                    try {
                        await refreshToken({refresh});
                        await createCartridge(data).unwrap();
                        navigate(Paths.cartridge_list);
                    } catch (e) {
                        console.log(e)
                        // dispatch(logout());
                        // localStorage.clear();
                    }
                }
            }
        }
    }

    const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <HomePageWrapper>
            <Card>
                <Form onFinish={performCreate}>
                    <Form.Item name={'printer'} label={'Принтер'}>
                        <Select filterOption={filterOption} placeholder='Выберите принтеры' allowClear mode="multiple" options={printer.data?.results.map((data) => {return {value: data!.id + '', label: `${data!.manufacturer} ${data!.model}`}})} />
                    </Form.Item>
                    <Form.Item label={'Тип'}>
                        <CustomInput type="text" name={'type'} placeholder="Тип картриджа" />
                    </Form.Item>
                    <Form.Item label={'Модель картриджа'}>
                        <CustomInput type="text" name={'model'} placeholder="Введите модель" />
                    </Form.Item>
                    <Form.Item label={'Это оригинальный картридж?'}>
                        <Radio.Group value={radioValue} onChange={(e: RadioChangeEvent) => {setRadioValue(e.target.value)}}>
                            <Radio value={true}>Да</Radio>
                            <Radio value={false}>Нет</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={'count'} label={'Количество картриджей на складе'}>
                        <InputNumber min={0} max={100} value={cartridgeCount} onChange={(value: number | null) => {typeof value === 'number'? setCartridgeCount(value) : setCartridgeCount(0)}} />
                    </Form.Item>
                    <Form.Item>
                        <CustomButton type="primary" htmlType="submit" loading={createCartridgeResult.isLoading}>Создать</CustomButton>
                    </Form.Item>
                </Form>
            </Card>
        </HomePageWrapper>
    );
};