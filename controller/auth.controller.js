import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user.password);
    const check=await bcrypt.compare(password, user.password);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user && check) {
        const { password, ...userWithoutPassword } = user.toObject();
        return res.status(200).json({
            message: "Login successful",
            user: userWithoutPassword,
        });
    }
};
