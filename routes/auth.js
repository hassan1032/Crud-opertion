import express from "express";
import { Admin } from "../models/Admin";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;
  if (role === "admin") {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({
        message: "The Admin IS Not Registered",
      });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "The Password is Wrong",
      });
    }
    const token = jwt.sign({username: admin.username,role: 'admin'},process.env.Admin_key)
    res.status(200).json({
      message: "The Admin is Logged In",
      token,
      });

  } else if (role === "user") {
  } else {
  }
});

export { router as AdminRouter}