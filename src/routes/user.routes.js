import { Router } from "express";
import { signUpUser, signInUser, meUser } from "../controllers/user.controller.js"

const router = Router();

router.post('/singup', signUpUser)
router.post('/singin', signInUser)
router.post('/me', meUser)

export default router;