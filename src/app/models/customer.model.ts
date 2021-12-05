import { ISimpleItem } from "../shared/generics/generic.model";
import { CustomerStatusType, IUserAccess, IUserRole } from "./generic.model";
export interface CustomerUpdateStatus {
  customer: ICustomer;
  status: CustomerStatusType;
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
  id?: string;
  username?: string;
  password?: string;
  salt?: string;
  status?: number;
  is_master_admin?: boolean;
  created_at?: string;
  user_profile?: IProfile;
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
  profile?: ICustomer;
  email_password?: { username: string, password: string };
  api_url?: string;
  user?: {
    id?: number;
    name?: string;
    firstname?: string;
    lastname?: string;
    position?: string;
    role?: IUserRole;
    company?: string;
    phone?: string;
    image?: string;
    access?: IUserAccess[];
    is_change_password?: number;
    username?: string;
  },
  user_profile?: {
    id?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
    linkedin?: string;
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
    language?: string;
    api_url?: string;
    website_url?: string;
    database_name?: string;
  }
}
export interface ICustomerUserResponse {
  accesses?: string[]
  created_at?: string;
  id?: string;
  roles?: string[];
  status?: number;
  username?: string
}
export interface ICustomerResponse {
  id?: string;
  username?: string;
  customer_users?: ICustomer[];
  profile?: IProfile
  status?: number;
  created_at?: string;
}
export interface ICustomer {
  id?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  username?: string;
  image?: string;
  customer_role?: ICustomerRole[];
  customer_access?: ICustomerAccess[];
  customer_users?: ICustomerUser[];
  status?: number;
  profile?: IProfile;
  name?: string;
  is_change_password?: number;
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