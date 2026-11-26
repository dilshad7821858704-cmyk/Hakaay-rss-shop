require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const API_BASE = 'https://oldcat.tech/api/seller/v1';
const headers = {
  'X-API-Key': process.env.API_KEY,
  'Content-Type': 'application/json'
};

// Fetch seller profile / account info
app.get('/api/me', async (req, res) => {
  try {
    const r = await fetch(`${API_BASE}/me`, { headers });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Could not load seller profile' });
  }
});

// Redeem a voucher
app.post('/api/redeem', async (req, res) => {
  try {
    const { voucher_code, player_name, kingdom, x, y } = req.body;
    const r = await fetch(`${API_BASE}/redeem`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        voucher_code,
        player_name,
        kingdom: Number(kingdom),
        x: Number(x),
        y: Number(y)
      })
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Redeem request failed' });
  }
});

// Check order status
app.get('/api/orders/:code', async (req, res) => {
  try {
    const r = await fetch(`${API_BASE}/orders/${encodeURIComponent(req.params.code)}`, {
      headers
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Order lookup failed' });
  }
});

// Check voucher status
app.get('/api/vouchers/:code', async (req, res) => {
  try {
    const r = await fetch(`${API_BASE}/vouchers/${encodeURIComponent(req.params.code)}`, {
      headers
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Voucher lookup failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`hakaay rss running on port ${PORT}`));
