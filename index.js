const express = require('express');
const { execSync } = require('child_process');

const app = express();

app.get('/', (req, res) => {
  execSync('poweroff');
  res.send(200);
});

app.listen(6969);
console.log('Listening on http://localhost:6969');
