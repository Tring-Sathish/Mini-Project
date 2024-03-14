import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserRouter from './Routes/UserRouter';

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use('/', UserRouter);
app.get('/api/health',(req, res) => {
     return res.status(200).json({ message: "Working Fine" });
})
const port: number = Number(process.env.PORT) || 8082;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
