import { Button, Form } from 'antd';
import styles from './index.module.css';

type Props = {
    children: React.ReactNode;
    className?: string;
    htmlType?: "button" | "submit" | "reset" | undefined;
    type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
    onClick?: () => void;
    danger?: boolean;
    loading?: boolean;
    shape?: "default" | "circle" | "round" | undefined;
    icon?: React.ReactNode;
    ghost?: boolean | undefined
}

export const CustomButton = ({ children, className, htmlType, type, danger, loading, shape, icon, onClick, ghost }: Props) => {

    return (
        <Form.Item className={styles.custom__button}>
            {ghost === true? <Button className={className} ghost onClick={onClick} icon={icon} shape={shape} htmlType={htmlType} type={type} danger={danger} loading={loading}>{children}</Button> : <Button className={className} onClick={onClick} icon={icon} shape={shape} htmlType={htmlType} type={type} danger={danger} loading={loading}>{children}</Button>}
        </Form.Item>
    )
}