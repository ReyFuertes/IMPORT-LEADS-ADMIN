export interface ILoginCredential {
  username: string;
  password: string;
}
export interface IUser {
  id?: string;
  username?: string;
  password?: string;
  is_master_admin?: boolean;
  is_change_password?: number;
  created_at?: string;
}