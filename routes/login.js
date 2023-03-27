import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt-nodejs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, password, email } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ name, email });
    console.log(user);
    if (
      (user && bcrypt.compareSync(password, user.password) && email, user.email)
    ) {
      res.status(200).json({
        success: true,
        response: {
          name: user.name,
          email: user.email,
          id: user.id,
          accessToken: user.accessToken,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Wrong password, or username!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: "Wrong password, or You need to register!",
    });
  }
});

export default router;
