// Session-based authentication uses cookies to maintain user state.
// cookies are small files which is stored on user browser - used to remember information about you, When you visit the same website again, your browser sends the cookie back, so the site recognizes you.
// Cookies usually contain key–value pairs (e.g., session_id=12345).

const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // A secret key to sign the session ID cookie (for security)
    resave: false, // Don't save session again if it wasn't modified
    saveUninitialized: false, // Don't create a session until something is stored in it
    cookie: {
      secure: false, // Cookie is only sent over HTTPS, false as we are using http only
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiry = 1 day (in ms)
    },
  })
);

/*
Cookie = key (session ID) stored in the browser
Session = actual data stored on the server, linked to that key

The cookie stores the session ID.
When the client makes a request, the cookie (with the session ID) is sent to the server.
The server looks up the session store using that ID and retrieves the user’s data.
*/

const users = [{ id: 1, username: "user1", password: "password1" }];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // TODO: can create a user modal to store user information and if not found, return from here
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Store user information in session
  /*
  req.session
  Provided by express-session middleware.
  It’s an object that represents the current user’s session on the server.
  */
  req.session.user = {
    // we are creating a new propery of type object in session
    id: user.id,
    username: user.username,
  };

  res.json({ message: "Login successful", user: req.session.user });
});

// Protected route
app.get("/profile", (req, res) => {
  // Postman internally stores cookies for a domain, delete the cookie or hit the logout  to see the effect

  // Check if user is logged in
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ message: "Profile accessed", user: req.session.user });
});

app.post("/logout", (req, res) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid"); // to clear the cookie in the postman,
    /*
    without this,
    Cookie (connect.sid) still exists in Postman.
    But that cookie points to a destroyed session ID → the server won’t find anything, so /profile returns Unauthorized.
    */

    res.json({ message: "Logout successful" });
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 8080");
});
