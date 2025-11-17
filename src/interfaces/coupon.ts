export interface ICoupon {
    id: string,
    code: string,
    name: string,
    description: string,
    type:  string,
    discountValue: number,
    minSpend: number,
    maxDiscount: number,
    totalUsageLimit: number,
    currentUsageCount: number,
    expiryDate: Date,
    createdAt: Date,
    updatedAt: Date,
}

export interface ICouponCreate {
    code: string,
    name: string,
    description: string,
    type: string,
    discountValue: number,
    minSpend: number,
    maxDiscount: number,
    totalUsageLimit: number,
    currentUsageCount: number,
    expiryDate: Date,
}

export interface ICouponUpdate {
    code?: string,
    name?: string,
    description?: string,
    type?: string,
    discountValue?: number,
    minSpend?: number,
    maxDiscount?: number,
    totalUsageLimit?: number,
    currentUsageCount?: number,
    expiryDate?: Date,
}

export interface ICouponCondition {
    code?: string,
    name?: string,
    description?: string,
    type?: string,
    discountValue?: number,
    minSpend?: number,
    maxDiscount?: number,
    totalUsageLimit?: number,
    currentUsageCount?: number,
    expiryDate?: Date,
}