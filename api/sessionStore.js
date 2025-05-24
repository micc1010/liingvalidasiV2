// sessionStore.js: menyimpan sesi aktif di memory (hanya runtime)
const sessions = {};

// dapatkan sessionId berdasarkan username
export function get(username) {
  return sessions[username];
}

// set sessionId untuk username
export function set(username, sessionId) {
  sessions[username] = sessionId;
  console.log(`[sessionStore] set session for ${username}: ${sessionId}`);
}

// hapus session username
export function clear(username) {
  delete sessions[username];
  console.log(`[sessionStore] cleared session for ${username}`);
}
