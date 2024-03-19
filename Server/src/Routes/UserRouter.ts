import express, { Router } from 'express';
import login from '../Controllers/UserController/Login';
import register from '../Controllers/UserController/Register';
import VerifyMail from '../Controllers/UserController/VerifyMail';
import upload from '../Controllers/UserController/multer';


const UserRouter: Router = express.Router();

UserRouter.post("/register", register);
UserRouter.get("/verify", VerifyMail);
UserRouter.post("/login", login);
UserRouter.post('/upload', upload.single('data'), (req, res) => {   
    res.send(req?.file?.filename);
  });


export default UserRouter;
