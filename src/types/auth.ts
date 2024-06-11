export interface IToken {
  quickAccessToken?: string;
  quickRefreshToken?: string;
  expiresIn?: number;
}
export interface ILoginParams {
  tenantId: string;
  username: string;
  password: string;
}
export interface ILoginData extends IToken {
  tenantId: string;
  userName: string;
}
