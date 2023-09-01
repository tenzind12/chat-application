const express = require('express');
const app = express();
const dotenv = require('dotenv');

const databaseConnect = require('./config/database');
const authRouter = require('./routes/authRoutes');

dotenv.config({
  path: 'backend/config/config.env',
});

const PORT = process.env.PORT || 5000;

app.use('/api/messenger', authRouter);

app.get('/', (req, res) => {
  res.send('this is from back');
});

databaseConnect();

app.listen(process.env.PORT, () => console.log('http://localhost:' + PORT));
