import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const verifyJWTToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      async function (err, decode) {
        if (err) {
          res.status(500).send({
            message: err,
          });
          return;
        }
        const user = await userModel.findOne({
          _id: decode.id,
        });

        if (!user) {
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
