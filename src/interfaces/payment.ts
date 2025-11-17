export interface IPayment {
    id: string,
    method: string,
    amount: number,
    status: string,
    orderId: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IPaymentCreate {
    method: string,
    amount: number,
    orderId: string,
}

export interface IPaymentUpdate {
    method?: string,
    amount?: number,
    status?: string,
}

export interface IPaymentCondition {
    method?: string,
    status?: string,
    minAmount?: number,
    maxAmount?: number,
}

export interface IInitiatePayment {
    paymentId: string;
    method: string;
    methodChild?: string;
}