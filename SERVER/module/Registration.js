import mongoose from "mongoose";

const RegisterUser = mongoose.Schema({
  username : String,
  email : {
    type : String,
    unique : true,
  },
  password : {
    type : String,
    unique : true,
  }
})

const RegistrationDetails = mongoose.model("registrations", RegisterUser);
export default RegistrationDetails;