"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Routes_1 = __importDefault(require("./Routes/Routes"));
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.CONNECTSTRING)
    .then(() => app.emit('db'))
    .catch((e) => console.log('Mongoose connect error', e.message));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(Routes_1.default);
app.listen(process.env.PORT, () => console.log(`Server on: http://127.0.0.1:${process.env.PORT}`));
