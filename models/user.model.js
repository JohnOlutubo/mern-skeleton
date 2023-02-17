import mongoose from "mongoose"; // use Mongoose to define the schema with the necessary user data fields

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
}); //takes a schema definition object as a parameter to generate a new Mongoose schema object that will specify the properties or structure of each document in a collection.

export default mongoose.model("User", UserSchema); // so that it can be used by the rest of the backend code.
