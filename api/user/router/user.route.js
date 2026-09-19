import { Router } from "express";

const userRouter = Router();


//Get user => all users data 
//Get userId => only one user 
//Get user => all users data 
//Get user => all users data 
//Get user => all users data 

userRouter.get('users', (req, res) => res.send({
    title: "Get all the users"
}))
userRouter.get('/:id', (req, res) => res.send({
    title: "Get the data of one user"
}))
userRouter.post('/', (req, res) => res.send({
    title: "create user"
}))
userRouter.get('users/:id', (req, res) => res.send({
    title: "Update user"
}))
userRouter.get('/:id', (req, res) => res.send({
    title: "delete user"
}))


export default userRouter;