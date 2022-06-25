"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const BadRequest_1 = __importDefault(require("../Exception/BadRequest"));
const User_1 = __importDefault(require("../Models/User"));
const User_2 = require("../types/User");
const SessionController_1 = __importDefault(require("./SessionController"));
class UserController {
    static async index(req, res) {
        try {
            const { email, password, device } = req.body;
            if (!(0, isEmail_1.default)(email) || password.length < 8)
                throw new Error('email or password provided is invalid');
            const userByEmail = await User_1.default.findOne({ email }).select('+password');
            if (!userByEmail)
                throw new Error('user does not exist');
            if (!bcryptjs_1.default.compareSync(password, userByEmail.password))
                throw new Error('password provided is incorrect');
            const session = await SessionController_1.default.store(userByEmail._id, device);
            return res.status(200).json({ session });
        }
        catch (err) {
            if (err instanceof Error)
                return new BadRequest_1.default(res, 422, err.message).dispatch();
            return new BadRequest_1.default(res).dispatch();
        }
    }
    static async store(req, res) {
        try {
            const { email, name, password, gender, device } = req.body;
            if (!(0, isEmail_1.default)(email) || password.length < 8)
                throw new Error('email or password provided is invalid');
            const userByEmail = await User_1.default.findOne({ email });
            if (userByEmail)
                throw new Error('provided email is already in use');
            if (!User_2.genders.includes(gender))
                throw new Error('provided gender is invalid');
            const salt = bcryptjs_1.default.genSaltSync();
            const { _id: id } = await User_1.default.create({
                name,
                email,
                password: bcryptjs_1.default.hashSync(password, salt),
                gender,
            });
            const session = await SessionController_1.default.store(id, device);
            return res
                .status(201)
                .json({ user: { id, name, email, gender, avatar: '' }, session });
        }
        catch (err) {
            if (err instanceof Error)
                return new BadRequest_1.default(res, 422, err.message).dispatch();
            return new BadRequest_1.default(res).dispatch();
        }
    }
}
exports.default = UserController;
