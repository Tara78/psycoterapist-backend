import User from "../models/User.js";

// ADD Auth middleware for admins and one for User
export const adminAuthMiddleFunction = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken });
    if (user.isAdmin) {
      next();
    } else {
      res.status(401).json({
        success: false,
        response: "You are not admin",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err,
    });
  }
};

// ADD Auth middleware for admins and one for User
export const userAuthMiddleFunction = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        success: false,
        response: "You do not have authorization.",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err,
    });
  }
};
