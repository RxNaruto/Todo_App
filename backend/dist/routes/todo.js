"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoRouter = (0, express_1.Router)();
todoRouter.get("/test", (req, res) => {
    res.json({
        message: "todo router"
    });
});
exports.default = todoRouter;
