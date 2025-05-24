import { sessionStore } from './sessionStore.js';

export default function handler(req, res) {
  const username = req.cookies?.username;

  if (username && sessionStore[username]) {
    delete sessionStore[username];
    console.log(`User ${username} logged out`);
  }

  res.setHeader('Set-Cookie', [
    'token=; Max-Age=0; Path=/',
    'username=; Max-Age=0; Path=/'
  ]);
  res.status(200).json({ message: 'Logged out' });
}
