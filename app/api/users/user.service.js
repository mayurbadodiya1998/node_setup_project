import user from './user.model.js'

class UserService{
    constructor(){}
    async getAllUsers() {
        const users = await user.find();
        return users;
    }
    async createUser(params){
        const create=await user.create(params);
        return create
    }
    updateUser(){}
    deleteUser(){}
}

export default new UserService();