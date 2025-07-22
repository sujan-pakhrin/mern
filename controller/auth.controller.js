import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const login=async(req,res)=>{
    const {email,password}=req.body;

    if(email===""||password===""){
        res.status(300).json({message:"Incorrect password"})
    }

    const user= await User.findOne({email}).select("+password")
    if(!user){
        res.stauts(404).json({message:"User not found"})
    }

    const passwordCheck= await bcrypt.compare(password,user.password)
    if(!passwordCheck){
        res.stauts(404).json({message:"Incorrect password"})
    }
    const {password:pass,...rest}=user._doc
    const token=jwt.sign({id:rest._id,role:rest.role},process.env.JWT_SECRET)
    res.status(200).json({message:"Login Sucessfully",token:token,user:rest})

}

export const register =async(req,res)=>{
    try {
        const profile=req.file.filename;
        console.log(profile);
        
            const { firstName, lastName, email, password } = req.body;
    
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
                profile
            });
    
            await newUser.save();
    
            const userResponse = newUser.toObject();
            delete userResponse.password;
    
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