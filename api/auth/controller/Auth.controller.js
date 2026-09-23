import mongoose from "mongoose";
import User from "../model/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRE_IN, JWT_SECRET } from "../../config/Env";

// what is the req.body. this req.body is a object and containing data from the client (Post request). and res is to send respond to frontend what we save and what we did.

export const signup = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startSession();

    try {
        // login to create new user
        const { name, email, password } = req.body;

        const existingUser = await User.find({ email });
        if (existingUser) {
            const error = new Error('User is already existed');
            error.statusCode = 409;
            throw error;
        };

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUsers = await User.create([{
            name,
            email,
            password: hashPassword
        }], { session });

        const token = jwt.sign(
            {
                userId: newUsers[0]._id
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE_IN }
        )


        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "New User Create Successfully",
            data: {
                token,
                users: newUsers[0]
            },
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
export const signin = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startSession();

    const { email, password } = req.body;

    const Existing_Email = User.find({ email })

    if (Existing_Email) {
        throw new Error('User is already exist')
    }
};
export const signout = async (req, res, next) => { };
