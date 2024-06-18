"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoSchema = exports.TodoSchema = void 0;
const zod_1 = require("zod");
exports.TodoSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string().min(5),
});
exports.updateTodoSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    description: zod_1.z.string().min(5)
});
