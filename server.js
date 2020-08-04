// server.js
const express = require('express');
var proxy = require('express-http-proxy');
const app = express();
const path = require('path');

//dist directory creates on heroku so you would get it here
app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + './project/dist/index.html'));
});

console.log('Console listening!');

app.use('/proxy', proxy('http://pacific-island-75677.herokuapp.com'));