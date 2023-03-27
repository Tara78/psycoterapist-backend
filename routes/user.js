import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt-nodejs";
// import error from "../utils/error.js";

const router = express.Router();

/*Get Users*/
// localhost: 8080 / user
router.get("/", async (req, res, next) => {
  try {
    const user = await User.find({ name: req.body.name });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err });
  }
});

/** Get All Users */
//localhost:8080/user/all
router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.find({}).exec();
    res.status(200).json({ success: true, data: allUsers });
  } catch (err) {
    next(err);
  }
});

// Register
// localhost: 8080 / user / register;
router.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  if (password.length < 5) {
    res.status(400).json({
      success: false,
      response: "You need to have min 5 characters!",
    });
  } else {
    try {
      const newUser = await new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password),
      }).save();
      res.status(201).json({
        success: true,
        response: {
          name: newUser.name,
          email: newUser.email,
          accessToken: newUser.accessToken,
          id: newUser._id,
        },
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        response: err,
      });
    }
  }
});

/** update */
//localhost:8080/user/:id
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

/** Delete */
//localhost:8000/user/:id
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
