import { Layout as AntLayout } from 'antd'
import styles from './index.module.css';
import { Header } from '../header';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { GetUserCaller } from '../get-user-caller/index';
import { useSelector } from 'react-redux';
// import { useGetselfQuery } from '../../app/services/auth';

type Props = {
    children: React.ReactNode
}

export const Layout = ({ children }: Props) => {

    const { mayHaveUser } = useSelector((state: RootState) => {
        return state.auth
    });
    
    const [needCaller, setNeedCaller] = useState(false);

    useEffect(() => {
        if (mayHaveUser){
            setNeedCaller(true);
        } else {
            setNeedCaller(false);
        }
    }, [mayHaveUser]);

    return (
        <div className={styles.main}>
            {needCaller? <GetUserCaller /> : null }
            <Header />
            <AntLayout.Content style={{ height: '100%' }}>
                {children}
            </AntLayout.Content>
        </div>
    )
}