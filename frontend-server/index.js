const express = require('express');
const path = require('path');

const app = express();

const SERVER_PORT = 80;

app.use(express.static(path.resolve(__dirname,'dist')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname,'dist','index.html'));
});

app.listen(SERVER_PORT, () => {
  console.log('Server listening on port '+SERVER_PORT);
});