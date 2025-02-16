import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const newUser = await User.create({
            username,
            password,
        });
        req.session.userId = newUser.id;
        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.session.userId = user.id;
        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};

export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        res.status(200).json({ message: "Logout successful!" });
    });
};
