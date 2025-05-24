// api/proxy.js

export default async function handler(req, res) {
  const { nomor, bank } = req.query;

  try {
    const api = await fetch(`https://apidev.biz.id/cekrekening?nomor=${nomor}&bank=${bank}`);
    const data = await api.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Gagal memuat data" });
  }
}
