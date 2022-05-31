import { ISimpleItem } from "../shared/generics/generic.model";
import { ISubscription } from "./generic.model";

export interface ICustomerApprovePayload {
  api_url: string;
  status: any;
  customer: ICustomer;
  access: IAccess[];
  role: IRole[];
  customer_users: ICustomerUser[];
  subscription?: ISubscription
}
export interface ICustomerAccess {
  id: string;
  customer: ICustomer;
  access: any;
}
export interface IProfile {
  id?: string;
  firstname?: string;
  lastname?: string;
  language?: string;
  phone?: string;
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
  api_url?: string;
  website_url?: string;
  database_name?: string;
}
export interface ICustomerUser {
  id?: string;
  name?: string;
  username?: string;
  password?: string;
  salt?: string;
  status?: number;
  is_master_admin?: boolean;
  created_at?: string;
  change_password_token?: string;
  is_change_password?: number;
  profile?: IProfile;
  user_access?: ICustomerUserAccess[];
  user_role?: ICustomerUserRole[];
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
  id?: string;
  email_password?: { username: string, password: string };
  api_url?: string;
  users?: ICustomerUser,
  customer?: ICustomer;
  profile?: IProfile;
  subscription?: ISubscription;
}
export interface ICustomerUserResponse {
  accesses?: string[]
  created_at?: string;
  id?: string;
  roles?: string[];
  status?: number;
  username?: string;
  customer_id?: string;
}
export interface ICustomerResponse {
  id?: string;
  username?: string;
  customer_users?: ICustomer[];
  profile?: IProfile
  status?: number;
  created_at?: string;
  subscription?: ISubscription | any;
  text_password?: string;
}
export interface ICustomer {
  id?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  username?: string;
  email?: string;
  image?: string;
  customer_role?: ICustomerRole[];
  customer_access?: ICustomerAccess[];
  customer_users?: ICustomerUser[];
  status?: any;
  profile?: IProfile;
  name?: string;
  is_change_password?: number;
  subscription?: string;
  create_status?: CreateStatusType;
  change_password_token?: any;
}
export enum CreateStatusType {
  Failed = 'Failed',
  Success = 'Success'
}
export interface IAccess extends ISimpleItem {
  id?: string;
  access_name?: string;
  parent?: IAccess;
  access_route?: string;
  position?: number;
}
export interface IRole extends ISimpleItem {
  id?: string;
  role_name?: string;
  level?: number;
  value?: string;
  label?: string;
}