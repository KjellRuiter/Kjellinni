
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('static'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/static/index.html'));
});

app.get ("/contact", (req, res) => {
    res.send ('Kjell Ruiter tel: 0623555040');
});

app.get ("/about", (req, res) => {
    res.send ('Dit is realface de dating app');
});

app.get('/create', function(req, res) {
    res.sendFile(path.join(__dirname+'/static/create.html'));
});

app.use(function(req, res){
    res.type('text/plain')
    res.status(404)
    res.send('404 Not Found')
})
app.listen(3000, () => console.log('App listening on port 3000!')); 