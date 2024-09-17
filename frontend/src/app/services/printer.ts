import { getAccessToken, printerApi } from "./api";
import { TAddress, TAddressDELETE, TAddressListResponse, TAddressPATCH, TAddressPOST, TAddressPUT, TCabinet, TCabinetDELETE, TCabinetListResponse, TCabinetPATCH, TCabinetPOST, TCabinetPUT, TCartridge, TCartridgeDELETE, TCartridgeListResponse, TCartridgePATCH, TCartridgePOST, TCartridgePUT, TPrinter, TPrinterDELETE, TPrinterListResponse, TPrinterPATCH, TPrinterPOST, TPrinterPUT } from "./types";

const address: string = '/app/address/'
const cabinet: string = '/app/cabinet/'
const printer: string = '/app/printer/'
const cartridge: string = '/app/cartridge/'

export const printApi = printerApi.injectEndpoints({
    endpoints: (builder) => ({
        addressList: builder.query<TAddressListResponse, void>({
            query: () => ({
                url: address,
                method: 'GET'
            })
        }),
        addressDetail: builder.query<TAddress, Pick<TAddress, 'id'>>({
            query: ({id}) => ({
                url: `${address}${id}`,
                method: 'GET'
            })
        }),
        addressPost: builder.mutation<TAddress, TAddressPOST>({
            query: (data) => ({
                url: address,
                method: 'POST',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        addressPut: builder.mutation<TAddress, TAddressPUT>({
            query: ({id, ...data}) => ({
                url: `${address}f${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        addressPatch: builder.mutation<TAddress, TAddressPATCH>({
            query: ({id, ...data}) => ({
                url: `${address}${id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        addressDelete: builder.mutation<void, TAddressDELETE>({
            query: ({id}) => ({
                url: `${address}${id}`,
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        cabinetList: builder.query<TCabinetListResponse, void>({
            query: () => ({
                url: cabinet,
                method: 'GET'
            })
        }),
        cabinetDetail: builder.query<TCabinet, Pick<TCabinet, 'id'>>({
            query: ({id}) => ({
                url: `${cabinet}${id}`,
                method: 'GET'
            })
        }),
        cabinetPost: builder.mutation<TCabinet, TCabinetPOST>({
            query: (data) => ({
                url: cabinet,
                method: 'POST',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        cabinetPut: builder.mutation<TCabinet, TCabinetPUT>({
            query: ({id, ...data}) => ({
                url: `${cabinet}${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        cabinetPatch: builder.mutation<TCabinet, TCabinetPATCH>({
            query: ({id, ...data}) => ({
                url: `${cabinet}${id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        cabinetDelete: builder.mutation<void, TCabinetDELETE>({
            query: ({id}) => ({
                url: `${cabinet}${id}`,
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        printerList: builder.query<TPrinterListResponse, void>({
            query: () => ({
                url: printer,
                method: 'GET'
            })
        }),
        printerDetail: builder.query<TPrinter, Pick<TPrinter, 'id'>>({
            query: ({id}) => ({
                url: `${printer}${id}`,
                method: 'GET'
            })
        }),
        printerPost: builder.mutation<TPrinter, TPrinterPOST>({
            query: (data) => ({
                url: printer,
                method: 'POST',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        printerPut: builder.mutation<TPrinter, TPrinterPUT>({
            query: ({id, ...data}) => ({
                url: `${printer}${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        printerPatch: builder.mutation<TPrinter, TPrinterPATCH>({
            query: ({id, ...data}) => ({
                url: `${printer}${id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        printerDelete: builder.mutation<void, TPrinterDELETE>({
            query: ({id}) => ({
                url: `${printer}${id}`,
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        cartridgeList: builder.query<TCartridgeListResponse, void>({
            query: () => ({
                url: cartridge,
                method: 'GET'
            })
        }),
        cartridgeDetail: builder.query<TCartridge, Pick<TCartridge, 'id'>>({
            query: ({id}) => ({
                url: `${cartridge}${id}`,
                method: 'GET',
            })
        }),
        cartridgePost: builder.mutation<TCartridge, TCartridgePOST>({
            query: (data) => ({
                url: cartridge,
                method: 'POST',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        cartridgePut: builder.mutation<TCartridge, TCartridgePUT>({
            query: ({id, ...data}) => ({
                url: `${cartridge}${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        cartridgePatch: builder.mutation<TCartridge, TCartridgePATCH>({
            query: ({id, ...data}) => ({
                url: `${cartridge}${id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        }),
        cartridgeDelete: builder.mutation<void, TCartridgeDELETE>({
            query: ({id}) => ({
                url: `${cartridge}${id}`,
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + getAccessToken()
                }
            })
        })
    }),
})

export const {useAddressDeleteMutation, useAddressDetailQuery, useAddressListQuery, useAddressPatchMutation, useAddressPostMutation, useAddressPutMutation, useCabinetDeleteMutation, useCabinetDetailQuery, useCabinetListQuery, useCabinetPatchMutation, useCabinetPostMutation, useCabinetPutMutation, useCartridgeDeleteMutation, useCartridgeDetailQuery, useCartridgeListQuery, useCartridgePatchMutation, useCartridgePostMutation, useCartridgePutMutation, usePrinterDeleteMutation, usePrinterDetailQuery, usePrinterListQuery, usePrinterPatchMutation, usePrinterPostMutation, usePrinterPutMutation} = printApi

export const { endpoints: {addressDelete, addressDetail, addressList, addressPatch, addressPost, addressPut, printerDelete, printerDetail, printerList, printerPatch, printerPost, printerPut, cabinetDelete, cabinetDetail, cabinetList, cabinetPatch, cabinetPost, cabinetPut, cartridgeDelete, cartridgeDetail, cartridgeList, cartridgePatch, cartridgePost, cartridgePut}} = printApi
