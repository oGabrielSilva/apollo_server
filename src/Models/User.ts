import { model, Schema } from 'mongoose';
import type { IUserModel } from '../types/User';

const userSchema = new Schema<IUserModel>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    avatar: { type: String, default: '' },
  },
  { timestamps: true },
);

const User = model<IUserModel>('User', userSchema);

export default User;
