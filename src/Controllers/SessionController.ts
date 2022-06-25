import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import BadRequest from '../Exception/BadRequest';
import Session from '../Models/Session';
import User from '../Models/User';

class SessionController {
  public static async index(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      if (!token) throw new Error('token not provided');
      const session = await Session.findOne({ id: token.split(' ')[1] });
      if (!session) throw new Error('token provided is invalid');
      session.lastLogin = new Date();
      await session.save();
      const user = await User.findById(session.object);
      if (!user) throw new Error('user does not exists');
      return res.status(202).json({ message: 'OK', status: 202, user });
    } catch (err) {
      if (err instanceof Error)
        return new BadRequest(res, 422, err.message).dispatch();
      return new BadRequest(res).dispatch();
    }
  }

  public static async store(object: mongoose.Types.ObjectId, device: string) {
    const sessionById = await Session.findOne({ object });
    if (sessionById) await sessionById.delete();
    return Session.create({ object, device });
  }

  public static async signOut(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      if (!token) throw new Error('token not provided');
      const session = await Session.findOne({ id: token.split(' ')[1] });
      if (!session) throw new Error('token provided is invalid');
      await session.delete();
      return res.status(202).json({ message: 'OK', status: 202 });
    } catch (err) {
      if (err instanceof Error)
        return new BadRequest(res, 422, err.message).dispatch();
      return new BadRequest(res).dispatch();
    }
  }
}

export default SessionController;
