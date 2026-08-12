import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const verifyJWTToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1], // token
      process.env.API_SECRET,
      async function (err, decode) { // callback
        if (err) {
          res.status(500).send({
            message: err,
          });
          return;
        }
        const user = await userModel.findOne({ // here user is the full user object fetched from the database using the decoded user ID from the JWT token.
          _id: decode.id, // decode.id is the user ID that was embedded in the JWT token when it was created during login. This ID is used to find the corresponding user in the database.
        });

        if (!user) {  // If no user is found in the database with the decoded ID, it means the token is valid but the user does not exist in the database (reasons the user is deleted from the database).
          res.status(400).send({
            message: "user does not exist",
          });
          return;
        } else {
          req.user = user;
          next();
        }
      }
    );
  } else {
    res.status(403).json({ message: "Token not passed" });
  }
};

export { verifyJWTToken };
