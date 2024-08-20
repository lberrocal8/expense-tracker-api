import { Schema, model } from "mongoose"

const userSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ['user'] },
    isActive: { type: Boolean, default: true },
    cratedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tokens: [
        {
            token: { type: String },
            expiresAt: { type: Date }
        }
    ]
});

export default model('User', userSchema);