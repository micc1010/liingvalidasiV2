import { get, set } from './sessionStore';

const users = {
  dimasyorke: 'asd123123',
  michael: 'micc1010',
};

export default async function handler(req, res) {
  console.log('[login] request method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;
  console.log('[login] received:', username, password);

  if (users[username] && users[username] === password) {
    // Buat session baru
    const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    set(username, sessionId);
    console.log(`[login] login success for ${username}, sessionId: ${sessionId}`);

    return res.status(200).json({ success: true, sessionId });
  }

  console.log('[login] login failed: invalid credentials');
  return res.status(401).json({ success: false, message: 'Invalid username or password' });
}
