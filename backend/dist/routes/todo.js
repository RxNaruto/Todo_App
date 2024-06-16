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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const userAuthentication_1 = require("../middlewares/userAuthentication");
const todoRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
todoRouter.post("/", userAuthentication_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const todo = yield prisma.todo.create({
            data: {
                title: body.title,
                description: body.description,
                authorId: req.userId
            }
        });
        if (todo) {
            res.status(200).json({
                message: "todo added"
            });
        }
        else {
            return res.status(500).json({
                message: "Internal Server error"
            });
        }
    }
    catch (e) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
}));
exports.default = todoRouter;
