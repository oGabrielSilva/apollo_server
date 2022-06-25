export interface IUserModel {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  gender: string;
}

export const genders: ReadonlyArray<string> = ['F', 'M', 'O'];
