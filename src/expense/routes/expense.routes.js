import { Router } from "express";
import { findExpenses, findExpensebyDate, createExpense, deleteExpense, updateExpense } from "../controllers/expense.controller.js";
import verifyToken from "../../user/controllers/verifyToken.js";

const router = Router();

router.get('/myexpenses', verifyToken, findExpenses);
router.get('/myexpenses/:date', verifyToken, findExpensebyDate);

router.post('/myexpenses', verifyToken, createExpense);
router.put('/myexpenses/:id', verifyToken, updateExpense);
router.delete('/myexpenses/:id', verifyToken, deleteExpense);

export default router;