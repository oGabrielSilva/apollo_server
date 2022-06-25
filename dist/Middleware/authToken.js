"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Session_1 = __importDefault(require("../Models/Session"));
const authToken = async (req, res, next) => {
    try {
        const tokenAuth = req.headers.authorization;
        if (!tokenAuth)
            throw new Error();
        const token = tokenAuth.split(' ')[1];
        const session = await Session_1.default.findOne({ id: token });
        if (!session)
            throw new Error();
        next();
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
        return res.status(401).json({ message: 'unauthorized', status: 401 });
    }
};
exports.default = authToken;
