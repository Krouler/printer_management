import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { store } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost/api/v1/',
    prepareHeaders(headers, { getState }) {
        headers.set('accept', 'application/json')
        headers.set('content-type', 'application/json')
        return headers;
    },
});

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 0});

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
})

export const printerApi = createApi({
    reducerPath: 'printApi',
    baseQuery: baseQuery,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
})

export const getAccessToken = (): string => {
   const isAccessTokenInStore = store.getState().auth.tokens !== null ;
   if (isAccessTokenInStore) {
    return store.getState().auth.tokens!.access
   } 
   return localStorage.getItem('access') + '';
}

export const getRefreshToken = (): string => {
    const isRefreshTokenInStore = store.getState().auth.tokens !== null ;
    if (isRefreshTokenInStore) {
     return store.getState().auth.tokens!.refresh
    } 
    return localStorage.getItem('refresh') + '';
 }
