require('dotenv').config();
const express = require('express');
const cors = require('cors');

// --- Import the new routes file ---
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Punch-In App server is running! 🎉');
});

// --- Tell the app to use the routes ---
app.use('/api/attendance', attendanceRoutes);


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});