import mongoose from "mongoose"; // use Mongoose to define the schema with the necessary user data fields

//takes a schema definition object as a parameter to generate a new Mongoose schema object that will specify the properties or structure of each document in a collection.
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
  // These Date objects will be automatically created by the program to store timestamps
  // that show the exact time when a user is registered or when their information is modified.
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,

  hashed_password: {
    type: String,
    required: "Password is required",
  },
  Salt: String
});

// Define a virtual property called 'password' for the user schema
UserSchema.virtual('password')

  // Define a setter function for the 'password' property
  .set(function(password) {
    // Store the original plain-text password in the '_password' variable
    this._password = password
    // Generate a random 'salt' value and store it in the 'salt' variable
    this.salt = this.makeSalt()
    // Use the 'password' and 'salt' values to generate a secure, one-way 'hashed_password'
    // value, and store it in the 'hashed_password' variable
    this.hashed_password = this.encryptPassword(password)
  })

  // Define a getter function for the 'password' property
  .get(function() {
    // Return the original plain-text password that was entered by the user
    return this._password
  })

  // Define a set of methods that can be called on a user object
UserSchema.methods = {

  // A method for authenticating a user's password
  authenticate: function(plainText) {
    // Encrypt the plain-text password and compare it to the stored hashed password
    return this.encryptPassword(plainText) === this.hashed_password
  },

  // A method for encrypting a plain-text password using a 'salt' value
  encryptPassword: function(password) {
    // If no password was provided, return an empty string
    if (!password) return ''
    try {
      // Create a SHA1 hash using the provided 'salt' value and the plain-text password
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      // If an error occurred, return an empty string
      return ''
    }
  },

  // A method for generating a random 'salt' value
  makeSalt: function() {
    // Generate a random number based on the current time and a random number
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

// Password field validation
UserSchema.path('hashed_password').validate(function(v) {
  if (this._password === undefined && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)


export default mongoose.model("User", UserSchema); // so that it can be used by the rest of the backend code.
