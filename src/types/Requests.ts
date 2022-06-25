export interface IUserStore {
  email: string;
  password: string;
  gender: string;
  name: string;
  device: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
  device: string;
}
