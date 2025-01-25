import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    otp: { type: String, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const AuthOtp = mongoose.model('auth_otp', AuthSchema);

export default AuthOtp;
