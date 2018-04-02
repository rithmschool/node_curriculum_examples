const express = require('express');
const app = express();

app.get('/', (request, response) => {
  return response.send('Hello World!');
});

app.get('/user/:name', (request, response) => {
  return response.send(`Hello ${request.params.name}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
