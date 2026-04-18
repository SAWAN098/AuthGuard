import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*
What happens internally:

bcrypt reads the stored hash, which already contains:

The algorithm version

The cost factor (number of salt rounds used)

The unique salt that was generated for that password

The resulting hash

(All this is embedded inside the bcrypt hash string!)

bcrypt then takes the plain text password you passed, applies the same hashing algorithm, same cost factor, and the same salt (extracted from the hash).

It checks whether the newly produced hash matches the stored hash.
*/

export default async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).send({
      message: "User Not found.",
    });
    return;
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
    return;
  }

  var token = jwt.sign(
    {
      id: user._id, // data embedded in token
    },
    process.env.API_SECRET, // digitally sign the token so the server can later verify if the token is valid and untampered.
    {
      expiresIn: 86400, // 24 hours
    }
  );

  // responding to client request with user profile success message and  access token .
  res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
    message: "Login successful",
    accessToken: token,
  });
};
