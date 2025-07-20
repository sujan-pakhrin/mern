import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        console.log(user)

        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
        );

        const { password:pass, ...userWithoutPassword } = user.toObject();

        return res.status(200).json({
            message: "Login successful",
            token,
            user: userWithoutPassword,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};
