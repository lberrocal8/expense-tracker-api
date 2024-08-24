import { Schema, model } from "mongoose"
import bcryptjs from "bcryptjs"

const userSchema = new Schema({
    username: { type: Schema.Types.String, required: true, unique: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true },
    isActive: { type: Schema.Types.Boolean, default: true },
    updatedAt: { type: Schema.Types.Date, default: Date.now }
},
{
    timestamps: true
});

// User method for encrypt password
userSchema.methods.encryptPass = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
}
// User method for compare password
userSchema.methods.comparePass = async function (password) {
    return await bcryptjs.compare(password, this.password);
}

export default model('users', userSchema);