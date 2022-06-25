import isEmail from 'validator/lib/isEmail';
import bcryptjs from 'bcryptjs';
import type { Request, Response } from 'express';
import type { IUserSignIn, IUserStore } from '../types/Requests';
import BadRequest from '../Exception/BadRequest';
import User from '../Models/User';
import { genders } from '../types/User';
import SessionController from './SessionController';

class UserController {
  public static async index(req: Request, res: Response) {
    try {
      const { email, password, device } = req.body as IUserSignIn;
      if (!isEmail(email) || password.length < 8)
        throw new Error('email or password provided is invalid');

      const userByEmail = await User.findOne({ email }).select('+password');
      console.log(userByEmail);
      if (!userByEmail) throw new Error('user does not exist');
      if (!bcryptjs.compareSync(password, userByEmail.password))
        throw new Error('password provided is incorrect');

      const session = await SessionController.store(userByEmail._id, device);
      return res.status(200).json({ session });
    } catch (err) {
      if (err instanceof Error)
        return new BadRequest(res, 422, err.message).dispatch();
      return new BadRequest(res).dispatch();
    }
  }

  public static async store(req: Request, res: Response) {
    try {
      const { email, name, password, gender, device } = req.body as IUserStore;

      if (!isEmail(email) || password.length < 8)
        throw new Error('email or password provided is invalid');
      const userByEmail = await User.findOne({ email });

      if (userByEmail) throw new Error('provided email is already in use');
      if (!genders.includes(gender))
        throw new Error('provided gender is invalid');

      const salt = bcryptjs.genSaltSync();
      const { _id: id } = await User.create({
        name,
        email,
        password: bcryptjs.hashSync(password, salt),
        gender,
      });

      const session = await SessionController.store(id, device);

      return res
        .status(201)
        .json({ user: { id, name, email, gender, avatar: '' }, session });
    } catch (err) {
      if (err instanceof Error)
        return new BadRequest(res, 422, err.message).dispatch();
      return new BadRequest(res).dispatch();
    }
  }
}

export default UserController;
