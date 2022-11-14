import { register,login, getAllUsers } from "../controller/authcontroller";
import express from 'express';


const authRouter = express.Router();

authRouter.post("/signup",register);
authRouter.post("/login",login);
authRouter.get('/getAllUser',getAllUsers);
export default authRouter;

