import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Middleware! Think of this as the "bouncer", determines if you get in or not
const authentication = (req, res, next) => {

    // Takes JWT token which comes from CLI and verifies it
    if (!req.headers.authorization) {
        return res.status(401).json({error: "No token provided"});
    }
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

export default authentication;