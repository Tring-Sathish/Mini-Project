import express, { Request, Response, NextFunction } from "express";
import { QueryHasura } from "../../Config/hasuraClient";
import { UPDATE_USER } from "../../Config/hasura-query";


const VerifyMail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id: string | undefined = req.query.id as string;

    if (!id) {
        res.status(400).json({ error: "ID is required!" });
        return next();
    }

    try {
        // await client.query('UPDATE users SET "isVerified" = $2 WHERE id = $1', [id, true]);
        const data = {
                "isVerified": true
        }
        const resp = await QueryHasura(UPDATE_USER, { id , data })
        const html: string = `   
        <html><head><title>Verified</title>     
        </head>       <body>         <h1 style="color:#1E90FF; textAlign:'center'">           Email verification completed, you can login now.<br/><a href="http://localhost:3001">Go to Home</a></h1></body></html>
        `;
        res.send(html);
    } catch (e) {
        res.send("Error: " + e);
    }
};

export default VerifyMail;
