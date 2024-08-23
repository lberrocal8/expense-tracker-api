import jsonwebtoken from "jsonwebtoken";
import config from "../../config.js"

export default function verifyToken (req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).json({ message: 'No token provided', auth: false});

    try {
        const decoded = jsonwebtoken.verify(token, config.secret);
        if (decoded) {
            req.userId = decoded.id;
            next();
        }    
    } catch (error) {
        return res.status(500).json({ message: 'Invalid access token', auth: false });
    }
}