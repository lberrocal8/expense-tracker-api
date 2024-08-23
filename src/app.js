import express from "express";
import user from "./user/routes/user.routes.js";
import expense from "./expense/routes/expense.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(user);
app.use(expense);

export default app;