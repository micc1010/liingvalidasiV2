export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { bank, no_rekening } = req.body;

  if (!bank || !no_rekening) {
    return res.status(400).json({ message: 'Bank and no_rekening required' });
  }

  try {
    const response = await fetch('https://apidev.biz.id/your-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bank, no_rekening }),
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    console.error('[proxy] error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
