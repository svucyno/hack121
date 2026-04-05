require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Health check
app.get('/', (req, res) => res.json({ status: 'Nirbhaya Nari Server Init', version: '1.0' }));

// Initial API stubs
app.post('/api/sos', async (req, res) => {
  res.json({ success: true, message: 'SOS endpoint initialized' });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;