"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadRequest {
    constructor(response, status = 404, message = 'the request sent to the server is invalid or corrupted', code = 'BAD_REQUEST') {
        this.response = response;
        this.status = status;
        this.message = message;
        this.code = code;
    }
    dispatch() {
        return this.response
            .status(this.status)
            .json({ code: this.code, message: this.message, status: this.status });
    }
}
exports.default = BadRequest;
