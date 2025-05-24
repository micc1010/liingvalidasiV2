// Karena kita menggunakan JWT stateless, logout cukup dilakukan di client-side dengan menghapus token.
// Namun, kalau kamu ingin implementasi blacklist token, perlu database atau memory storage.
// Untuk sekarang, logout hanya akan memberi respon sukses.

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Bisa menerima username optional tapi tidak wajib
  // Karena JWT stateless, server tidak menyimpan session

  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
