const sessionStore = require('./sessionStore');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, sessionId } = req.body;

  const currentSession = sessionStore.get(username);
  if (currentSession === sessionId) {
    sessionStore.clear(username);
    console.log(`[LOGOUT] ${username} berhasil logout.`);
  } else {
    console.log(`[LOGOUT] ${username} mencoba logout dengan session tidak valid.`);
  }

  return res.status(200).json({ success: true });
};
