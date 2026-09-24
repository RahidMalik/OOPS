import mongoose from "mongoose";
import User from "../model/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRE_IN, JWT_SECRET } from "../../config/Env";

// what is the req.body. this req.body is a object and containing data from the client (Post request). and res is to send respond to frontend what we save and what we did.

// ==========================================
// 1. SIGNUP CONTROLLER
// ==========================================
export const signup = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // login to create new user
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.find({ email });
        if (existingUser) {
            const error = new Error('User is already existed');
            error.statusCode = 409;
            throw error;
        };
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);


        //Signin: Issue both tokens and save refresh token in DB
        // const accessToken = jwt.sign({ userId: user._id }, ACCESS_SECRET, { expiresIn: '15m' });

        // Create new user inside session
        const accessToken = jwt.sign(
            { userId: newUser._id },
            JWT_SECRET,
            { expiresIn: '15m' }
        );

        // Generate Long-Lived Refresh Token
        const refreshToken = jwt.sign(
            { userId: newUser._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE_IN || '30d' }
        );
        session.endSession();
        await session.commitTransaction();

        // Remove sensitive password field before sending response
        const userobj = newUser.toObject();
        delete userObj.password;

        res.status(201).json({
            success: true,
            message: "New User Create Successfully",
            data: {
                accessToken,
                refreshToken,
                user: userObj
            },
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
// ==========================================
// 1. SIGNIN CONTROLLER
// ==========================================
export const signin = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        // find user Email
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("User Not Found");
            error.statusCode = 404;
            throw error;
        };
        // compare password from db
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            error.statusCode = 401;//401 is unauthorized 
            throw error;
        };
        // genToken
        const accessToken = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE_IN || '7d' }
        );


        // Remove password from response
        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                accessToken,
                refreshToken,
                user: userObj,
            }
        });

    } catch (error) {
        next(error);
    }
};
// ==========================================
// 1. SIGN_OUT CONTROLLER
// ==========================================
export const signout = async (req, res, next) => {

};
