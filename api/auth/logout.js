// auth/logout.js

const { destroySession } = require("./sessionStore");

export default async function handler(req, res) {
  const cookies = Object.fromEntries(
    (req.headers.cookie || "").split("; ").map(c => c.split("="))
  );
  const sessionId = cookies.sessionId;

  if (sessionId) destroySession(sessionId);

  res.setHeader("Set-Cookie", [
    "sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    "username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  ]);
  res.redirect("/login.html");
}
