import bcrypt from "bcrypt";
import userModel from "../models/user.js";

/*
In the context of hashing passwords, a salt is a random string of data added to a password before hashing it.

A number (salt rounds / cost factor)

This number represents how many times the hashing algorithm should internally process the data.

The higher the number, the slower (and more secure) the hash.

Typical values: 10–12 in production.
*/
export default async (req, res) => {
  userModel
    .insertOne({
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    .then(() => {
      console.log("User registered successfully");
      res.status(200).json({
        message: "User Registered successfully",
      });
    })
    .catch((err) => {
      console.log("Error registering user", err.message);
      res.status(500).json({
        message: "failed operation",
        error: err.message,
      });
    });
};
