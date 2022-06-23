import isEmail from 'validator/lib/isEmail';
import bcryptjs from 'bcryptjs';
import type { Request, Response } from 'express';
import BadRequest from '../Exception/BadRequest';
import User from '../Models/User';
import { IUserStore } from '../types/Requests';

class UserController {
  public static async store(req: Request, res: Response) {
    try {
      const { email, name, password, gender } = req.body as IUserStore;

      if (!isEmail(email) || password.length < 8)
        throw new Error('email or password provided is invalid');
      const userByEmail = await User.findOne({ email });

      if (userByEmail) throw new Error('provided email is already in use');
      const salt = bcryptjs.genSaltSync();
      await User.create({
        name,
        email,
        password: bcryptjs.hashSync(password, salt),
        gender,
      });

      return res
        .status(201)
        .json({ user: { name, email, gender, avatar: '' } });
    } catch (err) {
      if (err instanceof Error)
        return new BadRequest(res, 422, err.message).dispatch();
      return new BadRequest(res).dispatch();
    }
  }
}

export default UserController;
