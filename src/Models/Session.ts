import { v4 } from 'uuid';
import { model, Schema } from 'mongoose';
import type { ISessionModel } from '../types/Session';

const uuid = () => `${v4()}${v4()}`;

const sessionSchema = new Schema<ISessionModel>({
  object: { type: Schema.Types.ObjectId, required: true },
  id: { type: String, default: uuid },
  device: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
});

const Session = model<ISessionModel>('Session', sessionSchema);

export default Session;
