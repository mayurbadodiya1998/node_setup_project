import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export async function hashPassword(password) {
    console.log(password)
    const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT_ROUND));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

export function encodeToken(data) {
    const jwtToken = jwt.sign(data, process.env.JET_SECRET_KEY);
    return jwtToken;
}

export function decodeToken(token) {
    // const decdToken=jwt.deco()
}

export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
} 