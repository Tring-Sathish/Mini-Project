import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { QueryHasura } from "../../Config/hasuraClient";
import { UPDATE_USER } from "../../Config/hasura-query";

const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { password, id } = req.body.input.arg1;    
    if (!password) {
        return res.status(400).json({ error: "Must fill new-password field." });
    }

    const saltRounds: number = 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    try {
        const data = { password: hashedPassword }
        const findUser = await QueryHasura(UPDATE_USER, { id: id , data });
        
        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "Password updated" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Server error, something went wrong" });
    }
};

export default updatePassword;
