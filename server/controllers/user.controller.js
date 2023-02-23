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


const list = (req, res) => {
  /* ... */
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
