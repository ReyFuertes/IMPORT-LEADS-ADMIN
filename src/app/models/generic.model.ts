export enum ChangePasswordType {
  NotChangePassword = 0,
  ChangePassword = 1,
}
export enum FormStateType {
  Add = 0,
  Edit = 1
}
export enum CustomerStatusType {
  Pending = 0,
  Approved = 1,
  Cancelled = 2
}
export interface IRole {
  id?: string;
  role_name?: string;
}
export interface IAccess {
  id?: string;
  access_name?: string;
  parent?: IAccess;
  customer_route?: string;
}
export enum ModalStateType {
  add = 1,
  edit = 2
}
export interface QueryParam {
  query: string
}
export interface IUserAccess {
  id: number;
  title: string;
}
export interface IUserRole {
  value: any;
  label: string;
}