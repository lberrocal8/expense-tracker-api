import database from "../../database.js";
import Expense from "../models/Expense.js";

export const createExpense = async (req, res, next) => {
    const { nameexpense, amount, category, paymenttype, currency } = req.body;
    const userId = req.userId;
    
    try {
        const expense = new Expense({
            nameexpense,
            amount,
            category,
            paymenttype,
            currency,
            user: userId
        });
        await expense.save();
        res.status(201).json({ message: 'Expense registered' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteExpense = async (req, res, next) => {
    if (!req.params.id) return res.status(404).json({ message: 'ExpenseId is required' });
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found in db' });
        const deletedExpense = await Expense.deleteOne(req.params.id);
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }    
};

export const updateExpense = async (req, res, next) => {
    const { nameexpense, amount, category, paymenttype, currency, user } = req.body;

    if (!req.params.id) return res.status(404).json({ message: 'ExpenseId is required' });
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found in db' });
        const updatedExpense = await Expense.updateOne(req.params.id, { nameexpense, amount, category, paymenttype, currency, user });
        res.status(200).json({ message: 'Expense updated' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const findExpenses = async (req, res, next) => {
    const userId = req.userId;
    try {
        const expenses = await Expense.find();
        res.status(200).json({ user: userId, expenses: expenses });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const findExpensebyDate = async (req, res, next) => {

};