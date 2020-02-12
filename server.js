
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('realface'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get ("/contact", (req, res) => {
    res.send ('Kjell Ruiter');
});

app.use(function(req, res){
    res.type('text/plain')
    res.status(404)
    res.send('404 Not Found')
})
app.listen(3000, () => console.log('App listening on port 3000!'));