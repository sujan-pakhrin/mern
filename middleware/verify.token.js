import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(404).json({ message: "Token is missing" })
    }
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(500).json({ message: "Invalid token" })
        }
        console.log(decoded)
        req.user = decoded;
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "user" || req.user.role === "admin") {
            next()
        } else {
            return res.status(403).json({ message: "You are not authorized" })
        }
    })
}

export const verifyHR=(req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "hr" || req.user.role === "admin") {
            next()
        } else {
            return res.status(403).json({ message: "You are not authorized as hr" })
        }
    })
}


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next()
        } else {
            return res.status(403).json({ message: "You are not authorized as Admin" })
        }
    })
}