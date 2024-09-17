import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import printer from '../features/printers/printerSlice';
import { api, printerApi } from './services/api';
import { printApi } from './services/printer';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    [printerApi.reducerPath]: printerApi.reducer,
    printer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware).concat(printApi.middleware)
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
