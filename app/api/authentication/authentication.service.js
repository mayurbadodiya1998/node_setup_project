import userModel from "./../users/user.model.js";
import authModel from "./authentication.model.js";

class AuthenticationService {
    constructor() { }
    async getUserDetailsByEmail(email) {
        let userDetails = await userModel.findOne({ email: email });
        return userDetails;
    }
    async signup(params) {
        const create = await userModel.create(params);
        return create;
    }
    async createOtp(params) {
        const create = await authModel.create(params);
        return create;

    }
    async removeOtps(userId) {
        return authModel.deleteMany({ userId })

    }
    async verifyOtp(params) {
        const otpDetails = await authModel.findOne({ otp: params.otp, userId: params.userId })
        return otpDetails;
    }
    async updateUserVerify(id) {
        const update = await userModel.updateOne({ _id: id }, { isVerified: true });
        const remove = await authModel.deleteOne({ userId: id });
        console.log("remove", remove)
        return update;
    }
}

export default new AuthenticationService();