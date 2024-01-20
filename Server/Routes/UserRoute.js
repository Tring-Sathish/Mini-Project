const express = require('express');
const GetProfilePicture = require('../Controllers/Dashboard/GetProfilePic.js');
const Home = require('../Controllers/Dashboard/Home.js');
const forget_password = require('../Controllers/UserController/ForgetPassword.js');
const login = require('../Controllers/UserController/Login.js');
const register = require('../Controllers/UserController/Register.js');
const updatePassword = require('../Controllers/UserController/UpdatePassword.js');
const verifyForgetPwd = require('../Controllers/UserController/verifyForgetpwd.js');
const VerifyMail = require('../Controllers/UserController/VerifyMail.js');
const AuthMiddleware = require('../Middleware/AuthMiddleware.js');
const VerifyToken = require('../Middleware/VerifyToken.js');
const AddEmployee = require('../Controllers/Employee/AddEmployee.js')
const GetEmployee = require('../Controllers/Employee/GetEmployee.js')
const UserRouter = express.Router();

UserRouter.post("/login", login);
UserRouter.post("/register", register)
UserRouter.get("/verify", VerifyMail)
UserRouter.post("/forget-password", forget_password)
UserRouter.post("/verify-forget-pwd", verifyForgetPwd)
UserRouter.post("/new-password", updatePassword)
UserRouter.post("/home", AuthMiddleware, VerifyToken)
UserRouter.post("/dashboard", Home)
UserRouter.post("/getProfilePic", GetProfilePicture)
UserRouter.post("/addEmployee", AddEmployee)
UserRouter.post("/getEmployee", GetEmployee)

module.exports = UserRouter;