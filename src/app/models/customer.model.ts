import { ISimpleItem } from "../shared/generics/generic.model";

export interface ICustomerAccess {
  id: string;
  customer: ICustomer;
  access: any;
}
export interface ICustomerProfile {
  id?: string;
  firstname?: string;
  lastname?: string;
  language?: string;
  phone_number?: string;
  email?: string;
  facebook?: string;
  twitter?: string;
  wechatid?: string;
  qqid?: string;
  company_name?: string;
  company_linkedin?: string;
  company_address?: string;
  self_intro?: string;
  position?: string;
  image?: string;
  created_at?: string;
}
export interface ICustomerUser {
  id: string;
  username: string;
  password: string;
  salt: string;
  status: number;
  is_master_admin: boolean;
  created_at: string;
  user_profile: ICustomerProfile;
  user_access: ICustomerUserAccess[];
  user_role: ICustomerUserRole[];
}
export interface ICustomerUserAccess {
  id: string;
  customer_user: ICustomerUser;
  access: any;
}
export interface ICustomerUserRole {
  id?: string;
  role?: IRole;
  customer?: ICustomerUser
}
export interface ICustomerRole {
  id?: string;
  role?: IRole;
  customer_user?: ICustomerUser
}
export interface ICustomerPayload {
  customer_information: ICustomer
  email_password: { username: string, password: string }
}
export interface ICustomerResponse {
  id?: string;
  username?: string;
  customer_user?: ICustomer[];
  profile?: ICustomerProfile
  status?: number;
  created_at?: string;
}
export interface ICustomer {
  firstname?: string;
  lastname?: string;
  password?: string;
  username?: string;
  image?: string;
  customer_role?: ICustomerRole[];
  customer_access?: ICustomerAccess[];
  users?: ICustomerUser[]
}
export interface IAccess extends ISimpleItem {
  id?: string;
  access_name?: string;
  parent?: IAccess;
  customer_route?: string;
}
export interface IRole {
  id?: string;
  role_name?: string;
  level?: number;
}