const sessionStore = require('./sessionStore');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, sessionId } = req.body;
  const validSession = sessionStore.get(username);

  if (validSession === sessionId) {
    console.log(`[AUTH] ${username} memiliki sesi aktif yang valid.`);
    return res.status(200).json({ authorized: true });
  }

  console.log(`[AUTH] Akses ditolak untuk ${username}. Session tidak valid.`);
  return res.status(401).json({ authorized: false });
};
