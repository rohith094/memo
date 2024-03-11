
import express from 'express';
import bcrypt from 'bcrypt';
import RegistrationDetails from '../module/Registration.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await RegistrationDetails.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ status: 1, error: "User not found" });
    }
    const matched = await bcrypt.compare(password, user.password);
    const login = true;
    if (!matched) {
      return res.status(401).json({ status: 2, error: "Incorrect password" });
    }
    const token = jwt.sign({ user }, process.env.SECRET_STRING, { expiresIn: "1hr" });
    res.status(200).json({ token, login });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
