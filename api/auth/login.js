// auth/login.js

const { createSession } = require("./sessionStore");

const users = {
  dimasyorke: "asd123123",
  michael: "micc1010"
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;

  if (!users[username] || users[username] !== password) {
    return res.status(401).json({ message: "Login gagal" });
  }

  const sessionId = `${username}-${Date.now()}`;
  createSession(username, sessionId);

  res.setHeader("Set-Cookie", [
    `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax`,
    `username=${username}; Path=/; SameSite=Lax`
  ]);
  res.status(200).json({ message: "Login berhasil" });
}
