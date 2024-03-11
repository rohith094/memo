import express from "express";
import Userinfo from "../module/User.js";
import authRoute from './authRoute.js';

const router = express.Router();

router.get("/users",authRoute, async (req,res)=>{

  const useremail = req.user.email;
  try{
    const data = await Userinfo.find({usermail : useremail});
    res.json(data);
  }
  catch(err){
    console.log("error fetching data",err);
    res.json({"error" : "users not found"});
  }
})

router.get("/user/:id",async (req,res)=>{
  const id = req.params.id;
  try{
    const data = await Userinfo.findById(id);
    res.json(data);
  }
  catch(err){
    console.log("error fetching data",err);
    res.json({"error" : "user not found"});
  }
})

router.post("/user",authRoute,async (req,res)=>{
  // const data = req.body;
  const {name,username,email} = req.body;
  const useremail = req.user.email;
  try{
    await Userinfo.create({
      name,
      username,
      email,
      usermail:useremail
    });
    res.json("user create success");
  }
  catch(err){
    res.send(err.message);
  
  }
})

router.put("/user/:id",authRoute,async (req,res)=>{
  const id = req.params.id;
  const name=req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  try{
    const updateddata = await Userinfo.findByIdAndUpdate(id,{
      $set : {name : name,username :username,email:email}
    },{new:true})
    res.json(updateddata);
  }
  catch(err){
    res.json({"error": `user with ${id} not found`})
  }
})

router.delete("/user/:id",authRoute,async (req,res)=>{
  const id = req.params.id;
  try{
    await Userinfo.findByIdAndDelete(id);
    res.json({"message" : `data with ${id} is deleted`});
  }
  catch(err){
    res.json({"error" : "error deleting data"});
  }
})

export default router;