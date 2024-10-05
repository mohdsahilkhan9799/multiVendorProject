import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user data from the token to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};
