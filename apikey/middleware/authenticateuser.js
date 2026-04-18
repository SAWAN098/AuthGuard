import users from "../database/user.js";

export default (req, res, next) => {
  let api_key = req.header("x-api-key");
  let user = users.find((user) => user.api_key == api_key);

  if (user) {
    //If API key matches
    //check the number of times the API has been used in a particular day

    let today = new Date().toISOString().split("T")[0];

    const maxApiHit = process.env.MAX_API_HIT_IN_ONE_DAY || 5;

    let usage = user.usage.find((day) => day.date == today);

    if (usage.count >= maxApiHit) {
      //stop if the usage exceeds max API calls
      res.status(429).json({
        error: {
          code: 429,
          message: "Max API calls exceeded.",
        },
      });
      return;
    }

    usage.count += 1;
    console.log("Good API call", usage);
    next();
    return;
  }

  res
    .status(403)
    .json({ error: { code: 403, message: "You are not allowed." } });
};
