import validator from "validator";
import userModel from "../models/userController.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// ROUTE FOR USER LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = genToken(user._id);
            res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message });
    }
};

// ROUTE FOR USER SIGN UP
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking if an email alreaedy exist...
        const exist = await userModel.findOne({ email });

        if (exist) {
            return res.json({ success: false, message: "User already exist" });
        }

        // Checking email and password

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a longer password",
            });
        }

        const salt = await bcrypt.genSalt(11);

        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPass,
        });

        const user = await newUser.save();

        const token = genToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ROUTE FOR ADMIN LOGIN
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        }
        else{
            res.json({success: false, message: "Invalid credentials"})
        }
    } catch (error) {
        res.json({success: false, message: error.message})
    }
};

export { loginUser, registerUser, adminLogin };
