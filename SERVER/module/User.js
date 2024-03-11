import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema({
  name : String,
  username : String,
  email : String,
  usermail : String
})

const Userinfo = mongoose.model("Userinfo",UserSchema);

export default Userinfo;