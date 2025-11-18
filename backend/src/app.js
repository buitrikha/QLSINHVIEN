const express = require('express');
const cors = require('cors');
const reportRoutes = require('./routes/report');
const sinhvienRoutes = require('./routes/sinhvien');
const giangvienRoutes = require('./routes/giangvien');
const monhocRoutes = require('./routes/monhoc');
const dangkyRoutes = require('./routes/dangky');

const app = express();
app.use(cors());
app.use(express.json());

// Đăng ký các router
app.use('/api/report', reportRoutes);
app.use('/api/sinhvien', sinhvienRoutes);
app.use('/api/giangvien', giangvienRoutes);
app.use('/api/monhoc', monhocRoutes);
app.use('/api/dangky', dangkyRoutes);

// Test endpoint
app.get('/api/ping', (req, res) => {
  res.send('Backend is running!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});