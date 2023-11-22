import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const saltRounds = 10;

// Register a user
export const register = async(req, res) => {
    try {
        const{
            firstName,
            lastName, 
            email,
            password,
            picturePath,
            friends,
            location,
        } = req.body;

        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName, 
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

export const login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user){return res.status(400).json({ msg: "User does not exist" });}

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            console.log(user.password);
            return res.status(400).json({ msg: "The email id and password do not match" });}

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({ token, user });

    } catch(err){
        console.log("Registration error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}