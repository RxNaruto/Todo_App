"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.get("/test", (req, res) => {
    res.json({
        message: "user router"
    });
});
exports.default = userRouter;