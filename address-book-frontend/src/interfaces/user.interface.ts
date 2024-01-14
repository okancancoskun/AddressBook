export interface IUser {
  access_token: string;
  name: string;
  surname: string;
  email: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
