require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Counter = require('../models/Counter');
const router = express.Router();

// Load environment variables
const { JWT_SECRET } = process.env;

/* Register a new user */
router.post('/register', async (req, res) => {
    const { username, email, phone, password, confirm_password, terms } = req.body;

    // Validation checks
    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match');
    }

    if (!terms) {
        return res.status(400).send('You must agree to the terms and conditions');
    }

    if (password.length < 6) {
        return res.status(400).send('Password must be at least 6 characters long');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const counter = await Counter.findOneAndUpdate(
            { name: 'userId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const userId = `kickoff_User_${counter.seq}`;

        const newUser = new User({
            userId,
            username,
            email,
            phone,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
});

/* Login  user */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Authentication failed - User doesn't exist" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Authentication failed - Password doesn't match" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("AuthToken", token, { httpOnly: true });
        res.json({
            status: true,
            message: "Login success",
            token,
            userType: user.userType
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed" });
    }
});

/* Logout a user */
router.get('/logout', (req, res) => {
    res.clearCookie("AuthToken");
    res.status(200).send("Logout successful");
});

module.exports = router;
