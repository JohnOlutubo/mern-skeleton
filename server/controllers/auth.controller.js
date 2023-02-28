import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "./../../config/config.js";

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }); // find a user in the database by email address
    if (!user)
      // if the user doesn't exist, return an error message
      return res.status("401").json({ error: "user not found" });

    if (!user.authenticate(req.body.password)) {
      // if the user exists, but the password doesn't match, return an error message
      return res
        .status("401")
        .json({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret); // create a token using the user's ID and a secret key

    res.cookie("t", token, { expire: new Date() + 9999 }); // set a cookie in the user's browser with the token, so they stay logged in

    return res.json({
      // return the token and some information about the user (like their name and email) as a JSON object
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status("401").json({ error: "Could not sign in" });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

// const requireSignin = ;

const hasAuthourization = (req, res) => {
  /* */
};

export default { signin, signout, requireSignin, hasAuthourization };
