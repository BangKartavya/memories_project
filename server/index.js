import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import postRoutes from "./routes/posts.js";
import userRoutes from './routes/users.js';
const app = express();
dotenv.config();

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());

app.use("/posts", postRoutes);
app.use('/users', userRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;


const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Listening to : ${PORT}`)))
    .catch((err) => console.log(err.message));