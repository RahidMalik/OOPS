import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 4,
        maxLength: 20
    },
    email: {
        type: String,
        required: [true, "User Email is required"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minLength: 6,
    },
}, { timestamps: true });

const User = mongoose.model("user", UserSchema);

export default User;