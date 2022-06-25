import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import BadRequest from '../Exception/BadRequest';
import Session from '../Models/Session';

class SessionController {
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
