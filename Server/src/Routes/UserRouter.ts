import express, { Router } from 'express';
import login from '../Controllers/UserController/Login';
import register from '../Controllers/UserController/Register';
import VerifyMail from '../Controllers/UserController/VerifyMail';


const UserRouter: Router = express.Router();

UserRouter.post("/register", register);
UserRouter.get("/verify", VerifyMail);
UserRouter.post("/login", login);


export default UserRouter;
