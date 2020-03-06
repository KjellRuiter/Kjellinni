const express = require('express');

const app = express();
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer({ dest: 'static/upload/' });

const data = [];

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => res.render('pages/index'));
app.get('/add', (req, res) => res.render('pages/add'));
app.get('/succesurl', (req, res) => res.render('pages/succesurl'));

function form(req, res) {
  res.render('add.ejs');
}

function add(req, res) {
  const id = slug(req.body.name).toLowerCase();

  data.push({
    id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    geslacht: req.body.geslacht,
    profielfoto: req.file ? req.file.filename : null,
    leeftijd: req.body.leeftijd,
    hobby: req.body.hobby,
    intrested: req.body.intrested,
  });
  console.log(req.body);
  res.render('pages/succesurl', { data });
}

app.post('/', upload.single('profielfoto'), add);
app.get('/add', form);

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 Not Found');
  console.log(data);
});

app.listen(3000, () => console.log('App listening on port 3000!'));
