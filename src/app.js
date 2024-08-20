import express from "express"
import userAuth from "./routes/user.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userAuth)

export default app;