"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const checkUser = yield prisma.user.findFirst({
        where: {
            username: body.username
        }
    });
    if (checkUser) {
        return res.status(404).json({
            msg: "user already exist"
        });
    }
    else {
        try {
            const user = yield prisma.user.create({
                data: {
                    username: body.username,
                    password: body.password,
                    name: body.name
                }
            });
            if (user) {
                res.status(200).json({
                    message: "signup complete"
                });
            }
            else {
                res.status(500).json({
                    message: "internal Server error"
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: "internal server error"
            });
        }
    }
}));
exports.default = userRouter;
