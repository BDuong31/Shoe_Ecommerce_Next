export interface IAddress {
    id: string;
    userId: string;
    fullName: string;
    phone: string;
    streetAdress: string;
    cityProvince: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAddressCreate {
    userId: string;
    fullName: string;
    phone: string;
    streetAdress: string;
    cityProvince: string;
    isDefault: boolean;
}

export interface IAddressUpdate {
    fullName?: string;
    phone?: string;
    streetAdress?: string;
    cityProvince?: string;
    isDefault?: boolean;
}

export interface IConditionalAddress {
    userId?: string;
    isDefault?: boolean;
}
