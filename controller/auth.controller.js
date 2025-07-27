import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        res.status(300).json({ message: "Incorrect password" })
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        res.status(404).json({ message: "User not found" })
    }

    const passwordCheck = await bcrypt.compare(password, user.password)
    if (!passwordCheck) {
        res.stauts(404).json({ message: "Incorrect password" })
    }
    const { password: pass, ...rest } = user._doc
    const token = jwt.sign({ id: rest._id, role: rest.role }, process.env.JWT_SECRET)
    res.status(200).json({ message: "Login Sucessfully", token: token, user: rest })

}

export const register = async (req, res) => {
    try {
        const profile = req.file.filename;
        console.log(profile);

        const { firstName, lastName, email, password } = req.body;
        const otp = () => Math.floor(1000 + Math.random() * 9000)
        const genOtp = otp();
        console.log(genOtp)

        const alreadyExists = await User.findOne({ email });
        if (alreadyExists) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profile,
            otp: genOtp
        });

        await newUser.save();

        const userResponse = newUser.toObject();
        delete userResponse.password;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "sujannntmg@gmail.com",
                pass: "nbno hvfp dpix ltiq ",
            },
        });
        (async () => {
            const info = await transporter.sendMail({
                from: 'sujannntmg@gmail.com',
                to: email,
                subject: "Hello checking mail",
                text: "Hello world?",
                html: `Please verify this is your otp: ${genOtp}`,
            });

            console.log("Message sent:", info.messageId);
        })();
        res.status(201).json({
            message: "User created successfully",
            user: userResponse,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const verifyOtp = async (req, res) => {
    const { otp, email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404).json({ message: "User not found" })
    }
    if (user.otp !== otp) {
        res.status(404).json({ message: "Invalid Otp!!" })
    }
    const {verifed,...rest}=user._doc
    const upUser = { ...rest, verifed: true }
    console.log(upUser)

    const updateUser = await User.findOneAndUpdate(email,upUser,{
            new: true,
            runValidators: true,
        })
    if (!updateUser) {
        res.status(404).json({ message: "Faild to varify" })
    }
    res.status(201).json({
        message: "User verified successfully"
    });

}





//opt generate garxam
//hami mail ma pathauxau user ko mail
//teyo opt database pani pathauxau
//


