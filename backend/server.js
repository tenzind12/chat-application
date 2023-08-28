const express = require('express');
const app = express();
const http = require('http');

const PORT = process.env.PORT || 5000;

// const expressServer = http.createServer(app);

app.listen(PORT, () => console.log('http://localhost:' + PORT));
