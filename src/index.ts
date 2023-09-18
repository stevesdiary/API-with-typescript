import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
// import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose";
import { error } from "console";
const app = express();

app.use(cors({
    credentials: true,
}));
require('dotenv').config()
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server runnning on http://localhost:8080/");
}); 

// const MONGO_URL = 'mongodb+srv://typescript:typescript1@typescript.rrpy3ry.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));