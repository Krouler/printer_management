import { Alert } from "antd";

type Props = {
    details?: string;
}

export const ErrorMessage = ({ details }: Props) => {
    if (!details) {
        return null;
    }
    return <Alert message={ details } type="error" />;
};