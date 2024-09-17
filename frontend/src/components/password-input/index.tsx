import { Form, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';

type Props = {
    name: string;
    placeholder: string;
    dependencies?: NamePath[];
    logininput?: boolean;
}

export const PasswordInput = ({ name, placeholder, dependencies, logininput }: Props) => {
    return (
        <Form.Item name={name} dependencies={dependencies} hasFeedback rules={[{ required: true, message: 'Обязательное поле' },
         ({getFieldValue}) => ({
            validator(_, value: string) {
                if (!value){
                    return Promise.resolve();
                }
                if (name === 'confirmPassword'){
                    if (getFieldValue('password') === value){
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли должны совпадать'));
                } else {
                    if (logininput){
                        return Promise.resolve();
                    }
                    if (RegExp(/^.*(?=.{8,})(?=.{1,}[a-z])(?=.{1,}[A-Z])(?=.*\d).*$/, 'g').test(getFieldValue('password'))){
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Поля должны содержать: от 8 символов, минимум - 1 цифра, 1 заглавная и 1 строчная'))
                }
            },
         })]}>
            <Input.Password placeholder={placeholder} size='large' />
        </Form.Item>
    )
}