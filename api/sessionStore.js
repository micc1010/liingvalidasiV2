const sessions = {};

module.exports = {
  get: (username) => sessions[username],
  set: (username, sessionId) => {
    sessions[username] = sessionId;
    console.log(`[SESSION] Set session ${sessionId} untuk user ${username}`);
  },
  clear: (username) => {
    delete sessions[username];
    console.log(`[SESSION] Session untuk user ${username} telah dihapus`);
  }
};
