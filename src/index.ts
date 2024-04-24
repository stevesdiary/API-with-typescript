// import express from "express";
// import http from "http";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// import compression from "compression";
// import cors from "cors";
// import router from './router';
// import mongoose, { mongo } from "mongoose";
// const app = express();

// app.use(cors({
//     credentials: true,
// }));
// require('dotenv').config()
// app.use(compression());
// app.use(cookieParser());
// app.use(bodyParser.json());
// const server = http.createServer(app);

// server.listen(8080, () => {
//     console.log("Server runnning on http://localhost:8080/");
// }); 
// const password = process.env.MONGO_PASSWORD;
// const MONGO_URL = `mongodb+srv://typescript:${password}@typescript.rrpy3ry.mongodb.net/?retryWrites=true&w=majority`

// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL);
// mongoose.connection.on('error', (error: Error) => console.log(error));

// app.use('/', router());


//Working with Type aliases, unions and interactions, type narrowing, nullable, the Unknown types, the never types.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

type Employee = {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
}
let employee: Employee = {
    id: 1,
    name: 'Sam',
    retire: (date: Date) => {
       console.log(date) 
    }
}
// console.log(employee.name)