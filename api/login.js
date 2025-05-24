import jwt from 'jsonwebtoken';

const users = {
  dimasyorke: 'asd123123',
  michael: 'micc1010',
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const userPassword = users[username];
  if (!userPassword || userPassword !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log(`[login] token generated for ${username}`);

  return res.status(200).json({ success: true, token });
}
