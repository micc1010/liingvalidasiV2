import { get } from './sessionStore';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, sessionId } = req.body;

  if (!username || !sessionId) {
    return res.status(400).json({ message: 'Username and sessionId required' });
  }

  const storedSessionId = get(username);

  if (storedSessionId && storedSessionId === sessionId) {
    console.log(`[check-auth] user ${username} session valid`);
    return res.status(200).json({ valid: true });
  }

  console.log(`[check-auth] user ${username} session invalid or expired`);
  return res.status(401).json({ valid: false });
}
