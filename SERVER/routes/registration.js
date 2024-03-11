import express from 'express';
import RegistrationDetails from '../module/Registration.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/register",async (req,res)=>{
  const {username , email , password} = req.body;
  const salt = 10; 
  // const existinguser = RegistrationDetails.findOne({email});
  // console.log(existinguser);
  // if(existinguser.email === email){
  //   res.json({"status": true, "message" : "user already exist"});
  // }
  // else{
  try{
    
    const hashedpassword = await bcrypt.hash(password,salt);

    const user = await RegistrationDetails.create({
      username : username,
      email : email,
      password : hashedpassword
    })

    res.json({"message" : "user created "})
  }
  catch(err){
        res.json({"status" : true, "message": "user already exists..."});
        console.log("error", err);
      }
    // }
}) 

export default router;