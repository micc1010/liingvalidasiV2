// auth/sessionStore.js

const sessionMap = new Map();

function createSession(username, sessionId) {
  // Jika ada sesi aktif, hapus
  const existing = sessionMap.get(username);
  if (existing && existing !== sessionId) {
    sessionMap.set(username, sessionId); // Replace with new session
  } else {
    sessionMap.set(username, sessionId);
  }
}

function isValidSession(username, sessionId) {
  return sessionMap.get(username) === sessionId;
}

function destroySession(sessionId) {
  for (const [username, id] of sessionMap.entries()) {
    if (id === sessionId) {
      sessionMap.delete(username);
      break;
    }
  }
}

module.exports = {
  createSession,
  isValidSession,
  destroySession
};
