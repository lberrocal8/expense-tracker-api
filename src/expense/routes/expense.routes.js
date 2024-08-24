import { Router } from "express";
import { findExpenses, createExpense, deleteExpense, updateExpense } from "../controllers/expense.controller.js";
import verifyToken from "../../user/controllers/verifyToken.js";

const router = Router();

router.get('/myexpenses', verifyToken, findExpenses);

router.post('/myexpenses', verifyToken, createExpense);
router.put('/myexpenses/:id', verifyToken, updateExpense);
router.delete('/myexpenses/:id', verifyToken, deleteExpense);

export default router;