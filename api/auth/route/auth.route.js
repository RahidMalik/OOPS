import { Router } from "express";
import { signin, signout, signup } from "../controller/Auth.controller";

const authrouter = Router();


authrouter.post('/sign-up', signup);
authrouter.post('/sign-in', signin);
authrouter.post('/sign-out', signout);

export default authrouter;