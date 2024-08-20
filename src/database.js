import mongoose from "mongoose";

export default mongoose.connect('mongodb://localhost/expense-tracker-app')
    .then(db => console.log('Database connected'))