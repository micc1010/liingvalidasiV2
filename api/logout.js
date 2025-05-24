import { clear } from './sessionStore';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username required' });
  }

  clear(username);
  console.log(`[logout] session cleared for ${username}`);

  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
