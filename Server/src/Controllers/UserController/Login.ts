import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { QueryHasura } from '../../Config/hasuraClient';
import { GET_USER_BY_EMAIL } from '../../Config/hasura-query';

dotenv.config();

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body.input.arg1;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const userResp = await QueryHasura(GET_USER_BY_EMAIL, { email });
        const findUser = userResp.users[0]
        if (!findUser) {
            return res.status(404).json({
                message: "No such user found",
            });
        }
        const checkStatus = findUser.isVerified;
        if (checkStatus == false) {
            return res.status(403).json({
                message: "Email isn't verified, kindly first verify your email address",
            });
        }

        const unhashed = await bcrypt.compare(password, findUser.password);
        if (!unhashed) {
            return res.status(401).json({
                message: "Incorrect password",
            });
        }
        const HASURA_GRAPHQL_JWT_SECRET = {
            type: process.env.HASURA_JWT_SECRET_TYPE || "HS256",
            key:
                process.env.HASURA_JWT_SECRET_KEY ||
                "HasuraJWTsecretkeyforSmart_Recruiter",
        };

        const JWT_CONFIG: jwt.SignOptions = {
            algorithm: HASURA_GRAPHQL_JWT_SECRET.type as jwt.Algorithm,
            expiresIn: "10h",
        };

        const payload = {
            id: findUser.id,
            user: findUser.f_name,
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["user"],
                "x-hasura-default-role": "user",
                "x-hasura-user-id": findUser.id,
            }
        };
        const token = jwt.sign(payload, HASURA_GRAPHQL_JWT_SECRET.key, JWT_CONFIG);

        return res.status(200).json({
            message: "Login successful",
            token: token,
            id: findUser.id
        });
    }
    catch (e) {
        console.log(e);
        res.send("Something un-expected happend! " + e)
    }
};
export default login;
