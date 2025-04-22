import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// import sendEmail from "../utils/sendEmail.js";

// User schema definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Date,
  },
});

// Pre-save hook to hash password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Only hash the password if it's modified
  this.password = await bcrypt.hash(this.password, 10);  // Hashing password with bcrypt
  next();
});

// Method to compare the entered password with the stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
