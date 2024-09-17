export type User = {
    id: number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    email: string;
}

export type UserRegisterRequest = Omit<User, 'id'>

export type UserRegisterResponse = Omit<User, 'password'>
export type UserUpdateRequest = Omit<User, 'id' | 'password' | 'is_staff' | 'username'>

export type SelfUser = UserRegisterResponse

export type UserLoginRequest = Pick<User, 'username' | 'password'>

export type UserLoginResponse = {
    access: string;
    refresh: string;
}

export type UserLoginError = { detail: string }

export type TokenVerifyRequest = { token: string }

export type VerificationErrorResponse = {
    detail: string;
    code: string;
}

export type RefreshTokenRequest = { refresh: string }

export type RefreshTokenResponse = { access: string }

// Printer types

type ListingConvertion<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Partial<T[]>;
}

export type TAddress = {
    id: number;
    address: string;
}

export type TAllAddressList = TAddress[];

export type TAddressPOST = Omit<TAddress, "id">
export type TAddressPUT = TAddress;
export type TAddressPATCH = Partial<TAddressPUT> & Pick<TAddress, 'id'>
export type TAddressDELETE = Pick<TAddress, "id">
export type TAddressListResponse = ListingConvertion<TAddress>

export type TCabinet = {
    id: number;
    address_id: number;
    local_name: string;
    number: number;
    floor: number;
}

export type TAllCabinetList = TCabinet[];

export type TCabinetPOST = Omit<TCabinet, "id">
export type TCabinetPUT = TCabinet;
export type TCabinetPATCH = Partial<TCabinetPUT> & Pick<TCabinet, 'id'>
export type TCabinetDELETE = Pick<TCabinet, "id">
export type TCabinetListResponse = ListingConvertion<TCabinet>

export type TPrinter = {
    id: number;
    manufacturer: string;
    model: string;
    local_name: string;
    cabinet_id: number;
    toner_level: number;
    ip_address: string;
}

export type TAllPrinterList = TPrinter[];

export type TPrinterPOST = Omit<TPrinter, "id"> & {cartridges_add?: number[]};
export type TPrinterPUT = TPrinter & {cartridges_add?: number[], cartridges_delete?: number[]};
export type TPrinterPATCH = Partial<TPrinterPUT> & Pick<TPrinter, 'id'>
export type TPrinterDELETE = Pick<TPrinter, "id">
export type TPrinterListResponse = ListingConvertion<TPrinter>

export type TCartridge = {
    id: number;
    original: boolean;
    type: string;
    model: string;
    count: number;
    printer: Partial<TPrinter[]>;
}

export type TAllCartridgeList = TCartridge[];

export type TCartridgePOST = Omit<TCartridge, "id" | "printer"> & {printers_add?: number[]};
export type TCartridgePUT = TCartridge & {printers_add?: number[], printers_delete?: number[]};
export type TCartridgePATCH = Partial<TCartridgePUT> & Pick<TCartridge, 'id'>;
export type TCartridgeDELETE = Pick<TCartridge, "id">
export type TCartridgeListResponse = ListingConvertion<TCartridge>
