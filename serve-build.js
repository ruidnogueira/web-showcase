const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use('/web-showcase', express.static(path.join(__dirname, '/build')));

app.get('*', (_, response) => {
  response.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(port, () => {
  console.log('Running at http://localhost:3000');
});
