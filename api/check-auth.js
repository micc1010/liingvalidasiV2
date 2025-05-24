import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(400).json({ valid: false, message: 'Token required in Authorization header' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    return res.status(200).json({ valid: true, username: decoded.username });
  } catch (err) {
    console.log('[check-auth] token invalid or expired:', err.message);
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
}
