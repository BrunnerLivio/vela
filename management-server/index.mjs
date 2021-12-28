import express from 'express';
import { engine } from 'express-handlebars';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 6969

const app = express();

app.set('view engine', 'handlebars');

app.engine('handlebars', engine({
  layoutsDir: __dirname + '/views/layouts',
}));

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('main', { layout: 'index' });
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