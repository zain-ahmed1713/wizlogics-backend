import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

export { app }