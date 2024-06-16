"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            message: "you are not authorized"
        });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        req.userId = parseInt(decode.userId);
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: "You are not authorized"
        });
    }
};
exports.userAuth = userAuth;
