
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('static'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => res.render("pages/index"));

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

// app.use(function(req, res){
//     res.type('text/plain')
//     res.status(404)
//     res.send('404 Not Found')
// })
app.listen(3000, () => console.log('App listening on port 3000!')); 