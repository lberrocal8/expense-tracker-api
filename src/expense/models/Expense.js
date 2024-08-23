import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
    nameexpense: { type: Schema.Types.String, required: true },
    amount: { type: Schema.Types.Decimal128, required: true },
    category: { type: Schema.Types.String, required: true },
    paymenttype: { type: Schema.Types.String, required: true, default: 'Cash' },
    currency: { type: Schema.Types.String, required: true, default: 'USD' },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true }
});

export default model('expenses', expenseSchema);