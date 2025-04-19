import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: false },
    userType: { type: String, enum: ['Office Owner', 'Customer'], required: true }, // New field
}, { timestamps: true });

const User = mongoose.model('User', userSchema,'users');

export default User;