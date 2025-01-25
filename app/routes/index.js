import express from 'express';
import userRoute from "./../api/users/index.js"
import authRoute from "./../api/authentication/index.js"


const router = express.Router();

router.use('/user', userRoute);
router.use('/auth', authRoute);


export default router