import type { NextFunction, Request, Response } from 'express';
import Session from '../Models/Session';

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenAuth = req.headers.authorization;
    if (!tokenAuth) throw new Error();
    const token = tokenAuth.split(' ')[1];
    const session = await Session.findOne({ id: token });
    if (!session) throw new Error();
    next();
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    return res.status(401).json({ message: 'unauthorized', status: 401 });
  }
};

export default authToken;
