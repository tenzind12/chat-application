const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const databaseConnect = require('./config/database');
const authRouter = require('./routes/auth.routes');
const messengerRouter = require('./routes/messenger.routes');

dotenv.config({
  path: 'backend/config/config.env',
});

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/messenger', authRouter);
app.use('/api/messenger', messengerRouter);

app.get('/', (req, res) => {
  res.send('this is from back');
});

databaseConnect();

app.listen(process.env.PORT, () => console.log('http://localhost:' + PORT));
