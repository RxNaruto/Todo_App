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
        res.status(200).json({
            message: "todo added"
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
}));
todoRouter.put("/update", userAuthentication_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const todo = yield prisma.todo.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                description: body.description
            }
        });
        res.status(200).json({
            message: "todo updated"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server error"
        });
    }
}));
todoRouter.get("/test", (req, res) => {
    res.json({
        message: "test"
    });
});
todoRouter.get("/alltodo", userAuthentication_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                todo: true
            }
        });
        if (!user) {
            res.status(500).json({
                message: "internal Server error"
            });
        }
        res.status(200).json({
            user
        });
    }
    catch (error) {
        res.status(500).json({
            message: "internal Server error"
        });
    }
}));
exports.default = todoRouter;
