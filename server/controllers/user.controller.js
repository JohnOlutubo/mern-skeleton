// This file contains definitions of the controller methods that were used
// in the preceding user route declarations as callbacks to be executed
// when a route request is received by the server.

import User from "../models/user.model";
import extend from "lodash/extend";  // lodash library provides utility functions for common programming tasks, including the manipulation of arrays and objects.
import errorHandler from "./error.controller";


/* This function creates a new user with the user JSON object that's received in the POST request from the frontend within req.body. */
const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
  }
};


const list = async(req, res) => {
  try { // This line finds all users in the database and selects specific fields to include in the results.
    let users = await User.find().select("name email updated created");

    //This line sends a response back to the user with the list of users in the database.
    res.json(users);
  } catch (err) {
    // If there is an error listing the users, the block of code runs.
    // This line sends a respond back to the user with a status code of 400 (Bad request) and error message.
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const userByID = (req, res, next, id) => {
  /* ... */
};
const read = (req, res) => {
  /* ... */
};
const update = (req, res, next) => {
  /* ... */
};
const remove = (req, res, next) => {
  /* ... */
};

export default { create, userByID, read, list, remove, update };
