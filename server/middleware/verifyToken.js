import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.vercel-feature-flags;

    if(!token) {
        return res.status(401).json({ message: "Not Authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if(err) {
            return res.status(401).json({ message: "Token not valid" });
        }
        req.userId = payload.id;
        next();
    });
}