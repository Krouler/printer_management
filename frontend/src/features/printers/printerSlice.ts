import { createSlice } from '@reduxjs/toolkit';
import { TAddress, TAddressListResponse, TCabinet, TCabinetListResponse, TCartridge, TCartridgeListResponse, TPrinter, TPrinterListResponse } from '../../app/services/types';
import { printApi } from '../../app/services/printer';
import { RootState } from '../../app/store';

interface InitState {
    address: TAddressListResponse | null;
    cabinet: TCabinetListResponse | null;
    printer: TPrinterListResponse | null;
    cartridge: TCartridgeListResponse | null;
    addressDetail: TAddress | null;
    cabinetDetail: TCabinet | null;
    printerDetail: TPrinter | null;
    cartridgeDetail: TCartridge | null;
}

const initialState: InitState = {
    address: null,
    cabinet: null,
    printer: null,
    cartridge: null,
    addressDetail: null,
    cabinetDetail: null,
    printerDetail: null,
    cartridgeDetail: null,
}

const slice = createSlice({
    name: 'printer',
    initialState,
    reducers: {
        dropdown: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(printApi.endpoints.addressList.matchFulfilled, (state, action) => {
                state.address = action.payload;
            })
            .addMatcher(printApi.endpoints.addressDetail.matchFulfilled, (state, action) => {
                state.addressDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.addressPost.matchFulfilled, (state, action) => {
                state.addressDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.addressPut.matchFulfilled, (state, action) => {
                state.addressDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.addressPatch.matchFulfilled, (state, action) => {
                state.addressDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.addressDelete.matchFulfilled, (state) => {
                state.addressDetail = null;
            })
            .addMatcher(printApi.endpoints.cabinetList.matchFulfilled, (state, action) => {
                state.cabinet = action.payload;
            })
            .addMatcher(printApi.endpoints.cabinetDetail.matchFulfilled, (state, action) => {
                state.cabinetDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.cabinetPost.matchFulfilled, (state, action) => {
                state.cabinetDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.cabinetPut.matchFulfilled, (state, action) => {
                state.cabinetDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.cabinetPatch.matchFulfilled, (state, action) => {
                state.cabinetDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.cabinetDelete.matchFulfilled, (state) => {
                state.cabinetDetail = null;
            })
            .addMatcher(printApi.endpoints.printerList.matchFulfilled, (state, action) => {
                state.printer = action.payload;
            })
            .addMatcher(printApi.endpoints.printerDetail.matchFulfilled, (state, action) => {
                state.printerDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.printerPost.matchFulfilled, (state, action) => {
                state.printerDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.printerPut.matchFulfilled, (state, action) => {
                state.printerDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.printerPatch.matchFulfilled, (state, action) => {
                state.printerDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.printerDelete.matchFulfilled, (state) => {
                state.printerDetail = null;
            })
            .addMatcher(printApi.endpoints.cartridgeList.matchFulfilled, (state, action) => {
                state.cartridge = action.payload;
            })
            .addMatcher(printApi.endpoints.cartridgeDetail.matchFulfilled, (state, action) => {
                state.cartridgeDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.cartridgePost.matchFulfilled, (state, action) => {
                state.cartridgeDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.cartridgePut.matchFulfilled, (state, action) => {
                state.cartridgeDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.cartridgePatch.matchFulfilled, (state, action) => {
                state.cartridgeDetail = action.payload;
            })
            .addMatcher(printApi.endpoints.cartridgeDelete.matchFulfilled, (state) => {
                state.cartridgeDetail = null;
            })
    },
})

export const {dropdown} = slice.actions;

export default slice.reducer;

export const selectAddressList = (state: RootState) => state.printer.address;
export const selectAddressDetail = (state: RootState) => state.printer.addressDetail;
export const selectCabinetList = (state: RootState) => state.printer.cabinet;
export const selectCabinetDetail = (state: RootState) => state.printer.cabinetDetail;
export const selectPrinterList = (state: RootState) => state.printer.printer;
export const selectPrinterDetail = (state: RootState) => state.printer.printerDetail;
export const selectCartridgeList = (state: RootState) => state.printer.cartridge;
export const selectCartridgeDetail = (state: RootState) => state.printer.cartridgeDetail;
