const express = require('express');

const app = express();
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => res.render('pages/index'));
app.get('/add', (req, res) => res.render('pages/add'));
app.post('/', add);
app.get('/add', form);

function form(req, res) {
  res.render('add.ejs');
}

const data = [];

function add(req, res) {
  const id = slug(req.body.name).toLowerCase();

  data.push({
    id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.redirect(`/${id}`);
}

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 Not Found');
  console.log(data);
});

app.listen(3000, () => console.log('App listening on port 3000!'));

// app.get ("/contact", (req, res) => {
//     res.send ('Kjell Ruiter tel: 0623555040');
// });

// app.get ("/about", (req, res) => {
//     res.send ('Dit is realface de dating app');
// });

// app.get('/create', function(req, res) {
//     res.sendFile(path.join(__dirname+'/static/create.html '));
// });

// app.get('/landing/name/:nameId/gender/:genderId', function (req, res) {
//     res.send(req.params)
//   });
