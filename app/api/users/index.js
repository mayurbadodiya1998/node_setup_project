import express from 'express';
import userController from './user.controller.js';
const router = express.Router();
// import userController

/* GET users listing. */
// router.get('/:id',(req,res)=>{
//     res.json({message:"user details found"})
// })

router.get('/:id',userController.get)

router.post('/create',userController.post)

router.put('/:id',userController.put)

router.delete('/:id',userController.delete)


export default router;