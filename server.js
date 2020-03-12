const express = require('express');

const app = express();
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const { MongoClient } = require('mongodb');

// .ENV

require('dotenv').config();

// connection DB

const uri = process.env.DB_uri;
async function callDb() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db('db01');

    const account = await db
      .collection('accounts')
      .find({})
      .toArray();
    console.log(account);
    return account;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
callDb();

async function writeDb(data) {
  console.log('writeDb');
  console.log(data);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db('db01');

    const account = await db.collection('accounts').insertOne({
      name: data.name,
      email: data.email,
      password: data.password,
      geslacht: data.geslacht,
      profielfoto: data.file ? data.file.filename : null,
      leeftijd: data.leeftijd,
      hobby: data.hobby,
      intrested: data.intrested,
    });
    console.log(account);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// IMG

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

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// routes
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.render('pages/index'));
app.get('/add', (req, res) => res.render('pages/add'));
app.get('/succesurl', (req, res) => res.render('pages/succesurl'));
app.get('/profile', (req, res) => res.render('pages/profile'));
app.get('/match', (req, res) => res.render('pages/match'));

// Form

function form(req, res) {
  res.render('add.ejs');
}

async function add(req, res) {
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
  writeDb(newUser);
  const data = await callDb();
  res.render('pages/succesurl', { data });
}

app.post('/', upload.single('profielfoto'), add);
app.get('/add', form);

// 404 page

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 Not Found');
  console.log(data);
});

// Port

app.listen(3000, () => console.log('App listening on port 3000!'));
