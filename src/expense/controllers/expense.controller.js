import Expense from "../models/Expense.js";

export const createExpense = async (req, res, next) => {
    const { nameexpense, amount, category, paymenttype, currency } = req.body;
    const userId = req.userId;
    
    try {
        const expense = new Expense({ nameexpense, amount, category, paymenttype, currency, user: userId });
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
        await Expense.deleteOne(req.params.id);
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }    
};

export const updateExpense = async (req, res, next) => {
    const { nameexpense, amount, category, paymenttype, currency, user } = req.body;
    if (!req.params.id) return res.status(404).json({ message: 'ExpenseId is required' });

    try {
        if (!nameexpense || !amount || !category || !paymenttype || !currency || !user) return res.status(400).json({ message: "nameexpense, amount, category, paymenttype, currency, user field's are required" });
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found in db' });
        await Expense.updateOne({_id: req.params.id}, { nameexpense, amount, category, paymenttype, currency, user });
        res.status(200).json({ message: 'Expense updated' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error(error)
    }
};

export const findExpenses = async (req, res, next) => {
    const { starDate, endDate } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(400).json({ message: 'userId is required' });

    if (starDate && endDate) {
        try {
            const start = new Date(starDate);
            const end = new Date(endDate);
            const expenseByDate = await Expense.find({ fecha: { $gte: start, $lte: end } });
            res.status(200).json({ expenseByDate: expenseByDate });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    try {
        const expenses = await Expense.find({ user: userId });
        res.status(200).json({ expenses: expenses });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};