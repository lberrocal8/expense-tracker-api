import { Router } from "express";
import { signUpUser, logInUser, meUser } from "../controllers/user.controller.js"
import verifyToken from "../controllers/verifyToken.js";

const router = Router();

router.get('/me', verifyToken, meUser);

router.post('/signup', signUpUser);
router.post('/login', logInUser);

export default router;