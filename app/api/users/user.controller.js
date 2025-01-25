import userService from "./user.service.js"
import { RESPONSE_MESSGE } from "../../core/response.message.js"
import response from "../../core/response.js"
import { hashPassword } from "../../core/core.service.js"
class UserController {

  constructor() { }

  async get(req, res) {
    try {
      const users = await userService.getAllUsers()
      console.log("users ", users)
      res.json(response.success(RESPONSE_MESSGE.USER.USER_LIST, users))
    }
    catch (e) {
      console.log(e)
    }

  }
  async post(req, res, next) {
    try {
      let body = req.body;
      let encPassword = await hashPassword(body.password)
      let params = {
        firstName: body.first_name,
        lastName: body.last_name,
        password: encPassword,
        email: body.email
      }
      console.log(params)
      const createUser = await userService.createUser(params);
      res.json(response.success(RESPONSE_MESSGE.USER.USER_ADD, createUser))
    }
    catch (e) {
      console.log(e)
      next(e)
    }
  }
  put(req, res) {
    try { }
    catch (e) { }
    res.json({ message: "User Updated" })

  }
  delete(req, res) {
    res.json({ message: "User Delete" })

  }
}
export default new UserController();


