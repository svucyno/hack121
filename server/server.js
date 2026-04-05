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

// Real-Time SOS SMS Notification Engine
app.post('/api/sos/send-sms', async (req, res) => {
  const { contacts, userName, location } = req.body;
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } = process.env;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.error("Twilio credentials missing! Logging SMS for Demo.");
    console.log(`[DEMO LOG] EMERGENCY Alert from ${userName || 'Nari'}! Location: https://maps.google.com/?q=${location[0]},${location[1]}`);
    return res.json({ success: true, message: 'Twilio missing, logged to console for demo.' });
  }

  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const mapLink = `https://maps.google.com/?q=${location[0]},${location[1]}`;
  const messageBody = `EMERGENCY ALERT from Nirbhaya Nari: ${userName || 'User'} needs HELP! Last known location: ${mapLink}`;

  try {
    const results = await Promise.all(contacts.map(contact => 
      client.messages.create({
        body: messageBody,
        from: TWILIO_FROM_NUMBER,
        to: contact.phone
      })
    ));
    
    console.log(`SMS Alerts sent successfully to ${results.length} contacts.`);
    res.json({ success: true, dispatched: results.length });
  } catch (err) {
    console.error("Twilio SMS Dispatch Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;