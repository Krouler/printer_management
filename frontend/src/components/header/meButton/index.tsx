import { Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { Paths } from "../../../paths";
import styles from './index.module.css';
import { CustomButton } from "../../button";
import { UserOutlined } from "@ant-design/icons";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

export const MeButton = () => {

    const user = useSelector((state: RootState) => {
        return state.auth.user
    });

    const fullName = user?.first_name + ' ' + user?.last_name;

    return (
        <Space className={styles.space__header}>
            <Link to={Paths.me}>
                <CustomButton ghost={true}>
                    <Typography.Text style={{ color: 'white' }}>
                        <UserOutlined className={styles.teamIcon} /> {fullName}
                    </Typography.Text>
                </CustomButton>
            </Link>
        </Space>
    );
};