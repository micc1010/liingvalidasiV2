import { sessionStore } from './sessionStore.js';

const users = {
  dimasyorke: 'asd123123',
  michael: 'micc1010',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;
  console.log('Login attempt:', username, password);

  if (!users[username] || users[username] !== password) {
    console.log('Login failed for:', username);
    return res.status(401).json({ message: 'Login gagal!' });
  }

  // Single session enforcement
  if (sessionStore[username]) {
    console.log(`User ${username} already logged in, terminating old session`);
    delete sessionStore[username];
  }

  const token = Math.random().toString(36).substring(2);
  sessionStore[username] = token;

  console.log('Login success for:', username, 'Token:', token);

  res.setHeader('Set-Cookie', [
    `token=${token}; HttpOnly; Path=/`,
    `username=${username}; Path=/`
  ]);
  return res.status(200).json({ message: 'Login berhasil' });
}
