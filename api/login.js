const sessionStore = require('./sessionStore');

const users = {
  dimasyorke: 'asd123123',
  michael: 'micc1010',
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    console.log(`[LOGIN] ${username} berhasil login. Session ID: ${sessionId}`);

    sessionStore.set(username, sessionId);

    return res.status(200).json({ success: true, sessionId });
  }

  console.log(`[LOGIN] Gagal login dengan username: ${username}`);
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
};
