import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import todoRouter from "./routes/todo";

const app=express();

app.use(cors())
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/todo",todoRouter);

app.listen(3000);

