import { IRole } from "./generic.model";

export interface ICustomerUser {

}
export interface ICustomerPayload {
  customerInformation: ICustomer
  emailPassword: { username: string, password: string }
}
export interface ICustomer {
  access?: IAccess[];
  firstname?: string;
  lastname?: string;
  password?: string;
  role?: IRole[];
  username?: string;
  image?: string;
}
export interface IAccess {
  id?: string;
  access_name?: string;
  parent?: IAccess;
  Customer_route?: string;
}
