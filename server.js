const express = require('express');

const app = express();
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongo = require('mongodb');

require('dotenv').config();

let db = null;
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;

mongo.MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  console.log('connected...');
  db = client.db(process.env.DB_NAME);
  console.log('Dit is de database', db);
});

function accounts(req, res, next) {
  db.collection('accounts')
    .find()
    .toArray(done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      console.log(data);
    }
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/upload/');
  },
  filename: (req, file, cb) => {
    // mimetype = image/extension
    // mimetype.split('/') >> ['image', 'extension']
    const extension = file.mimetype.split('/')[1];
    cb(
      null,
      `${
        req.body.email ? req.body.email : req.body.name
        // name + '.' + extension
      }-${Date.now()}.${extension}`
    );
  },
});

const upload = multer({ storage });

const data = [];

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => res.render('pages/index'));
app.get('/add', (req, res) => res.render('pages/add'));
app.get('/succesurl', (req, res) => res.render('pages/succesurl'));
app.get('/profile', (req, res) => res.render('pages/profile'));
app.get('/match', (req, res) => res.render('pages/match'));

function form(req, res) {
  res.render('add.ejs');
}

function add(req, res) {
  const id = slug(req.body.name).toLowerCase();
  const newUser = {
    id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    geslacht: req.body.geslacht,
    profielfoto: req.file ? req.file.filename : null,
    leeftijd: req.body.leeftijd,
    hobby: req.body.hobby,
    intrested: req.body.intrested,
  };
  data.push(newUser);
  console.log(req.file, req.file.filename);
  res.render('pages/succesurl', { data: newUser });
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
