import { Card, Form } from "antd";
import { HomePageWrapper } from "../../../components/HomePage";
import { CustomInput } from "../../../components/input";
import { CustomButton } from "../../../components/button";
import { useAddressPostMutation } from "../../../app/services/printer";
import { TAddress } from "../../../app/services/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useTokenrefreshMutation } from "../../../app/services/auth";
import { logout } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../paths";
import { useEffect } from "react";

export const AddressCreate = () => {

    const [createAddress, createAddressResult] = useAddressPostMutation();
    const [refreshToken, refreshTokenResult] = useTokenrefreshMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();   

    const { user } = useSelector((state: RootState) => {
        return state.auth
    });

    useEffect(() => {
        if (user === null || !user.is_staff){
            navigate(Paths.address_list);
        }
    },[user, navigate]);

    const performCreate = async (data: TAddress) => {
        if (user !== null){
            if (user.is_staff){
                await createAddress(data).unwrap();
                if (createAddressResult.isError){
                    const refresh = localStorage.getItem('refresh') +'';
                    await refreshToken({refresh: refresh});
                    if (refreshTokenResult.isError) {
                        dispatch(logout());
                        localStorage.clear();
                    } else {
                        await createAddress(data).unwrap();
                    }
                }
                navigate(Paths.address_list)
            }
        }
    }

    return(
        <HomePageWrapper>
            <Card>
                <Form onFinish={performCreate}>
                    <Form.Item label={'Адрес'}>
                        <CustomInput type="address" name="address" placeholder="Введите адрес" />
                    </Form.Item>
                    <Form.Item>
                        <CustomButton type="primary" htmlType="submit" loading={createAddressResult.isLoading || createAddressResult.isError}>Создать</CustomButton>
                    </Form.Item>
                </Form>
            </Card>
        </HomePageWrapper>
    );
};