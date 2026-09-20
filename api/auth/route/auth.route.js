import { Router } from "express";

const authrouter = Router();


authrouter.post('/', (req, res) => res.send({
    title: "signup"
}));
authrouter.post('/', (req, res) => res.send({
    title: "signin"
}));
authrouter.post('/', (req, res) => res.send({
    title: "signout"
}));

export default authrouter;