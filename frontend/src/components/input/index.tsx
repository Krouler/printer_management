import { Form, Input } from 'antd';

type Props = {
    name?: string;
    placeholder?: string;
    type?: string;
    defaultValue?: string;
}

export const CustomInput = ({ name, placeholder, defaultValue, type = 'text' }: Props) => {

    return (
        <Form.Item name={name} shouldUpdate rules={[{required: true, message: 'Обязательное поле'}]}>
            <Input placeholder={placeholder} type={type} size='large' defaultValue={defaultValue} />
        </Form.Item>
    )
}