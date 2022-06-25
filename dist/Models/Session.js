"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const mongoose_1 = require("mongoose");
const uuid = () => `${(0, uuid_1.v4)()}${(0, uuid_1.v4)()}`;
const sessionSchema = new mongoose_1.Schema({
    object: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    id: { type: String, default: uuid },
    device: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
});
const Session = (0, mongoose_1.model)('Session', sessionSchema);
exports.default = Session;
