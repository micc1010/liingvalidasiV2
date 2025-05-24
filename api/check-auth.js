import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ valid: false, message: 'Token required' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    // Jika token valid, bisa kirim kembali info user atau hanya valid:true
    return res.status(200).json({ valid: true, username: decoded.username });
  } catch (err) {
    console.log('[check-auth] token invalid or expired:', err.message);
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
}
