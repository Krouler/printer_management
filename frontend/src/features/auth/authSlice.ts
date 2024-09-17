import { SelfUser, UserLoginResponse } from '../../app/services/types';
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../app/services/auth';
import { RootState } from '../../app/store';

interface InitState {
    user: SelfUser | null,
    tokens: UserLoginResponse | null,
    isAuthenticated: boolean;
    mayHaveUser: boolean;
}

const initialState: InitState = {
    user: null,
    tokens: null,
    isAuthenticated: false,
    mayHaveUser: true,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.tokens = action.payload;
                localStorage.setItem('access', action.payload.access);
                localStorage.setItem('refresh', action.payload.refresh);
                state.isAuthenticated = true;
                state.mayHaveUser = true;
            })
            .addMatcher(authApi.endpoints.getself.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.tokens = {
                    access: localStorage.getItem('access') +'',
                    refresh: localStorage.getItem('refresh') + ''
                }
                state.isAuthenticated = true;
                state.mayHaveUser = false;
            })
            .addMatcher(authApi.endpoints.getself.matchRejected, (state, action) => {
                state.mayHaveUser = false;
            })
            .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addMatcher(authApi.endpoints.tokenrefresh.matchFulfilled, (state, action) => {
                localStorage.setItem('access', action.payload.access)
                let refresh = localStorage.getItem('refresh') + '';
                state.tokens = {refresh: refresh, access: action.payload.access}
                state.isAuthenticated = true;
                state.mayHaveUser = true;
            })
            .addMatcher(authApi.endpoints.tokenrefresh.matchRejected, (state, action) => {
                state = initialState;
            })
            .addMatcher(authApi.endpoints.userUpdate.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.mayHaveUser = true;
            })
    },
})

export const { logout } = slice.actions;

export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectTokens = (state: RootState) => state.auth.tokens;
