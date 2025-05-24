// auth/check-auth.js

const { isValidSession } = require("./sessionStore");

export default function handler(req, res) {
  const cookies = Object.fromEntries(
    (req.headers.cookie || "").split("; ").map(c => c.split("="))
  );

  const username = cookies.username;
  const sessionId = cookies.sessionId;

  if (isValidSession(username, sessionId)) {
    res.status(200).json({ username });
  } else {
    res.status(401).end();
  }
}
