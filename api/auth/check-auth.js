import { sessionStore } from './sessionStore.js';

export default function handler(req, res) {
  const { token, username } = req.cookies || {};
  const valid = username && sessionStore[username] === token;

  console.log('Auth check for:', username, 'Valid:', valid);

  if (valid) {
    return res.status(200).json({ authenticated: true, username });
  } else {
    return res.status(401).json({ authenticated: false });
  }
}
