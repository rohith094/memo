import jwt from 'jsonwebtoken';

const authRoute = (req, res, next) => {
    const token = req.header("Authorization"); 

    if (!token) {
      return res.status(401).json({ "error": "token not found found" });
    }
    try{
    const decoded = jwt.verify(token, process.env.SECRET_STRING);
    req.user = decoded.user;
    next();
    }
  catch(err){
    console.log("error",err);
    return res.status(401).json({"error" : "token not found found"})
  }
}
export default authRoute;