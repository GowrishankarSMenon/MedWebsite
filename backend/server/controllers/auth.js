const UserSchema = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
        const user = await UserSchema.findOne({ phoneNumber }).populate('medicines');
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { userId: user._id },  // Only include necessary user information
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token, user_name: user.phoneNumber });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const signUp = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
        const existingUser = await UserSchema.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: "Phone number already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserSchema({
            phoneNumber,
            password: hashedPassword
        });
        await user.save();

        const token = jwt.sign(
            { userId: user._id },  // Only include necessary user information
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(201).json({ token, user });
    } catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { signUp, login };
