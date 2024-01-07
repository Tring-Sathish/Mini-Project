const express = require('express');
const forget_password = require('../Controllers/UserController/ForgetPassword.js');
const login = require('../Controllers/UserController/Login.js');
const register = require('../Controllers/UserController/Register.js');
const updatePassword = require('../Controllers/UserController/UpdatePassword.js');
const verifyForgetPwd = require('../Controllers/UserController/verifyForgetpwd.js');
const VerifyMail = require('../Controllers/UserController/VerifyMail.js');
const AuthMiddleware = require('../Middleware/AuthMiddleware.js');
const VerifyToken = require('../Middleware/VerifyToken.js');
const UserRouter = express.Router();

UserRouter.post("/login", login);
UserRouter.post("/register", register)
UserRouter.get("/verify", VerifyMail)
UserRouter.post("/forget-password", forget_password)
UserRouter.post("/verify-forget-pwd", verifyForgetPwd)
UserRouter.post("/new-password", updatePassword)
UserRouter.post("/home", AuthMiddleware, VerifyToken)


module.exports = UserRouter;