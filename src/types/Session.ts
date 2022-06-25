import { Schema } from 'mongoose';

export interface ISessionModel {
  object: Schema.Types.ObjectId;
  id: string;
  device: string;
  createdAt: Date;
  lastLogin: Date;
}
