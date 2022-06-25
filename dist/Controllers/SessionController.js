"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequest_1 = __importDefault(require("../Exception/BadRequest"));
const Session_1 = __importDefault(require("../Models/Session"));
class SessionController {
    static async store(object, device) {
        const sessionById = await Session_1.default.findOne({ object });
        if (sessionById)
            await sessionById.delete();
        return Session_1.default.create({ object, device });
    }
    static async signOut(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token)
                throw new Error('token not provided');
            const session = await Session_1.default.findOne({ id: token.split(' ')[1] });
            if (!session)
                throw new Error('token provided is invalid');
            await session.delete();
            return res.status(202).json({ message: 'OK', status: 202 });
        }
        catch (err) {
            if (err instanceof Error)
                return new BadRequest_1.default(res, 422, err.message).dispatch();
            return new BadRequest_1.default(res).dispatch();
        }
    }
}
exports.default = SessionController;
