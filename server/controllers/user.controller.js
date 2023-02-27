// This file contains definitions of the controller methods that were used
// in the preceding user route declarations as callbacks to be executed
// when a route request is received by the server.

import User from "../models/user.model";
import extend from "lodash/extend"; // lodash library provides utility functions for common programming tasks, including the manipulation of arrays and objects.
import errorHandler from "./error.controller";

/* This function creates a new user with the user JSON object that's received in the POST request from the frontend within req.body. */
const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    // This line finds all users in the database and selects specific fields to include in the results.
    let users = await User.find().select("name email updated created");

    //This line sends a response back to the user with the list of users in the database.
    res.json(users);
  } catch (err) {
    // If there is an error listing the users, the block of code runs.
    // This line sends a respond back to the user with a status code of 400 (Bad request) and error message.
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    // This line tries to find a user in the database with the specified ID.
    let user = await User.findById(id);

    // This block of code runs if no user is found with the specific ID.
    if (!user)
      return res.status("400").json({
        error: "User not found",
      });

    // If a user is found, this line adds the user to the request object under the "profile" key.
    req.profile = user;

    // This line calls the "next" function, which moves on the next function in the route's middleware chain.
    next();

    // If there is an error retrieving the user from the database, this block of code runs.
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

const read = (req, res) => {
  req.hashed_password = undefined; // removes sensitive information
  req.profile.salt = undefined;
  return res.json(req.profile); // sends the user object back to the user in the response.
};

const update = async (req, res) => {
  try {
    let user = req.profile; //The update function retrieves the user details from req.profile
    user = extend(user, req.body); // Uses the lodash module to extend and merge the changes that came in the request body to update the user data.
    user.updated = Date.now(); // The updated field is populated with the current date to reflect the last updated timestamp.
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile; // retrieve the user
    let deletedUser = await user.remove(); //delete the user from database
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser); //return the deleted user object in the response.
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, userByID, read, list, remove, update };
