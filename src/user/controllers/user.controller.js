import jsonwebtoken from "jsonwebtoken";
import database from "../../database.js";
import User from "../models/User.js";
import config from "../../config.js"

export const signUpUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    //Validar que el usuario exista antes de registrarlo
    const user = new User ({
        username,
        email,
        password
    });
    user.password = await user.encryptPass(user.password);
    await user.save(); // Save user to MongoDB 

    // Create token
    const token = jsonwebtoken.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60
    });
    res.json({ message: 'User registered', auth: true, accessToken: token });
}

export const meUser = async (req, res, next) => {
    const findUserActive = await User.findById(req.userId, { _id: 0, password: 0, __v: 0 });
    
    if (!findUserActive) return res.status(401).json({ message: 'No user found' });
    res.status(200).json({ message: 'User found', auth: true, user: findUserActive })
}

export const logInUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email doesn't exists" });

    const isMatch = await user.comparePass(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password', auth: false, token: null});

    const token = jsonwebtoken.sign({ id: user._id }, config.secret, { expiresIn: 60 * 60 });
    res.status(200).json({ message: 'User authenticated', auth: true, accessToken: token });
}