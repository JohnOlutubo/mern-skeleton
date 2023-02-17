import mongoose from "mongoose"; // use Mongoose to define the schema with the necessary user data fields

const UserSchema = new mongoose.Schema({ ...})

export default mongoose.model('User', UserSchema)