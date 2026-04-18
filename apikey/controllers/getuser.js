import users from "../database/user.js";

export default (req, res) => {
  // find and return the user

  const username = req.query.username;
  const user = users.find((u) => u.username == username);

  if (!user) {
    res.status(404).json({
      success: false,
      message: "user not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: user,
  });
};
