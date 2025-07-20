import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json("Access token is missing");
    }
    const token = authHeader.split(" ")[1];
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(decoded)
        if (err) {
            return res.status(401).json("Invalid token");
        }
        req.user = decoded;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("this is req user", req.user)
        if (req.user.role === "user" || req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json("You are not authorized");
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json("You are not authorized as admin");
        }

    });

};