import express from "express";
import mongoose from "mongoose";
import InitialRoute from './routes/userroute.js';
import RegistrationRoute from './routes/registration.js';
// import authRoute from './routes/authRoute.js';
import LoginRoute from './routes/login.js';
import cors from 'cors';
import dotenv from 'dotenv';  

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const dbURL = "mongodb+srv://rohithmenda123:user2024@usercluster.79livxk.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURL).then(()=>{
  console.log("connected");
}).catch((error)=>{
  console.log("error connecting database", error);
}) 

app.use("/",InitialRoute);
app.use("/",RegistrationRoute);
app.use("/",LoginRoute);

app.listen(process.env.SERVER_PORT,()=>{
  console.log("sever is running on 3001");
})