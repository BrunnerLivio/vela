import express from 'express';
import { engine } from 'express-handlebars';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { networkInterfaces } from 'os';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 6969

const app = express();

app.set('view engine', 'handlebars');

app.engine('handlebars', engine({
  layoutsDir: __dirname + '/views/layouts',
}));

function getIp() {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return results
}

app.use(express.static('public'))

app.get('/', (req, res) => {
  const ip = getIp()?.['eth0']
  res.render('main', { layout: 'index', ip });
});

app.get('/reboot', (req, res) => {
  execSync('reboot')
  res.sendStatus(200)
});

app.get('/shutdown', (req, res) => {
  execSync('poweroff')
  res.sendStatus(200)
});


app.get('/downloads/incomplete', (req, res) => {
  execSync('rm -rf download/incomplete')
  res.sendStatus(200);
});

app.get('/downloads/complete', (req, res) => {
  execSync('rm -rf download/complete')
  res.sendStatus(200);
});

app.listen(port, () => console.log(`App listening to port ${port}`));