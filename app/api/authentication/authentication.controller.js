import authenticationService from './authentication.service.js';
import { verifyPassword, encodeToken, generateOtp, hashPassword } from './../../core/core.service.js'
import response from '../../core/response.js';
import { RESPONSE_MESSGE } from '../../core/response.message.js';
import CustomError from '../../core/custom.error.js';
import logger from "./../../core/winston.config.js";
import { sendMail } from '../../core/node-mailer.config.js';

class AuthenticationController {
    constructor() { }
    async login(req, res, next) {
        try {

            const body = req.body;
            const userDetails = await authenticationService.getUserDetailsByEmail(body.email);
            if (userDetails == null) {
                throw new CustomError(RESPONSE_MESSGE.AUTHENTICAION.USER_NOT_FOUND, 401);
            }
            if (!userDetails.isVerified) {
                throw new CustomError(RESPONSE_MESSGE.AUTHENTICAION.UNVERIFIED_EMAIL, 401);
            }
            const passwordMatch = await verifyPassword(body.password, userDetails.password);
            if (!passwordMatch) {
                // return res.json({ message: "incorrect password" });
                throw new CustomError(RESPONSE_MESSGE.AUTHENTICAION.INCORRECT_PASSWORD, 401);
            }
            const prepareUserDetails = {
                first_name: userDetails.firstName,
                last_name: userDetails.lastName,
                email: userDetails.email,
                id: userDetails._id
            }
            logger.info(userDetails)
            const token = encodeToken(prepareUserDetails);
            console.log("login rea ", token)
            return res.status(200).json(response.success(RESPONSE_MESSGE.AUTHENTICAION.LOGIN, token));
        }
        catch (error) {
            logger.error(error)
            next(error); // Pass the error to the error-handling middleware
        }
    }

    async signup(req, res, next) {
        try {
            const body = req.body;
            const isEmailExist = await authenticationService.getUserDetailsByEmail(body.email);
            if (isEmailExist) {
                throw new CustomError(RESPONSE_MESSGE.AUTHENTICAION.EMAIL_EXIST, 409);
            }
            const encPassword = await hashPassword(body.password)
            console.log("inside function")
            const params = {
                firstName: body.first_name,
                lastName: body.last_name,
                password: encPassword,
                email: body.email
            }
            const createUser = await authenticationService.signup(params);
            if (!createUser) {
                throw new CustomError('Something Went Wrong', 500);
            }
            const otp = generateOtp();
            const otpParams = {
                userId: createUser._id,
                otp: otp,
                type: "email_verifivation"
            }
            await authenticationService.createOtp(otpParams);
            // const sent = await sendMail(createUser.email, 'Verification Otp', `${otp} for verification`);
            return res.status(200).json(response.success(RESPONSE_MESSGE.AUTHENTICAION.OTP_SEND, createUser));
        }
        catch (e) {
            next(e)
        }
    }
    async sendOtp(req, res, next) {
        try {
            const body = req.body;
            const isEmailExist = await authenticationService.getUserDetailsByEmail(body.email);
            if (!isEmailExist) {
                throw new CustomError("Email does not exist", 404)
            }
            const otp = generateOtp();
            const otpParams = {
                userId: isEmailExist._id,
                otp: otp,
                type: "forget_password"
            }
            await authenticationService.removeOtps(isEmailExist._id);
            await authenticationService.createOtp(otpParams);
            return res.status(200).json(response.success("Otp Sent to your Email", {}));
        }
        catch (e) {
            next(e)
        }
    }
    async verifyOtp(req, res, next) {
        try {
            const body = req.body;
            const userDetails = await authenticationService.getUserDetailsByEmail(body.email);
            const params = {
                userId: userDetails._id,
                otp: body.otp
            }
            const otpDetails = await authenticationService.verifyOtp(params);
            console.log(otpDetails);
            if (!otpDetails) {
                throw new CustomError("Invalid OTP", 401);
            }
            await authenticationService.updateUserVerify(userDetails._id);

            return res.status(200).json(response.success(RESPONSE_MESSGE.AUTHENTICAION.OTP_VERIFIED, {}))

        }
        catch (e) {
            next(e)
        }
    }
}

export default new AuthenticationController()