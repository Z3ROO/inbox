import express from 'express';

const app = express();

const SERVER_PORT = 80;

app.use(express.static('dist'));

app.get('*', (request, response) => {
  response.sendFile('index.html');
});

app.listen(SERVER_PORT, () => {
  console.log('Server listening on port '+SERVER_PORT);
});