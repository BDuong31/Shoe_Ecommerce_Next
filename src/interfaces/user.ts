export interface IUserProfile {
  id: string,
  avatar: string,
  fullName: string,
  gender: string, 
  password: string,
  salt: string,
  username: string,
  email: string,
  phone: string,
  walletAddress: string,
  role: string,
  status: string,
  createdAt: Date,
  updatedAt: Date,
}
export interface IUserUpdatePassword {
  oldPassword: string;
  password: string;
}

export interface IUserCoupon {
  id: string;
  userId: string;
  couponId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCouponCreate {
  userId: string;
  couponId: string;
}