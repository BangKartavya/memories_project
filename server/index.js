import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import postRoutes from "./routes/posts.js";

const app = express();

app.use("/posts", postRoutes);

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());

const CONNECTION_URL =
    "mongodb+srv://bangkartavya:bangkartavya123@cluster0.1xk2s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// console.log(CONNECTION_URL);

const PORT = process.env.port || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Listening to : ${PORT}`)))
    .catch((err) => console.log(err.message));