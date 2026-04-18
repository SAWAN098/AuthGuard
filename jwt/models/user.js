import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true, // Always stored in lowercase
    trim: true, // Removes spaces before/after
    required: true,
    validate: {
      validator: function (v) {
        return v.includes("@"); // TODO: can be improved
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  role: {
    type: String,
    enum: ["normal", "admin"], // Can only be one of these values
    required: true,
    
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
