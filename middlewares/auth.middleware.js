import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request for downstream use
        req.user = {
            userId: decoded.userId,
            email: decoded.email
        };

        next(); // Proceed to controller
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
