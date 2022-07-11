"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SessionController_1 = __importDefault(require("../Controllers/SessionController"));
const UserController_1 = __importDefault(require("../Controllers/UserController"));
const authToken_1 = __importDefault(require("../Middleware/authToken"));
const Router = express_1.default.Router();
Router.get('/', (_, res) => res.status(200).json({ hello: 'Tail Book' }));
//User account
Router.get('/account', authToken_1.default, SessionController_1.default.index);
Router.post('/account/signin', UserController_1.default.index);
Router.post('/account/create', UserController_1.default.store);
Router.post('/account/signout', authToken_1.default, SessionController_1.default.signOut);
exports.default = Router;
