import { useEffect } from 'react';
import { useGetselfQuery, useTokenrefreshMutation } from '../../app/services/auth';
import styles from './index.module.css';
import { RootState } from '../../app/store';
import { logout } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export const GetUserCaller = () => {

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }
    const { mayHaveUser } = useSelector((state: RootState) => {
        return state.auth
    });
    const data = useGetselfQuery();
    const [refreshToken, refreshTokenResult] = useTokenrefreshMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.isError){
            const loading = async () => {
                await timeout(200);
                if (localStorage.getItem('refresh') !== null && !mayHaveUser) {
                    try {
                        await refreshToken({refresh: localStorage.getItem('refresh') + ''}).unwrap();
                    } catch (e) {
                        dispatch(logout());
                        localStorage.clear();
                    }
                }
            }
            loading();
        }
    }, [refreshTokenResult, data, refreshToken, mayHaveUser, dispatch])

    return(
        <div className={ styles.caller }></div>
    );
};