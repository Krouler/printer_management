import { api, getAccessToken } from './api';
import { RefreshTokenRequest, RefreshTokenResponse, SelfUser, TokenVerifyRequest, UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse, UserUpdateRequest } from './types';

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<UserRegisterResponse, UserRegisterRequest>({
            query: (data) => ({
                url: 'user/registration/',
                method: 'POST',
                body: data
            })
        }),
        getself: builder.query<SelfUser, void>({
            query: () => ({
                    url: 'user/me/',
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + getAccessToken()
                    }
            })
        }),
        login: builder.mutation<UserLoginResponse, UserLoginRequest>({
            query: (data) => ({
                url: '/token/',
                method: 'POST',
                body: data,
            })
        }),
        tokenverify: builder.mutation<void, TokenVerifyRequest>({
            query: (data) => ({
                url: '/token/verify/',
                method: 'POST',
                body: data
            })
        }),
        tokenrefresh: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
            query: (data) => ({
                url: '/token/refresh/',
                method: 'POST',
                body: data
            })
        }),
        userUpdate: builder.mutation<UserRegisterResponse, UserUpdateRequest>({
            query: (data) => ({
                url: '/user/me/update/',
                method: 'PATCH',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useTokenrefreshMutation, useTokenverifyMutation, useGetselfQuery, useUserUpdateMutation } = authApi;

export const { endpoints: {login, getself, register, tokenrefresh, tokenverify, userUpdate} } = authApi;
