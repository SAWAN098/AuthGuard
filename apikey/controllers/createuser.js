import users from "../database/user.js";
import { genAPIKey } from "../keys/generate.js";

export default (req, res) => {
  // fetch the data from the request body
  const username = req.body.username;

  let today = new Date().toISOString().split("T")[0];
  let user = {
    _id: Date.now(),
    api_key: genAPIKey(),
    username: username,
    usage: [{ date: today, count: 0 }],
  };

  console.log("User added");
  users.push(user);

  res.status(201).json({
    success: true,
    message: "User added",
    data: users,
  });
};
