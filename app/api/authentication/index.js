import express from "express";
import AuthenticationController from "./authentication.controller.js"

const router = express.Router();

router.post('/login', AuthenticationController.login);
router.post('/send-otp', AuthenticationController.sendOtp);
router.post('/signup', AuthenticationController.signup);
router.post('/verify-otp',AuthenticationController.verifyOtp)

export default router;