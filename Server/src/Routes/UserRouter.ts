import express, { Router } from 'express';
import login from '../Controllers/UserController/Login';
import register, { sendVerifyEmail } from '../Controllers/UserController/Register';
import VerifyMail from '../Controllers/UserController/VerifyMail';
import upload from '../Controllers/UserController/multer';
import forget_password from '../Controllers/UserController/forgot-password';
import updatePassword from '../Controllers/UserController/updatePassword';


const UserRouter: Router = express.Router();

UserRouter.post("/register", register);
UserRouter.get("/verify", VerifyMail);
UserRouter.post("/trigger",(req, res) => {
  sendVerifyEmail(req.body.data.name, req.body.data.email, req.body.data.id);
  return res.status(200).json({ message: "Registered Successfully!" });
})
UserRouter.post("/login", login);
UserRouter.post("/forgot", forget_password);
UserRouter.post("/updatePass", updatePassword);
UserRouter.post('/upload', upload.single('data'), (req, res) => {   
    res.send(req?.file?.filename);
  });


export default UserRouter;
